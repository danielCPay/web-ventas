<template>
  <vue-loading :fullPage="fullPage" :isLoading="isLoading" :spinner="spinner" />
  <div class="card-header">
    <h3 class="card-title">
      PRODUCTO
      <span style="color: blue">{{ descripcionproducto }}</span>
    </h3>
    <div class="card-options">
      <a
        href="javascript:void(0)"
        class="btn btn-secondary btn-sm ms-2"
        @click="retornarProductos()"
        ><i class="fe fe-corner-up-left me-2"></i>Mantenedor de Productos</a
      >
    </div>
  </div>
  <div class="card-body pb-2">
    <div class="row">
      <div class="col-md-12 row">
        <div class="mt-0">
          <div class="form-label mt-0 p-0">DATOS DEL PRODUCTO</div>
          <div class="row">
            <div class="border mb-5 p-4 br-5">
              <div class="row">
                <div class="col-md-4 mb-3">
                  <div class="form-group">
                    <label>Unidad de Medida</label>
                    <select
                      v-model="preciospresentacion.unidadmedidaid"
                      class="form-control form-select"
                      placeholder="Unidad Medida"
                      ref="unidadmedidaid"
                      :style="
                        showAdvertise &&
                        preciospresentacion.unidadmedidaid == ''
                          ? 'border-color: #e23e3d;'
                          : ''
                      "
                    >
                      <option value="">SELECCIONE</option>
                      <option
                        v-for="item in listaUnidadMedida"
                        :key="item.id"
                        :label="item.nombre"
                        :value="item.id"
                      ></option>
                    </select>
                  </div>
                </div>
                <div class="col-md-4 mb-3">
                  <div class="form-group">
                    <label>Descripción de Presentación</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Descripción de Presentación"
                      v-model="preciospresentacion.decripcionpresentacion"
                      ref="decripcionpresentacion"
                      :style="
                        showAdvertise &&
                        preciospresentacion.decripcionpresentacion == ''
                          ? 'border-color: #e23e3d;'
                          : ''
                      "
                    />
                  </div>
                </div>
                <div class="col-md-4 mb-3">
                  <div class="form-group">
                    <label>Cantidad por Presentación</label>
                    <input
                      type="number"
                      class="form-control"
                      placeholder="Cantidad por Presentación<"
                      v-model="preciospresentacion.cantidadpresentacion"
                      ref="cantidadpresentacion"
                      :style="
                        showAdvertise &&
                        preciospresentacion.cantidadpresentacion == '' &&
                        preciospresentacion.cantidadpresentacion == 0
                          ? 'border-color: #e23e3d;'
                          : ''
                      "
                    />
                  </div>
                </div>
                <div class="col-md-4 mb-3">
                  <div class="form-group">
                    <label>Precio por Presentación</label>
                    <input
                      type="number"
                      class="form-control"
                      placeholder="Precio por Presentación"
                      v-model="preciospresentacion.precio"
                      ref="precio"
                      :style="
                        showAdvertise &&
                        preciospresentacion.precio == '' &&
                        preciospresentacion.precio == 0
                          ? 'border-color: #e23e3d;'
                          : ''
                      "
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 text-center">
                  <button
                    class="btn btn-primary m-3"
                    type="button"
                    @click="loadPreciosPresentacion()"
                  >
                    Cancelar
                  </button>
                  <button
                    class="btn btn-primary"
                    type="button"
                    @click="guardarCambios"
                  >
                    Guardar
                  </button>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="table-responsive">
                    <table class="table table-bordered table-vcenter">
                      <thead>
                        <tr class="border-top">
                          <th>Decripcion Presentación</th>
                          <th>Descripción Unidad Medida</th>
                          <th>Cantidad Por Presentación</th>
                          <th>Precio</th>
                          <th>Opciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(item, index) in listaPrecios"
                          :key="'item-' + index"
                          v-if="listaPrecios.length != 0"
                        >
                          <td>{{ item.decripcionpresentacion }}</td>
                          <td>{{ item.descripcionunidadmedida }}</td>
                          <td>
                            {{
                              parseFloat(item.cantidadpresentacion).toFixed(2)
                            }}
                          </td>
                          <td>{{ parseFloat(item.precio).toFixed(2) }}</td>

                          <td class="text-center">
                            <i
                              title="Editar"
                              class="fa fa-pencil mx-1 text-yellow"
                              role="button"
                              @click="cargarVer(item, index)"
                            ></i>
                            <i
                              title="Eliminar"
                              class="fa fa-trash mx-1 text-danger"
                              role="button"
                              @click="cargarEliminar(item, index)"
                            ></i>
                          </td>
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
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import global from "../../../global";
import VueLoading from "../../../components/varios/VueLoading.vue";
export default {
  components: {
    VueLoading,
  },
  data() {
    return {
      showAdvertise: false,
      usuario: {},
      spinner: "bar-fade-scale",
      fullPage: true,
      isLoading: false,
      listaPrecios: [],
      listaUnidadMedida: [],
      cantidad: 0,
      productoid: 0,
      descripcionproducto: "",
      indiceModificando: -1,
      preciospresentacion: {},
      preciospresentacionBase: {
        presentacionesid: 0,
        productoid: 0,
        decripcionpresentacion: "",
        unidadmedidaid: "",
        cantidadpresentacion: 0,
        precio: 0,
      },
    };
  },
  methods: {
    ...mapActions({
      ListadoPreciosProductos: "_preciospresentacion/ListadoPreciosProductos",
      Unidad_Medida_Desplegable: "_unidadmedida/Unidad_Medida_Desplegable",
      AgregarRegistro: "_preciospresentacion/AgregarRegistro",
      ModificarRegistro: "_preciospresentacion/ModificarRegistro",
    }),
    cargarVer: function (item, index) {
      console.log(item);
      this.preciospresentacion.presentacionesid = item.presentacionesid;
      this.preciospresentacion.decripcionpresentacion =
        item.decripcionpresentacion;
      this.preciospresentacion.cantidadpresentacion = parseInt(
        item.cantidadpresentacion
      );
      this.preciospresentacion.unidadmedidaid = parseInt(item.unidadmedidaid);
      this.preciospresentacion.descripcionunidadmedida =
        item.descripcionunidadmedida;
      this.preciospresentacion.precio = parseFloat(item.precio).toFixed(2);

      this.indiceModificando = index;
    },
    validarFormulario() {
      let valida = false;

      if (this.preciospresentacion.decripcionpresentacion == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.decripcionpresentacion.focus();
        });
      } else if (this.preciospresentacion.unidadmedidaid == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.unidadmedidaid.focus();
        });
      } else if (
        this.preciospresentacion.cantidadpresentacion == 0 &&
        this.preciospresentacion.cantidadpresentacion == ""
      ) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.cantidadpresentacion.focus();
        });
      } else if (
        this.preciospresentacion.precio == 0 &&
        this.preciospresentacion.precio == ""
      ) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.precio.focus();
        });
      }

      return valida;
    },
    guardarCambios: async function () {
      var res = null;

      let valor = this.validarFormulario();
      if (!valor) {
        this.preciospresentacion.productoid = this.productoid;
        if (this.indiceModificando == -1) {
          res = await this.AgregarRegistro(this.preciospresentacion);
        } else {
          res = await this.ModificarRegistro(this.preciospresentacion);
        }
      }

      if (res?.exito) {
        this.loadPreciosPresentacion();
        this.cargarPreciosProductos(this.productoid);
        global._mensaje_exito("Los cambios se han guardado correctamente");
      }
    },
    loadPreciosPresentacion: function () {
      this.preciospresentacion = { ...this.preciospresentacionBase };
      this.indiceModificando = -1;
    },
    comboUnidadMedida: async function () {
      var res = await this.Unidad_Medida_Desplegable();
      this.listaUnidadMedida = res;
    },
    retornarProductos() {
      this.$router.push({
        name: "producto",
      });
    },
    cargarProducto: async function () {
      this.descripcionproducto = this.$route.query.descripcionproducto;
      this.productoid = this.$route.query.productoid;

      this.cargarPreciosProductos(this.productoid);
    },
    cargarPreciosProductos: async function (productoid) {
      let producto = {
        productoid: productoid,
      };

      let precios = await this.ListadoPreciosProductos(producto);
      this.listaPrecios = precios;
    },
  },
  mounted() {
    if (localStorage.getItem("login")) {
      this.usuario = JSON.parse(localStorage.getItem("login"));
    }
    this.loadPreciosPresentacion();
    this.cargarProducto();
    this.comboUnidadMedida();
  },
};
</script>

<style></style>
