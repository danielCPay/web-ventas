<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">
        Datos de Facturación
        <span style="color: red">Mesa: Nº {{ mesaid }}</span>
      </h3>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-sm-6 col-md-6">
          <div class="form-group">
            <label class="form-label"
              >Tipo Documento <span class="text-red">*</span></label
            >
            <select
              class="form-control form-select select2"
              data-bs-placeholder="Select"
              v-model="tipodocumento"
            >
              <option value="null">Tipo Documento</option>
              <option value="1">DNI</option>
              <option value="2">RUC</option>
            </select>
          </div>
        </div>
        <div class="col-sm-6 col-md-6">
          <div class="form-group">
            <label class="form-label"
              >Nº de Documento <span class="text-red">*</span></label
            >
            <input
              type="text"
              class="form-control"
              placeholder="Nº de Documento"
              v-model="nrodocumento"
              @keypress.enter="verificarClienteNroDocumento"
            />
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group">
            <label class="form-label"
              >Razón Social / Nombres <span class="text-red">*</span></label
            >
            <input
              type="text"
              class="form-control"
              placeholder="Razón Social / Nombres"
              v-model="razonsocial"
              readonly
            />
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group">
            <label class="form-label"
              >Dirección <span class="text-red">*</span></label
            >
            <input
              type="email"
              class="form-control"
              placeholder="Dirección"
              v-model="direccion"
              readonly
            />
          </div>
        </div>
        <!-- <div class="col-md-12">
              <div class="form-group">
                <label class="form-label"
                  >Country <span class="text-red">*</span></label
                >
                <select
                  class="form-control form-select select2"
                  data-bs-placeholder="Select"
                >
                  <option value="1">Germany</option>
                  <option value="2">Canada</option>
                  <option value="3">USA</option>
                  <option value="4">AUS</option>
                </select>
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-group">
                <label class="form-label"
                  >Address <span class="text-red">*</span></label
                >
                <input
                  type="text"
                  class="form-control"
                  placeholder="Home Address"
                />
              </div>
            </div>
            <div class="col-sm-6 col-md-6">
              <div class="form-group">
                <label class="form-label"
                  >City <span class="text-red">*</span></label
                >
                <input type="text" class="form-control" placeholder="City" />
              </div>
            </div>
            <div class="col-sm-6 col-md-6">
              <div class="form-group">
                <label class="form-label"
                  >Postal Code <span class="text-red">*</span></label
                >
                <input
                  type="number"
                  class="form-control"
                  placeholder="ZIP Code"
                />
              </div>
            </div> -->
      </div>
    </div>
    <div class="card-footer">
      <button type="button" class="btn btn-primary">
        Agregar Nuevo Cliente
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import global from "../../global.js";
export default {
  name: "BuscarCliente",
  data() {
    return {
      clienteid: 0,
      direccion: "",
      razonsocial: "",
      tipodocumento: null,
      nrodocumento: "",
    };
  },
  methods: {
    ...mapActions({
      ObtenerClienteGetNroDocumento: "_cliente/ObtenerClienteGetNroDocumento",
    }),
    verificarClienteNroDocumento: async function () {
      if (this.nrodocumento.length > 0) {
        let persona = {
          nrdocumento: this.nrodocumento,
        };
        let res = await this.ObtenerClienteGetNroDocumento(persona);

        if (res != null) {
          this.clienteid = res.clienteid;
          this.razonsocial = res.razonsocial;
          this.direccion = res.direccion;

          this.$emit("cargarClienteId", this.clienteid);
        } else {
          global._mensaje_advertencia("No se encuentra registrado el cliente.");
        }
      }
    },
  },
  computed: {
    ...mapState({
      mesaid: (state) => state._mesa.mesaid,
      //pedidoid: (state) => state._pedido.pedidoid,
    }),
  },
};
</script>

<style></style>
