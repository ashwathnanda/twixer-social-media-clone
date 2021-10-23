module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const error = {};
  if (username.trim() === "") {
    error.username = "username must not be empty";
  }
  if (email.trim() === "") {
    error.email = "email must not be empty";
  } else {
    const regEx = "";
    if (!email.match(regEx)) {
      error.email = "Enter Valid Email";
    }
  }
  if (password === "") {
    error.password = "Please enter password";
  } else {
    if (password !== confirmPassword) {
      error.password = "Password does not match";
    }
  }

  return {
    error,
    valid: Object.keys(error).length < 1,
  };
};

/*
User Login Validator.
 */
module.exports.validateLoginInput = (username, password) => {
  const error = {};
  if (username.trim() === "") {
    error.username = "Username must not be empty";
  }
  if (password === "") {
    error.password = "Password must not be empty";
  }
  return {
    error,
    valid: Object.keys(error).length < 1,
  };
};
