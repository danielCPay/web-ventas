<template>
  <div class="card-header">
    <h3 class="card-title">
      PRODUCTO
      <span style="color: blue">{{ descripcionproducto }}</span>
    </h3>
    <div class="card-options">
      <a
        href="javascript:void(0)"
        class="btn btn-secondary btn-sm ms-2"
        @click="retornarStockProductos()"
        ><i class="fe fe-corner-up-left me-2"></i>Stock de Productos</a
      >
    </div>
  </div>
  <div class="card-body pb-2">
    <div class="row">
      <div class="col-md-12 row">
        <div class="mt-0">
          <div class="form-label mt-0 p-0">MOVIMIENTOS DEL PRODUCTO</div>
          <div class="row">
            <div class="col-md-3 mb-3">
              <div class="form-group">
                <input
                  type="date"
                  class="form-control"
                  v-model="fecha_inicio"
                />
              </div>
            </div>
            <div class="col-md-3 mb-3">
              <div class="form-group">
                <input type="date" class="form-control" v-model="fecha_fin" />
              </div>
            </div>
            <div class="col-md-2 mb-3" style="text-align: right">
              <button
                type="button"
                class="btn btn-primary"
                @click="cargarMovimientosAlmacen()"
              >
                <i class="fe fe-search me-2"></i>Buscar
              </button>
            </div>
          </div>
          <div class="row">
            <vue-loading
              :fullPage="fullPage"
              :isLoading="isLoading"
              :spinner="spinner"
              :text="textLoading"
            />
            <div class="col-md-12">
              <div class="table-responsive">
                <table class="table table-bordered table-vcenter">
                  <thead>
                    <tr class="border-top">
                      <th>fechamovimiento</th>
                      <th>nrodocumento</th>
                      <th>tipodocumento</th>
                      <th>razon</th>
                      <th>CANT_ENTRADA</th>
                      <th>CANT_SALIDA</th>
                      <th>SALDO</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in listaMovimientos"
                      :key="'item-' + index"
                      v-if="listaMovimientos.length != 0"
                    >
                      <td>{{ item.fechamovimiento }}</td>
                      <td>{{ item.nrodocumento }}</td>
                      <td>{{ item.tipodocumento }}</td>
                      <td>{{ item.razon }}</td>
                      <td>
                        {{ parseFloat(item.CANTIDAD_ENTRADA).toFixed(2) }}
                      </td>
                      <td>{{ parseFloat(item.CANTIDAD_SALIDA).toFixed(2) }}</td>
                      <td>{{ parseFloat(item.SALDO_TOTAL).toFixed(2) }}</td>
                    </tr>
                    <tr v-else>
                      <td colspan="8" class="text-center">Detalle Vacío</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import VueLoading from "../../../components/varios/VueLoading.vue";

//Librayr
import dayjs from "dayjs";
export default {
  components: {
    VueLoading,
  },
  data() {
    return {
      textLoading: "",
      date: new Date(),
      fecha_inicio: dayjs(this.date).format("YYYY-MM-DD"),
      fecha_fin: dayjs(this.date).format("YYYY-MM-DD"),
      usuario: {},
      spinner: "spinner",
      fullPage: false,
      isLoading: false,
      listaMovimientos: [],
      productoid: 0,
      almacenid: 0,
      descripcionproducto: "",
    };
  },
  methods: {
    ...mapActions({
      MovimientosAlmacenProductos: "_movimientos/MovimientosAlmacenProductos",
    }),
    retornarStockProductos() {
      this.$router.push({
        name: "stockproductos",
      });
    },
    cargarProducto: async function () {
      this.descripcionproducto = this.$route.query.descripcionproducto;
      this.productoid = this.$route.query.productoid;
      this.almacenid = this.$route.query.almacenid;

      this.cargarMovimientosAlmacen();
    },
    cargarMovimientosAlmacen: async function () {
      let producto = {
        almacenid: this.almacenid,
        productoid: this.productoid,
        fecha_inicio: this.fecha_inicio,
        fecha_fin: this.fecha_fin,
      };

      this.isLoading = true;

      let movimientos = await this.MovimientosAlmacenProductos(producto);

      this.listaMovimientos = movimientos.map((el) => ({
        ...el,
        fechamovimiento: dayjs(el.fechamovimiento).format("YYYY-MM-DD, H:mm"),
      }));
      this.isLoading = false;
    },
  },
  mounted() {
    if (localStorage.getItem("login")) {
      this.usuario = JSON.parse(localStorage.getItem("login"));
    }

    this.cargarProducto();
  },
};
</script>

<style></style>
