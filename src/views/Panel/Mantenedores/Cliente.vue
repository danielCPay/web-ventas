<template>
  <div class="card-header">
    <h3 class="card-title">MANTENEDOR DE CLIENTES</h3>
  </div>
  <div class="card-body pb-2">
    <h3 class="text-left">Lista de Clientes</h3>
    <div class="row">
      <div class="col-md-4 mb-3" style="text-align: center">
        <input
          type="text"
          class="form-control"
          placeholder="Razón Social"
          v-model="buscador.razonsocial"
        />
      </div>

      <div class="col-md-4 mb-3" style="text-align: left">
        <button
          type="button"
          class="btn btn-primary"
          style="margin: 2px"
          @click="cargarRegistros()"
        >
          <i class="fe fe-search me-2"></i>Buscar
        </button>
        <button
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdropMantenedorDecano"
          @click="cargarAgregar()"
        >
          <i class="fe fe-file me-2"></i>
          Agregar
        </button>
      </div>
    </div>
    <div class="table-responsive">
      <div class="text-center">
        <loading :mostrar="cargando" />
      </div>
      <table class="table" v-if="listaRegistros.length != 0">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tipo Documento</th>
            <th scope="col">Nº Documento</th>
            <th scope="col">Razón Social</th>
            <th scope="col">Teléfono</th>
            <th scope="col" class="text-center">Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in listaRegistros" :key="index">
            <th scope="row">
              <span
                :style="
                  item.estadoid == 2
                    ? 'text-decoration-line: line-through;color:red'
                    : ''
                "
                >{{ index + 1 }}</span
              >
            </th>
            <td>
              <span
                :style="
                  item.estadoid == 2
                    ? 'text-decoration-line: line-through;color:red'
                    : ''
                "
                >{{ item.tipodocumento }}</span
              >
            </td>
            <td>
              <span
                :style="
                  item.estadoid == 2
                    ? 'text-decoration-line: line-through;color:red'
                    : ''
                "
                >{{ item.nrdocumento }}</span
              >
            </td>
            <td>
              <span
                :style="
                  item.estadoid == 2
                    ? 'text-decoration-line: line-through;color:red'
                    : ''
                "
                >{{ item.razonsocial }}</span
              >
            </td>
            <td>
              <span
                :style="
                  item.estadoid == 2
                    ? 'text-decoration-line: line-through;color:red'
                    : ''
                "
                >{{ item.telefono }}</span
              >
            </td>
            <td class="text-center">
              <i
                class="fa fa-pencil mx-1 text-yellow"
                role="button"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdropMantenedorDecano"
                @click="cargarVer(item, index)"
              ></i>
              <i
                class="fa fa-trash mx-1 text-danger"
                role="button"
                @click="cargarAnular(item, index)"
              ></i>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination justify-content-center mt-2">
        <paginate
          :page-count="totalPaginas"
          :click-handler="cambiarPagina"
          v-model="initialPage"
        />
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="staticBackdropMantenedorDecano"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Clientes</h5>
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
                <div class="row">
                  <div class="col">
                    <label>Tipo Documento</label>
                    <select
                      class="form-control form-select"
                      data-bs-placeholder="Sub Familia"
                      v-model="cliente.tipodocumento"
                      @change="validarTipoDocumento"
                      ref="tipodocumento"
                      :style="
                        showAdvertise && cliente.tipodocumento == ''
                          ? 'border-color: #e23e3d;'
                          : ''
                      "
                    >
                      <option value="">SELECCIONE</option>
                      <option value="DNI">DNI</option>
                      <option value="RUC">RUC</option>
                    </select>
                  </div>
                  <div class="col">
                    <label>Nº Documento</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="cliente.nrdocumento"
                      :maxlength="maxlengthTipoDocumento"
                      ref="nrdocumento"
                      @keypress="onlyNumber"
                      :style="
                        showAdvertise && cliente.nrdocumento == ''
                          ? 'border-color: #e23e3d;'
                          : ''
                      "
                    />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label>Razón Social</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="cliente.razonsocial"
                  ref="razonsocial"
                  :style="
                    showAdvertise && cliente.razonsocial == ''
                      ? 'border-color: #e23e3d;'
                      : ''
                  "
                />
              </div>
              <div class="form-group">
                <label>Dirección</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="cliente.direccion"
                />
              </div>
              <div class="form-group">
                <label>Teléfono</label>
                <input
                  type="number"
                  class="form-control"
                  v-model="cliente.telefono"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
            <button
              type="button"
              class="btn btn-success"
              @click="guardarCambios()"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import global from "../../../global";
import Paginate from "../../../components/varios/Paginate.vue";
import Loading from "../../../components/varios/Loading.vue";
export default {
  components: {
    Paginate,
    Loading,
  },
  data() {
    return {
      usuario: {},
      maxlengthTipoDocumento: 0,
      cargando: false,
      cboSubFamilia: [],
      showAdvertise: false,
      indiceModificando: -1,
      cliente: {},
      clienteBase: {
        clienteid: 0,
        tipodocumento: "",
        nrdocumento: "",
        razonsocial: "",
        direccion: "",
        telefono: "",
      },
      listaRegistros: [],
      buscador: {
        page_index: 1,
        page_size: 10,
        razonsocial: "",
      },
      totalPaginas: 0,
      initialPage: 1,
    };
  },
  methods: {
    ...mapActions({
      ListarRegistros: "_cliente/ListarRegistros",
      AgregarRegistro: "_cliente/AgregarRegistro",
      ModificarRegistro: "_cliente/ModificarRegistro",
      AnularCliente: "_cliente/Anular",
    }),
    onlyNumber: function ($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault();
      }
    },
    validarTipoDocumento() {
      if (this.cliente.tipodocumento == "DNI") {
        this.maxlengthTipoDocumento = 8;
      } else {
        this.maxlengthTipoDocumento = 11;
      }
      this.$refs.nrdocumento.focus();
    },
    cargarAgregar: function () {
      this.cliente = { ...this.clienteBase };
      this.indiceModificando = -1;
    },
    cargarVer: function (item, index) {
      this.cliente.clienteid = item.clienteid;
      this.cliente.tipodocumento = item.tipodocumento;
      this.cliente.nrdocumento = item.nrdocumento;
      this.cliente.razonsocial = item.razonsocial;
      this.cliente.direccion = item.direccion;
      this.cliente.telefono = item.telefono;

      this.indiceModificando = index;
    },
    cargarAnular: async function (item, index) {
      let cliente = {
        clienteid: item.clienteid,
        user: this.usuario.usuario,
      };
      global._swal_pregunta(
        "¿Está seguro que desea eliminar el registro?",
        "Advertencia",
        async () => {
          var res = await this.AnularCliente(cliente);
          if (res?.exito) {
            this.cargarRegistros();
            global._mensaje_exito("Se ha eliminado");
          }
        }
      );
    },
    guardarCambios: async function () {
      var res = null;
      if (this.indiceModificando == -1) {
        let valor = this.validarFormulario();
        if (!valor) {
          res = await this.AgregarRegistro(this.cliente);
        }
      } else {
        res = await this.ModificarRegistro(this.cliente);
      }
      if (res?.exito) {
        this.cargarRegistros();
        this.cerrarModal();
        global._mensaje_exito("Los cambios se han guardado correctamente");
      }
    },
    validarFormulario() {
      let valida = false;

      if (this.cliente.tipodocumento == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.tipodocumento.focus();
        });
      } else if (this.cliente.nrdocumento == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.nrdocumento.focus();
        });
      } else if (this.cliente.razonsocial == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.razonsocial.focus();
        });
      }

      return valida;
    },
    cargarRegistros: async function (pagina = 1) {
      this.cargando = true;
      let buscador = {
        page_index: pagina,
        page_size: this.buscador.page_size,
        razonsocial: this.buscador.razonsocial,
      };
      var res = await this.ListarRegistros(buscador);
      this.listaRegistros = res.datos;
      this.initialPage = res.paginaActual;
      this.buscador.page_index = res.paginaActual;
      this.totalPaginas = res.totalPaginas;
      this.cargando = false;
    },
    cambiarPagina: function (paginaDestino) {
      this.cargarRegistros(paginaDestino);
    },
    cerrarModal: function () {
      var modal = bootstrap.Modal.getInstance(
        document.getElementById("staticBackdropMantenedorDecano")
      );
      modal.hide();
    },
  },
  mounted() {
    if (localStorage.getItem("login")) {
      this.usuario = JSON.parse(localStorage.getItem("login"));
    }
    this.cargarRegistros();
  },
};
</script>
