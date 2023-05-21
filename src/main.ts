import { createApp } from 'vue';
import App from './App.vue';
import BalmUI from 'balm-ui';
import vElevation from 'balm-ui/directives/elevation';
import 'balm-ui-css';
import 'normalize.css';

const app = createApp(App);
app.directive(vElevation.name, vElevation);
app.use(BalmUI);
app.mount('#app');