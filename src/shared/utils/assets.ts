export const imageUrl = (key: string, edits = {}) => {
  const output = {
    bucket: S3_BUCKET,
    key,
    edits
  };

  return `${CLOUDFRONT_URL}/${window.btoa(JSON.stringify(output))}`;
};
