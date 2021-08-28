# Spender Webapp

A spending tracker.

Spender Web App uses Webpack, React, Redux, Emotion, React Router. And Jest for testing.

## Usage

Spender uses a Github package - @kristofferh/businesskit. To use it you'll need to authenticate with Github. Create a personal access token, and then expose it so the `.npmrc` file can get it. We use Mac and ZSH so we export it from a profile.

`export NPM_AUTH_TOKEN="xxx-xxxxx"`

Development:

```
yarn install
yarn dev
```

Prod:

```
yarn build
yarn start
```

Test:

```
yarn test
```
