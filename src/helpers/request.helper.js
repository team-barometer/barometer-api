const RequestHelper = {
  validateRequiredFields: validateRequiredFields
};

function validateRequiredFields(req, fieldsToValidate) {
  let errors = [];

  fieldsToValidate.forEach((error) => {
    if (!req.body[error.field]) {
      errors.push({error: true, field: error.field, message: error.message});
    }
  });

  return errors;
}

module.exports = RequestHelper;