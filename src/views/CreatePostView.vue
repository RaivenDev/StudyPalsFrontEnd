<template>
  <div>
    <h1>Create Post</h1>
    <form @submit.prevent="createPost">
      <textarea rows="15" placeholder="Text" v-model="text" />

      <button type="submit">Create</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "",
    };
  },
  methods: {
    createPost() {
      this.$axios
        .post("/posts/", { text: this.text })
        .then(() => {
          this.text = "";
          this.$toast.success("Post created!", { position: "bottom" });
        })
        .catch((error) => {
          console.error(error.message);
          this.$toast.info("First you need to login!", {
            position: "bottom",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
