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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRawData = exports.generateBuf = exports.buf = void 0;
function buf(file) {
    return __awaiter(this, void 0, void 0, function* () {
        const index = file.indexOf(';base64,');
        if (index !== -1) {
            const clean = file.substring(index + 1);
            const formatedString = clean.replace(/^base64,/, '');
            return Buffer.from(formatedString, 'base64');
        }
    });
}
exports.buf = buf;
function generateRawData(file) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                console.log(e);
                const rawData = e.target.result;
                resolve(rawData);
            };
            reader.readAsDataURL(file);
        });
    });
}
exports.generateRawData = generateRawData;
function generateBuf({ buf, file }) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileName = file.name;
        const fileExtension = fileName.slice(fileName.lastIndexOf('.') + 1);
        const fileType = file.type;
        try {
            const { ext, mime } = yield fileType.fromBuffer(buf);
            return {
                ext,
                mime,
            };
        }
        catch (_a) {
            return {
                ext: fileExtension,
                mime: fileType,
            };
        }
    });
}
exports.generateBuf = generateBuf;
