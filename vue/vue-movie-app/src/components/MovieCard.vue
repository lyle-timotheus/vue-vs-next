<script setup>
import { RouterLink } from 'vue-router';

const { movies } = defineProps({
  movies: Array,
});
const image_path = 'https://image.tmdb.org/t/p/original/';
</script>

<template>
  <div className="grid grid-rows-4 grid-cols-4 gap-8">
    <div v-for="movie in movies">
      <h1>{{ movie.title }}</h1>
      <h2 className="text-xs">{{ movie.release_date }}</h2>
      <p
        className="flex justify-center relative top-10 w-1/5 text-center px-2 py-2 font-semibold text-sm bg-green-500 text-white rounded-full shadow-sm"
      >
        {{ movie.vote_average }} <span className="ml-0.5">⭐️</span>
      </p>
      <RouterLink :to="`/${movie.id}`">
        <img :src="image_path + movie.poster_path" width="800" height="800" />
      </RouterLink>
    </div>
  </div>
</template>
