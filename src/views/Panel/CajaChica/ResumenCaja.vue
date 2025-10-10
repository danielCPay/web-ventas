<template>
  <div class="row row-cards" style="background-color: #eaedf7">
    <!-- ROW OPEN -->
    <div class="row">
      <div class="col-md-6 col-xl-3">
        <div class="card">
          <div class="card-header border-bottom">
            <h5 class="card-title">Ingresos Egresos</h5>
          </div>
          <div class="overflow-auto" style="height: 430px">
            <div class="card-body">
              <div
                class="clearfix row mb-4"
                v-for="(item, index) in resumeningreso"
                :key="index"
              >
                <div class="col">
                  <div class="float-start">
                    <h5 class="mb-0"><strong>INGRESO</strong></h5>
                    <small class="text-muted">{{ item.observacion }}</small>
                  </div>
                </div>
                <div class="col">
                  <div class="float-end">
                    <h4 class="fw-bold mb-0 mt-2 text-blue">
                      {{ parseFloat(item.monto).toFixed(2) }}
                    </h4>
                  </div>
                </div>
              </div>
              <div
                class="clearfix row mb-4"
                v-for="(item, index) in resumengastos"
                :key="index"
              >
                <div class="col">
                  <div class="float-start">
                    <h5 class="mb-0">
                      <strong>{{ item.concepto }}</strong>
                    </h5>
                    <small class="text-muted"
                      ><span
                        :style="
                          item.estadoid == 2
                            ? 'text-decoration-line: line-through;color:red'
                            : ''
                        "
                      >
                        {{ item.descripcion }}</span
                      ></small
                    >
                  </div>
                </div>
                <div class="col">
                  <div class="float-end">
                    <h4 class="fw-bold mt-2 mb-0 text-danger">
                      <span
                        :style="
                          item.estadoid == 2
                            ? 'text-decoration-line: line-through;color:red'
                            : ''
                        "
                      >
                        {{ parseFloat(item.SOLES).toFixed(2) }}</span
                      >
                    </h4>
                  </div>
                </div>
              </div>
              <!-- <div class="clearfix row mb-4">
              <div class="col">
                <div class="float-start">
                  <h5 class="mb-0"><strong>Total Income</strong></h5>
                  <small class="text-muted">weekly profit</small>
                </div>
              </div>
              <div class="col">
                <div class="float-end">
                  <h4 class="fw-bold mt-2 mb-0 text-warning">70%</h4>
                </div>
              </div>
            </div>
            <div class="clearfix row mb-4">
              <div class="col">
                <div class="float-start">
                  <h5 class="mb-0"><strong>Total Income</strong></h5>
                  <small class="text-muted">weekly profit</small>
                </div>
              </div>
              <div class="col">
                <div class="float-end">
                  <h4 class="fw-bold mt-2 mb-0 text-danger">50%</h4>
                </div>
              </div>
            </div>
            <div class="clearfix row mb-4">
              <div class="col">
                <div class="float-start">
                  <h5 class="mb-0"><strong>Total Loss</strong></h5>
                  <small class="text-muted">weekly profit</small>
                </div>
              </div>
              <div class="col">
                <div class="float-end">
                  <h4 class="fw-bold mt-2 mb-0 text-info">30%</h4>
                </div>
              </div>
            </div>
            <div class="clearfix row mb-0">
              <div class="col">
                <div class="float-start">
                  <h5 class="mb-0"><strong>Total Loss</strong></h5>
                  <small class="text-muted">weekly profit</small>
                </div>
              </div>
              <div class="col">
                <div class="float-end">
                  <h4 class="fw-bold mt-2 mb-0 text-info">30%</h4>
                </div>
              </div>
            </div> -->
            </div>
          </div>
        </div>
      </div>
      <!-- COL END -->
      <div class="col-xl-9 col-md-6">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">Ventas</h5>
          </div>
          <div class="card-body">
            <vue-loading
              :fullPage="false"
              :isLoading="isLoadingVentas"
              :spinner="spinner"
            />
            <div class="overflow-auto" style="height: 250px">
              <div class="table-responsive mt-2 text-center">
                <table class="table text-nowrap border-dashed mb-0">
                  <thead>
                    <tr>
                      <th class="text-start">Fecha</th>
                      <th class="">FormaPago</th>
                      <th class="">Tipo</th>
                      <th class="">NumDoc</th>                  
                      <th class="">S/.</th>
                      <th class="">$/.</th>                  
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in resumenventas" :key="index">
                      <td class="p-4">
                        <span
                          :style="
                            item.estado == 'ANULADO'
                              ? 'text-decoration-line: line-through;color:red'
                              : ''
                          "
                        >
                          {{ item.fecha }}</span
                        >
                      </td>
                      <td class="p-4">
                        <span
                          :style="
                            item.estado == 'ANULADO'
                              ? 'text-decoration-line: line-through;color:red'
                              : ''
                          "
                        >
                          {{ item.descripcionformapago }}</span
                        >
                      </td>
                      <td class="p-4">
                        <span
                          :style="
                            item.estado == 'ANULADO'
                              ? 'text-decoration-line: line-through;color:red'
                              : ''
                          "
                        >
                          {{ item.descripciontipocomprobante }}</span
                        >
                      </td>
                      <td class="p-4">
                        <span
                          :style="
                            item.estado == 'ANULADO'
                              ? 'text-decoration-line: line-through;color:red'
                              : ''
                          "
                        >
                          {{ item.numdoc }}</span
                        >
                      </td>                      
                      <td class="p-4">
                        <span
                          :style="
                            item.estado == 'ANULADO'
                              ? 'text-decoration-line: line-through;color:red'
                              : ''
                          "
                        >
                          {{ parseFloat(item.SOLES).toFixed(2) }}</span
                        >
                      </td>
                      <td class="p-4">
                        <span
                          :style="
                            item.estado == 'ANULADO'
                              ? 'text-decoration-line: line-through;color:red'
                              : ''
                          "
                        >
                          {{ parseFloat(item.DOLARES).toFixed(2) }}</span
                        >
                      </td>
                      <td class="p-4">
                        <span
                          :style="
                            item.estado == 'ANULADO'
                              ? 'text-decoration-line: line-through;color:red'
                              : ''
                          "
                        >
                          {{ item.descripcionmesa }}</span
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!--end /table-->
              </div>
            </div>
            <div class="row mt-4">
              <div class="col text-center">
                <span class="text-muted">VENTAS S/.</span>
                <h4 class="fw-normal mt-2 mb-0 number-font1">
                  {{ totalventassoles }}
                </h4>
              </div>
              <div class="col text-center">
                <span class="text-muted">VENTAS $/.</span>
                <h4 class="fw-normal mt-2 mb-0 number-font2">
                  {{ totalventasdolares }}
                </h4>
              </div>
              <div class="col text-center">
                <span class="text-muted">EGRESOS</span>
                <h4 class="fw-normal mt-2 mb-0 number-font3">
                  {{ totalegresos }}
                </h4>
              </div>
              <div class="col text-center">
                <span class="text-muted">EFECTIVO S/.</span>
                <h4 class="fw-normal mt-2 mb-0 number-font3">
                  {{ totalefectivosoles }}
                </h4>
              </div>
              <div class="col text-center">
                <span class="text-muted">EFECTIVO $/.</span>
                <h4 class="fw-normal mt-2 mb-0 number-font3">
                  {{ totalefectivodolares }}
                </h4>
              </div>
              <div class="col text-center">
                <span class="text-muted">INGRESOS</span>
                <h4 class="fw-normal mt-2 mb-0 number-font3">
                  {{ totalingresos }}
                </h4>
              </div>
            </div>
            <div class="row mt-4">
              <div class="col text-center">
                <span class="text-muted">TOTAL CAJA S/.</span>
                <h4 class="fw-normal mt-2 mb-0 number-font1">
                  {{ totalcajasoles }}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ROW CLOSED -->

    <!-- ROW OPEN -->
    <div class="row">
      <div class="col-md-6 col-xl-3">
        <div class="card">
          <div class="card-header border-bottom">
            <h5 class="card-title">Tarjetas</h5>
          </div>
          <div class="overflow-auto" style="height: 300px">
            <div class="card-body">
              <div
                class="clearfix row mb-4"
                v-for="(item, index) in resumentarjetas"
                :key="index"
              >
                <div class="col">
                  <div class="float-start">
                    <h5 class="mb-0">
                      <strong
                        >S/.{{ parseFloat(item.SOLES).toFixed(2) }}</strong
                      >
                    </h5>
                    <small class="text-muted">{{ item.tarjeta }}</small>
                  </div>
                </div>
                <div class="col">
                  <div class="float-end">
                    <h4 class="fw-bold mb-0 mt-2 text-blue">
                      ${{ parseFloat(item.DOLARES).toFixed(2) }}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-xl-9">
        <div class="card">
          <div class="card-header border-bottom">
            <h5 class="card-title">Productos</h5>
          </div>
          <div class="card-body">
            <vue-loading
              :fullPage="false"
              :isLoading="isLoadingProductos"
              :spinner="spinner"
            />
            <div class="overflow-auto" style="height: 250px">
              <div class="table-responsive mt-2 text-center">
                <table class="table text-nowrap border-dashed mb-0">
                  <thead>
                    <tr>
                      <th class="text-start">Presentacion</th>
                      <th class="">DescripcionProducto</th>
                      <th class="">Cantidad</th>
                      <th class="">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in resumenproductos" :key="index">
                      <td class="p-4">{{ item.presentacion }}</td>
                      <td class="p-4">{{ item.descripcionproducto }}</td>
                      <td class="p-4">
                        {{ parseFloat(item.cantidad).toFixed(2) }}
                      </td>
                      <td class="p-4">
                        {{ parseFloat(item.total).toFixed(2) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!--end /table-->
              </div>
            </div>
            <div class="col p-1 mt-2">
              <div class="float-start">
                <h3 class="ms-5">
                  <i class="fa fa-caret-up fa-1x text-primary me-1"></i>
                  {{ parseFloat(totalcantidadproductos).toFixed(2) }}
                </h3>
                <h6 class="ms-5 pb-0 mb-0">Cantidad</h6>
              </div>
              <div class="float-end">
                <h3 class="me-5">
                  <i class="fa fa-caret-up fa-1x text-primary me-1"></i
                  >{{ parseFloat(totalimporteproductos).toFixed(2) }}
                </h3>
                <h6 class="me-5 mt-0 mb-0">Total</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- COL END -->
    </div>
    <!-- ROW CLOSED -->
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import VueLoading from "../../../components/varios/VueLoading.vue";
import global from "../../../global";
export default {
  components: { VueLoading },
  data() {
    return {
      usuario: {},
      isLoadingVentas: false,
      isLoadingProductos: false,
      spinner: "spinner",
      fullPage: true,
      resumengastos: [],
      resumeningreso: [],
      resumenventas: [],
      resumentarjetas: [],
      resumenproductos: [],
      nroliquidacion: "",
      codusu: "",
    };
  },
  methods: {
    ...mapActions({
      ResumenCajaGastos: "_cajachica/ResumenCajaGastos",
      ResumenCajaIngreso: "_cajachica/ResumenCajaIngreso",
      ResumenCajaVentas: "_cajachica/ResumenCajaVentas",
      ResumenCajaTarjetas: "_cajachica/ResumenCajaTarjetas",
      ResumenCajaProductos: "_cajachica/ResumenCajaProductos",
      VerificarNumeroCaja: "_cajachica/VerificarNumeroCaja",
    }),
    CargarResumenGastos: async function () {
      //this.isLoading = true;
      let parametros = {
        nroliquidacion: this.nroliquidacion,
      };
      let res = await this.ResumenCajaGastos(parametros);
      this.resumengastos = res;
    },
    CargarResumenIngreso: async function () {
      let parametros = {
        codusu: this.usuario.usuario,
      };
      let res = await this.ResumenCajaIngreso(parametros);
      this.resumeningreso = res;
    },
    CargarResumenVentas: async function () {
      this.isLoadingVentas = true;
      let parametros = {
        nroliquidacion: this.nroliquidacion,
      };
      let res = await this.ResumenCajaVentas(parametros);
      this.resumenventas = res;

      this.isLoadingVentas = false;
    },
    CargarResumenTarjetas: async function () {
      let parametros = {
        nroliquidacion: this.nroliquidacion,
      };
      let res = await this.ResumenCajaTarjetas(parametros);
      this.resumentarjetas = res;
    },
    CargarResumenProductos: async function () {
      this.isLoadingProductos = true;
      let parametros = {
        nroliquidacion: this.nroliquidacion,
      };
      let res = await this.ResumenCajaProductos(parametros);
      this.resumenproductos = res;
      this.isLoadingProductos = false;
    },
    verificarNumeroCaja: async function () {
      let parametros = {
        codusu: this.usuario.usuario,
      };
      let res = await this.VerificarNumeroCaja(parametros);

      if (res != null) {
        this.nroliquidacion = res.nrcajachica;
        await this.loadResumen();
      } else {
        global._mensaje_advertencia(
          "Por favor debe aperturar una caja, gracias."
        );
      }
    },
    loadResumen: async function () {
      this.CargarResumenGastos();
      this.CargarResumenIngreso();
      this.CargarResumenTarjetas();
      this.CargarResumenVentas();
      this.CargarResumenProductos();
    },
  },
  computed: {
    ...mapState({
      //usuario: (state) => state._login.usuario,
    }),
    totalcajasoles: function () {
      let totalcaja = 0;
      let totalefectivosoles = this.totalefectivosoles;
      let totalegresos = this.totalegresos;
      let totalingresos = this.totalingresos;

      totalcaja = totalingresos + totalefectivosoles - totalegresos;

      return totalcaja;
    },
    totalventassoles: function () {
      let sum = 0;
      this.resumenventas.forEach((item) =>
        item.estado != "ANULADO" ? (sum += parseFloat(item.SOLES)) : 0
      );
      return sum;
    },
    totalventasdolares: function () {
      let sum = 0;
      this.resumenventas.forEach((item) =>
        item.estado != "ANULADO" ? (sum += parseFloat(item.DOLARES)) : 0
      );
      return sum;
    },
    totalefectivosoles: function () {
      let sum = 0;
      this.resumenventas.forEach((item) =>
        item.descripcionformapago == "EFECTIVO" &&
        item.moneda == "1" &&
        item.estado != "ANULADO"
          ? (sum += parseFloat(item.SOLES))
          : 0
      );
      return sum;
    },
    totalefectivodolares: function () {
      let sum = 0;
      this.resumenventas.forEach((item) =>
        item.descripcionformapago == "EFECTIVO" &&
        item.moneda == "2" &&
        item.estado != "ANULADO"
          ? (sum += parseFloat(item.DOLARES))
          : 0
      );
      return sum;
    },
    totalegresos: function () {
      let sum = 0;
      this.resumengastos.forEach((item) =>
        item.estadoid != 2 ? (sum += parseFloat(item.SOLES)) : 0
      );
      return sum;
    },
    totalingresos: function () {
      let sum = 0;
      this.resumeningreso.forEach((item) => (sum += parseFloat(item.monto)));
      return sum;
    },
    totalimporteproductos: function () {
      let sum = 0;
      this.resumenproductos.forEach((item) => (sum += parseFloat(item.total)));
      return sum;
    },
    totalcantidadproductos: function () {
      let sum = 0;
      this.resumenproductos.forEach(
        (item) => (sum += parseFloat(item.cantidad))
      );
      return sum;
    },
  },
  mounted() {
    if (localStorage.getItem("login")) {
      this.usuario = JSON.parse(localStorage.getItem("login"));
    }
    this.verificarNumeroCaja();
  },
};
</script>
