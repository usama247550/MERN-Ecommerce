const catchAsyncError = (errFun) => {
  return function (req, res, next) {
    Promise.resolve(errFun(req, res, next)).catch(next);
  };
};

export default catchAsyncError;
