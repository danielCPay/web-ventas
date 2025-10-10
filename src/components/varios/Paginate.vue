<template>
  <paginate
    :page-range="3"
    :margin-pages="2"
    :prev-text="'Prev'"
    :next-text="'Next'"
    :container-class="'pagination'"
    :page-class="'page-item'"
  >
  </paginate>
</template>

<script>
import Paginate from "vuejs-paginate-next";
export default {
  components: {
    paginate: Paginate,
  },
  // props: {
  //   initialPage: {
  //     type: Number,
  //     default: 1,
  //   },
  // },
};
</script>
