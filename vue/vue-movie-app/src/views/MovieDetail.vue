<script setup>
import { useRouter, RouterLink } from 'vue-router';
import { ref } from 'vue';

import AddReview from '../components/AddReview.vue';

const router = useRouter();
const movieId = router.currentRoute.value.params.id;
const movie = ref(null);
const image_path = 'https://image.tmdb.org/t/p/original/';

movie.value = await fetch(
  `https://api.themoviedb.org/3/movie/${movieId}?api_key=${
    import.meta.env.VITE_PUBLIC_API_KEY
  }`
).then((res) => res.json());

const {
  title,
  overview,
  tagline,
  release_date,
  runtime,
  status,
  backdrop_path,
} = movie.value;

const backgroundImageStyle = {
  backgroundImage: `url(${image_path + backdrop_path})`,
};
</script>

<template>
  <div
    className="bg-cover bg-center h-screen relative"
    :style="backgroundImageStyle"
  >
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60">
      <div className="m-40">
        <RouterLink
          to="/"
          class="rounded-md bg-blue-200 text-blue-700 text-sm p-2"
          >Home</RouterLink
        >
        <h2 className="text-3xl font-bold mt-8">{{ title }}</h2>
        <h2 className="text-md text-stone-400 italic mb-4">"{{ tagline }}"</h2>
        <h2 className="text-lg">
          Release Date: <span className="font-bold">{{ release_date }}</span>
        </h2>
        <h2 className="text-lg">
          Runtime: <span className="font-bold">{{ runtime }} minutes</span>
        </h2>
        <div>
          <h2
            className="bg-green-600	inline-block my-2 py-2 px-4 rounded-md text-sm"
          >
            {{ status }}
          </h2>
          <AddReview :movieId="movieId" />
        </div>
        <h2 className="text-sm">{{ overview }}</h2>
      </div>
    </div>
  </div>
</template>
