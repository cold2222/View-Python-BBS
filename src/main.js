import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueCookies from "vue-cookies";

// Nucleo Icons
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";

import materialKit from "./material-kit";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(materialKit);
app.config.globalProperties.$cookies = VueCookies;
app.config.globalProperties.$cookies.config("1d");
app.config.globalProperties.$axios = axios;
app.mount("#app");
