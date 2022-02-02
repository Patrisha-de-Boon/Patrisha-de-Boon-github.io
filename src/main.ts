import { createApp } from "vue";
import App from "./App.vue";
import { appear } from "./directives/Appear";
import router from "./router";

createApp(App).use(router).directive("appear", appear).mount("#app");
