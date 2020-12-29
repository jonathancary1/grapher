<template>
  <div class="column">
    <header class="title account-header-layout">
      Grapher
    </header>
    <Navigation
      class="account-navigation-layout"
      v-model="url"
      :disabled="disabled"
      @left="left"
      @right="right"
      @search="search"
    />
    <div
      v-if="loading"
      class="container account-loading-layout"
    >
      <LoadingIcon
        class="account-loading-icon"
      />
    </div>
    <d3-network
      v-else
      class="account-graph-layout"
      :net-nodes="nodes"
      :net-links="links"
      :options="{ force: 1000, linkWidth: 1, nodeSize: 8, nodeLabels: true }"
    />
  </div>
</template>

<script>
import D3Network from 'vue-d3-network';
import Navigation from './Navigation.vue';
import LoadingIcon from '../assets/loading.svg';
import graphql from '../apollo/graphql';

function normalize(url) {
  return new RegExp('^https?://').test(url) ? url : `https://${url}`;
}

export default {
  name: 'Account',
  components: {
    D3Network,
    Navigation,
    LoadingIcon,
  },
  data() {
    return {
      url: '',
      crawl: { pages: [] },
      crawls: [],
      index: null,
      loading: false,
    };
  },
  created() {
    if (this.$store.state.token == null) {
      this.$router.replace({ name: 'Home' });
    }
  },
  async destroyed() {
    await this.$apollo.provider.defaultClient.resetStore();
  },
  watch: {
    crawl(value) {
      this.loading = false;
      this.url = value.pages[0]?.url || '';
    },
    crawls(value) {
      if (this.index === null && value.length > 0) {
        this.index = value.length - 1;
      }
    },
  },
  computed: {
    nodes() {
      return this.$data.crawl.pages.map((page) => ({ _color: '#444', id: page.id, name: page.url }));
    },
    links() {
      return this.$data.crawl.pages.flatMap((page) => page.links.map((link) => ({ _color: '#444', sid: page.id, tid: link })));
    },
    disabled() {
      return {
        left: this.$data.index === null || this.$data.index === 0,
        right: this.$data.index === null || this.$data.index === this.$data.crawls.length - 1,
      };
    },
  },
  apollo: {
    crawl: {
      query: graphql.queries.crawl,
      context() {
        return { headers: { authorization: this.$store.state.token } };
      },
      variables() {
        return { id: this.$data.crawls[this.$data.index] };
      },
      skip() {
        return this.$data.index === null;
      },
      update(data) {
        return data.user?.crawl || { pages: [] };
      },
    },
    crawls: {
      query: graphql.queries.crawls,
      context() {
        return { headers: { authorization: this.$store.state.token } };
      },
      update(data) {
        return data.user?.crawls?.map((crawl) => crawl.id) || [];
      },
    },
  },
  methods: {
    left() {
      if (this.$data.index !== null && this.$data.index > 0) {
        this.$data.index -= 1;
      }
    },
    right() {
      if (this.$data.index !== null && this.$data.index < this.$data.crawls.length - 1) {
        this.$data.index += 1;
      }
    },
    async search() {
      if (this.$data.loading) {
        return;
      }
      this.$data.loading = true;
      const mutation = await this.$apollo.mutate({
        mutation: graphql.mutations.crawl,
        context: { headers: { authorization: this.$store.state.token } },
        variables: { url: normalize(this.$data.url) },
      });
      if (mutation.data.crawl === null) {
        this.$data.url = '';
        this.$data.loading = false;
      }
      this.$data.crawls.push(mutation.data.crawl.id);
      this.$data.index = this.$data.crawls.length - 1;
    },
  },
};
</script>

<style>
.account-header-layout {
  margin: 64px 0 64px 0;
}

.account-navigation-layout {
  max-width: 480px;
  width: 80vw;
  margin: 0 0 16px 0;
  justify-content: space-between;
}

.account-graph-layout {
  overflow: hidden;
  max-width: 480px;
  max-height: 384px;
  width: 80vw;
  height: 64vw;
  margin: 0 0 16px 0;
  border-radius: 20px;
  box-shadow: inset 0 0 16px #ddd;
}

.account-loading-layout {
  max-width: 480px;
  max-height: 384px;
  width: 80vw;
  height: 64vw;
  margin: 0 0 16px 0;
  border-radius: 20px;
  box-shadow: inset 0 0 16px #ddd;
}

.account-loading-layout svg {
  width: 32px;
  height: 32px;
}

@-webkit-keyframes rotating {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(-360deg);
  }
}

.account-loading-icon {
  -webkit-animation: rotating 2s linear infinite;
}

.account-loading-icon path {
  fill: #ddd;
}
</style>
