import Vue from 'vue';
import Toasted from 'vue-toasted';

Vue.use(Toasted);

export const toastSuccess = msg => {
  return Vue.toasted.success(msg, {
    icon: 'check',
    action: {
      onClick: (e, toastObject) => {
        toastObject.goAway(0);
      }
    },
    duration: 5000,
    position: 'top-center',
    theme: 'bubble',
    className: 'toast'
  });
};


export const toastError = msg => {
    return Vue.toasted.error(msg, {
      icon: 'error_outline',
      action: {
       onClick: (e, toastObject) => {
          toastObject.goAway(0);
        }
      },
      duration: 5000,
      position: 'top-center',
      theme: 'bubble',
      className: 'toast'
    });
  };