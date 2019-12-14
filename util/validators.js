module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (username.trim() === '') {
    errors.username = 'username tidak boleh kosong';
  }
  if (email.trim() === '') {
    errors.email = 'email tidak boleh kosong';
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = 'Email tidak valid';
    }
  }
  if (password === '') {
    errors.password = 'Password tidak boleh kosong';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwrod Harus sama';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};

  if (username.trim() === '') {
    errors.username = 'username tidak boleh kosong';
  }
  if (password.trim() === '') {
    errors.password = 'Password tidak boleh kosong';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
