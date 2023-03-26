import { createRouter, createWebHistory } from 'vue-router';
import MovieListView from '../views/MovieListView.vue';
import MovieDetail from '../views/MovieDetail.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MovieListView,
    },
    {
      path: '/:id',
      name: 'movie',
      component: MovieDetail,
    },
  ],
});

export default router;
