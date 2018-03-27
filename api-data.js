var MY_USERS = [
  {
    id: 1,
    name: 'Ihor',
    lastname: 'Zhvanko',
    email: 'zhvankoi@lvivcar.com',
    password: '1234',
    role: 'admin'
  },
  {
    id: 2,
    name: 'Natalia',
    lastname: 'Didukh',
    email: 'didukhn@lvivcar.com',
    password: '1234',
    role: 'user'
  },
  {
    id: 3,
    name: 'Artur',
    lastname: 'Dovbysh',
    email: 'dovbysha@gmail.com',
    password: '1234',
    role: 'user'
  }
];

function promiseWithDelay(data, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(data), delay);
  });
}

var API = {
  login: (username, password) => {
    var u = MY_USERS.filter(x => x.email == username && x.password == password)[0];
    if (!u) {
      return Promise.reject(new Error('failed to login'));
    }

    return promiseWithDelay({ success: true, user: u }, 2000);
  }
};
