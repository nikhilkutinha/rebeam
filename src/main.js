import "./plugins/jquery";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@fancyapps/fancybox/dist/jquery.fancybox.css";

createApp(App)
  .use(router)
  .mount("#app");
