<template>
  <div class="card-header">
    <h3 class="card-title">MANTENEDOR DE INSUMOS</h3>
  </div>
  <div class="card-body pb-2">
    <h3 class="text-left">Lista de Insumos</h3>
    <!-- <div class="text-left">
            <button class="btn btn-primary m-2" data-bs-toggle="modal" data-bs-target="#staticBackdropMantenedorDecano"
                @click="cargarAgregar()">
                Agregar
            </button>
        </div> -->
    <div class="row">
      <div class="col-md-4 mb-3" style="text-align: center">
        <select
          class="form-control form-select"
          data-bs-placeholder="Sub Categoria"
          v-model="buscador.idSubCategoria"
        >
          <option value="">Sub Categoria</option>
          <option
            v-for="item in cboSubCategoria"
            :key="item.id"
            :label="item.nombre"
            :value="item.id"
          ></option>
        </select>
      </div>
      <div class="col-md-4 mb-3" style="text-align: center">
        <input
          type="text"
          class="form-control"
          placeholder="Descripción"
          v-model="buscador.descripcionInsumo"
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
            <th scope="col">descripcion</th>
            <th scope="col">subcategoria</th>
            <th scope="col">costo</th>
            <th scope="col">unidadmedida</th>
            <th scope="col" class="text-center">Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in listaRegistros" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ item.descripcioninsumo }}</td>
            <td>{{ item.subcategoria }}</td>
            <td>{{ item.costo }}</td>
            <td>{{ item.unidadmedida }}</td>
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
                @click="cargarEliminar(item, index)"
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
            <h5 class="modal-title" id="staticBackdropLabel">Insumos</h5>
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
              <!-- <h3 class="text-center">Detalle de Documento</h3> -->
              <!-- <div class="form-group" v-if="indiceModificando != -1">
                                <label>Codigo</label>
                                <input type="number" class="form-control" v-model="decano.cod_int" readonly />
                            </div> -->
              <!-- <div class="form-group">
                                <label>Numero de registro</label>
                                <input type="number" class="form-control" v-model="decano.nro_registro" />
                            </div> -->
              <div class="form-group">
                <label>Descripción</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="insumo.descripcioninsumo"
                  ref="descripcioninsumo"
                  :style="
                    showAdvertise && insumo.descripcioninsumo == ''
                      ? 'border-color: #e23e3d;'
                      : ''
                  "
                />
              </div>
              <div class="form-group">
                <label>Costo</label>
                <input
                  type="number"
                  min="0"
                  class="form-control"
                  v-model="insumo.costo"
                  ref="costo"
                  :style="
                    showAdvertise && insumo.costo == 0
                      ? 'border-color: #e23e3d;'
                      : ''
                  "
                />
              </div>
              <div class="form-group">
                <label>Unidad Medida</label>
                <select
                  class="form-control form-select"
                  data-bs-placeholder="Unidad Medida"
                  v-model="insumo.unidadmedidaid"
                  ref="unidadmedidaid"
                  :style="
                    showAdvertise && insumo.unidadmedidaid == ''
                      ? 'border-color: #e23e3d;'
                      : ''
                  "
                >
                  <option value="">Unidad Medida</option>
                  <option
                    v-for="item in cboUnidadMedida"
                    :key="item.id"
                    :label="item.nombre"
                    :value="item.id"
                  ></option>
                </select>
              </div>
              <div class="form-group">
                <label>Sub Categoria</label>
                <select
                  class="form-control form-select"
                  data-bs-placeholder="Sub Categoria"
                  v-model="insumo.subcategoriaid"
                  ref="subfamiliaid"
                  :style="
                    showAdvertise && insumo.subcategoriaid == ''
                      ? 'border-color: #e23e3d;'
                      : ''
                  "
                >
                  <option value="">Sub Categoria</option>
                  <option
                    v-for="item in cboSubCategoria"
                    :key="item.id"
                    :label="item.nombre"
                    :value="item.id"
                  ></option>
                </select>
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
      cargando: false,
      cboSubCategoria: [],
      cboUnidadMedida: [],
      showAdvertise: false,
      indiceModificando: -1,
      insumo: {},
      insumoBase: {
        insumoid: 0,
        descripcioninsumo: "",
        costo: 0,
        unidadmedidaid: 0,
        subcategoriaid: 0,
      },
      listaRegistros: [],
      buscador: {
        page_index: 1,
        page_size: 10,
        idSubCategoria: "",
        descripcionInsumo: "",
      },
      totalPaginas: 0,
      initialPage: 1,
    };
  },
  methods: {
    ...mapActions({
      ListarRegistros: "_insumo/ListarRegistros",
      AgregarRegistro: "_insumo/AgregarRegistro",
      ModificarRegistro: "_insumo/ModificarRegistro",
      Unidad_Medida_Desplegable: "_insumo/Unidad_Medida_Desplegable",
      SubCategoriaDesplegable: "_categoria/SubCategoriaDesplegable",
    }),
    comboSubCategoria: async function () {
      var res = await this.SubCategoriaDesplegable();
      this.cboSubCategoria = res;
    },
    comboUnidadMedida: async function () {
      var res = await this.Unidad_Medida_Desplegable();
      this.cboUnidadMedida = res;
    },
    cargarAgregar: function () {
      this.insumo = { ...this.insumoBase };
      this.indiceModificando = -1;
    },
    cargarVer: function (item, index) {
      this.insumo.insumoid = item.insumoid;
      this.insumo.descripcioninsumo = item.descripcioninsumo;
      this.insumo.costo = item.costo;
      this.insumo.unidadmedidaid = item.unidadmedidaid;
      this.insumo.subcategoriaid = item.subcategoriaid;

      this.indiceModificando = index;
    },
    cargarEliminar: async function (item, index) {
      this.insumo = { ...item };
      global._swal_pregunta(
        "¿Está seguro que desea eliminar el registro?",
        async () => {
          var res = await this.EliminarDocumento(this.insumo);
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
          res = await this.AgregarRegistro(this.insumo);
        }
      } else {
        res = await this.ModificarRegistro(this.insumo);
      }
      if (res?.exito) {
        this.cargarRegistros();
        this.cerrarModal();
        global._mensaje_exito("Los cambios se han guardado correctamente");
      }
    },
    validarFormulario() {
      let valida = false;

      if (this.insumo.descripcioninsumo == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.descripcioninsumo.focus();
        });
      } else if (this.insumo.costo == 0) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.costo.focus();
        });
      } else if (this.insumo.unidadmedidaid == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.unidadmedidaid.focus();
        });
      } else if (this.insumo.subcategoriaid == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.subcategoriaid.focus();
        });
      }

      return valida;
    },
    cargarRegistros: async function (pagina = 1) {
      this.cargando = true;
      let buscador = {
        page_index: pagina,
        page_size: this.buscador.page_size,
        idSubCategoria: this.buscador.idSubCategoria,
        descripcionInsumo: this.buscador.descripcionInsumo,
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
    this.comboUnidadMedida();
    this.comboSubCategoria();
    this.cargarRegistros();
  },
};
</script>
