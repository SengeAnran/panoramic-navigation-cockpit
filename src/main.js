import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import globalRegister from '@/components/globalRegister';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import './assets/iconfont/index.css';
import './assets/fonts/font.scss';
import './assets/scss/global.scss';
import './assets/scss/element-plus.scss';
import './assets/scss/map-popup.scss';
import './permission';

// import CustomLoading from '@/views/CesiumMap/class/loading';

const app = createApp(App);

app.use(store);
app.use(router);
// app.directive('custom-loading', CustomLoading());
app.use(ElementPlus);
globalRegister(app);
app.mount('#app');
