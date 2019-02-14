const userData = 'userData';

export default {
    getUserInfo() {
        if (typeof localStorage !== 'undefined') {
          return JSON.parse(localStorage.getItem(userData));
        }
      },
    setUserInfo(data) {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(userData, JSON.stringify(data));
        }
      },
    deleteUserInfoStore() {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(userData);
      }
    },
    get isAuthenticated() {
      try {
        return !!this.getUserInfo();
      } catch (e) {
        console.log(e);
        return false;
      }
    }
}