<template>
  <notifications />
</template>
<script>
import { notify } from "@kyvg/vue3-notification";
export default {
  name: "NotificationsVue3",
  components: {
    notify,
  },
  props: {
    position: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>
