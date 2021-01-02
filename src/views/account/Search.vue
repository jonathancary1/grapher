<template>
  <form id="search" class="row" @submit.prevent="$emit('search')">
    <button class="container button">
      <SearchIcon class="icon"/>
    </button>
    <input
      class="input"
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

<style lang="scss" scoped>
@import '../../variables.scss';

#search {
  height: 40px;
  border-radius: 20px;
  box-shadow: 0 0 8px $accent;
}

.button {
  box-sizing: border-box;
  height: 40px;
  fill: $primary;
  background: #fff;
  border: none;
  border-radius: 20px 0 0 20px;
  &:focus {
    outline: none;
    box-shadow: none;
  }
  &:hover {
    fill: $action;
  }
}

.icon {
  padding: 2px 8px 0 8px;
  width: 16px;
  height: 16px;
}

.input {
  margin: 2px 12px 2px 0;
  width: 100%;
  border: none;
  &:focus {
    outline: none;
  }
}
</style>
