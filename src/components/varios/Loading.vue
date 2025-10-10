<template>
  <div :hidden="!mostrar">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <br />
  </div>
</template>

<script>
export default {
  name: "Loader",
  props: {
    mostrar: Boolean,
    texto: String,
  },
  data() {
    return {
      texto_: this.texto,
    };
  },
  methods: {},
  mounted() {
    if (this.texto == null || this.texto == "") this.texto_ = "Cargando...";
  },
};
</script>
