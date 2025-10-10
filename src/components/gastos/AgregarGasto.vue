<template>
  <!-- Modal -->
  <div class="modal fade" id="staticBackdropMantenedorDecano" data-bs-backdrop="static" data-bs-keyboard="false"
    tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <!-- <h4>{{ indiceModificando }}</h4> -->
          <h5 class="modal-title" id="staticBackdropLabel">Gastos</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" @click="closeModal()" aria-label="Close">
            <i class="fa fa-close"></i>
          </button>
        </div>
        <div class="modal-body">
          <div>
            <div class="form-group">
              <div class="row">
                <div class="col">
                  <label>Fecha</label>
                  <input type="datetime-local" class="form-control" v-model="gastos.fecha" ref="fecha" :style="showAdvertise && gastos.fecha == ''
                      ? 'border-color: #e23e3d;'
                      : ''
                    " />
                </div>
                <div class="col">
                  <label>Concepto</label>
                  <select class="form-control form-select" v-model="gastos.concepto" data-bs-placeholder="Concepto"
                    ref="concepto" :style="showAdvertise && gastos.concepto == ''
                        ? 'border-color: #e23e3d;'
                        : ''
                      ">
                    <option value="">SELECCIONE</option>
                    <option value="SERVICIOS">SERVICIOS</option>
                    <option value="PAGOS">PAGOS</option>
                    <option value="COMPRAS">COMPRAS</option>
                    <option value="OTROS">OTROS</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label>Descripción</label>
              <input type="text" class="form-control" v-model="gastos.descripcion" ref="descripcion" :style="showAdvertise && gastos.descripcion == ''
                  ? 'border-color: #e23e3d;'
                  : ''
                " />
            </div>
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label>Moneda</label>
                  <select class="form-control form-select" data-bs-placeholder="Moneda" v-model="gastos.moneda"
                    ref="moneda" :style="showAdvertise && gastos.moneda == null
                        ? 'border-color: #e23e3d;'
                        : ''
                      ">
                    <option v-for="item in monedas" :key="item.id" :label="item.nombre" :value="item.nombre"></option>
                  </select>
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label>Monto</label>
                  <input type="number" class="form-control" v-model="gastos.monto" ref="monto" min="0" :style="showAdvertise && gastos.monto == 0
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
          <button type="button" class="btn btn-success" :disabled="disabledButton" @click="guardarCambios()">
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
    gastosSelect: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      disabledButton: false,
      monedas: [],
      showAdvertise: false,
      usuario: {},
      gastos: {},
      gastosBase: {
        gastosid: 0,
        fecha: "",
        concepto: "",
        monto: 0,
        moneda: null,
        descripcion: "",
        nroliquidacion: "",
        nrcaja: 0,
        user: "",
      },
    };
  },
  methods: {
    ...mapActions({
      ListarMoneda: "_moneda/Listar",
      AgregarRegistro: "_gastos/AgregarRegistro",
      ModificarRegistro: "_gastos/ModificarRegistro",
      VerificarNumeroCaja: "_cajachica/VerificarNumeroCaja",
    }),
    ComboMoneda: async function () {
      let res = await this.ListarMoneda();
      this.monedas = res;
    },
    cargarAgregar: function () {
      this.gastos = { ...this.gastosBase };
    },
    guardarCambios: async function () {
      var res = null;
      if (this.indiceModificando == -1) {
        let valor = this.validarFormulario();
        if (!valor) {
          res = await this.AgregarRegistro(this.gastos);
        }
      } else {
        res = await this.ModificarRegistro(this.gastos);
      }
      if (res?.exito) {
        this.closeModal();
        global._mensaje_exito("Los cambios se han guardado correctamente");
      }
    },
    validarFormulario() {
      let valida = false;

      if (this.gastos.fecha == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.fecha.focus();
        });
      } else if (this.gastos.concepto == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.concepto.focus();
        });
      } else if (this.gastos.descripcion == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.descripcion.focus();
        });
      } else if (this.gastos.monto == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.monto.focus();
        });
      } else if (this.gastos.moneda == null) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.moneda.focus();
        });
      }

      return valida;
    },
    closeModal() {
      this.cargarAgregar();
      this.$emit("cerrarModal");
    },
    verificarNumeroCaja: async function () {
      let parametros = {
        codusu: this.usuario.usuario,
      };
      let res = await this.VerificarNumeroCaja(parametros);

      if (res != null) {
        this.gastos.nroliquidacion = res.nrcajachica;
        this.disabledButton = false;
      } else {
        this.disabledButton = true;
        global._mensaje_advertencia(
          "Por favor debe aperturar una caja, gracias."
        );
      }
    },
  },
  computed: {
    ...mapState({
      //usuario: (state) => state._login.usuario,
    }),
  },
  watch: {
    gastosSelect(item) {
      if (item != null) {
        this.gastos.gastosid = item.gastosid;
        this.gastos.fecha = item.fechaeditar;
        this.gastos.concepto = item.concepto;
        this.gastos.descripcion = item.descripcion;
        this.gastos.moneda = item.moneda;
        this.gastos.monto = parseFloat(item.monto);
      } else {
        //this.gastos = {};
      }
    },
  },
  mounted() {
    if (localStorage.getItem("login")) {
      this.usuario = JSON.parse(localStorage.getItem("login"));
    }
    this.cargarAgregar();
    this.ComboMoneda();
    this.verificarNumeroCaja();
  },
};
</script>

<style></style>
