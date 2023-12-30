<template>
  <div class="pagination">
    <span
      class="pagination-item"
      :class="{ 'pagination-item-active': i == modelValue }"
      @click="changePage(i)"
      v-for="i in pages"
      :key="`page-${i}`"
      >{{ i }}</span
    >
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
    pages: {
      type: Number,
      required: true,
    },
  },
  methods: {
    changePage(page) {
      this.$emit("update:modelValue", page);
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  text-align: center;
  margin-top: 20px;
}

.pagination-item {
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;

  margin-left: 5px;
  margin-right: 5px;

  font-size: 1.5rem;
  cursor: pointer;
  border-radius: 4px;
}

.pagination-item-active {
  background-color: #ff2e34;
  color: white;
}
</style>
