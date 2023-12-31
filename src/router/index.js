import { createRouter, createWebHistory } from "vue-router";
import FeedView from "../views/FeedView.vue";
import CreatePostView from "../views/CreatePostView.vue";
import UserView from "../views/UserView.vue";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/feed",
    name: "feed",
    component: FeedView,
  },
  {
    path: "/create",
    name: "create",
    component: CreatePostView,
  },
  {
    path: "/login",
    name: "user",
    component: UserView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
