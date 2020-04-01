const admin = {
  email: 'admin@pasv.com',
  password: 'admin',
};

const student = {
  email: 'studentofpasv@gmail.com',
  password: '98765ytrewq$',
};

const loginInvalidEmail1 = {
  email: 'absd@mail',
};

const loginWrongEmail = {
  email: 'aabbcc@email.com',
};

const loginWrongPassword = {
  password: '123456'
};


module.exports = {admin, student, loginInvalidEmail1, loginWrongEmail, loginWrongPassword };
