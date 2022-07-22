import { createApp } from 'vue';
import { createPinia } from 'pinia';

import { createSocketConnection } from './api';
import App from './App.vue';
import './style.css';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.mount('#app');

createSocketConnection();
