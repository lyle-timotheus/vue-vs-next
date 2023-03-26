<script>
import { reactive, computed } from 'vue';
import Loader from './Loader.vue';

export default {
  components: {
    Loader,
  },
  props: {
    movieId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const state = reactive({
      isError: false,
      isReviewed: false,
      data: {},
      isLoading: false,
    });

    const handleChange = (e) => {
      const reviewData = { value: e.target.value };

      const reviewUrl = `https://api.themoviedb.org/3/movie/${
        props.movieId
      }/rating?api_key=${
        import.meta.env.VITE_PUBLIC_API_KEY
      }&guest_session_id=${import.meta.env.VITE_PUBLIC_GUEST_SESSION_ID}`;

      state.isLoading = true;
      fetch(reviewUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      })
        .then((response) => response.json())
        .then((data) => {
          state.isLoading = false;
          state.isReviewed = true;
          console.log('Success:', reviewData);
          state.data = reviewData;
        })
        .catch((error) => {
          state.isLoading = false;
          state.isReviewed = false;
          state.isError = true;
          console.error('Error:', error);
        });
    };

    const reviewValue = computed(() => {
      return state.data.value || '';
    });

    return {
      reviewValue,
      handleChange,
      isReviewed: computed(() => state.isReviewed),
      isError: computed(() => state.isError),
      isLoading: computed(() => state.isLoading),
    };
  },
};
</script>

<template>
  <div>
    <select
      class="bg-red-200 text-red-800 inline-block my-2 py-2 px-4 rounded-md text-sm"
      @change="handleChange"
    >
      <option>--- Review movie ---</option>
      <option value="0.5">0.5</option>
      <option value="1.0">1.0</option>
      <option value="1.5">1.5</option>
      <option value="2.0">2.0</option>
      <option value="2.5">2.5</option>
      <option value="3.0">3.0</option>
      <option value="3.5">3.5</option>
      <option value="4.0">4.0</option>
      <option value="4.5">4.5</option>
      <option value="5.0">5.0</option>
      <option value="5.5">5.5</option>
      <option value="6.0">6.0</option>
      <option value="6.5">6.5</option>
      <option value="7.0">7.0</option>
      <option value="7.5">7.5</option>
      <option value="8.0">8.0</option>
      <option value="8.5">8.5</option>
      <option value="9.0">9.0</option>
      <option value="9.5">9.5</option>
      <option value="10.0">10.0</option>
    </select>
    <h2>
      Your Rating:
      <span class="text-green-400 font-bold">{{ reviewValue }} </span>
    </h2>
    <div>
      <p v-if="isReviewed" class="text-green-400 font-extrabold">
        Success! Movie review submitted! ⭐️
      </p>
      <p v-if="isError" class="text-red-400 font-extrabold">
        An error occurred! Please try again. 💥
      </p>
      <Loader v-if="isLoading" />
    </div>
  </div>
</template>
