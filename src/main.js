import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueCookies from "vue-cookies";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// Nucleo Icons
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";

import materialKit from "./material-kit";

const app = createApp(App);
const store = createPinia();
store.use(piniaPluginPersistedstate);

app.use(store);
app.use(router);
app.use(materialKit);
app.config.globalProperties.$cookies = VueCookies;
app.config.globalProperties.$cookies.config("1d");
app.config.globalProperties.$axios = axios;
axios.defaults.withCredentials = true;
app.mount("#app");
