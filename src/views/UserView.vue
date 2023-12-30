<template>
  <div v-if="user == null">
    <h1>Login</h1>

    <form @submit.prevent="login">
      <input type="text" placeholder="Usuário" v-model="username" />
      <input type="password" placeholder="Senha" v-model="password" />

      <button type="submit">Enter</button>
    </form>
  </div>
  <div v-else>
    <h1>User</h1>
    <div class="user-info">
      <p><b>ID:</b> {{ user.id }}</p>
      <p><b>Username:</b> {{ user.username }}</p>
      <p><b>Email:</b> {{ user.email }}</p>
      <p><b>Created at:</b> {{ created_at_formatted }}</p>
      <p><b>Birthdate:</b> {{ birthdate_formatted }}</p>
      <p><b>Role:</b> {{ user.role.name }}</p>

      <button class="logout-button" @click="logout()">Logout</button>
    </div>
  </div>
</template>

<script>
import { DateTime } from "luxon";
export default {
  data() {
    return {
      username: "",
      password: "",
      user: null,
    };
  },
  mounted() {
    if (localStorage.getItem("authToken")) {
      this.fetchUser();
    }
  },
  methods: {
    login() {
      this.$axios
        .post("/auth/login", {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          this.$axios.storeToken(response.data.access_token);
          this.fetchUser();
          this.$toast.success("Login successful!", { position: "bottom" });
        })
        .catch((response) => {
          console.error(response.message);
          this.$toast.error("Invalid credentials!", { position: "bottom" });
        });
    },
    fetchUser() {
      this.$axios
        .get("/users/me")
        .then((response) => {
          this.user = response.data;
        })
        .catch((response) => {
          console.error(response.message);
        });
    },
    logout() {
      this.user = null;
      localStorage.removeItem("authToken");
      this.$toast.info("Logout!", { position: "bottom" });
    },
  },
  computed: {
    created_at_formatted() {
      return DateTime.fromISO(this.user.created_at).toFormat(
        "dd/MM/yyyy HH:mm"
      );
    },
    birthdate_formatted() {
      return DateTime.fromISO(this.user.birthdate).toFormat("dd/MM/yyyy");
    },
  },
};
</script>

<style lang="scss" scoped></style>
