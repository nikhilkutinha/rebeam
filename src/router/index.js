import { createRouter, createWebHistory } from "vue-router";

import ImageIndex from "../views/image/index.vue";

// import RoverShow from "../views/rover/show";
// import RoverIndex from "../views/rover/index";

const routes = [
  {
    path: "/",
    name: "ImageIndex",
    component: ImageIndex
  },
  {
    path: "/rovers",
    name: "RoverIndex",
    component: () => import("../views/rover/index")
  },
  {
    path: "/rovers/:id",
    name: "RoverShow",
    component: () => import("../views/rover/show"),
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
