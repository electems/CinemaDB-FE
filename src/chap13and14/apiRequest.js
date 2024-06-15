const apiRequest = async (url = '', optionsObj = null) => {
  let errMsg = null;
  try {
    const response = await fetch(url, optionsObj);
    if (!response.ok) throw new Error('Please reload the app');
    return response;
  } catch (err) {
    errMsg = err.message;
    return errMsg;
  }
};

export default apiRequest;
