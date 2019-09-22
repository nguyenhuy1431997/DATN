const jsonSuccess = result => {
  return { success: true, result };
};

const jsonError = err => {
  return { success: false, error: err };
};

const validatorToJsonError = errs => {
  let errMsg = errs.errors.map(value => {
    return value.msg;
  });

  return jsonError(errMsg);
};
module.exports = { jsonSuccess, jsonError, validatorToJsonError };
