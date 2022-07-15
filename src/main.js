import { createApp } from 'vue';
import { createState, stateSymbol } from './store';
import App from './App.vue';

const app = createApp(App);
app.provide(stateSymbol, createState());
app.mount('#app');
