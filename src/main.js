// import "./plugins/jquery";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { kebabCase } from "lodash";

const app = createApp(App).use(router);

const requireComponent = require.context(
  "./components",
  true,
  /(Base|Icon)[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);
  const componentName = kebabCase(
    fileName
      .split("/")
      .pop()
      .replace(/\.\w+$/, "")
  );

  app.component(componentName, componentConfig.default || componentConfig);
});

app.mount("#app");
