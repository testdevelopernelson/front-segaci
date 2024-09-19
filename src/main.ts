import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css';
  
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

const app = createApp(App)

app.use(router)

app.use(VueToast,{
    position : 'bottom-right',
    duration : 4000
});

const optionsLoader = {
    color: '#0d6efd',
    loader: 'spinner',
    width: 64,
    height: 64,
    backgroundColor: '#ffffff',
    opacity: 0.9,
};
app.use(LoadingPlugin, optionsLoader);
app.mount('#app')

app.config.globalProperties.myGlobal = () => console.log('it works!');

import 'bootstrap/dist/js/bootstrap.min.js';
