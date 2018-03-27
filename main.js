var CURRENT_USER_ID = null;
var snackbar;

class API {
  static call(method, url, params) {
    params = params || {};
    params._ = Math.round(Math.random() * 10000); // NO CACHE!

    if (CURRENT_USER_ID) {
      params.userId = CURRENT_USER_ID;
    }

    if (method === 'POST') {
      params = JSON.stringify(params);
    }

    return new Promise((resolve, reject) => {
      jQuery.ajax({
        url: url,
        method: method,
        data: params,
        contentType: 'application/json',
        traditional: true
      }).done((responce) => {
        resolve(responce);
      }).fail((err) => {
        reject(err);
      }).always(() => {
        //DEBUG
        console.log(method + ' ' + url + ' ' + JSON.stringify(params));
      });
    });

  }

  static get(url, params) {
    return API.call('GET', url, params);
  }

  static post(url, body) {
    return API.call('POST', url, body);
  }
}

function onLoginSubmit(login, password) {
  var form = $('.login-page .form-signin').addClass('working');

  API.post('/api/login', {
    login: login,
    password: password
  }).then(responce => {
    if (!responce.success) {
      form.removeClass('working');
      snackbar.warning('Failed to log in');
      return;
    }

    CURRENT_USER_ID = responce.user.id;

    if (responce.user.userType == 'admin')
      window.location = 'admin.html';
    else
      window.location = 'user.html';
  }).catch(() => {
    form.removeClass('working');
    snackbar.warning('Failed to log in');
  });

}

class Snackbar {
  constructor(jElement) {
    this.jElement_ = jElement;
    this.hide();
  }

  warning(msg) {
    this.hide();
    this.jElement_.text(msg);
    this.show();

    setTimeout(() => this.hide(), 3000);
  }

  show() {
    this.jElement_.css({ opacity: 1 });
  }

  hide() {
    this.jElement_.css({ opacity: 0 });
  }
}


$(document).ready(function () {
  $('#api-call-test').on('click', function () {
    var target = $(this);
    API.get('/api/author', {
      msg: 'Hello World'
    }).then((resp) => {
      target.html(JSON.stringify(resp));
    }).catch((err) => {
      console.error('ERROR', err);
    })
  });

  snackbar = new Snackbar($('#snackbar'));

  //myMap();
});

function myMap() {
  var mapOptions = {
    center: new google.maps.LatLng(51.5, -0.12),
    zoom: 13
  }
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
}