<template>
  <vue-loading :fullPage="fullPage" :isLoading="isLoading" :spinner="spinner" :text="textloading" />
  <div class="card-header">
    <h3 class="card-title">Nota de Salida</h3>
  </div>
  <div class="card-body pb-2">
    <div class="tab-menu-heading tab-menu-heading-boxed" style="border-bottom: 0 !important">
      <div class="tabs-menu-boxed" style="float: right; width: 100%">
        <!-- Tabs -->
        <ul class="nav panel-tabs" style="float: right">
          <li>
            <a href="#listadoTab" class="active" data-bs-toggle="tab" id="tabListadoNotaSalida">LISTADO</a>
          </li>
          <li>
            <a href="#registrarTab" data-bs-toggle="tab" id="tabRegistrarNotaSalida">REGISTRAR</a>
          </li>
        </ul>
      </div>
    </div>
    <!-- DATOS GENERALES -->
    <div class="panel-body tabs-menu-body">
      <div class="tab-content">
        <div class="tab-pane active" id="listadoTab">
          <div class="mb-5 p-4 br-5">
            <div class="form-label mt-0 p-0">LISTA</div>
            <div class="row">
              <div class="col-md-4 mb-3">
                <div class="form-group">
                  <input type="date" class="form-control" v-model="fecha_inicio" />
                </div>
              </div>
              <div class="col-md-4 mb-3">
                <div class="form-group">
                  <input type="date" class="form-control" v-model="fecha_fin" />
                </div>
              </div>

              <div class="col-md-3 mb-3" style="text-align: left">
                <button type="button" class="btn btn-primary" style="margin: 2px" @click="cargarRegistros()">
                  <i class="fe fe-search me-2"></i>Buscar
                </button>
                <button type="button" class="btn btn-primary" @click="nuevoRegistro()">
                  <i class="fe fe-file me-2"></i>Nuevo
                </button>
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col-md-12">
                <div class="table-responsive">
                  <div class="text-center">
                    <loading :mostrar="cargando" />
                  </div>
                  <table class="table border text-nowrap text-md-nowrap table-striped table-sm mb-0"
                    v-if="listadoRegistro.length != 0">
                    <thead>
                      <tr>
                        <th>Fecha Salida</th>
                        <th>Nº Salida</th>
                        <th>Personal</th>
                        <th>Concepto</th>
                        <th>Almacén</th>
                        <th class="text-center">Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in listadoRegistro" :key="'item-' + index">
                        <td>
                          <span :style="item.estadoid == 2
                            ? 'text-decoration-line: line-through;color:red'
                            : ''
                            ">
                            {{ item.fechasalida }}</span>
                        </td>
                        <td>
                          <span :style="item.estadoid == 2
                            ? 'text-decoration-line: line-through;color:red'
                            : ''
                            ">
                            {{ item.nrodocumentosalida }}</span>
                        </td>
                        <td>
                          <span :style="item.estadoid == 2
                            ? 'text-decoration-line: line-through;color:red'
                            : ''
                            ">{{ item.nombres + " " + item.apellidos }}</span>
                        </td>
                        <td>
                          <span :style="item.estadoid == 2
                            ? 'text-decoration-line: line-through;color:red'
                            : ''
                            ">{{ item.descripcionconcepto }}</span>
                        </td>
                        <td>
                          <span :style="item.estadoid == 2
                            ? 'text-decoration-line: line-through;color:red'
                            : ''
                            ">{{ item.descripcionalmacen }}</span>
                        </td>
                        <td class="text-center">
                          <i class="fa fa-pencil mx-1 text-yellow" role="button" title="Editar"
                            v-show="item.estadoid == 1" @click="cargarVer(item, index)"></i>
                          <i class="fa fa-trash mx-1 text-danger" role="button" v-show="item.estadoid == 1"
                            @click="anularNotaSalida(item)" title="Anular"></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="text-center" v-else>
                    <span class="fw-bold fs-18">Detalle Vacio</span>
                  </div>
                  <div class="pagination justify-content-center mt-2">
                    <paginate :page-count="totalPaginas" :click-handler="cambiarPagina" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane" id="registrarTab">
          <div class="form-label mt-0 p-0">
            <button type="button" class="btn btn-primary" @click="nuevoRegistro()">
              <i class="fe fe-file me-2"></i>Nuevo
            </button>
          </div>

          <div class="col-md-12 row">
            <div class="border mb-5 p-4 br-5">
              <div class="form-label mt-0 p-0">DATOS GENERALES</div>
              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Razón</label>
                    <input type="text" class="form-control" v-model="notasalida.razon" placeholder="Razón" ref="razon"
                      :style="showAdvertise && notasalida.razon == ''
                        ? 'border-color: #e23e3d;'
                        : ''
                        " />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Destino</label>
                    <input type="text" class="form-control" placeholder="Destino" v-model="notasalida.destino"
                      ref="destino" :style="showAdvertise && notasalida.destino == ''
                        ? 'border-color: #e23e3d;'
                        : ''
                        " />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Fecha de Salida</label>
                    <input type="datetime-local" class="form-control" v-model="notasalida.fechasalida"
                      placeholder="Fecha de Ingreso" ref="fechasalida" :style="showAdvertise && notasalida.fechasalida == ''
                        ? 'border-color: #e23e3d;'
                        : ''
                        " />
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="form-group">
                    <label>Personal</label>
                    <select class="form-control form-select" data-bs-placeholder="Moneda"
                      v-model="notasalida.personalid" ref="personalid" :style="showAdvertise && notasalida.personalid == 0
                        ? 'border-color: #e23e3d;'
                        : ''
                        ">
                      <option value="0">Seleccionar Personal</option>
                      <option v-for="item in personal" :key="item.id" :label="item.nombre" :value="item.id"></option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="form-label mt-0 p-0">OTROS DATOS</div>
              <div class="row">
                <div class="col-md-3">
                  <div class="form-group">
                    <label>Almacén</label>
                    <select class="form-control form-select" data-bs-placeholder="Almacén"
                      v-model="notasalida.almacenid" ref="almacenid" :style="showAdvertise && notasalida.almacenid == 0
                        ? 'border-color: #e23e3d;'
                        : ''
                        ">
                      <option value="0">Seleccionar Almacén</option>
                      <option v-for="item in almacenes" :key="item.id" :label="item.nombre" :value="item.id"></option>
                    </select>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                    <label>Tipo Movimiento</label>
                    <select class="form-control form-select" data-bs-placeholder="Tipo Movimiento"
                      v-model="notasalida.conceptomovimientoid" ref="conceptomovimientoid"
                      @change="showDescripcionTipoMovimiento()" :style="showAdvertise && notasalida.conceptomovimientoid == 0
                        ? 'border-color: #e23e3d;'
                        : ''
                        ">
                      <option value="0">Seleccionar Tipo Movimiento</option>
                      <option v-for="item in conceptomovimientos" :key="item.id" :label="item.nombre" :value="item.id">
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <label>Observación</label>
                    <input type="text" class="form-control" v-model="notasalida.observacion"
                      placeholder="Observación" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="panel-body tabs-menu-body">
              <div class="tab-content">
                <div class="tab-menu-heading">
                  <div class="tabs-menu">
                    <!-- Tabs -->
                    <ul class="nav panel-tabs panel-info" id="tabs">
                      <li>
                        <a href="#detallecomprobanteTab" class="active" data-bs-toggle="tab"
                          id="DetalleComprobante">Detalle Comprobante</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="panel-body tabs-menu-body">
                  <div class="tab-content">
                    <!-- LISTADO TAB -->
                    <div class="tab-pane active" id="detallecomprobanteTab">
                      <div class="border mb-5 p-4 br-5">
                        <div class="form-label mt-0 p-0">
                          DETALLE DEL COMPROBANTE
                        </div>
                        <div class="row">
                          <div class="col-md-4 mb-3" style="text-align: center">
                            <div class="input-group d-flex w-100 float-end">
                              <input type="text" class="form-control border-end-0 my-2" placeholder="Search ..."
                                ref="barcode" v-model="barcode" @keyup.enter="buscarPorCodigo()" />
                              <button class="btn input-group-text bg-transparent border-start-0 text-muted my-2">
                                <i class="fe fe-search text-muted" aria-hidden="true"></i>
                              </button>
                            </div>
                            <!-- <div class="form-group">
                              <el-select size="large" style="width: 100%" v-model="producto" filterable ref="producto"
                                placeholder="Productos" @change="obtenerProducto()">
                                <el-option v-for="item in listaProductos" :key="item.productoid"
                                  :label="item.descripcionproducto" :value="item.productoid"></el-option>
                              </el-select>
                            </div> -->
                          </div>
                          <!-- <div class="col-md-2 mb-3" style="text-align: center">
                            <div class="form-group">
                              <input type="text" class="form-control" placeholder="Unidad Medida" v-model="unidadmedida"
                                disabled />
                            </div>
                          </div>
                          <div class="col-md-2 mb-3" style="text-align: center">
                            <div class="form-group">
                              <input type="text" class="form-control" placeholder="Costo" v-model="costoproducto"
                                min="0" />
                            </div>
                          </div>
                          <div class="col-md-2 mb-3" style="text-align: center">
                            <div class="form-group">
                              <input type="text" class="form-control" placeholder="Cant Presentación"
                                v-model="cantidadpresentacion" ref="cantidadpresentacion"
                                @keypress.enter="cambiarCantidad()" min="0" />
                            </div>
                          </div>
                          <div class="col-md-2 mb-3" style="text-align: center">
                            <div class="form-group">
                              <input type="text" class="form-control" placeholder="Cantidad" v-model="cantidad"
                                ref="cantidad" @keypress.enter="agregarProductos()" min="0" />
                            </div>
                          </div> -->
                        </div>
                        <div class="row">
                          <div class="col-md-12">
                            <div class="table-responsive">
                              <table class="table table-bordered table-vcenter" v-if="listaDetalle.length > 0">
                                <thead>
                                  <tr class="border-top">
                                    <th>Cód</th>
                                    <th>Producto</th>
                                    <th>Und</th>
                                    <th>Pres</th>
                                    <th>Cant Und</th>
                                    <th>Cantidad</th>
                                    <th>Atendido</th>
                                    <th>PorAtender</th>
                                    <th>Precio</th>
                                    <th>Opciones</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr v-for="(item, index) in listaDetalle" :key="'item-' + index">
                                    <td>{{ item.productoid }}</td>
                                    <td>{{ item.descripcionproducto }}</td>
                                    <td>{{ item.unidadmedida }}</td>
                                    <td>{{ item.presentacionesid }}</td>
                                    <td>
                                      <input type="number" class="form-control" v-model="item.cantidadpresentacion"
                                        min="1" />
                                    </td>
                                    <td>
                                      {{
                                        parseFloat(item.cantidadsolicitada, 2)
                                      }}
                                    </td>
                                    <td>{{ parseFloat(item.atendido, 2) }}</td>
                                    <td>
                                      <div class="handle-counter" id="handleCounter4">
                                        <button type="button" class="counter-minus btn btn-white lh-2 shadow-none"
                                          @click="disminuirCantidad(index)">
                                          <i class="fa fa-minus text-muted"></i>
                                        </button>
                                        <input type="text" :value="`${parseFloat(
                                          item.poratender,
                                          2
                                        )}`" class="qty" min="1" readonly />
                                        <button type="button" class="counter-plus btn btn-white lh-2 shadow-none"
                                          @click="aumentarCantidad(index)">
                                          <i class="fa fa-plus text-muted"></i>
                                        </button>
                                      </div>
                                    </td>
                                    <td>
                                      {{ parseFloat(item.preciocompra, 2) }}
                                    </td>
                                    <td class="text-center">
                                      <i title="Eliminar" class="fa fa-trash mx-1 text-danger" role="button" @click="
                                        cargarEliminarDetalle(item, index)
                                        "></i>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <div class="text-center" v-else>
                                <span class="fw-bold fs-18">Detalle Vacio</span>
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
          </div>
          <div class="row">
            <div class="col-md-12 text-center">
              <button class="btn btn-primary m-2" type="button" @click="cargarCancelar()">
                Cancelar
              </button>
              <button class="btn btn-primary" type="button" @click="guardarCambios()">
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Loading from "../../../components/varios/Loading.vue";
import Paginate from "../../../components/varios/Paginate.vue";

//Library
import VueLoading from "../../../components/varios/VueLoading.vue";
import dayjs from "dayjs";

import global from "../../../global";
export default {
  name: "NotaSalida",
  components: {
    Paginate,
    Loading,
    VueLoading,
  },
  data() {
    return {
      barcode: "",
      reloadDataComprasProvisionar: false,
      textloading: "",
      spinner: "bar-fade-scale",
      isLoading: false,
      fullPage: true,
      conceptomovimientos: [],
      descripcionconceptomovimiento: "",
      personal: [],
      almacenes: [],
      showAdvertise: false,
      usuario: {},
      indiceModificando: -1,
      listadoRegistro: [],
      totalPaginas: 0,
      pagination: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [10, 15, 25, 50],
        total: 0,
      },
      date: new Date(),
      currentDate: dayjs(this.date).format("YYYY-MM-DD"),
      fecha_inicio: dayjs(this.date).format("YYYY-MM-DD"),
      fecha_fin: dayjs(this.date).format("YYYY-MM-DD"),
      cargando: false,
      numruc: "",
      razonsocial: "",
      tipocomprobante: "",
      listaProductos: [],
      listaDetalle: [],
      producto: null,
      unidadmedida: "",
      presentacionesid: 0,
      cantidad: null,
      cantidadpresentacion: 1,
      descripcionproducto: "",
      costoproducto: null,
      correlativoNroDocumentoSalida: "",
      notasalida: {},
      notasalidaBase: {
        notasalidaid: 0,
        fechasalida: "",
        nrodocumentosalida: "",
        personalid: 0,
        conceptomovimientoid: 0,
        almacenid: 0,
        razon: "",
        destino: "",
        observacion: "",
        user: "",
        notasalidadetalle: [
          {
            notasalidaid: 0,
            productoid: 0,
            cantidad: 0,
            cantidadpresentacion: 0,
            precio: 0,
            presentacionesid: 0,
          },
        ],
      },
      movimientoid: 0,
      movimiento: {
        movimientoid: 0,
        fechamovimiento: "",
        nrodocumento: "",
        tipodocumento: "",
        razon: "",
        tipomovimiento: "",
        nronotaingreso: "",
        nronotasalida: "",
        user: "",
        movimientosdetalle: [
          {
            movimientoid: 0,
            productoid: 0,
            cantidad: 0,
            cantidadpresentacion: 0,
            precio: 0,
            importe: 0,
            almacenid: 0,
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions({
      ListadoNotaSalida: "_notasalida/ListadoNotaSalida",
      AgregarNotaSalida: "_notasalida/AgregarNotaSalida",
      ActualizarNotaSalida: "_notasalida/ActualizarNotaSalida",
      NumeracionNotaSalida: "_notasalida/NumeracionNotaSalida",
      ActualizarNotaIngreso: "_notasalida/ActualizarNotaIngreso",
      AgregarMovimiento: "_movimientos/AgregarMovimiento",
      ActualizarMovimiento: "_movimientos/ActualizarMovimiento",
      ListarProductos: "_producto/ListarRegistros",
      ObtenerProducto: "_producto/ObtenerProducto",
      ConceptoMovimientoDesplegable:
        "_conceptomovimiento/ConceptoMovimientoDesplegable",
      AlmacenDesplegable: "_almacen/AlmacenDesplegable",
      AnularNotaSalida: "_notasalida/AnularNotaSalida",
      PersonalDesplegable: "_personal/PersonalDesplegable",
      DetelleNotaSalida: "_notasalida/DetelleNotaSalida",
      AnularNotaSalidaoDetalle: "_notasalida/AnularNotaSalidaoDetalle",
      ObtenerPreciosPresentacion: "_producto/ObtenerPreciosPresentacion",
    }),
    cambiarCantidad() {
      this.$refs.cantidad.focus();
    },
    cargarDetalleNotaSalida: async function (notasalidaid) {
      let buscar = {
        notasalidaid: notasalidaid,
      };
      let res = await this.DetelleNotaSalida(buscar);

      return res;
    },
    comboPersonal: async function () {
      var res = await this.PersonalDesplegable();
      this.personal = res.filter((personal) => personal.cargoid != 2);
    },
    showDescripcionTipoMovimiento() {
      this.conceptomovimientos.forEach((element) => {
        if (element.id == this.notasalida.conceptomovimientoid) {
          this.descripcionconceptomovimiento = element.nombre;
        }
      });
    },
    abrirModalBuscarComprasProvisionar() {
      this.reloadDataComprasProvisionar = true;
      new bootstrap.Modal($("#modalBuscarComprasProvisionar")).show(); // Abrir modal
    },
    numeracionNotaSalida: async function () {
      let res = await this.NumeracionNotaSalida();
      console.log(res);
      this.correlativoNroDocumentoSalida = res.numero_notasalida;
    },
    ComboAlmacen: async function () {
      let res = await this.AlmacenDesplegable();
      this.almacenes = res;
    },
    ComboConceptoMovimiento: async function () {
      let res = await this.ConceptoMovimientoDesplegable();
      this.conceptomovimientos = res;
    },
    cargarCancelar() {
      this.showAdvertise = false;
      this.loadNotaSalida();
      this.cambiarTabListar();
    },
    cargarVer: async function (item, index) {
      this.movimientoid = item.movimientoid;
      this.descripcionconceptomovimiento = item.descripcionconcepto;
      this.notasalida.nrodocumentosalida = item.nrodocumentosalida;
      this.notasalida.personalid = item.personalid;
      this.notasalida.notasalidaid = item.notasalidaid;
      this.notasalida.almacenid = parseInt(item.almacenid);
      this.notasalida.conceptomovimientoid = parseInt(
        item.conceptomovimientoid
      );
      this.notasalida.personalid = item.personalid;
      this.notasalida.destino = item.destino;
      this.notasalida.razon = item.razon;

      this.notasalida.fechasalida = dayjs(item.fechasalida2).format(
        "YYYY-MM-DDTHH:mm"
      );
      this.notasalida.monedaid = item.monedaid;
      this.notasalida.observacion = item.observacion;

      this.listaDetalle = await this.cargarDetalleNotaSalida(item.notasalidaid);

      this.indiceModificando = index;
      this.cambiarTabRegistro();
    },
    cargarDetalle: async function (doccompraid) {
      let buscar = {
        doccompraid: doccompraid,
      };
      let res = await this.DetalleComprasProvisionar(buscar);

      return res;
    },
    nuevoRegistro() {
      this.loadNotaSalida();
      this.cambiarTabRegistro();
    },
    cambiarTabListar() {
      document.getElementById("tabRegistrarNotaSalida").className = "";
      document.getElementById("registrarTab").className = "tab-pane";
      document.getElementById("tabListadoNotaSalida").className = "active";
      document.getElementById("listadoTab").className = "tab-pane active";
    },
    cambiarTabRegistro() {
      document.getElementById("tabRegistrarNotaSalida").className = "active";
      document.getElementById("registrarTab").className = "tab-pane active";
      document.getElementById("tabListadoNotaSalida").className = "";
      document.getElementById("listadoTab").className = "tab-pane";
    },
    loadNotaSalida: function () {
      this.notasalida = { ...this.notasalidaBase };
      this.indiceModificando = -1;

      this.razonsocial = "";
      this.numruc = "";

      this.listaDetalle = [];

      this.numeracionNotaSalida();
    },
    cargarEliminarDetalle: async function (item, index) {
      let res = null;
      global._swal_pregunta(
        "¿Está seguro que desea anular el producto?",
        "Advertencia",
        async () => {
          if (item.notasalidaid == 0) {
            this.listaDetalle.splice(index, 1);
            global._mensaje_exito("El comprobante se anuló con éxito.");
          } else {
            let buscar = {
              notasalidadetalleid: item.notasalidadetalleid,
              productoid: item.productoid,
              movimientoid: this.movimientoid,
            };
            res = await this.AnularNotaSalidaoDetalle(buscar);
            if (res?.exito) {
              global._mensaje_exito("El comprobante se anuló con éxito.");
              this.listaDetalle.splice(index, 1);
              this.listaDetalle = await this.cargarDetalleNotaSalida(
                item.notasalidaid
              );
            }
          }
        }
      );
    },
    anularNotaSalida: async function (item) {
      let notasalida = {
        notasalidaid: item.notasalidaid,
        nrodocumentosalida: item.nrodocumentosalida,
        user: this.usuario.usuario,
      };

      try {
        global._swal_pregunta(
          "¿Está seguro que desea anular el registro?",
          "Advertencia",
          async () => {
            this.isLoading = true;
            this.textloading = "Anulando notasalida en el sistema";
            let resnotaingreso = await this.AnularNotaSalida(notasalida);
            if (resnotaingreso?.exito) {
              ElNotification({
                title: "Éxito",
                duration: 0,
                message: "La nota de salida se ha anulado correctamente.",
                type: "success",
              });

              this.cargarRegistros();
              this.isLoading = false;
            }
          }
        );
      } catch (error) {
        this.isLoading = false;
        global._mensaje_error("Ocurrio un error", error);
      }
    },
    aumentarCantidad(index) {
      this.listaDetalle[index].poratender =
        parseFloat(this.listaDetalle[index].poratender) + 1;
    },
    disminuirCantidad(index) {
      this.listaDetalle[index].poratender =
        this.listaDetalle[index].poratender - 1;
      if (this.listaDetalle[index].poratender === 0) {
        delete this.listaDetalle[index];
      }
    },
    agregarProductos() {
      let unidadMedida,
        cantidad,
        costoproducto,
        cantidadpresentacion = null;
      let presentacionesid = 0;

      unidadMedida = this.unidadmedida;
      costoproducto = parseFloat(this.costoproducto, 2);
      cantidad = this.cantidad;
      cantidadpresentacion = this.cantidadpresentacion;
      presentacionesid = this.presentacionesid;

      let productos = {
        notasalidadetalleid: 0,
        numItem: this.listaDetalle.length + 1,
        productoid: this.producto,
        descripcionproducto: this.descripcionproducto,
        unidadmedida: unidadMedida,
        cantidadpresentacion: cantidadpresentacion,
        poratender: cantidad,
        cantidadsolicitada: 0,
        atendido: 0,
        preciocompra: costoproducto,
        presentacionesid: presentacionesid,
      };
      if (this.insumo != "" && this.unidadmedida != "" && this.cantidad != 0) {
        let isNew;
        isNew = true;
        this.listaDetalle.forEach((item) => {
          if (parseInt(item.productoid) == parseInt(this.producto)) {
            isNew = false;
          }
        });
        if (isNew) {
          this.listaDetalle.push(productos);

          this.insumo = null;
          this.unidadmedida = null;
          this.cantidad = null;
          this.costoproducto = null;
          this.cantidadpresentacion = 1;
          this.presentacionesid = 0;
          this.$refs.barcode.focus();

          ElNotification({
            title: "Éxito",
            duration: 1500,
            message:
              "Se agregó " + 1 + " " + this.descripcionproducto + ".",
            type: "success",
          });
        } else {
          global._mensaje_advertencia(
            "Producto duplicado, debe actualizar el registro!"
          );
        }
      } else {
        global._mensaje_advertencia("Ingrese los datos correctos!");
      }
    },
    buscarPorCodigo: async function () {
      if (!this.barcode) return;

      try {
        // Llamas a tu backend Laravel
        const response = await this.ObtenerPreciosPresentacion({ codigo: this.barcode });
        const producto = response;
        console.log(producto);
        if (producto) {
          // Lo agregas al pedido directamente

          this.unidadmedida = producto.unidadmedida;
          this.costoproducto = producto.precio;
          this.cantidad = 1;
          this.cantidadpresentacion = producto.cantidadunidadmedida;
          this.presentacionesid = producto.presentacionesid;
          this.producto = producto.productoid;
          this.descripcionproducto = producto.decripcionpresentacion;

          this.agregarProductos();
        } else {
          ElNotification({
            title: "Error",
            message: "Producto no encontrado",
            type: "error",
          });
        }
      } catch (error) {
        console.log(error);
        ElNotification({
          title: "Error",
          message: "Código no encontrado o conexión fallida",
          type: "error",
        });
      }

      // Limpia el input para el siguiente escaneo
      this.barcode = "";
    },
    obtenerProducto: async function () {
      let producto = {
        productoid: this.producto,
      };
      let res = await this.ObtenerProducto(producto);

      if (res != null) {
        this.descripcionproducto = res.descripcionproducto;
        this.unidadmedida = res.unidadmedida;
        this.costoproducto = parseFloat(res.costo, 2);
        this.cantidadpresentacion = parseInt(res.cantidadunidadmedida);
        this.presentacionesid = res.presentacionesid;
        this.$refs.cantidad.focus();
      }
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
    cambiarPagina: function (paginaDestino) {
      this.cargarRegistros(paginaDestino);
    },
    cargarRegistros: async function (pagina = 1) {
      this.cargando = true;
      let buscar = {
        page_index: pagina,
        page_size: 10,
        fecha_inicio: this.fecha_inicio,
        fecha_fin: this.fecha_fin,
      };

      let res = await this.ListadoNotaSalida(buscar);
      this.listadoRegistro = res.datos.map((el) => ({
        ...el,
        fechasalida: dayjs(el.fechasalida).format("DD-MM-YYYY"),
        fechasalida2: el.fechasalida,
      }));

      this.totalPaginas = res.totalPaginas;
      this.cargando = false;
    },
    validarRegistro() {
      let valida = false;

      if (this.notasalida.fechasalida == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.fechasalida.focus();
        });
      } else if (this.notasalida.personalid == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.personalid.focus();
        });
      } else if (this.notasalida.razon == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.razon.focus();
        });
      } else if (this.notasalida.destino == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.destino.focus();
        });
      } else if (this.notasalida.almacenid == 0) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.almacenid.focus();
        });
      } else if (this.notasalida.conceptomovimientoid == 0) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.conceptomovimientoid.focus();
        });
      }

      return valida;
    },
    procesarMovimientosAlmacen: async function () {
      this.movimiento.movimientoid = this.movimientoid;
      this.movimiento.fechamovimiento = this.notasalida.fechasalida;
      this.movimiento.nrodocumento = "";
      this.movimiento.tipodocumento = "NOTA SALIDA";
      this.movimiento.razon = this.descripcionconceptomovimiento;
      this.movimiento.tipomovimiento = "SALIDA";
      this.movimiento.nronotaingreso = "";
      this.movimiento.nronotasalida = this.correlativoNroDocumentoSalida;
      this.movimiento.user = this.usuario.usuario;

      let detalleProducto = [];
      this.listaDetalle.forEach((item) => {
        let productos = {
          movimientoid: item.notasalidadetalleid == 0 ? 0 : this.movimientoid,
          productoid: item.productoid,
          precio: parseFloat(item.preciocompra),
          cantidad: item.poratender,
          presentacion: item.unidadmedida,
          cantidadpresentacion: item.cantidadpresentacion,
          importe: item.poratender * item.preciocompra,
          almacenid: this.notasalida.almacenid,
          presentacionesid: item.presentacionesid
        };

        detalleProducto.push(productos);
      });
      this.movimiento.movimientosdetalle = detalleProducto;

      this.isLoading = true;
      this.textloading = "Procesando Movimiento Almacén";
      let res = null;

      if (this.indiceModificando == -1) {
        res = await this.AgregarMovimiento(this.movimiento);
      } else {
        res = await this.ActualizarMovimiento(this.movimiento);
      }

      if (res?.exito) {
        this.isLoading = false;
        ElNotification({
          title: "Success",
          duration: 1500,
          message: "Movimiento Almacén se generó correctamente",
          type: "success",
        });
      }
    },
    guardarCambios: async function () {
      var res = null;
      let valor = this.validarRegistro();

      if (!valor && this.listaDetalle.length > 0) {
        this.procesarDetalle();
        this.notasalida.user = this.usuario.usuario;
        this.notasalida.nrodocumentosalida = this.correlativoNroDocumentoSalida;

        global._swal_pregunta(
          "¿Está seguro que desea procesar la nota de salida?",
          "Advertencia",
          async () => {
            this.isLoading = true;
            this.textloading = "Procesando Nota de Salida";
            if (this.indiceModificando == -1) {
              res = await this.AgregarNotaSalida(this.notasalida);
            } else {
              res = await this.ActualizarNotaSalida(this.notasalida);
            }
            if (res?.exito) {
              this.isLoading = false;
              ElNotification({
                title: "Success",
                duration: 1500,
                message: "Nota de Salida se generó correctamente",
                type: "success",
              });

              this.procesarMovimientosAlmacen();
              this.showAdvertise = false;
              this.loadNotaSalida();
              this.cargarRegistros();
              this.cambiarTabListar();
            }
          }
        );
      } else if (valor) {
        alert("Debe llenar los campos vacios, gracias!");
      } else if (this.listaDetalle.length == 0) {
        global._mensaje_advertencia(
          "Detalle vacio, por favor verificar, gracias!"
        );
      }
    },
    procesarDetalle: function () {
      let detalleProducto = [];
      this.listaDetalle.forEach((item) => {
        let productos = {
          notasalidadetalleid: item.notasalidadetalleid,
          productoid: item.productoid,
          precio: parseFloat(item.preciocompra),
          cantidad: item.poratender,
          cantidadpresentacion: item.cantidadpresentacion,
          presentacionesid: item.presentacionesid,
        };

        detalleProducto.push(productos);
      });
      this.notasalida.notasalidadetalle = detalleProducto;
    },
  },

  mounted() {
    if (localStorage.getItem("login")) {
      this.usuario = JSON.parse(localStorage.getItem("login"));
    }

    this.cargarRegistros();
    this.comboPersonal();
    this.comboProductos();
    this.ComboConceptoMovimiento();
    this.ComboAlmacen();
    this.loadNotaSalida();
  },
  computed: {},
};
</script>
<style lang="css" scoped>
.el-select {
  --el-select-input-focus-border-color: #e23e3d;
}
</style>
