/// <reference types="node" />
declare function buf(file: any): Promise<Buffer | undefined>;
declare function generateRawData(file: any): Promise<unknown>;
declare function generateBuf({ buf, file }: any): Promise<{
    ext: any;
    mime: any;
}>;
export { buf, generateBuf, generateRawData };
