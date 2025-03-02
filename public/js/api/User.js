/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static URL = '/user';

  static setCurrent(user) {
    localStorage.user = JSON.stringify(user);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    return JSON.parse(localStorage.getItem('user'));
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
    return createRequest({data: null, method: 'GET', url: this.URL + '/current', responseType: 'json',
    callback: (err, response) => {
      if(response && response.user) {
        this.setCurrent(response.user);
      } else {
        this.unsetCurrent();
      }
      callback( err, response );
    }
  });
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    createRequest({
      url: this.URL + '/login',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
    return createRequest({data, method: 'POST', url: this.URL + '/register', responseType: 'json',
    callback: (err, response) => {
      if(response && response.user) {
        this.setCurrent(response.user);
      }
      callback( err, response );
    }
  });
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
    return createRequest({data: null, method: 'POST', url: this.URL + '/logout', responseType: 'json',
    callback: (err, response) => {
      if(response && response.user) {
        this.unsetCurrent();
      }
      callback( err, response );
    }
  });
  }
}
