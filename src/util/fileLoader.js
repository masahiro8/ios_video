export const fileLoader = () => {
  const loadFile = (file, callbackProcess) => {
    return new Promise((resolve) => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', file.url, true);
      xhr.responseType = 'blob';
      xhr.onprogress = (e) => {
        const process = (e.loaded / e.total) * 100;
        callbackProcess(process);
      };
      xhr.onload = (e) => {
        const blob = e.srcElement.response;
        const src = (window.webkitURL || window.URL).createObjectURL(blob);
        callbackProcess(100);
        resolve({
          ...file,
          src,
        });
      };
      xhr.send();
    });
  };

  const getFiles = async (filesArray, callbackProcess) => {
    // watch progress
    const watchLists = {};
    filesArray.forEach(({ url }) => {
      watchLists[url] = { progress: 0 };
    });

    return await Promise.all(
      filesArray.map(async (file) => {
        return await loadFile(file, (progress) => {
          watchLists[file.url] = { progress };
          callbackProcess(watchLists);
        });
      })
    );
  };

  return {
    getFiles,
  };
};
