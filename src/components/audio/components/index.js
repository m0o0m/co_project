import Vue from 'vue'
import MyAudioComponent from './tpl.vue'
import merge from 'lodash/merge'

let instance;

let globalConfig = {};

let LoadingConstructor = Vue.extend(MyAudioComponent);

let initInstance = () => {
  instance = new LoadingConstructor({
    el: document.createElement('div')
  });
  document.body.appendChild(instance.$el);
};

initInstance();

let MyAudio = {
  open(options = {}) {
    Vue.nextTick(() => {
      instance.fileName = options.fileName;
      instance.audioPlay = options.audioPlay;
      instance.open();

    });
  },

  close() {
    instance.close();
  },

  play() {
    instance.play();
  }
};

export default {
  install(Vue, options = {}) {
    globalConfig = options;
    Vue.prototype.$myAudio = MyAudio;
  }
};





