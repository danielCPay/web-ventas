<template>
  <!-- ROW-4 -->
  <div class="row">
    <div class="col-12 col-sm-12">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title mb-0">Todos los Pedidos</h3>
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
                    v-for="item in estadopedido"
                    :key="item.id"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <div class="col-md-3">
                <el-select
                  placeholder="Personal"
                  v-model="personal"
                  size="large"
                  style="width: 100%"
                  clearable
                >
                  <el-option
                    v-for="item in cboPersonal"
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
                  <div class="table-responsive">
                    <table
                      id="data-table"
                      class="table table-bordered text-nowrap mb-0"
                    >
                      <thead class="border-top">
                        <tr>
                          <th class="bg-transparent border-bottom-0">
                            # Pedido
                          </th>
                          <th
                            class="bg-transparent border-bottom-0"
                            style="width: 5%"
                          >
                            Fecha
                          </th>
                          <th class="bg-transparent border-bottom-0">Mesa</th>
                          <th class="bg-transparent border-bottom-0">
                            descripcion producto
                          </th>
                          <th class="bg-transparent border-bottom-0">
                            cantidad
                          </th>
                          <th class="bg-transparent border-bottom-0">precio</th>
                          <th class="bg-transparent border-bottom-0">
                            mensaje cocina
                          </th>
                          <th
                            class="bg-transparent border-bottom-0"
                            style="width: 10%"
                          >
                            Estado
                          </th>
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
                                  <span
                                    :style="
                                      item.estado == 'Anulado'
                                        ? 'text-decoration-line: line-through;color:red'
                                        : ''
                                    "
                                  >
                                    {{ item.pedidoid }}</span
                                  >
                                </h6>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div class="d-flex">
                              <div class="ms-3 mt-0 mt-sm-2 d-block">
                                <h6 class="mb-0 fs-14 fw-semibold">
                                  <span
                                    :style="
                                      item.estado == 'Anulado'
                                        ? 'text-decoration-line: line-through;color:red'
                                        : ''
                                    "
                                  >
                                    {{ item.datecr }}</span
                                  >
                                </h6>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div class="d-flex">
                              <div class="ms-3 mt-0 mt-sm-2 d-block">
                                <h6 class="mb-0 fs-14 fw-semibold">
                                  <p
                                    class="overflow-ellipsis"
                                    :style="
                                      item.estado == 'Anulado'
                                        ? 'text-decoration-line: line-through;color:red'
                                        : ''
                                    "
                                  >
                                    {{ item.mesaid }}
                                  </p>
                                </h6>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span
                              class="mt-sm-2 d-block"
                              :style="
                                item.estado == 'Anulado'
                                  ? 'text-decoration-line: line-through;color:red'
                                  : ''
                              "
                              >{{ item.descripcionproducto }}</span
                            >
                          </td>
                          <td>
                            <span
                              class="fw-semibold mt-sm-2 d-block"
                              :style="
                                item.estado == 'Anulado'
                                  ? 'text-decoration-line: line-through;color:red'
                                  : ''
                              "
                              >{{ parseFloat(item.cantidad) }}</span
                            >
                          </td>
                          <td>
                            <div class="d-flex">
                              <div class="mt-0 mt-sm-3 d-block">
                                <h6 class="mb-0 fs-14 fw-semibold">
                                  <span
                                    :style="
                                      item.estado == 'Anulado'
                                        ? 'text-decoration-line: line-through;color:red'
                                        : ''
                                    "
                                  >
                                    {{ parseFloat(item.preciocarta) }}</span
                                  >
                                </h6>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div class="d-flex">
                              <div class="mt-0 mt-sm-3 d-block">
                                <h6 class="mb-0 fs-14 fw-semibold">
                                  <span
                                    :style="
                                      item.estado == 'Anulado'
                                        ? 'text-decoration-line: line-through;color:red'
                                        : ''
                                    "
                                  >
                                    {{ item.mensajecocina }}</span
                                  >
                                </h6>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div class="mt-sm-1 d-block">
                              <span
                                v-if="item.estado == 'Atendido'"
                                class="badge bg-success-transparent rounded-pill text-success p-2 px-3"
                                >{{ item.estado }}</span
                              >
                              <span
                                v-else-if="item.estado == 'Anulado'"
                                class="badge bg-danger-transparent rounded-pill text-danger p-2 px-3"
                                >{{ item.estado }}</span
                              >
                            </div>
                          </td>
                          <!-- <td>
                            <div class="g-2">
                              <a
                                class="btn text-primary btn-sm"
                                title="Efectuar Pago"
                                @click="dialogEfectuarPago(item)"
                                ><span class="fe fe-dollar-sign fs-14"></span
                              ></a>
                              <a
                                class="btn text-success btn-sm"
                                title="Imprimir"
                                @click="imprimirComprobante(item)"
                                ><span class="fe fe-printer fs-14"></span
                              ></a>
                              <a
                                class="btn text-primary btn-sm"
                                title="Enviar Nube Fact"
                                @click="enviarComprobanteNubeFact(item)"
                                ><span class="fe fe-upload-cloud fs-14"></span
                              ></a>
                              <a
                                class="btn text-danger btn-sm"
                                title="Anular Venta"
                                @click="anularDocumentoVenta(item)"
                                ><span class="fe fe-trash-2 fs-14"></span
                              ></a>
                              <a
                                class="btn text-yellow btn-sm"
                                title="Editar Venta"
                                @click="cargarVer(item)"
                                ><span class="fa fa-pencil fs-14"></span
                              ></a>
                            </div>
                          </td> -->
                        </tr>
                      </tbody>
                    </table>
                    <div class="pagination justify-content-center mt-2">
                      <paginate
                        :page-count="totalPaginas"
                        :click-handler="cambiarPagina"
                      />
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
      cboPersonal: [],
      totalPaginas: 0,
      listaRegistros: [],
      estadopedido: [
        { label: "Atendido", value: "Atendido" },
        { label: "Anulado", value: "Anulado" },
      ],
      date: new Date(),
      currentDate: dayjs(this.date).format("YYYY-MM-DD"),
      fecha_inicio: dayjs(this.date).format("YYYY-MM-DD"),
      fecha_fin: dayjs(this.date).format("YYYY-MM-DD"),
      estado: "",
      personal: "",
    };
  },
  methods: {
    ...mapActions({
      ListarTipoComprobante: "_tipocomprobante/Listar",
      PersonalDesplegable: "_personal/PersonalDesplegable",
      ListarPedidos: "_pedido/ListarPedidos",
    }),
    comboPersonal: async function () {
      var res = await this.PersonalDesplegable();
      this.cboPersonal = res;
    },
    cambiarPagina: function (paginaDestino) {
      this.cargarRegistros(paginaDestino);
    },
    cargarRegistros: async function (pagina = 1) {
      this.isLoading = true;
      let buscar = {
        page_index: pagina,
        page_size: 10,
        estado: this.estado,
        fecha_inicio: this.fecha_inicio,
        fecha_fin: this.fecha_fin,
        personalid: this.personal,
      };

      let res = await this.ListarPedidos(buscar);

      this.listaRegistros = res.datos.map((el) => ({
        ...el,
        datecr:
          el.datecr != null ? dayjs(el.datecr).format("DD-MM-YYYY H:mm") : "",
      }));

      this.totalPaginas = res.totalPaginas;
      this.isLoading = false;
    },
  },
  computed: {},
  mounted() {
    this.comboPersonal();
    this.cargarRegistros();
  },
};
</script>
