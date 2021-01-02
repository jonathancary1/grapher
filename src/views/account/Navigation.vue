<template>
  <div class="row">
    <button
      class="container button left"
      :disabled="disabled.left"
      @click="$emit('left')"
    >
      <LeftArrow class="arrow"/>
    </button>
    <button
      class="container button right"
      :disabled="disabled.right"
      @click="$emit('right')"
    >
      <RightArrow class="arrow"/>
    </button>
    <Search
      class="search"
      :url="url"
      @input="$emit('input', $event)"
      @search="$emit('search')"
    />
  </div>
</template>

<script>
import Search from './Search.vue';
import LeftArrow from '../../assets/left.svg';
import RightArrow from '../../assets/right.svg';

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

<style lang="scss" scoped>
@import '../../variables.scss';

.button {
  flex: none;
  background: $primary;
  width: 32px;
  height: 32px;
  margin: 0;
  padding: 0;
  border: none;
  border-radius: 16px;
  &:focus {
    outline: none;
    box-shadow: none;
  }
  &:hover {
    background: $action;
  }
  &:disabled, &:disabled:hover {
    background: $accent;
  }
}

.arrow {
  width: 12px;
  height: 16px;
  fill: #fff;
  stroke: #fff;
}

.left {
  margin: 0 8px 0 0;
  padding: 0 2px 0 0;
}

.right {
  margin: 0 16px 0 0;
  padding: 0 0 0 2px;
}

.search {
  width: 100%;
}
</style>
