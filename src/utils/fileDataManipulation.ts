async function buf(file: any) {
  const index = file.indexOf(';base64,');
  if (index !== -1) {
    const clean = file.substring(index + 1);
    const formatedString = clean.replace(/^base64,/, '');
    return Buffer.from(formatedString, 'base64');
  }
}

async function generateRawData(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      console.log(e);

      const rawData = e.target.result;
      resolve(rawData);
    };
    reader.readAsDataURL(file);
  });
}

async function generateBuf({ buf, file }: any) {
  const fileName = file.name;
  const fileExtension = fileName.slice(fileName.lastIndexOf('.') + 1);
  const fileType = file.type;
  try {
    const { ext, mime } = await fileType.fromBuffer(buf);
    return {
      ext,
      mime,
    };
  } catch {
    return {
      ext: fileExtension,
      mime: fileType,
    };
  }
}

export { buf, generateBuf, generateRawData };
