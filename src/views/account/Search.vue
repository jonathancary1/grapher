<template>
  <form
    class="row search-form"
    @submit.prevent="$emit('search')"
  >
    <button
      class="search-button"
    >
      <SearchIcon class="search-icon" />
    </button>
    <input
      class="search-input"
      type="text"
      placeholder="e.g. google.com"
      :value="url"
      @input="$emit('input', $event.target.value)"
    >
  </form>
</template>

<script>
import SearchIcon from '../../assets/search.svg';

export default {
  name: 'Search',
  components: { SearchIcon },
  props: { url: String },
};
</script>

<style>
.search-form {
  height: 40px;
  border-radius: 20px;
  box-shadow: 0 0 8px #ddd;
}

.search-button {
  height: 100%;
  fill: #444;
  background: #fff;
  border: none;
  border-radius: 20px 0 0 20px;
}

.search-button:hover {
  fill: #f75;
}

.search-icon {
  padding: 2px 8px 0 8px;
  width: 16px;
  height: 16px;
}

.search-input {
  margin: 2px 12px 2px 0;
  width: 100%;
  border: none;
}

.search-input:focus {
  outline: none;
}
</style>
