interface uploadFileToS3Types {
    file: any;
    accessKeyId: string;
    secretAccessKey: string;
    sessionToken: string;
    bucketRegion: string;
    bucketName: string;
    acl: string;
}
export default function uploadFileToS3({ file, accessKeyId, secretAccessKey, sessionToken, bucketRegion, bucketName, acl, onProgress, }: uploadFileToS3Types & {
    onProgress?: (progress: number) => void;
}): Promise<void>;
export {};
