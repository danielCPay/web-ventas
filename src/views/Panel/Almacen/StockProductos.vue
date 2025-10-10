<template>
  <!-- ROW-4 -->
  <div class="row">
    <div class="col-12 col-sm-12">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title mb-0">Stock de Productos</h3>
        </div>
        <div class="card-body pt-4">
          <div class="row m-0">
            <div class="col-md-12 row">
              <div class="col-md-4">
                <el-select
                  size="large"
                  style="width: 100%"
                  v-model="producto"
                  filterable
                  clearable
                  placeholder="Productos"
                >
                  <el-option
                    v-for="item in listaProductos"
                    :key="item.productoid"
                    :label="item.descripcionproducto"
                    :value="item.productoid"
                  ></el-option>
                </el-select>
              </div>
              <div class="col-md-4">
                <el-select
                  placeholder="Almacén"
                  v-model="almacenid"
                  size="large"
                  style="width: 100%"
                  clearable
                >
                  <el-option
                    v-for="item in almacenes"
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
                    @click="cargarRegistros()"
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
                  <div class="text-center">
                    <vue-loading
                      :fullPage="fullPage"
                      :isLoading="isLoading"
                      :spinner="spinner"
                    />
                  </div>
                  <div class="overflow-auto" style="height: 350px">
                    <div class="table-responsive">
                      <table
                        id="data-table"
                        class="table table-bordered text-nowrap mb-0"
                      >
                        <thead class="border-top">
                          <tr>
                            <th class="bg-transparent border-bottom-0">Id</th>
                            <th
                              class="bg-transparent border-bottom-0"
                              style="width: 5%"
                            >
                              Descripcion
                            </th>
                            <th class="bg-transparent border-bottom-0">
                              Entrada
                            </th>
                            <th class="bg-transparent border-bottom-0">
                              Salida
                            </th>
                            <th class="bg-transparent border-bottom-0">
                              Stock
                            </th>
                            <th class="bg-transparent border-bottom-0">
                              stockminimo
                            </th>
                            <th class="bg-transparent border-bottom-0">#</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            class="border-bottom"
                            v-for="(item, index) in listaRegistros"
                            :key="index"
                          >
                            <td>
                              <div class="d-flex">
                                <div class="ms-3 mt-0 mt-sm-2 d-block">
                                  <h6 class="mb-0 fs-14 fw-semibold">
                                    <span> {{ item.productoid }}</span>
                                  </h6>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div class="d-flex">
                                <div class="ms-3 mt-0 mt-sm-2 d-block">
                                  <h6 class="mb-0 fs-14 fw-semibold">
                                    <span> {{ item.descripcionproducto }}</span>
                                  </h6>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div class="d-flex">
                                <div class="ms-3 mt-0 mt-sm-2 d-block">
                                  <h6 class="mb-0 fs-14 fw-semibold">
                                    <p>
                                      {{ parseFloat(item.entrada).toFixed(2) }}
                                    </p>
                                  </h6>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span>{{
                                parseFloat(item.salida).toFixed(2)
                              }}</span>
                            </td>
                            <td>
                              <span>{{
                                parseFloat(item.stock).toFixed(2)
                              }}</span>
                            </td>
                            <td>
                              <span
                                :style="
                                  parseFloat(item.stock) <
                                  parseFloat(item.stockminimo)
                                    ? 'text-decoration-line: line-through;color:red'
                                    : ''
                                "
                                >{{ item.stockminimo }}</span
                              >
                            </td>
                            <td>
                              <i
                                title="Ver Movimientos"
                                class="fe fe-truck mx-1 text-yellow"
                                role="button"
                                @click="verMovimientosAlmacen(item, index)"
                              ></i>
                            </td>
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
      spinner: "spinner",
      isLoading: false,
      fullPage: false,
      totalPaginas: 0,
      listaRegistros: [],
      date: new Date(),
      currentDate: dayjs(this.date).format("YYYY-MM-DD"),
      fecha_inicio: dayjs(this.date).format("YYYY-MM-DD"),
      fecha_fin: dayjs(this.date).format("YYYY-MM-DD"),
      producto: "",
      almacenid: "",
      listaProductos: [],
      almacenes: [],
    };
  },
  methods: {
    ...mapActions({
      ListarProductos: "_producto/ListarRegistros",
      ListadoStock: "_movimientos/ListadoStock",
      AlmacenDesplegable: "_almacen/AlmacenDesplegable",
    }),
    verMovimientosAlmacen: function (item) {
      this.$router.push({
        path: "movimientosalmacen",
        query: {
          productoid: item.productoid,
          descripcionproducto: item.descripcionproducto,
          almacenid: item.almacenid,
        },
      });
    },
    comboAlmacen: async function () {
      let res = await this.AlmacenDesplegable();
      this.almacenes = res;
    },
    comboProductos: async function () {
      let buscador = {
        page_index: 1,
        page_size: 5000,
        idSubFamilia: "",
        descripcionProducto: "",
      };
      var res = await this.ListarProductos(buscador);
      this.listaProductos = res.datos;
    },
    cargarRegistros: async function () {
      this.isLoading = true;
      let buscar = {
        almacenid: this.almacenid,
        productoid: this.producto,
      };

      let res = await this.ListadoStock(buscar);

      this.listaRegistros = res;

      this.isLoading = false;
    },
  },
  computed: {},
  mounted() {
    this.comboProductos();
    this.comboAlmacen();
    this.cargarRegistros();
  },
};
</script>
