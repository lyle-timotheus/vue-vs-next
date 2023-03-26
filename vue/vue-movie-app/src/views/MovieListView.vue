<script setup>
import { ref, onMounted } from 'vue';

import MovieCard from '../components/MovieCard.vue';

const movies = ref([]);

const getMovies = async () => {
  movies.value = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${
      import.meta.env.VITE_PUBLIC_API_KEY
    }`
  )
    .then((res) => res.json())
    .then((res) => res.results);
};

onMounted(async () => {
  await getMovies();
});
</script>

<template>
  <main class="mx-32 my-12">
    <h1 className="text-3xl text-stone-400 font-bold text-center mb-8">
      Movie Database App
    </h1>

    <MovieCard :movies="movies" />
  </main>
</template>
