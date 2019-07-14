const userData = 'userData';
const cartInfo = 'cartInfo';

export default {
    getInitialCartInfo() {
      if (typeof localStorage !== 'undefined') {
        return JSON.parse(localStorage.getItem(cartInfo)) || {
          products: [],
          productsQty: 0
        };
      }
    },
    setCartInfo(cartData) {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(cartInfo, JSON.stringify(cartData));
      }
    },
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