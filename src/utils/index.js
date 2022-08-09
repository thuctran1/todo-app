const makeUuid = () => {
  var temp_url = URL.createObjectURL(new Blob());
  var uuid = temp_url.toString();
  URL.revokeObjectURL(temp_url);
  return uuid.substr(uuid.lastIndexOf("/") + 1); // remove prefix (e.g. blob:null/, blob:www.test.com/, ...)
};

const getStorage = (key) => {
  return new Promise((resolve, reject) => {
    my.getStorage({
      key,
      success: (res) => resolve(res.data),
      fail: (fail) => reject(fail),
    });
  });
};

const setStorage = (key, data) => {
  return new Promise((resolve, reject) => {
    my.setStorage({
      key,
      data,
      success: (res) => {
        resolve(res);
      },
      fail: (fail) => {
        reject(fail);
      },
    });
  });
};

const getConfirm = (title, content, confirmBtnTxt, cancelBtnTxt) => {
  return new Promise((resolve, reject) => {
    my.confirm({
      title: title,
      content: content,
      confirmButtonText: confirmBtnTxt,
      cancelButtonText: cancelBtnTxt,
      success: (result) => {
        resolve(result.confirm);
      },
      fail: (e) => {
        reject(e);
      },
    });
  });
};

export { makeUuid, getConfirm, getStorage, setStorage };
