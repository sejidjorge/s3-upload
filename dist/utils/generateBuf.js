"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateBuf(file) {
    function getBuf(file) {
        const index = file.indexOf(';base64,');
        if (index !== -1) {
            const clean = file.substring(index + 1);
            const formatedString = clean.replace(/^base64,/, '');
            return new Buffer.from(formatedString, 'base64');
        }
    }
}
exports.default = generateBuf;
