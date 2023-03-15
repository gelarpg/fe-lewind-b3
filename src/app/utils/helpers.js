import baseAxios from "app/services/AxiosInterceptor";

let PDF_BASE_URL = process.env.REACT_APP_API_BASE_URL_EXPORT;
PDF_BASE_URL = PDF_BASE_URL.substring(0, PDF_BASE_URL.length - 1);

export const uploadFileHandler = async (array) => {
  const promises = [];
  const uploadFileTmp = () => new Promise((resolve, reject) => resolve(null));
  const uploadFileFcn = async (property, payload) => {
    try {
      const formData = new FormData();
      formData.append("files", payload);
      const { data } = await baseAxios.post("/upload-attachment", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (data?.meta?.success) {
        return {
          key: property,
          value: data?.data[0],
        };
      }
    } catch (error) {}
  };
  if (array.length > 0) {
    array.map((x) => {
      promises.push(uploadFileFcn(x.key, x.payload));
    });
  } else {
    promises.push(uploadFileTmp());
  }
  return Promise.all(promises)
    .then((values) => {
      const attachments = values.reduce(
        (obj, item) => Object.assign(obj, { [item.key]: item.value }),
        {}
      );
      return attachments;
    })
    .catch((error) => {});
};

export const getDocumentPath = (object, prop) => {
  let path = null;
  if (object?.documents && object?.documents?.length) {
    const doc = object?.documents.find((x) => x.type === prop);
    if (doc && doc?.path) path = `${PDF_BASE_URL}${doc?.path}`;
  }
  return path
}
export const getDocumentNumber = (object, prop) => {
  let doc_number = null;
  if (object?.documents && object?.documents?.length) {
    const doc = object?.documents.find((x) => x.type === prop);
    if (doc && doc?.doc_number) doc_number = `${doc?.doc_number}`;
  }
  return doc_number
}
