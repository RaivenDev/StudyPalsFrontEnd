<template>
  <div v-if="user == null && register == false">
    <br />
    <h1>Login</h1>

    <form @submit.prevent="loginUser">
      <input type="text" placeholder="Username" v-model="username" />
      <input type="password" placeholder="Password" v-model="password" />

      <button type="submit">Enter</button>
    </form>
    <p>
      Don't have an account yet?
      <a @click="register = true" class="register-link">
        <b> Register here! </b></a
      >
    </p>
  </div>
  <div v-else-if="user == null && register == true">
    <br />
    <h1>Register</h1>

    <form @submit.prevent="registerUser">
      <input type="text" placeholder="Username" v-model="username" />
      <input type="text" placeholder="Email" v-model="email" />
      <input type="text" placeholder="Country" v-model="country" />
      <input type="date" placeholder="Birthdate" v-model="birthdate" />
      <input type="password" placeholder="Password" v-model="password" />
      <input
        type="password"
        placeholder="Confirm Password"
        v-model="confirm_password"
      />

      <button type="submit">Register</button>
    </form>
    <p>
      Already have an account?
      <a @click="register = false" class="register-link">
        <b> Login here! </b></a
      >
    </p>
  </div>
  <div v-else>
    <h1>{{ user.username }} (ID {{ user.id }})</h1>
    <div class="user-info">
      <p><b>Email:</b> {{ user.email }}</p>
      <p><b>Country:</b> {{ user.country }}</p>
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
      country: "",
      birthdate: null,
      email: "",
      confirm_password: "",
      user: null,
      register: false,
    };
  },
  mounted() {
    if (localStorage.getItem("authToken")) {
      this.fetchUser();
    }
  },
  methods: {
    loginUser() {
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
    registerUser() {
      if (
        this.username.length == 0 ||
        this.password.length == 0 ||
        this.country.length == 0 ||
        this.email.length == 0 ||
        this.birthdate == null
      ) {
        this.$toast.error("Missing information!", { position: "bottom" });
        return;
      }

      // Handle timezone
      let birthdate = new Date(this.birthdate);
      const offset = birthdate.getTimezoneOffset();
      birthdate = new Date(birthdate.getTime() - offset * 60 * 1000);
      birthdate = birthdate.toISOString();

      if (this.username.includes(" ")) {
        this.$toast.error("Username can't have spaces!", {
          position: "bottom",
        });
        return;
      }

      if (this.password != this.confirm_password) {
        this.$toast.error("Passwords need to match!", { position: "bottom" });
        return;
      }

      this.$axios
        .post("/users/", {
          username: this.username,
          password: this.password,
          country: this.country,
          email: this.email,
          birthdate: birthdate,
        })
        .then(() => {
          this.loginUser();
        })
        .catch((response) => {
          console.error(response.message);
          this.$toast.error("Error during user creation!", {
            position: "bottom",
          });
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
      this.$axios.updateToken();
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

<style lang="scss" scoped>
.register-link {
  cursor: pointer;
}
</style>
