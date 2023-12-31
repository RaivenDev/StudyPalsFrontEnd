<template>
  <nav class="navbar has-shadow is-white">
    <!-- logo / brand-->
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">
        <img
          src="@/assets/logo.png"
          alt="site logo"
          style="max-height: 70px"
          class="py-2 px-2"
        />
      </router-link>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <div class="navbar-item">
          <router-link to="/feed"
            ><a class="bd-tw-button button">Feed</a></router-link
          >
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <router-link to="/create"
              ><a class="bd-tw-button button">Create Post</a></router-link
            >
            <router-link to="/login"
              ><a class="bd-tw-button button">Login</a></router-link
            >
          </div>
        </div>
      </div>
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
</style>
