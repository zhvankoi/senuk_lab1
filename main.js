
var snackbar;

class _API {
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

  API.login(login, password).then(responce => {
    if (!responce.success) {
      form.removeClass('working');
      snackbar.warning('Failed to log in');
      return;
    }

    window.localStorage.setItem('CAR_USER', JSON.stringify(responce.user));


    if (responce.user.role == 'admin')
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
  jQuery('select').niceSelect();
  if (jQuery('[type="date"]').prop('type') != 'date') {
    jQuery('[type="date"]').datepicker();
  }
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
  function ll(lat, long) {
    return new google.maps.LatLng(lat, long);
  }

  var mapOptions = {
    center: ll(49.843086, 24.026713),
    zoom: 14
  }
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);

  var marker1 = new google.maps.Marker({
    position: ll(49.839214, 24.031565),
    map: map,
    title: ''
  });

  var marker2 = new google.maps.Marker({
    position: ll(49.840565, 24.020812),
    map: map,
    title: 'Fiat 500e'
  });

  var marker3 = new google.maps.Marker({
    position: ll(49.846642, 24.041308),
    map: map,
    title: 'Ford Focus Electric'
  });
}