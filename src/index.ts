import { buf, generateBuf, generateRawData } from './utils/fileDataManipulation';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

async function uploadFileToS3(file: any) {
  let progress = 0;
  let returnData = {
    success: false,
    message: '',
    data: null,
    error: null,
  };
  const fileBuffer = await generateRawData(file);
  const bufData = await buf(fileBuffer);
  const { ext, mime } = await generateBuf({ bufData, file });
  try {
    AWS.config.update({
      accessKeyId: 'accessKeyId',
      secretAccessKey: 'secretAccessKey',
      sessionToken: 'sessionToken',
    });
    AWS.config.setPromisesDependency(null);
    const s3 = new AWS.S3({
      region: 'bucketRegion',
    });
    const params = {
      ACL: null,
      Body: bufData,
      Bucket: 'bucketName',
      ContentType: mime,
      Key: `${uuidv4()}.${ext}`,
      region: 'bucketRegion',
    };
    await s3
      .upload(params)
      .on('httpUploadProgress', (event) => {
        const progressUpld = parseInt(Math.round((event.loaded * 100) / event.total));
        progress = progressUpld;
      })
      .promise()
      .then((resp: any) => {
        console.log('sucess upload', resp);
      });
  } catch (error) {
    console.log(error);
  }
}
