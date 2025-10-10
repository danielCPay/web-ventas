<template>
  <div class="parent">
    <vue-element-loading
      :active="isLoading"
      :spinner="spinner"
      color="#FF6700"
      :is-full-screen="fullPage"
      :text="text == '' ? 'Espere por favor...' : text"
    />
    <!-- <span> This is my content. </span> -->
  </div>
</template>

<script>
import VueElementLoading from "vue-element-loading";
// import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "VueLoading",
  props: {
    spinner: {
      type: String,
      default: "bar-fade-scale",
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    fullPage: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: "",
    },
  },
  components: {
    VueElementLoading,
  },
  data() {
    return {
      show: true,
      //isLoading: true,
    };
  },
};
</script>

<style></style>
