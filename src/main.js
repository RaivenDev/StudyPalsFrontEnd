import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

import axios_plugin from "./plugins/axios_plugin"; // import the plugin

import "./assets/style.scss"; // Import global CSS

createApp(App).use(router).use(axios_plugin).use(VueToast).mount("#app");
