<template>
  <div class="card-header">
    <h3 class="card-title">MANTENEDOR DE SUB FAMILIAS</h3>
  </div>
  <div class="card-body pb-2">
    <h3 class="text-left">Lista de SubFamilia</h3>
    <div class="row">
      <div class="col-md-4 mb-3" style="text-align: center">
        <input
          type="text"
          class="form-control"
          placeholder="Descripción SubFamilia"
          v-model="buscador.descripcionsubfamilia"
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
            <th scope="col">Código</th>
            <th scope="col">Descripcion Sub Familia</th>
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
                >{{ item.subfamiliaid }}</span
              >
            </td>
            <td>
              <span
                :style="
                  item.estadoid == 2
                    ? 'text-decoration-line: line-through;color:red'
                    : ''
                "
                >{{ item.descripcionsubfamilia }}</span
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
            <h5 class="modal-title" id="staticBackdropLabel">Sub Familia</h5>
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
                <label>Descripción Sub Familia</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="subfamilia.descripcionsubfamilia"
                  ref="descripcionsubfamilia"
                  :style="
                    showAdvertise && subfamilia.descripcionsubfamilia == ''
                      ? 'border-color: #e23e3d;'
                      : ''
                  "
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
      cargando: false,
      showAdvertise: false,
      indiceModificando: -1,
      subfamilia: {},
      subfamiliaBase: {
        subfamiliaid: 0,
        descripcionsubfamilia: "",
      },
      listaRegistros: [],
      buscador: {
        page_index: 1,
        page_size: 10,
        descripcionsubfamilia: "",
      },
      totalPaginas: 0,
      initialPage: 1,
    };
  },
  methods: {
    ...mapActions({
      ListarRegistros: "_subfamilia/ListarRegistros",
      AgregarRegistro: "_subfamilia/AgregarRegistro",
      ModificarRegistro: "_subfamilia/ModificarRegistro",
      AnularSubFamilia: "_subfamilia/Anular",
    }),
    onlyNumber: function ($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault();
      }
    },
    cargarAgregar: function () {
      this.subfamilia = { ...this.subfamiliaBase };
      this.indiceModificando = -1;
    },
    cargarVer: function (item, index) {
      this.subfamilia.subfamiliaid = item.subfamiliaid;
      this.subfamilia.descripcionsubfamilia = item.descripcionsubfamilia;

      this.indiceModificando = index;
    },
    cargarAnular: async function (item, index) {
      let subfamilia = {
        subfamiliaid: item.subfamiliaid,
        user: this.usuario.usuario,
      };
      global._swal_pregunta(
        "¿Está seguro que desea eliminar el registro?",
        "Advertencia",
        async () => {
          var res = await this.AnularSubFamilia(subfamilia);
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
          res = await this.AgregarRegistro(this.subfamilia);
        }
      } else {
        res = await this.ModificarRegistro(this.subfamilia);
      }
      if (res?.exito) {
        this.cargarRegistros();
        this.cerrarModal();
        global._mensaje_exito("Los cambios se han guardado correctamente");
      }
    },
    validarFormulario() {
      let valida = false;

      if (this.subfamilia.descripcionsubfamilia == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.descripcionsubfamilia.focus();
        });
      }

      return valida;
    },
    cargarRegistros: async function (pagina = 1) {
      this.cargando = true;
      let buscador = {
        page_index: pagina,
        page_size: this.buscador.page_size,
        descripcionsubfamilia: this.buscador.descripcionsubfamilia,
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
