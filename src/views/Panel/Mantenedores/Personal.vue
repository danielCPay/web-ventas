<template>
  <div class="card-header">
    <h3 class="card-title">MANTENEDOR DE PERSONAL</h3>
  </div>
  <div class="card-body pb-2">
    <h3 class="text-left">Lista de Personal</h3>
    <div class="row">
      <div class="col-md-4 mb-3" style="text-align: center">
        <input
          type="text"
          class="form-control"
          placeholder="Nombres"
          v-model="buscador.nombres"
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
            <th scope="col">Nombres</th>
            <th scope="col">Apellidos</th>
            <th scope="col">Dni</th>
            <th scope="col">Teléfono</th>
            <th scope="col">Cargo</th>
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
                >{{ item.nombres }}</span
              >
            </td>
            <td>
              <span
                :style="
                  item.estadoid == 2
                    ? 'text-decoration-line: line-through;color:red'
                    : ''
                "
                >{{ item.apellidos }}</span
              >
            </td>
            <td>
              <span
                :style="
                  item.estadoid == 2
                    ? 'text-decoration-line: line-through;color:red'
                    : ''
                "
                >{{ item.dni }}</span
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
            <td>
              <span
                :style="
                  item.estadoid == 2
                    ? 'text-decoration-line: line-through;color:red'
                    : ''
                "
                >{{ item.descripcioncargo }}</span
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
        <div class="pagination justify-content-center mt-2">
          <paginate
            :page-count="totalPaginas"
            :click-handler="cambiarPagina"
            v-model="initialPage"
          />
        </div>
        <!-- <button
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
        </button> -->
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
            <h5 class="modal-title" id="staticBackdropLabel">Personal</h5>
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
                    <label>Nombres</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="personal.nombres"
                      ref="nombres"
                      :style="
                        showAdvertise && personal.nombres == ''
                          ? 'border-color: #e23e3d;'
                          : ''
                      "
                    />
                  </div>
                  <div class="col">
                    <label>Apellidos</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="personal.apellidos"
                      ref="apellidos"
                      :style="
                        showAdvertise && personal.apellidos == ''
                          ? 'border-color: #e23e3d;'
                          : ''
                      "
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <label>DNI</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="personal.dni"
                      maxlength="8"
                      ref="dni"
                      :style="
                        showAdvertise && personal.dni == ''
                          ? 'border-color: #e23e3d;'
                          : ''
                      "
                    />
                  </div>
                </div>
                <div class="col">
                  <label>Cargo</label>
                  <select
                    class="form-control form-select"
                    data-bs-placeholder="Sub Familia"
                    v-model="personal.cargoid"
                    ref="cargoid"
                    :style="
                      showAdvertise && personal.cargoid == 0
                        ? 'border-color: #e23e3d;'
                        : ''
                    "
                  >
                    <option value="">Cargo</option>
                    <option
                      v-for="item in cargo"
                      :key="item.id"
                      :label="item.nombre"
                      :value="item.id"
                    ></option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label>Dirección</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="personal.direccion"
                />
              </div>
              <div class="form-group">
                <label>Teléfono</label>
                <input
                  type="number"
                  class="form-control"
                  v-model="personal.telefono"
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
      cargo: [],
      showAdvertise: false,
      indiceModificando: -1,
      personal: {},
      personalBase: {
        personalId: 0,
        nombres: "",
        apellidos: "",
        dni: "",
        direccion: "",
        telefono: "",
        cargoid: 0,
      },
      listaRegistros: [],
      buscador: {
        page_index: 1,
        page_size: 10,
        nombres: "",
      },
      totalPaginas: 0,
      initialPage: 1,
    };
  },
  methods: {
    ...mapActions({
      ListarRegistros: "_personal/ListarRegistros",
      AgregarRegistro: "_personal/AgregarRegistro",
      ModificarRegistro: "_personal/ModificarRegistro",
      AnularPersonal: "_personal/Anular",
      CargoDesplegable: "_personal/CargoDesplegable",
    }),
    comboCargo: async function () {
      var res = await this.CargoDesplegable();
      this.cargo = res;
    },
    cargarAgregar: function () {
      this.personal = { ...this.personalBase };
      this.indiceModificando = -1;
    },
    cargarVer: function (item, index) {
      this.personal.personalid = item.personalid;
      this.personal.nombres = item.nombres;
      this.personal.apellidos = item.apellidos;
      this.personal.dni = item.dni;
      this.personal.direccion = item.direccion;
      this.personal.telefono = item.telefono;
      this.personal.cargoid = item.cargoid;

      this.indiceModificando = index;
    },
    cargarAnular: async function (item, index) {
      let personal = {
        personalid: item.personalid,
        user: this.usuario.usuario,
      };

      global._swal_pregunta(
        "¿Está seguro que desea eliminar el registro?",
        "Advertencia",
        async () => {
          var res = await this.AnularPersonal(personal);
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
          res = await this.AgregarRegistro(this.personal);
        }
      } else {
        res = await this.ModificarRegistro(this.personal);
      }
      if (res?.exito) {
        this.cargarRegistros();
        this.cerrarModal();
        global._mensaje_exito("Los cambios se han guardado correctamente");
      }
    },
    validarFormulario() {
      let valida = false;

      if (this.personal.nombres == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.nombres.focus();
        });
      } else if (this.personal.apellidos == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.apellidos.focus();
        });
      } else if (this.personal.dni == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.dni.focus();
        });
      } else if (this.personal.cargoid == 0) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.cargoid.focus();
        });
      }

      return valida;
    },
    cargarRegistros: async function (pagina = 1) {
      this.cargando = true;
      let buscador = {
        page_index: pagina,
        page_size: this.buscador.page_size,
        nombres: this.buscador.nombres,
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
    this.comboCargo();
    this.cargarRegistros();
  },
};
</script>
