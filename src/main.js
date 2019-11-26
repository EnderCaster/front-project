import Vue from 'vue';
import iView from 'view-design';
import VueRouter from 'vue-router';
import Routers from './router';
import Util from './libs/util';
import App from './app.vue';
import VueI18n from 'vue-i18n';
import Axios from 'axios';
import 'view-design/dist/styles/iview.css';

Vue.use(VueRouter);
Vue.use(iView);
var default_language='zh';
//axios
window.axios=Axios;
// Axios.defaults.baseURL = '';

Vue.prototype.checkLogin = function () {
    if (localStorage.getItem['Authorization']) {
        axios.defaults.headers.common["Authorization"] = localStorage.getItem['Authorization'];
    }
    return axios.defaults.headers.common["Authorization"];
}
// i18n
Vue.use(VueI18n);
var locale=(navigator.language || navigator.browserLanguage).toLowerCase();
if(locale&&locale.length>2){
    locale.slice(0,2);
}
if (isNaN(locale)||!locale){
    locale=default_language;
}
const messages={
    'zh':require('./i18n/zh-CN.json')
}
const i18n=new VueI18n({
    locale:locale,
    messages
});
// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

new Vue({
    el: '#app',
    router: router,
    i18n,
    render: h => h(App)
});