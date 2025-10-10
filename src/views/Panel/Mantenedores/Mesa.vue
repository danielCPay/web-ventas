<template>
  <div class="row" style="background-color: #eaedf7">
    <div class="col-sm-12 col-md-12 col-lg-12 col-xl-5">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title fw-semibold">AMBIENTE / PISOS</h4>
        </div>
        <div class="card-body">
          <h3 class="text-left">Lista de Pisos</h3>
          <div class="col-md-12 mb-3" style="text-align: right">
            <button
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdropMantenedorPiso"
              @click="cargarAgregarPiso()"
            >
              <i class="fe fe-file me-2"></i>
              Agregar
            </button>
          </div>
          <div class="table-responsive">
            <div class="text-center">
              <loading :mostrar="cargando" />
            </div>
            <table class="table" v-if="listaRegistrosPisos.length != 0">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Descripción</th>
                  <th scope="col">Mesas</th>
                  <th scope="col" class="text-center">Opciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in listaRegistrosPisos" :key="index">
                  <th scope="row">{{ index + 1 }}</th>
                  <td>
                    <a
                      href="javascript:void(0)"
                      class="fw-semibold text-dark"
                      @click="cargarRegistros(1, item.id)"
                      >{{ item.nombre }}</a
                    >
                  </td>
                  <td>{{ item.Mesas }}</td>
                  <td class="text-center">
                    <i
                      class="fa fa-pencil mx-1 text-yellow"
                      role="button"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdropMantenedorPiso"
                      @click="cargarVerPiso(item, index)"
                    ></i>
                    <i
                      class="fa fa-trash mx-1 text-danger"
                      role="button"
                      @click="cargarAnularPiso(item, index)"
                    ></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="col-sm-12 col-md-12 col-lg-12 col-xl-7">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">MANTENEDOR DE MESAS</h3>
        </div>
        <div class="card-body pb-2">
          <h3 class="text-left">Lista de Mesas</h3>
          <div class="row">
            <!-- <div class="col-md-4 mb-3" style="text-align: center">
              <select
                class="form-control form-select"
                data-bs-placeholder="Piso"
                v-model="buscador.pisoid"
              >
                <option value="">Piso</option>
                <option
                  v-for="item in cboPiso"
                  :key="item.id"
                  :label="item.nombre"
                  :value="item.id"
                ></option>
              </select>
            </div> -->
            <div class="col-md-4 mb-3" style="text-align: center">
              <input
                type="text"
                class="form-control"
                placeholder="Descripción"
                v-model="buscador.descripcionmesa"
              />
            </div>

            <div class="col-md-6 mb-3" style="text-align: left">
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
                data-bs-target="#staticBackdropMantenedor"
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
                  <th scope="col">Descripción</th>
                  <th scope="col">piso</th>
                  <th scope="col">Estado Disponibilidad</th>
                  <th scope="col" class="text-center">Opciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in listaRegistros" :key="index">
                  <th scope="row">{{ index + 1 }}</th>
                  <td
                    :style="
                      item.estadoid == 2
                        ? 'text-decoration-line: line-through;'
                        : ''
                    "
                  >
                    {{ item.descripcionmesa }}
                  </td>
                  <td
                    :style="
                      item.estadoid == 2
                        ? 'text-decoration-line: line-through;'
                        : ''
                    "
                  >
                    {{ item.descripcionpiso }}
                  </td>
                  <td
                    :style="
                      item.estadoid == 2
                        ? 'text-decoration-line: line-through;'
                        : ''
                    "
                  >
                    {{ item.estadodisponibilidad }}
                  </td>
                  <td class="text-center">
                    <i
                      class="fa fa-pencil mx-1 text-yellow"
                      role="button"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdropMantenedor"
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
          <!-- Modal Mesa -->
          <div
            class="modal fade"
            id="staticBackdropMantenedor"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="staticBackdropLabel">Mesa</h5>
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
                      <label>Descripción</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="mesa.descripcionmesa"
                        ref="descripcionmesa"
                        :style="
                          showAdvertise && mesa.descripcionmesa == ''
                            ? 'border-color: #e23e3d;'
                            : ''
                        "
                      />
                    </div>

                    <div class="form-group">
                      <label>Piso</label>
                      <select
                        class="form-control form-select"
                        data-bs-placeholder="Piso"
                        v-model="mesa.pisoid"
                        ref="pisoid"
                        :style="
                          showAdvertise && mesa.pisoid == ''
                            ? 'border-color: #e23e3d;'
                            : ''
                        "
                      >
                        <option value="">Piso</option>
                        <option
                          v-for="item in cboPiso"
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
          <!-- Modal Mesa -->

          <!-- Modal Piso -->
          <div
            class="modal fade"
            id="staticBackdropMantenedorPiso"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="staticBackdropLabel">Piso</h5>
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
                      <label>Descripción</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="piso.descripcionpiso"
                        ref="descripcionpiso"
                        :style="
                          showAdvertise && piso.descripcionpiso == ''
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
                    @click="guardarCambiosPiso()"
                  >
                    Guardar cambios
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- Modal Piso -->
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
      cboPiso: [],
      showAdvertise: false,
      indiceModificando: -1,
      indiceModificandoPiso: -1,
      mesa: {},
      mesaBase: {
        mesaid: 0,
        descripcionmesa: "",
        pisoid: 0,
        user: "",
      },
      piso: {},
      pisoBase: {
        pisoid: 0,
        descripcionpiso: "",
      },
      listaRegistros: [],
      listaRegistrosPisos: [],
      buscador: {
        page_index: 1,
        page_size: 10,
        pisoid: "",
        descripcionmesa: "",
      },
      totalPaginas: 0,
      initialPage: 1,
    };
  },
  methods: {
    ...mapActions({
      ListarRegistros: "_mesa/ListarRegistros",
      AgregarRegistro: "_mesa/AgregarRegistro",
      ModificarRegistro: "_mesa/ModificarRegistro",
      AnularRegistro: "_mesa/AnularRegistro",
      PisoDesplegable: "_piso/ListarPiso",
      AgregarRegistroPiso: "_piso/AgregarRegistro",
      ModificarRegistroPiso: "_piso/ModificarRegistro",
    }),
    comboPiso: async function () {
      var res = await this.PisoDesplegable();
      this.cboPiso = res;
    },
    cargarAgregar: function () {
      this.mesa = { ...this.mesaBase };
      this.indiceModificando = -1;
    },
    cargarAgregarPiso: function () {
      this.piso = { ...this.pisoBase };
      this.indiceModificandoPiso = -1;
    },
    cargarVer: function (item, index) {
      this.mesa.mesaid = item.mesaid;
      this.mesa.descripcionmesa = item.descripcionmesa;
      this.mesa.pisoid = item.pisoid;
      this.mesa.user = this.usuario.usuario;

      this.indiceModificando = index;
    },
    cargarVerPiso: function (item, index) {
      this.piso.pisoid = item.id;
      this.piso.descripcionpiso = item.nombre;

      this.indiceModificandoPiso = index;
    },
    cargarAnular: async function (item, index) {
      let mesa = {
        id: item.mesaid,
        user: this.usuario.usuario,
      };
      global._swal_pregunta(
        "¿Está seguro que desea anular el registro?",
        "Anular",
        async () => {
          var res = await this.AnularRegistro(mesa);
          if (res?.exito) {
            this.cargarRegistros();
            global._mensaje_exito("Se ánulo correctamente!");
          }
        }
      );
    },
    guardarCambios: async function () {
      var res = null;
      if (this.indiceModificando == -1) {
        let valor = this.validarFormulario();
        if (!valor) {
          this.mesa.user = this.usuario.usuario;
          res = await this.AgregarRegistro(this.mesa);
        }
      } else {
        res = await this.ModificarRegistro(this.mesa);
      }
      if (res?.exito) {
        this.cargarRegistros();
        this.cerrarModal();
        global._mensaje_exito("Los cambios se han guardado correctamente");
      }
    },
    guardarCambiosPiso: async function () {
      var res = null;
      if (this.indiceModificandoPiso == -1) {
        let valor = this.validarFormularioPiso();
        if (!valor) {
          res = await this.AgregarRegistroPiso(this.piso);
        }
      } else {
        res = await this.ModificarRegistroPiso(this.piso);
      }
      if (res?.exito) {
        this.cargarRegistrosPisos();
        this.comboPiso();
        this.cargarRegistros();
        this.cerrarModalPiso();
        global._mensaje_exito("Los cambios se han guardado correctamente");
      }
    },
    validarFormulario() {
      let valida = false;

      if (this.mesa.descripcionmesa == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.descripcionmesa.focus();
        });
      } else if (this.mesa.pisoid == 0) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.pisoid.focus();
        });
      }

      return valida;
    },
    validarFormularioPiso() {
      let valida = false;

      if (this.piso.descripcionpiso == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.descripcionpiso.focus();
        });
      }
      return valida;
    },
    cargarRegistros: async function (pagina = 1, pisoid = "") {
      this.cargando = true;
      let buscador = {
        page_index: pagina,
        page_size: this.buscador.page_size,
        pisoid: pisoid,
        descripcionmesa: this.buscador.descripcionmesa,
      };
      var res = await this.ListarRegistros(buscador);
      this.listaRegistros = res.datos;
      this.initialPage = res.paginaActual;
      this.buscador.page_index = res.paginaActual;
      this.totalPaginas = res.totalPaginas;
      this.cargando = false;
    },
    cargarRegistrosPisos: async function () {
      var res = await this.PisoDesplegable();
      this.listaRegistrosPisos = res;
    },
    cambiarPagina: function (paginaDestino) {
      this.cargarRegistros(paginaDestino);
    },
    cerrarModal: function () {
      var modal = bootstrap.Modal.getInstance(
        document.getElementById("staticBackdropMantenedor")
      );
      modal.hide();
    },
    cerrarModalPiso: function () {
      var modal = bootstrap.Modal.getInstance(
        document.getElementById("staticBackdropMantenedorPiso")
      );
      modal.hide();
    },
  },
  mounted() {
    if (localStorage.getItem("login")) {
      this.usuario = JSON.parse(localStorage.getItem("login"));
    }
    this.comboPiso();
    this.cargarRegistrosPisos();
    this.cargarRegistros();
  },
};
</script>
