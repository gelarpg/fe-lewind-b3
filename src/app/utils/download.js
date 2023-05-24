const downloadURI = (uri, name) => {
  const link = document.createElement("a");
  link.target = "_blank";
  // link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
export default downloadURI;