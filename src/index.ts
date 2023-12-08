import { buf, generateBuf, generateRawData } from './utils/fileDataManipulation';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

interface uploadFileToS3Types {
  file: any;
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken: string;
  bucketRegion: string;
  bucketName: string;
  acl: string;
}

export default async function uploadFileToS3({
  file,
  accessKeyId,
  secretAccessKey,
  sessionToken,
  bucketRegion,
  bucketName,
  acl,
  onProgress,
}: uploadFileToS3Types & { onProgress?: (progress: number) => void }) {
  const fileBuffer = await generateRawData(file);
  const bufData = await buf(fileBuffer);
  const { ext, mime } = await generateBuf({ bufData, file });

  try {
    AWS.config.update({
      accessKeyId,
      secretAccessKey,
      sessionToken,
    });
    AWS.config.setPromisesDependency(null);

    const s3 = new AWS.S3({
      region: bucketRegion,
    });

    const params = {
      ACL: acl,
      Body: bufData,
      Bucket: bucketName,
      ContentType: mime,
      Key: `${uuidv4()}.${ext}`,
    };

    const uploadPromise = s3.upload(params);

    if (onProgress) {
      uploadPromise.on('httpUploadProgress', (event) => {
        const progressUpld = parseInt(Math.round((event.loaded * 100) / event.total));
        onProgress(progressUpld);
      });
    }

    await uploadPromise.promise();
    console.log('Success upload');
  } catch (error) {
    console.error(error);
  }
}
