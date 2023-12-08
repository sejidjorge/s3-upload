"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fileDataManipulation_1 = require("./utils/fileDataManipulation");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const uuid_1 = require("uuid");
function uploadFileToS3({ file, accessKeyId, secretAccessKey, sessionToken, bucketRegion, bucketName, acl, onProgress, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileBuffer = yield (0, fileDataManipulation_1.generateRawData)(file);
        const bufData = yield (0, fileDataManipulation_1.buf)(fileBuffer);
        const { ext, mime } = yield (0, fileDataManipulation_1.generateBuf)({ bufData, file });
        try {
            aws_sdk_1.default.config.update({
                accessKeyId,
                secretAccessKey,
                sessionToken,
            });
            aws_sdk_1.default.config.setPromisesDependency(null);
            const s3 = new aws_sdk_1.default.S3({
                region: bucketRegion,
            });
            const params = {
                ACL: acl,
                Body: bufData,
                Bucket: bucketName,
                ContentType: mime,
                Key: `${(0, uuid_1.v4)()}.${ext}`,
            };
            const uploadPromise = s3.upload(params);
            if (onProgress) {
                uploadPromise.on('httpUploadProgress', (event) => {
                    const progressUpld = parseInt(Math.round((event.loaded * 100) / event.total));
                    onProgress(progressUpld);
                });
            }
            yield uploadPromise.promise();
            console.log('Success upload');
        }
        catch (error) {
            console.error(error);
        }
    });
}
exports.default = uploadFileToS3;
