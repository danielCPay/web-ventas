<template>
  <!-- ROW-4 -->
  <div class="row">
    <div class="col-12 col-sm-12">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title mb-0">Todas las ventas</h3>
        </div>
        <div class="card-body pt-4">
          <div class="row m-0">
            <div class="col-md-12 row">
              <div class="col-md-2">
                <div class="form-group">
                  <input
                    type="date"
                    class="form-control"
                    v-model="fecha_inicio"
                  />
                </div>
              </div>
              <div class="col-md-2">
                <div class="form-group">
                  <input type="date" class="form-control" v-model="fecha_fin" />
                </div>
              </div>
              <div class="col-md-3">
                <el-select
                  placeholder="Estado"
                  v-model="estado"
                  size="large"
                  style="width: 100%"
                  clearable
                >
                  <el-option
                    v-for="item in estadocomprobante"
                    :key="item.id"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <div class="col-md-3">
                <el-select
                  placeholder="Tipo Comprobante"
                  v-model="tipocomprobante"
                  size="large"
                  style="width: 100%"
                  clearable
                >
                  <el-option
                    v-for="item in tipocomprobantes"
                    :key="item.id"
                    :label="item.nombre"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </div>
              <div class="col-md-2">
                <div class="form-group">
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="buscarVentas()"
                  >
                    Buscar
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="grid-margin">
            <div class="">
              <div class="panel panel-primary">
                <div class="panel-body tabs-menu-body border-0 pt-0">
                  <ventas-clientes :ventasFiltros="ventasFiltros" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- ROW-4 END -->
</template>
<script>
import { mapActions } from "vuex";
import VueLoading from "../../../components/varios/VueLoading.vue";
import VentasClientes from "../../../components/ventas/VentasClientes.vue";
//import global from "../../../global";
//Librayr
import dayjs from "dayjs";
export default {
  components: { VueLoading, VentasClientes },
  data() {
    return {
      tipocomprobantes: [],
      estadocomprobante: [
        { label: "EMITIDO", value: "EMITIDO" },
        { label: "CANCELADO", value: "CANCELADO" },
        { label: "ANULADO", value: "ANULADO" },
      ],
      date: new Date(),
      currentDate: dayjs(this.date).format("YYYY-MM-DD"),
      fecha_inicio: dayjs(this.date).format("YYYY-MM-DD"),
      fecha_fin: dayjs(this.date).format("YYYY-MM-DD"),
      estado: "",
      tipocomprobante: "",
      ventasFiltros: {
        fecha_inicio: dayjs(this.date).format("YYYY-MM-DD"),
        fecha_fin: dayjs(this.date).format("YYYY-MM-DD"),
        estado: "",
        tipodocumentoid: "",
        personalid: "",
      },
    };
  },
  methods: {
    ...mapActions({
      ListarTipoComprobante: "_tipocomprobante/Listar",
    }),
    comboTipoComprobante: async function () {
      let comprobante = {
        proceso: "V",
      };
      let res = await this.ListarTipoComprobante(comprobante);
      this.tipocomprobantes = res;
    },
    buscarVentas() {
      this.ventasFiltros = null;
      let ventasFiltros = {
        fecha_inicio: this.fecha_inicio,
        fecha_fin: this.fecha_fin,
        tipodocumentoid: this.tipocomprobante,
        estado: this.estado,
        personalid: "",
      };
      this.ventasFiltros = ventasFiltros;
    },
  },
  computed: {},
  mounted() {
    this.comboTipoComprobante();
  },
};
</script>
