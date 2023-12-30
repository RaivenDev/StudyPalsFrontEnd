<template>
  <nav>
    <img src="@/assets/logo.png" alt="" />
    <div>
      <router-link to="/">Feed</router-link>
      <router-link to="/create">Create Post</router-link>
      <router-link to="/login">Login</router-link>
    </div>
  </nav>
  <router-view class="view" />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
