<template>
  <div class="post-card">
    <p class="author">
      <span
        ><b>{{ author.username }}</b></span
      >
      wrote
    </p>
    <p class="text">{{ text }}</p>
    <p class="time">{{ created }}</p>
  </div>
</template>

<script>
export default {
  props: {
    author: {
      type: Object,
      default: null,
      required: true,
    },
    created: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.post-card {
  background: #f4f5f6;
  width: 100%;

  border-radius: 8px;
  margin-top: 24px;
  padding: 12px;

  -webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.11);
  -moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.11);
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.11);

  p {
    color: black;
  }

  .text {
    font-size: 1.1rem;
  }

  .time {
    color: #aaa;
  }
}
</style>
