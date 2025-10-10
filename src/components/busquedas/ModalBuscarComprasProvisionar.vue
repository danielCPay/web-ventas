<template>
  <div
    class="modal fade"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">
            Lista de Compras por Provisionar
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="closeModalComprasProvisionar()"
          >
            <i class="fa fa-close"></i>
          </button>
        </div>
        <div class="modal-body">
          <div>
            <div class="form-label mt-0 p-0">LISTA</div>
            <div class="row">
              <div class="col-md-6 mb-3" style="text-align: center">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Razón Social"
                  v-model="buscador.razonsocial"
                />
              </div>

              <div class="col-md-3 mb-3" style="text-align: left">
                <button
                  type="button"
                  class="btn btn-primary"
                  style="margin: 2px"
                  @click="cargarRegistros()"
                >
                  <i class="fe fe-search me-2"></i>Buscar
                </button>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="table-responsive">
                  <table
                    class="table border text-nowrap text-md-nowrap table-striped table-sm mb-0"
                    v-if="listaRegistros.length != 0"
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Tipo Comprobante</th>
                        <th>razonsocial</th>
                        <th>ruc</th>
                        <th>Total</th>
                        <th class="text-center">Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in listaRegistros"
                        :key="'item-' + index"
                      >
                        <th scope="row">{{ indexMethod(index) }}</th>
                        <td>{{ item.descripciontipocomprobante }}</td>
                        <td>{{ item.razonsocial }}</td>
                        <td>{{ item.ruc }}</td>
                        <td>{{ item.total }}</td>
                        <td class="text-center">
                          <i
                            class="fa fa-check mx-1 text-yellow"
                            role="button"
                            @click="selectCompra(item)"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="text-center" v-else>
                    <span class="fw-bold fs-18">Detalle Vacio</span>
                  </div>
                  <div class="row">
                    <div class="pagination justify-content-center mt-3">
                      <div
                        class="dataTables_info"
                        id="responsive-datatable_info"
                        role="status"
                        aria-live="polite"
                      >
                        Showing
                        {{
                          pagination.currentPage == 1
                            ? pagination.currentPage
                            : pagination.perPage * pagination.currentPage - 4
                        }}
                        to
                        {{
                          pagination.perPage * pagination.currentPage >
                          pagination.total
                            ? pagination.total
                            : pagination.perPage * pagination.currentPage
                        }}
                        of {{ pagination.total }} entries
                      </div>
                    </div>
                    <div class="pagination justify-content-center mt-3">
                      <button
                        @click="cambiarPagina(1)"
                        class="page-link btn btn-outline-info"
                      >
                        Primero
                      </button>
                      <li
                        class="page-item"
                        v-for="(item, index) in totalPaginas"
                        style="list-style: none"
                        :key="index"
                      >
                        <button
                          href="#"
                          @click="cambiarPagina(index + 1)"
                          :class="
                            buscador.page_index == index + 1
                              ? 'page-link btn'
                              : 'page-link btn btn-outline-info'
                          "
                          :style="
                            buscador.page_index == index + 1
                              ? 'color: white; background-color: #36b9cc;'
                              : ''
                          "
                        >
                          {{ index + 1 }}
                        </button>
                      </li>
                      <button
                        @click="cambiarPagina(totalPaginas)"
                        class="page-link btn btn-outline-info"
                      >
                        Último
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="closeModalComprasProvisionar()"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import global from "../../global";

//Librayr
import dayjs from "dayjs";

export default {
  name: "ModalBuscarComprasProvisionar",
  props: {
    reloadData: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      date: new Date(),
      currentDate: dayjs(this.date).format("YYYY-MM-DD"),
      listaRegistros: [],
      buscador: {
        page_index: 1,
        page_size: 5,
        razonsocial: "",
      },
      totalPaginas: 0,
      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 15, 25, 50],
        total: 0,
      },
    };
  },
  watch: {
    reloadData() {
      console.log("ReloadData", this.reloadData);
      if (this.reloadData) {
        this.cargarRegistros();
      }
    },
  },
  computed: {},
  methods: {
    ...mapActions({
      ListadoComprasProvisionar: "_compra/ListadoComprasProvisionar",
    }),
    selectCompra(item) {
      this.$emit("selectCompra", item);
      this.closeModalComprasProvisionar();
    },
    indexMethod(index) {
      return (this.buscador.page_index - 1) * 5 + (index + 1);
    },
    cambiarPagina: function (paginaDestino) {
      this.cargarRegistros(paginaDestino);
    },
    cargarRegistros: async function (pagina = 1) {
      this.cargando = true;
      let buscador = {
        page_index: pagina,
        page_size: this.buscador.page_size,
        razonsocial: this.buscador.razonsocial,
      };
      var res = await this.ListadoComprasProvisionar(buscador);

      this.listaRegistros = res.datos;
      this.pagination.perPage = res.registrosPorPagina;
      this.pagination.currentPage = res.paginaActual;
      this.buscador.page_index = res.paginaActual;
      this.pagination.total = res.totalRegistros;

      this.totalPaginas = res.totalPaginas;
      this.cargando = false;
    },
    closeModalComprasProvisionar() {
      this.$emit("closeModalComprasProvisionar");
    },
  },
  mounted() {
    //this.cargarRegistros();
  },
};
</script>
