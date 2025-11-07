<template>
  <vue-loading :fullPage="fullPage" :isLoading="isLoading" :spinner="spinner" :text="textloading" />
  <div class="card-header">
    <h3 class="card-title">Nota de Ingreso</h3>
  </div>
  <div class="card-body pb-2">
    <div class="tab-menu-heading tab-menu-heading-boxed" style="border-bottom: 0 !important">
      <div class="tabs-menu-boxed" style="float: right; width: 100%">
        <!-- Tabs -->
        <ul class="nav panel-tabs" style="float: right">
          <li>
            <a href="#listadoTab" class="active" data-bs-toggle="tab" id="tabListadoNotaIngreso">LISTADO</a>
          </li>
          <li>
            <a href="#registrarTab" data-bs-toggle="tab" id="tabRegistrarNotaIngreso">REGISTRAR</a>
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
              <div class="col-md-3 mb-3">
                <div class="form-group">
                  <input type="date" class="form-control" v-model="fecha_inicio" />
                </div>
              </div>
              <div class="col-md-3 mb-3">
                <div class="form-group">
                  <input type="date" class="form-control" v-model="fecha_fin" />
                </div>
              </div>

              <div class="col-md-6 mb-3" style="text-align: left">
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
                        <th>Fecha Entrada</th>
                        <th>Nº Ingreso</th>
                        <th>Proveedor</th>
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
                            {{ item.fechaentrada }}</span>
                        </td>
                        <td>
                          <span :style="item.estadoid == 2
                            ? 'text-decoration-line: line-through;color:red'
                            : ''
                            ">
                            {{ item.nrodocumentoingreso }}</span>
                        </td>
                        <td>
                          <span :style="item.estadoid == 2
                            ? 'text-decoration-line: line-through;color:red'
                            : ''
                            ">{{ item.razonsocial }}</span>
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
                            @click="anularNotaIngreso(item)" title="Anular"></i>
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
            <button type="button" class="btn btn-primary" @click="nuevoRegistro()" style="margin: 2px">
              <i class="fe fe-file me-2"></i>Nuevo
            </button>
            <input type="file" id="files" style="display: none" />
            <button type="button" class="btn btn-primary" @click="openDocumentFile">
              <i class="fe fe-upload me-2"></i>
              Importar
            </button>
          </div>

          <div class="col-md-12 row">
            <div class="border mb-5 p-4 br-5">
              <div class="form-label mt-0 p-0">DATOS GENERALES</div>
              <div class="row">
                <div class="col-md-2">
                  <div class="form-group">
                    <label>Serie Factura</label>
                    <div class="input-group">
                      <input type="text" class="form-control" placeholder="Serie Factura"
                        v-model="notaingreso.seriefactura" aria-label="Example text with button addon"
                        aria-describedby="button-addon1" />
                      <button type="button" class="btn btn-primary" @click="abrirModalBuscarComprasProvisionar()">
                        <i class="fe fe-search me-2"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="form-group">
                    <label>Número Factura</label>
                    <input type="text" class="form-control" v-model="notaingreso.numfactura"
                      placeholder="Número Factura" @blur="cerosSerieComprobante()" />
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="form-group">
                    <label>Serie Guía</label>
                    <input type="text" class="form-control" placeholder="Serie Guía" v-model="notaingreso.serieguia"
                      @blur="cerosSerieComprobante()" />
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="form-group">
                    <label>Número Guía</label>
                    <input type="text" class="form-control" placeholder="Número Guía" v-model="notaingreso.numguia"
                      @blur="cerosSerieComprobante()" />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Fecha de Ingreso</label>
                    <input type="datetime-local" class="form-control" v-model="notaingreso.fechaentrada"
                      placeholder="Fecha de Ingreso" ref="fechaentrada" :style="showAdvertise && notaingreso.fechaentrada == ''
                        ? 'border-color: #e23e3d;'
                        : ''
                        " />
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="form-group">
                    <label>Moneda</label>
                    <select class="form-control form-select" data-bs-placeholder="Moneda" v-model="notaingreso.monedaid"
                      ref="monedaid" :style="showAdvertise && notaingreso.monedaid == 0
                        ? 'border-color: #e23e3d;'
                        : ''
                        ">
                      <option value="0">Seleccionar Moneda</option>
                      <option v-for="item in monedas" :key="item.id" :label="item.nombre" :value="item.id"></option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="form-label mt-0 p-0">DATOS DEL PROVEEDOR</div>
              <div class="row">
                <div class="col-md-3">
                  <div class="form-group">
                    <label>RUC/DNI</label>
                    <div class="input-group">
                      <input type="text" class="form-control" placeholder="RUC/DNI"
                        aria-label="Example text with button addon" aria-describedby="button-addon1" v-model="numruc"
                        @keypress.enter="obtenerProveedorByNumRuc()" ref="numruc" :style="(showAdvertise && numruc == '') ||
                          razonsocial == 'PROVEEDOR NO EXISTE'
                          ? 'border-color: #e23e3d;'
                          : ''
                          " />
                      <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                        data-bs-target="#modalBuscarProveedor">
                        <i class="fe fe-search me-2"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="col-md-9">
                  <div class="form-group">
                    <label>Razon Social</label>
                    <input type="text" class="form-control" placeholder="Razon Social" disabled v-model="razonsocial"
                      ref="razonsocial" :style="(showAdvertise && razonsocial == '') ||
                        razonsocial == 'PROVEEDOR NO EXISTE'
                        ? 'border-color: #e23e3d;'
                        : ''
                        " />
                  </div>
                </div>
              </div>
              <div class="form-label mt-0 p-0">OTROS DATOS</div>
              <div class="row">
                <div class="col-md-3">
                  <div class="form-group">
                    <label>Almacén</label>
                    <select class="form-control form-select" data-bs-placeholder="Almacén"
                      v-model="notaingreso.almacenid" ref="almacenid" :style="showAdvertise && notaingreso.almacenid == 0
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
                      v-model="notaingreso.conceptomovimientoid" ref="conceptomovimientoid"
                      @change="showDescripcionTipoMovimiento()" :style="showAdvertise && notaingreso.conceptomovimientoid == 0
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
                    <input type="text" class="form-control" v-model="notaingreso.observacion"
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
                              <el-select size="large" style="width: 100%" v-model="producto" filterable
                                placeholder="Productos" ref="producto" @change="obtenerProducto()">
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
                              <input type="text" class="form-control" placeholder="Costo" v-model="costoinsumo"
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
                                ref="cantidad" @keypress.enter="agregarProductos()" min="0" :disabled="notaingreso.doccompraid == 0 ? false : true
                                  " />
                            </div>
                          </div> -->
                        </div>
                        <div class="row">
                          <div class="col-md-12">
                            <div class="overflow-auto" style="height: 350px">
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
                                      <td>
                                        {{ parseFloat(item.atendido, 2) }}
                                      </td>
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
  <modal-buscar-proveedor id="modalBuscarProveedor" @selectProveedor="selectProveedor" @closeModal="closeModal" />

  <modal-buscar-compras-provisionar id="modalBuscarComprasProvisionar" :reloadData="reloadDataComprasProvisionar"
    @selectCompra="selectCompra" @closeModalComprasProvisionar="closeModalComprasProvisionar" />
</template>

<script>
import { mapActions } from "vuex";
import Loading from "../../../components/varios/Loading.vue";
import Paginate from "../../../components/varios/Paginate.vue";

import ModalBuscarProveedor from "../../../components/busquedas/ModalBuscarProveedor.vue";
import ModalBuscarComprasProvisionar from "../../../components/busquedas/ModalBuscarComprasProvisionar.vue";

//Library
import VueLoading from "../../../components/varios/VueLoading.vue";
import dayjs from "dayjs";
import * as XLSX from "xlsx/xlsx.mjs";

import global from "../../../global";
export default {
  name: "NotaIngreso",
  components: {
    Paginate,
    Loading,
    ModalBuscarProveedor,
    ModalBuscarComprasProvisionar,
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
      monedas: [],
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
      costoinsumo: null,
      correlativoNroDocumentoIngreso: "",
      notaingreso: {},
      notaingresoBase: {
        notaentradaid: 0,
        fechaentrada: "",
        monedaid: 0,
        nrodocumentoingreso: "",
        seriefactura: "",
        numfactura: "",
        serieguia: "",
        numguia: "",
        proveedorid: 0,
        conceptomovimientoid: 0,
        almacenid: 0,
        observacion: "",
        user: "",
        doccompraid: 0,
        notaingresodetalle: [
          {
            notaentradadetalleid: 0,
            productoid: 0,
            cantidad: 0,
            precio: 0,
            cantidadpresentacion: 0,
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
      ListadoNotaIngreso: "_notaingreso/ListadoNotaIngreso",
      AgregarNotaIngreso: "_notaingreso/AgregarNotaIngreso",
      NumeracionNotaingreso: "_notaingreso/NumeracionNotaingreso",
      ActualizarNotaIngreso: "_notaingreso/ActualizarNotaIngreso",
      AgregarMovimiento: "_movimientos/AgregarMovimiento",
      ActualizarMovimiento: "_movimientos/ActualizarMovimiento",
      GetProveedorByNumRuc: "_proveedor/GetProveedorByNumRuc",
      ListarRegistrosPrecios: "_producto/ListarRegistrosPrecios",
      ObtenerProducto: "_producto/ObtenerProducto",
      DetalleComprasProvisionar: "_compra/DetalleComprasProvisionar",
      ConceptoMovimientoDesplegable:
        "_conceptomovimiento/ConceptoMovimientoDesplegable",
      AlmacenDesplegable: "_almacen/AlmacenDesplegable",
      ListarMoneda: "_moneda/Listar",
      AnularNotaIngreso: "_notaingreso/AnularNotaIngreso",
      DetalleCompras: "_compra/DetalleCompras",
      DetelleNotaIngreso: "_notaingreso/DetelleNotaIngreso",
      AnularNotaIngresoDetalle: "_notaingreso/AnularNotaIngresoDetalle",
      ObtenerPreciosPresentacion: "_producto/ObtenerPreciosPresentacion",
    }),
    openDocumentFile() {
      const inputFile = document.getElementById("files");
      inputFile.click();
    },
    async fileUpload(e) {
      var files = e.target.files,
        f = files[0];
      var reader = new FileReader();
      let productos = {};
      let listaProductos = [];
      reader.onload = async function (e) {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, { type: "array" });
        let sheetName = workbook.SheetNames[0];
        let worksheet = workbook.Sheets[sheetName];
        let json = XLSX.utils.sheet_to_json(worksheet);
        json.forEach((item) => {
          productos = {
            notaentradadetalleid: 0,
            numItem: this.listaDetalle.length + 1,
            productoid: item.PRODUCTOID,
            cantidadpresentacion: item.CANTIDADPRESENTACION,
            descripcionproducto: item.DESCRIPCIONPRODUCTO,
            unidadmedida: item.UND,
            poratender: item.CANTIDAD,
            cantidadsolicitada: 0,
            atendido: 0,
            preciocompra: item.PRECIO,
          };
          listaProductos.push(productos);
        });
        this.listaDetalle = listaProductos;
      }.bind(this);
      reader.readAsArrayBuffer(f);
    },
    setupFileInput() {
      document
        .getElementById("files")
        .addEventListener("change", this.fileUpload, false);
    },
    cambiarCantidad() {
      this.$refs.cantidad.focus();
    },
    cargarDetalle: async function (doccompraid) {
      let buscar = {
        doccompraid: doccompraid,
      };
      let res = await this.DetalleCompras(buscar);

      return res;
    },
    cargarDetalleProvisionar: async function (doccompraid) {
      let buscar = {
        doccompraid: doccompraid,
      };
      let res = await this.DetalleComprasProvisionar(buscar);

      return res;
    },
    showDescripcionTipoMovimiento() {
      this.conceptomovimientos.forEach((element) => {
        if (element.id == this.notaingreso.conceptomovimientoid) {
          this.descripcionconceptomovimiento = element.nombre;
        }
      });
    },
    abrirModalBuscarComprasProvisionar() {
      this.reloadDataComprasProvisionar = true;
      new bootstrap.Modal($("#modalBuscarComprasProvisionar")).show(); // Abrir modal
    },
    numeracionNotaIngreso: async function () {
      let res = await this.NumeracionNotaingreso();
      this.correlativoNroDocumentoIngreso = res.numero_notaingreso;
    },
    selectProveedor(item) {
      this.numruc = item.ruc;
      this.razonsocial = item.razonsocial;
      this.notaingreso.proveedorid = item.proveedorid;
    },
    selectCompra: async function (item) {
      this.notaingreso.doccompraid = parseInt(item.doccompraid);
      this.notaingreso.seriefactura = item.seriecomprobante;
      this.notaingreso.numfactura = item.numcomprobante;
      this.notaingreso.monedaid = item.monedaid;
      this.notaingreso.proveedorid = item.proveedorid;
      this.numruc = item.ruc;
      this.razonsocial = item.razonsocial;
      this.tipocomprobante = item.descripciontipocomprobante;
      this.listaDetalle = await this.cargarDetalleProvisionar(item.doccompraid);
    },
    closeModal: function () {
      var modal = bootstrap.Modal.getInstance(
        document.getElementById("modalBuscarProveedor")
      );
      modal.hide();
    },
    closeModalComprasProvisionar: function () {
      this.reloadDataComprasProvisionar = false;
      var modal = bootstrap.Modal.getInstance(
        document.getElementById("modalBuscarComprasProvisionar")
      );
      modal.hide();
    },
    ComboAlmacen: async function () {
      let res = await this.AlmacenDesplegable();
      this.almacenes = res;
    },
    ComboMoneda: async function () {
      let res = await this.ListarMoneda();
      this.monedas = res;
    },
    ComboConceptoMovimiento: async function () {
      let res = await this.ConceptoMovimientoDesplegable();
      this.conceptomovimientos = res;
    },
    cargarCancelar() {
      this.showAdvertise = false;
      this.loadNotaIngreso();
      this.cambiarTabListar();
    },
    cargarVer: async function (item, index) {
      this.movimientoid = item.movimientoid;
      this.descripcionconceptomovimiento = item.descripcionconcepto;

      this.notaingreso.notaentradaid = item.notaentradaid;
      this.notaingreso.almacenid = parseInt(item.almacenid);
      this.notaingreso.conceptomovimientoid = parseInt(
        item.conceptomovimientoid
      );
      this.notaingreso.proveedorid = item.proveedorid;
      this.notaingreso.doccompraid = item.doccompraid;
      this.notaingreso.seriefactura = item.seriefactura;
      this.notaingreso.numfactura = item.numfactura;
      this.notaingreso.serieguia = item.serieguia;
      this.notaingreso.numguia = item.numguia;
      this.numruc = item.ruc;
      this.razonsocial = item.razonsocial;
      this.notaingreso.seriecomprobante = item.seriecomprobante;
      this.notaingreso.numcomprobante = item.numcomprobante;
      this.notaingreso.fechaentrada = dayjs(item.fechaentrada2).format(
        "YYYY-MM-DDTHH:mm"
      );
      this.notaingreso.monedaid = item.monedaid;
      this.notaingreso.formapagoid = item.formapagoid;
      this.notaingreso.observacion = item.observacion;

      this.listaDetalle = await this.cargarDetalleNotaIngreso(
        item.notaentradaid
      );

      this.indiceModificando = index;
      this.cambiarTabRegistro();
    },
    cargarDetalle: async function (doccompraid) {
      let buscar = {
        doccompraid: doccompraid,
      };
      let res = await this.DetalleCompras(buscar);

      return res;
    },
    cargarDetalleNotaIngreso: async function (notaentradaid) {
      let buscar = {
        notaentradaid: notaentradaid,
      };
      let res = await this.DetelleNotaIngreso(buscar);

      return res;
    },
    cerosSerieComprobante: function () {
      let num = this.compra.seriecomprobante;
      this.compra.seriecomprobante = num.padStart(4, 0);
    },
    cerosNumComprobante: function () {
      let num = this.compra.numcomprobante;
      this.compra.numcomprobante = num.padStart(11, 0);
    },
    nuevoRegistro() {
      this.loadNotaIngreso();
      this.cambiarTabRegistro();
    },
    cambiarTabListar() {
      document.getElementById("tabRegistrarNotaIngreso").className = "";
      document.getElementById("registrarTab").className = "tab-pane";
      document.getElementById("tabListadoNotaIngreso").className = "active";
      document.getElementById("listadoTab").className = "tab-pane active";
    },
    cambiarTabRegistro() {
      document.getElementById("tabRegistrarNotaIngreso").className = "active";
      document.getElementById("registrarTab").className = "tab-pane active";
      document.getElementById("tabListadoNotaIngreso").className = "";
      document.getElementById("listadoTab").className = "tab-pane";
    },
    loadNotaIngreso: function () {
      this.notaingreso = { ...this.notaingresoBase };
      this.indiceModificando = -1;

      this.razonsocial = "";
      this.numruc = "";

      this.listaDetalle = [];

      this.numeracionNotaIngreso();
    },
    cargarEliminarDetalle: async function (item, index) {
      let res = null;
      if (this.notaingreso.doccompraid == 0) {
        global._swal_pregunta(
          "¿Está seguro que desea anular el producto?",
          "Advertencia",
          async () => {
            if (item.notaentradadetalleid == 0) {
              this.listaDetalle.splice(index, 1);
              global._mensaje_exito("El comprobante se anuló con éxito.");
            } else {
              let buscar = {
                notaentradadetalleid: item.notaentradadetalleid,
                productoid: item.productoid,
                movimientoid: parseInt(this.movimientoid),
              };
              res = await this.AnularNotaIngresoDetalle(buscar);
              if (res?.exito) {
                global._mensaje_exito("El comprobante se anuló con éxito.");
                this.listaDetalle.splice(index, 1);
                this.listaDetalle = await this.cargarDetalleNotaIngreso(
                  item.notaentradaid
                );
              }
            }
          }
        );
      } else {
        global._mensaje_advertencia(
          "El registro esta asociado a un Documento de Compra."
        );
      }
    },
    anularNotaIngreso: async function (item) {
      let listaCompra = [];
      if (item.doccompraid > 0) {
        listaCompra = await this.cargarDetalle(item.doccompraid);
      }

      let notaingreso = {
        notaentradaid: item.notaentradaid,
        nrodocumentoingreso: item.nrodocumentoingreso,
        user: this.usuario.usuario,
        doccompraid: item.doccompraid,
        detallecompra: listaCompra,
      };

      try {
        global._swal_pregunta(
          "¿Está seguro que desea anular el registro?",
          "Advertencia",
          async () => {
            this.isLoading = true;
            this.textloading = "Anulando notaingreso en el sistema";
            let resnotaingreso = await this.AnularNotaIngreso(notaingreso);
            if (resnotaingreso?.exito) {
              ElNotification({
                title: "Éxito",
                duration: 0,
                message: "La nota de ingreso se ha anulado correctamente.",
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
      if (
        this.listaDetalle[index].poratender + 1 >
        this.listaDetalle[index].cantidadsolicitada &&
        this.notaingreso.doccompraid != 0
      ) {
        global._mensaje_advertencia(
          "La cantidad por atender es mayor a la cantidad solicitada, gracias."
        );
      } else {
        this.listaDetalle[index].poratender =
          parseFloat(this.listaDetalle[index].poratender) + 1;
      }
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
        costoinsumo,
        cantidadpresentacion = null;
      let presentacionesid = 0;

      unidadMedida = this.unidadmedida;
      costoinsumo = parseFloat(this.costoinsumo, 2);
      cantidad = this.cantidad;
      cantidadpresentacion = this.cantidadpresentacion;
      presentacionesid = this.presentacionesid;

      let productos = {
        notaentradadetalleid: 0,
        numItem: this.listaDetalle.length + 1,
        productoid: this.producto,
        descripcionproducto: this.descripcionproducto,
        unidadmedida: unidadMedida,
        cantidadpresentacion: cantidadpresentacion,
        poratender: cantidad,
        cantidadsolicitada: 0,
        atendido: 0,
        preciocompra: costoinsumo,
        presentacionesid: presentacionesid,
      };
      if (
        this.producto != "" &&
        this.unidadmedida != "" &&
        this.cantidad != 0
      ) {
        let isNew;
        isNew = true;
        this.listaDetalle.forEach((item) => {
          if (parseInt(item.productoid) == parseInt(this.producto)) {
            isNew = false;
          }
        });
        if (isNew) {
          this.listaDetalle.push(productos);

          this.producto = null;
          this.unidadmedida = null;
          this.cantidad = null;
          this.costoinsumo = null;
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
        this.costoinsumo = parseFloat(res.costo, 2);
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
      var res = await this.ListarRegistrosPrecios(buscador);

      this.listaProductos = res.datos;
    },
    obtenerProveedorByNumRuc: async function () {
      let buscar = {
        numruc: this.numruc,
      };
      let res = await this.GetProveedorByNumRuc(buscar);

      if (res != null) {
        this.razonsocial = res.razonsocial;
        this.notaingreso.proveedorid = res.proveedorid;
      } else {
        this.razonsocial = "PROVEEDOR NO EXISTE";
        this.notaingreso.proveedorid = 0;
      }
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

      let res = await this.ListadoNotaIngreso(buscar);
      this.listadoRegistro = res.datos.map((el) => ({
        ...el,
        fechaentrada: dayjs(el.fechaentrada).format("DD-MM-YYYY"),
        fechaentrada2: el.fechaentrada,
      }));

      this.totalPaginas = res.totalPaginas;
      this.cargando = false;
    },
    validarRegistro() {
      let valida = false;

      if (this.notaingreso.fechaentrada == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.fechaentrada.focus();
        });
      } else if (this.notaingreso.monedaid == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.monedaid.focus();
        });
      } else if (
        this.numruc == "" ||
        this.razonsocial == "PROVEEDOR NO EXISTE"
      ) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.numruc.focus();
        });
      } else if (
        this.razonsocial == "" ||
        this.razonsocial == "PROVEEDOR NO EXISTE"
      ) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.razonsocial.focus();
        });
      } else if (this.notaingreso.almacenid == 0) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.almacenid.focus();
        });
      } else if (this.notaingreso.conceptomovimientoid == 0) {
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
      this.movimiento.fechamovimiento = this.notaingreso.fechaentrada;
      this.movimiento.nrodocumento =
        this.notaingreso.seriefactura + "-" + this.notaingreso.numfactura;
      this.movimiento.tipodocumento = this.tipocomprobante;
      this.movimiento.razon = this.descripcionconceptomovimiento;
      this.movimiento.tipomovimiento = "ENTRADA";
      this.movimiento.nronotaingreso = this.correlativoNroDocumentoIngreso;
      this.movimiento.nronotasalida = "";
      this.movimiento.user = this.usuario.usuario;

      let detalleProducto = [];
      this.listaDetalle.forEach((item) => {
        let productos = {
          movimientoid: item.notaentradadetalleid == 0 ? 0 : this.movimientoid,
          productoid: item.productoid,
          precio: parseFloat(item.preciocompra),
          cantidad: item.poratender,
          presentacion: item.unidadmedida,
          cantidadpresentacion: item.cantidadpresentacion,
          importe: item.poratender * item.preciocompra,
          almacenid: this.notaingreso.almacenid,
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
        this.notaingreso.user = this.usuario.usuario;
        this.notaingreso.nrodocumentoingreso =
          this.correlativoNroDocumentoIngreso;

        global._swal_pregunta(
          "¿Está seguro que desea procesar la nota de ingreso?",
          "Advertencia",
          async () => {
            this.isLoading = true;
            this.textloading = "Procesando Nota de Ingreso";
            if (this.indiceModificando == -1) {
              res = await this.AgregarNotaIngreso(this.notaingreso);
            } else {
              res = await this.ActualizarNotaIngreso(this.notaingreso);
            }
            if (res?.exito) {
              this.isLoading = false;
              ElNotification({
                title: "Success",
                duration: 1500,
                message: "Nota de Ingreso se generó correctamente",
                type: "success",
              });

              await this.procesarMovimientosAlmacen();
              this.showAdvertise = false;
              this.loadNotaIngreso();
              await this.cargarRegistros();
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
      let numItem = 0;
      let detalleProducto = [];
      this.listaDetalle.forEach((item) => {
        numItem = numItem + 1;
        let productos = {
          notaentradadetalleid: item.notaentradadetalleid,
          productoid: item.productoid,
          nitem: numItem,
          precio: parseFloat(item.preciocompra, 2),
          cantidad: item.poratender,
          cantidadpresentacion: parseFloat(item.cantidadpresentacion, 2),
          presentacionesid: item.presentacionesid,
        };

        detalleProducto.push(productos);
      });

      this.notaingreso.notaingresodetalle = detalleProducto;
    },
  },

  mounted() {
    if (localStorage.getItem("login")) {
      this.usuario = JSON.parse(localStorage.getItem("login"));
    }

    this.cargarRegistros();
    this.setupFileInput();
    this.comboProductos();
    this.ComboConceptoMovimiento();
    this.ComboMoneda();
    this.ComboAlmacen();
    this.loadNotaIngreso();
  },
  computed: {},
};
</script>
<style lang="css" scoped>
.el-select {
  --el-select-input-focus-border-color: #e23e3d;
}
</style>
