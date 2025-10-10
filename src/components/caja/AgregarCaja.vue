<template>
  <!-- Modal -->
  <div class="modal fade" id="staticBackdropMantenedorDecano" data-bs-backdrop="static" data-bs-keyboard="false"
    tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <!-- <h4>{{ indiceModificando }}</h4> -->
          <h5 class="modal-title" id="staticBackdropLabel">Caja</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" @click="closeModal()" aria-label="Close">
            <i class="fa fa-close"></i>
          </button>
        </div>
        <div class="modal-body">
          <div>
            <div class="form-group">
              <div class="row">
                <div class="col">
                  <label>Usuario</label>
                  <input type="text" class="form-control" v-model="caja.codusu" readonly />
                </div>
                <div class="col">
                  <label>N° CajaChica</label>
                  <input type="text" class="form-control" v-model="caja.nrcajachica" readonly />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label>Monto</label>
                  <input type="number" class="form-control" v-model="caja.monto" ref="monto" min="0" :style="showAdvertise && caja.monto == 0
                      ? 'border-color: #e23e3d;'
                      : ''
                    " />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="closeModal()">
            Cerrar
          </button>
          <button type="button" class="btn btn-success" @click="guardarCambios()">
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import global from "../../global.js";

export default {
  props: {
    indiceModificando: {
      type: Number,
      default: 0,
    },
    cajaSelect: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      showAdvertise: false,
      usuario: {},
      caja: {},
      cajaBase: {
        caja_chica_id: 0,
        codusu: "",
        nrcajachica: "",
        monto: 0,
        cajaid: 0,
      },
    };
  },
  methods: {
    ...mapActions({
      AgregarRegistro: "_cajachica/AgregarRegistro",
      ModificarRegistro: "_cajachica/ModificarRegistro",
      GenerarNumeroCaja: "_cajachica/GenerarNumeroCaja",
    }),
    generarnumerocaja: async function () {
      var res = await this.GenerarNumeroCaja();
      this.caja.nrcajachica = res.numerocajachica;
    },
    cargarAgregar: function () {
      this.generarnumerocaja();
      this.caja = { ...this.cajaBase };
      this.caja.codusu = this.usuario.usuario;
    },
    guardarCambios: async function () {
      var res = null;
      if (this.indiceModificando == -1) {
        let valor = this.validarFormulario();
        if (!valor) {
          res = await this.AgregarRegistro(this.caja);
        }
      } else {
        res = await this.ModificarRegistro(this.caja);
      }
      if (res?.exito) {
        this.closeModal();
        global._mensaje_exito("Los cambios se han guardado correctamente");
      }
    },
    validarFormulario() {
      let valida = false;

      if (this.caja.monto == 0) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.monto.focus();
        });
      }
      return valida;
    },
    closeModal() {
      this.cargarAgregar();
      this.$emit("cerrarModal");
    },
  },
  watch: {
    cajaSelect(item) {
      if (item != null) {
        this.caja.caja_chica_id = item.caja_chica_id;
        this.caja.codusu = item.codusu;
        this.caja.nrcajachica = item.nrcajachica;
        this.caja.monto = parseFloat(item.monto);
      } else {
        //this.caja = {};
      }
    },
  },
  computed: {
    ...mapState({
      //usuario: (state) => state._login.usuario,
    }),
  },
  mounted() {
    if (localStorage.getItem("login")) {
      this.usuario = JSON.parse(localStorage.getItem("login"));
    }
    this.cargarAgregar();
  },
};
</script>

<style></style>
