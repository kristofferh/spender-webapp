import React, { Children, Component } from "react";
import PropTypes from "prop-types";

export default class InfiniteScroll extends Component {
  static propTypes = {
    className: PropTypes.string,
    threshold: PropTypes.number,
    hasMore: PropTypes.bool,
    loadingMore: PropTypes.bool,
    loader: PropTypes.any,
    showLoader: PropTypes.bool,
    loadMore: PropTypes.func.isRequired,
    items: PropTypes.array,
    children: PropTypes.any,
    window: PropTypes.bool
  };

  static defaultProps = {
    threshold: 100,
    hasMore: true,
    loadingMore: false,
    loader: () => {
      return <div>Loading...</div>;
    },
    showLoader: true,
    items: [],
    window: true
  };

  componentDidMount() {
    if (this.el) {
      this.scrollingElement = this.props.window ? window : this.el;
      this.offsetTop =
        this.el.getBoundingClientRect().top -
        document.body.getBoundingClientRect().top;
      this.updateElementHeight();
      this.attachScrollListener();
    }
  }

  componentDidUpdate() {
    if (!this.props.loadingMore) {
      this.updateElementHeight();
      this.attachScrollListener();
    }
  }

  componentWillUnmount() {
    this.detachScrollListener();
  }

  scrollHandler = () => {
    // Store the scroll value.
    if (this.props.window) {
      const yOffset = window.pageYOffset;
      if (yOffset) {
        this.lastScrollY = yOffset;
      } else {
        this.lastScrollY = (
          document.documentElement ||
          document.body.parentNode ||
          document.body
        ).scrollTop;
      }
    }

    // Check if we should tick.
    this.requestTick();
  };

  updateScroll = () => {
    // Reset ticking flag so we can get next scroll.
    this.ticking = false;

    let bottomPosition = this.findOffset();

    if (bottomPosition < Number(this.props.threshold)) {
      this.detachScrollListener();
      this.props.loadMore();
    }
  };

  resizeHandler = () => {
    this.updateElementHeight();
    this.scrollHandler();
  };

  attachScrollListener() {
    if (!this.props.hasMore || this.props.loadingMore) return;
    this.scrollingElement.addEventListener("scroll", this.scrollHandler, true);
    this.scrollingElement.addEventListener("resize", this.resizeHandler, true);
  }

  findOffset() {
    if (this.props.window) {
      return this.elHeight - this.lastScrollY - window.innerHeight;
    } else {
      return (
        this.scrollingElement.scrollHeight -
        this.scrollingElement.scrollTop -
        this.scrollingElement.clientHeight
      );
    }
  }

  requestTick() {
    if (!this.ticking) {
      window.requestAnimationFrame(this.updateScroll);
    }
    this.ticking = true;
  }

  updateElementHeight() {
    if (this.el) {
      let dimensions = this.el.getBoundingClientRect();
      this.elHeight = this.offsetTop + dimensions.height;
    }
  }

  detachScrollListener() {
    this.scrollingElement.removeEventListener(
      "scroll",
      this.scrollHandler,
      true
    );
    this.scrollingElement.removeEventListener(
      "resize",
      this.resizeHandler,
      true
    );
  }

  renderLoader() {
    return this.props.loadingMore && this.props.showLoader
      ? this.props.loader()
      : null;
  }

  render() {
    const existingItems = Children.toArray(this.props.children);
    const newItems = Children.toArray(this.props.items);
    const items = existingItems.concat(newItems);

    return (
      <div ref={node => (this.el = node)} className={this.props.className}>
        {items}
        {this.renderLoader()}
      </div>
    );
  }
}
