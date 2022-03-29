import { S3 } from 'aws-sdk';

export function createPresignedPost(uploadType, filename, bucketName): S3.PresignedPost {
  const s3 = new S3();

  const time = new Date().getTime();
  const key = `${uploadType}/${time}_${filename}`;

  return s3.createPresignedPost({
    Bucket: bucketName,
    Fields: {
      key: key, // totally random
    },
    Expires: 300, // 10 minutes
    Conditions: [
      ['content-length-range', 0, 1000000], // content length restrictions: 0-1MB
      ['eq', '$key', key],
    ],
  });
}
