<template>
  <div id="account">
    <header class="header">
      <div class="title">
        Grapher
      </div>
    </header>
    <div class="content">
      <Navigation
        class="navigation"
        v-model="url"
        :disabled="disabled"
        @left="left"
        @right="right"
        @search="search"
      />
      <div v-if="loading" class="container loading">
        <LoadingIcon class="icon"/>
      </div>
      <d3-network
        v-else
        class="graph"
        :net-nodes="nodes"
        :net-links="links"
        :options="{ force: 1000, linkWidth: 1, nodeSize: 8, nodeLabels: true }"
      />
    </div>
  </div>
</template>

<script>
import D3Network from 'vue-d3-network';
import Navigation from './Navigation.vue';
import LoadingIcon from '../../assets/loading.svg';
import { queries, mutations } from '../../api/graphql';

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
      return this.$data.crawl.pages.map((page) => ({ _color: '#222', id: page.id, name: page.url }));
    },
    links() {
      return this.$data.crawl.pages.flatMap((page) => page.links.map((link) => ({ _color: '#222', sid: page.id, tid: link })));
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
      query: queries.crawl,
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
      query: queries.crawls,
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
        mutation: mutations.crawl,
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

<style lang="scss" scoped>
#account {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 128px 1fr;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
}

.content {
  margin: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.navigation {
  min-width: 300px;
  max-width: 600px;
  width: 80vw;
  margin: 0 0 16px 0;
}

.graph, .loading {
  overflow: hidden;
  min-width: 300px;
  max-width: 600px;
  min-height: 240px;
  max-height: 480px;
  width: 80vw;
  height: 64vw;
  border-radius: 20px;
  box-shadow: inset 0 0 16px #ddd;
}

.loading svg {
  width: 32px;
  height: 32px;
}

@keyframes rotating {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}

.icon {
  animation: rotating 2s linear infinite;
  & path { fill: #ddd; }
}
</style>
