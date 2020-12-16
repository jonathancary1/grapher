<template>
  <div class="column">
    <header class="title account-header-layout">
      Grapher
    </header>
    <hr
      class="account-hr-layout"
    >
    <input
      type="button"
      value="Log Out"
    />
  </div>
</template>

<script>
export default {
  name: 'Account'
}
</script>

<style>
.account-header-layout {
  margin: 64px 0 64px 0;
}

.account-hr-layout {
  margin: 16px 0 16px 0;
  width: 256px;
}
</style>
