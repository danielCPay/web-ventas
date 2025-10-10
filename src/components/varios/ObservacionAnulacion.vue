<template>
  <div
    class="modal fade"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">
            Escribe una Observación
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i class="fa fa-close"></i>
          </button>
        </div>
        <div class="modal-body">
          <div>
            <div class="form-group">
              <label>Observación</label>
              <input
                type="text"
                class="form-control"
                placeholder="Observación"
                maxlength="45"
                v-model="observacion"
              />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="closeModal"
          >
            Cerrar
          </button>
          <button
            type="button"
            class="btn btn-success"
            @click="guardarObservacion"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      observacion: "",
    };
  },
  methods: {
    closeModal() {
      this.$emit("cerrarModal");
    },
    guardarObservacion() {
      this.$emit("guardarObservacion", this.observacion);
      this.observacion = "";
    },
  },
};
</script>

<style></style>
