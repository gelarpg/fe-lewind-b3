import baseAxios from "app/services/AxiosInterceptor";

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
