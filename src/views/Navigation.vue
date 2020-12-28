<template>
  <div class="row">
    <button
      id="navigation-button-left"
      class="container navigation-button"
      :disabled="disabled.left"
      @click="$emit('left')"
    >
      <LeftArrow class="navigation-arrow" />
    </button>
    <button
      id="navigation-button-right"
      class="container navigation-button"
      :disabled="disabled.right"
      @click="$emit('right')"
    >
      <RightArrow class="navigation-arrow" />
    </button>
    <Search
      class="navigation-search-layout"
      :url="url"
      @input="$emit('input', $event)"
      @search="$emit('search')"
    />
  </div>
</template>

<script>
import Search from './Search.vue';
import LeftArrow from '../assets/left.svg';
import RightArrow from '../assets/right.svg';

export default {
  name: 'Navigation',
  components: {
    Search,
    LeftArrow,
    RightArrow,
  },
  model: {
    prop: 'url',
    event: 'input',
  },
  props: {
    url: String,
    disabled: Object,
  },
};
</script>

<style>
.navigation-arrow {
  width: 12px;
  height: 16px;
  stroke: #fff;
}

.navigation-button {
  flex: none;
  background: #444;
  width: 32px;
  height: 32px;
  margin: 0;
  padding: 0;
  border: none;
  border-radius: 16px;
}

.navigation-button:hover {
  background: #f75;
}

.navigation-button:disabled {
  background: #ddd;
}

.navigation-button:disabled:hover {
  background: #ddd;
}

.navigation-search-layout {
  width: 100%;
}

#navigation-button-left {
  margin: 0 8px 0 0;
  padding: 0 2px 0 0;
}

#navigation-button-right {
  margin: 0 16px 0 0;
  padding: 0 0 0 2px;
}
</style>
