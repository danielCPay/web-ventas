<template>
  <vue-loading :fullPage="fullPage" :isLoading="isLoading" :spinner="spinner" />
  <div class="card-header">
    <h3 class="card-title">Modulo de Compras</h3>
  </div>
  <div class="card-body pb-2">
    <div
      class="tab-menu-heading tab-menu-heading-boxed"
      style="border-bottom: 0 !important"
    >
      <div class="tabs-menu-boxed" style="float: right; width: 100%">
        <!-- Tabs -->
        <ul class="nav panel-tabs" style="float: right">
          <li>
            <a
              href="#listadoTab"
              class="active"
              data-bs-toggle="tab"
              id="tabListadoCompra"
              >LISTADO</a
            >
          </li>
          <li>
            <a href="#registrarTab" data-bs-toggle="tab" id="tabRegistrarCompra"
              >REGISTRAR</a
            >
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
                  <input
                    type="date"
                    class="form-control"
                    v-model="fecha_inicio"
                  />
                </div>
              </div>
              <div class="col-md-4 mb-3">
                <div class="form-group">
                  <input type="date" class="form-control" v-model="fecha_fin" />
                </div>
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
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="nuevoRegistro()"
                >
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
                  <table
                    class="table border text-nowrap text-md-nowrap table-striped table-sm mb-0"
                    v-if="listadoRegistro.length != 0"
                  >
                    <thead>
                      <tr>
                        <th>Fecha</th>
                        <th>Recepcion</th>
                        <th>N° Comprobante</th>
                        <th>Proveedor</th>
                        <th>Total</th>
                        <th class="text-center">Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in listadoRegistro"
                        :key="'item-' + index"
                      >
                        <td>
                          <span
                            :style="
                              item.estadoid == 2
                                ? 'text-decoration-line: line-through;color:red'
                                : ''
                            "
                          >
                            {{ item.fechacomprobante }}</span
                          >
                        </td>
                        <td>
                          <span
                            :style="
                              item.estadoid == 2
                                ? 'text-decoration-line: line-through;color:red'
                                : ''
                            "
                          >
                            {{ item.fecharecepcion }}</span
                          >
                        </td>
                        <td>
                          <span
                            :style="
                              item.estadoid == 2
                                ? 'text-decoration-line: line-through;color:red'
                                : ''
                            "
                            >{{ item.numcomprobante }}</span
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
                            >{{ parseFloat(item.total, 2) }}</span
                          >
                        </td>
                        <td class="text-center">
                          <i
                            class="fa fa-pencil mx-1 text-yellow"
                            role="button"
                            title="Editar"
                            v-show="item.estadoid == 1"
                            @click="cargarVer(item, index)"
                          ></i>
                          <i
                            class="fa fa-trash mx-1 text-danger"
                            role="button"
                            v-show="item.estadoid == 1"
                            @click="cargarAnular(item)"
                            title="Anular"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="text-center" v-else>
                    <span class="fw-bold fs-18">Detalle Vacio</span>
                  </div>
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
        <div class="tab-pane" id="registrarTab">
          <div class="form-label mt-0 p-0">
            <button
              type="button"
              class="btn btn-primary"
              @click="nuevoRegistro()"
            >
              <i class="fe fe-file me-2"></i>Nuevo
            </button>
          </div>

          <div class="col-md-12 row">
            <div class="border mb-5 p-4 br-5">
              <div class="form-label mt-0 p-0">DATOS DEL COMPROBANTE</div>
              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Tipo de Comprobante</label>

                    <select
                      placeholder="Tipo Comprobante"
                      v-model="compra.tipocomprobanteid"
                      ref="tipocomprobanteid"
                      class="form-control form-select"
                    >
                      <option value="">SELECCIONE</option>
                      <option
                        v-for="item in tipocomprobantes"
                        :key="item.id"
                        :label="item.nombre"
                        :value="item.id"
                      ></option>
                    </select>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Serie</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Serie"
                      v-model="compra.seriecomprobante"
                      @blur="cerosSerieComprobante()"
                      @input="validarNumComprobante()"
                      maxlength="4"
                      ref="seriecomprobante"
                      :style="
                        showAdvertise && compra.seriecomprobante == ''
                          ? 'border-color: #e23e3d;'
                          : ''
                      "
                    />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Número</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Número"
                      v-model="compra.numcomprobante"
                      @blur="cerosNumComprobante()"
                      @input="validarNumComprobante()"
                      maxlength="8"
                      ref="numcomprobante"
                      :style="
                        showAdvertise && compra.numcomprobante == ''
                          ? 'border-color: #e23e3d;'
                          : ''
                      "
                    />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Fecha de Comprobante</label>
                    <input
                      type="date"
                      class="form-control"
                      placeholder="Fecha de Comprobante"
                      v-model="compra.fechacomprobante"
                      ref="fechacomprobante"
                      :style="
                        showAdvertise && compra.fechacomprobante == ''
                          ? 'border-color: #e23e3d;'
                          : ''
                      "
                    />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Fecha de Recepción</label>
                    <input
                      type="date"
                      class="form-control"
                      placeholder="Fecha de Recepción"
                      v-model="compra.fecharecepcion"
                      ref="fecharecepcion"
                      :style="
                        showAdvertise && compra.fecharecepcion == ''
                          ? 'border-color: #e23e3d;'
                          : ''
                      "
                    />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Moneda</label>
                    <select
                      class="form-control form-select"
                      data-bs-placeholder="Moneda"
                      v-model="compra.monedaid"
                      ref="monedaid"
                      :style="
                        showAdvertise && compra.monedaid == 0
                          ? 'border-color: #e23e3d;'
                          : ''
                      "
                    >
                      <option value="0">Seleccionar Moneda</option>
                      <option
                        v-for="item in monedas"
                        :key="item.id"
                        :label="item.nombre"
                        :value="item.id"
                      ></option>
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
                      <input
                        type="text"
                        class="form-control"
                        placeholder="RUC/DNI"
                        aria-label="Example text with button addon"
                        aria-describedby="button-addon1"
                        v-model="numruc"
                        @keypress.enter="obtenerProveedorByNumRuc()"
                        ref="numruc"
                        :style="
                          (showAdvertise && numruc == '') ||
                          razonsocial == 'PROVEEDOR NO EXISTE'
                            ? 'border-color: #e23e3d;'
                            : ''
                        "
                      />
                      <button
                        type="button"
                        class="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#modalBuscarProveedor"
                      >
                        <i class="fe fe-search me-2"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="col-md-9">
                  <div class="form-group">
                    <label>Razon Social</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Razon Social"
                      disabled
                      v-model="razonsocial"
                      ref="razonsocial"
                      :style="
                        (showAdvertise && razonsocial == '') ||
                        razonsocial == 'PROVEEDOR NO EXISTE'
                          ? 'border-color: #e23e3d;'
                          : ''
                      "
                    />
                  </div>
                </div>
              </div>
              <div class="form-label mt-0 p-0">OTROS DATOS</div>
              <div class="row">
                <!-- <div class="col-md-3">
                  <div class="form-group">
                    <label>Modo Pago</label>
                    <select
                      class="form-control form-select"
                      data-bs-placeholder="Modo Pago"
                      v-model="compra.condicionespagoid"
                      ref="condicionespagoid"                    
                      :style="
                        showAdvertise && compra.condicionespagoid == 0
                          ? 'border-color: #e23e3d;'
                          : ''
                      "
                    >
                      <option value="0">Seleccionar Forma de Pago</option>
                      <option
                        v-for="item in condicionespago"
                        :key="item.id"
                        :label="item.nombre"
                        :value="item.id"
                      ></option>
                    </select>
                  </div>
                </div> -->
                <div class="col-md-9">
                  <div class="form-group">
                    <label>Observación</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Observación"
                      v-model="compra.observacion"
                    />
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
                        <a
                          href="#detallecomprobanteTab"
                          class="active"
                          data-bs-toggle="tab"
                          id="DetalleComprobante"
                          >Detalle Comprobante</a
                        >
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
                            <div class="form-group">
                              <el-select
                                size="large"
                                style="width: 100%"
                                v-model="producto"
                                filterable
                                placeholder="Productos"
                                ref="producto"
                                @change="obtenerProducto()"
                              >
                                <el-option
                                  v-for="item in listaProductos"
                                  :key="item.productoid"
                                  :label="item.descripcionproducto"
                                  :value="item.productoid"
                                ></el-option>
                              </el-select>
                            </div>
                          </div>
                          <div class="col-md-2 mb-3" style="text-align: center">
                            <div class="form-group">
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Unidad Medida"
                                v-model="unidadmedida"
                                disabled
                              />
                            </div>
                          </div>
                          <div class="col-md-2 mb-3" style="text-align: center">
                            <div class="form-group">
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Costo"
                                v-model="costoproducto"
                                min="0"
                              />
                            </div>
                          </div>
                          <div class="col-md-2 mb-3" style="text-align: center">
                            <div class="form-group">
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Cant Presentación"
                                v-model="cantidadpresentacion"
                                ref="cantidadpresentacion"
                                @keypress.enter="cambiarCantidad()"
                                min="0"
                              />
                            </div>
                          </div>
                          <div class="col-md-2 mb-3" style="text-align: center">
                            <div class="form-group">
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Cantidad"
                                v-model="cantidad"
                                ref="cantidad"
                                @keypress.enter="agregarProductos()"
                                min="0"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-12">
                            <div class="table-responsive">
                              <table
                                class="table table-bordered table-vcenter"
                                v-if="listaCompra.length > 0"
                              >
                                <thead>
                                  <tr class="border-top">
                                    <th>Nitem</th>
                                    <th>Producto</th>
                                    <th>Und</th>
                                    <th>Cant Und</th>
                                    <th>Cant</th>
                                    <th>Precio</th>
                                    <th>Importe</th>
                                    <th>Opciones</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr
                                    v-for="(item, index) in listaCompra"
                                    :key="'item-' + index"
                                  >
                                    <td>{{ item.numItem }}</td>
                                    <td>{{ item.descripcionproducto }}</td>
                                    <td>{{ item.unidadmedida }}</td>
                                    <td>
                                      <input
                                        type="number"
                                        class="form-control"
                                        v-model="item.cantidadpresentacion"
                                        min="1"
                                      />
                                    </td>
                                    <td>
                                      <div
                                        class="handle-counter"
                                        id="handleCounter4"
                                      >
                                        <button
                                          type="button"
                                          class="counter-minus btn btn-white lh-2 shadow-none"
                                          @click="disminuirCantidad(index)"
                                        >
                                          <i class="fa fa-minus text-muted"></i>
                                        </button>
                                        <input
                                          type="text"
                                          :value="`${parseFloat(
                                            item.cantidad
                                          )}`"
                                          class="qty"
                                          min="1"
                                          readonly
                                        />
                                        <button
                                          type="button"
                                          class="counter-plus btn btn-white lh-2 shadow-none"
                                          @click="aumentarCantidad(index)"
                                        >
                                          <i class="fa fa-plus text-muted"></i>
                                        </button>
                                      </div>
                                    </td>
                                    <td>
                                      <input
                                        type="number"
                                        class="form-control"
                                        v-model="item.costoproducto"
                                        min="1"
                                      />
                                    </td>
                                    <td>
                                      {{
                                        parseFloat(
                                          item.cantidad * item.costoproducto
                                        ).toFixed(2)
                                      }}
                                    </td>
                                    <td class="text-center">
                                      <i
                                        title="Eliminar"
                                        class="fa fa-trash mx-1 text-danger"
                                        role="button"
                                        @click="
                                          cargarEliminarDetalle(item, index)
                                        "
                                      ></i>
                                    </td>
                                  </tr>
                                </tbody>

                                <tfoot>
                                  <tr>
                                    <!-- <th scope="row">Redondeo: 0</th> -->
                                    <td colspan="3" class="table-active">
                                      Valor Venta:
                                      {{ parseFloat(valorventa).toFixed(2) }}
                                    </td>
                                    <!-- <td colspan="1" class="table-active">
                                      Percepción: 0.00
                                    </td> -->
                                    <td colspan="3" class="table-active">
                                      IGV(18%): {{ parseFloat(igv).toFixed(2) }}
                                    </td>
                                    <td colspan="3" class="table-active">
                                      Total: {{ parseFloat(total).toFixed(2) }}
                                    </td>
                                  </tr>
                                </tfoot>
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
              <button
                class="btn btn-primary m-2"
                type="button"
                @click="cargarCancelar()"
              >
                Cancelar
              </button>
              <button
                class="btn btn-primary"
                type="button"
                @click="guardarCambios()"
                :disabled="existefactura == 1 ? true : false"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <modal-buscar-proveedor
    id="modalBuscarProveedor"
    @selectProveedor="selectProveedor"
    @closeModal="closeModal"
  />
</template>

<script>
import { mapActions } from "vuex";
import Loading from "../../../components/varios/Loading.vue";
import Paginate from "../../../components/varios/Paginate.vue";
import ModalBuscarProveedor from "../../../components/busquedas/ModalBuscarProveedor.vue";
//Librayr
import dayjs from "dayjs";

import global from "../../../global";
export default {
  name: "ModuloCompras",
  components: { Paginate, Loading, ModalBuscarProveedor },
  data() {
    return {
      existefactura: 0,
      spinner: "bar-fade-scale",
      isLoading: false,
      fullPage: true,
      modalBuscarProveedor: false,
      monedas: [],
      condicionespago: [],
      showAdvertise: false,
      usuario: {},
      indiceModificando: -1,
      listadoRegistro: [],
      tipocomprobante: null,
      tipocomprobantes: [],
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
      listaProductos: [],
      listaCompra: [],
      producto: null,
      unidadmedida: "",
      listaUnidadMedida: [],
      cantidad: null,
      cantidadpresentacion: 1,
      descripcionproducto: "",
      costoproducto: null,
      compra: {},
      compraBase: {
        doccompraid: 0,
        fechacomprobante: "",
        fecharecepcion: "",
        monedaid: 0,
        condicionespagoid: 1,
        tipocomprobanteid: null,
        proveedorid: 0,
        seriecomprobante: "",
        numcomprobante: "",
        observacion: "",
        igv: 0,
        importe: 0,
        total: 0,
        user: "",
        diascredito: 0,
        compradetalle: [
          {
            doccompraid: 0,
            nitem: "",
            productoid: 0,
            cantidad: 0,
            cantidadpresentacion: 0,
            precio: 0,
            importe: 0,
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions({
      ListarTipoComprobante: "_tipocomprobante/Listar",
      ListadoCompras: "_compra/ListadoCompras",
      GetProveedorByNumRuc: "_proveedor/GetProveedorByNumRuc",
      ListarProductos: "_producto/ListarRegistros",
      Unidad_Medida_Desplegable: "_producto/Unidad_Medida_Desplegable",
      ObtenerProducto: "_producto/ObtenerProducto",
      AgregarCompra: "_compra/AgregarCompra",
      ModificarCompra: "_compra/ModificarCompra",
      DetalleCompras: "_compra/DetalleCompras",
      AnularCompra: "_compra/AnularCompra",
      AnularCompraDetalle: "_compra/AnularCompraDetalle",
      ListarMoneda: "_moneda/Listar",
      CondicionesPago: "_compra/CondicionesPago",
      ExisteNumeroFactura: "_compra/ExisteNumeroFactura",
    }),
    validarNumComprobante: async function () {
      let comprobante = {
        seriecomprobante: this.compra.seriecomprobante,
        numcomprobante: this.compra.numcomprobante,
        tipocomprobanteid: this.compra.tipocomprobanteid,
        proveedorid: this.compra.proveedorid,
      };

      let res = await this.ExisteNumeroFactura(comprobante);

      if (res != null) {
        this.existefactura = res.existe;

        if (this.existefactura == 1) {
          global._mensaje_advertencia(
            "El comprobante ya existe en el sistema, comuniquese con el administrador del sistema"
          );
        }
      }
    },
    selectProveedor(item) {
      this.numruc = item.ruc;
      this.razonsocial = item.razonsocial;
      this.compra.proveedorid = item.proveedorid;
      this.validarNumComprobante();
    },
    closeModal: function () {
      var modal = bootstrap.Modal.getInstance(
        document.getElementById("modalBuscarProveedor")
      );
      modal.hide();
    },
    ComboMoneda: async function () {
      let res = await this.ListarMoneda();
      this.monedas = res;
    },
    ComboCondicionesPago: async function () {
      let res = await this.CondicionesPago();
      this.condicionespago = res;
    },
    cargarCancelar() {
      this.showAdvertise = false;
      this.loadCompra();
      this.cambiarTabListar();
    },
    cargarVer: async function (item, index) {
      this.compra.doccompraid = parseInt(item.doccompraid);
      this.compra.tipocomprobanteid = parseInt(item.tipocomprobanteid);
      this.compra.proveedorid = item.proveedorid;
      this.numruc = item.ruc;
      this.razonsocial = item.razonsocial;
      this.compra.seriecomprobante = item.seriecomprobante;
      this.compra.numcomprobante = item.numcomprobante;
      this.compra.fechacomprobante = dayjs(item.fechacomprobante2).format(
        "YYYY-MM-DD"
      );
      this.compra.fecharecepcion = dayjs(item.fecharecepcion2).format(
        "YYYY-MM-DD"
      );
      this.compra.monedaid = item.monedaid;
      this.compra.condicionespagoid = item.condicionespagoid;
      this.compra.observacion = item.observacion;

      this.listaCompra = await this.cargarDetalle(item.doccompraid);

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
    cerosSerieComprobante: function () {
      let num = this.compra.seriecomprobante;
      this.compra.seriecomprobante = num.padStart(4, 0);
    },
    cerosNumComprobante: function () {
      let num = this.compra.numcomprobante;
      this.compra.numcomprobante = num.padStart(8, 0);
    },
    nuevoRegistro() {
      this.loadCompra();
      this.cambiarTabRegistro();
    },
    cambiarTabListar() {
      document.getElementById("tabRegistrarCompra").className = "";
      document.getElementById("registrarTab").className = "tab-pane";
      document.getElementById("tabListadoCompra").className = "active";
      document.getElementById("listadoTab").className = "tab-pane active";
    },
    cambiarTabRegistro() {
      document.getElementById("tabRegistrarCompra").className = "active";
      document.getElementById("registrarTab").className = "tab-pane active";
      document.getElementById("tabListadoCompra").className = "";
      document.getElementById("listadoTab").className = "tab-pane";
    },
    loadCompra: function () {
      this.compra = { ...this.compraBase };
      this.indiceModificando = -1;

      this.razonsocial = "";
      this.numruc = "";
      this.compra.monedaid = parseInt(1);

      this.listaCompra = [];
    },
    cargarEliminarDetalle: async function (item, index) {
      let res = null;
      global._swal_pregunta(
        "¿Está seguro que desea anular el producto?",
        "Advertencia",
        async () => {
          if (item.doccompraid == 0) {
            this.listaCompra.splice(index, 1);
            global._mensaje_exito("El comprobante se anuló con éxito.");
          } else {
            let buscar = {
              doccompraid: item.doccompraid,
              productoid: item.productoid,
              user: this.usuario.usuario,
            };
            res = await this.AnularCompraDetalle(buscar);
            if (res?.exito) {
              global._mensaje_exito("El comprobante se anuló con éxito.");
              this.listaCompra.splice(index, 1);
              this.listaCompra = await this.cargarDetalle(item.doccompraid);
            }
          }
        }
      );
    },
    cargarAnular(item) {
      let res = null;
      global._swal_pregunta(
        "¿Está seguro que desea anular la compra?",
        "Advertencia",
        async () => {
          let buscar = {
            doccompraid: item.doccompraid,
            user: this.usuario.usuario,
          };
          res = await this.AnularCompra(buscar);
          if (res?.exito) {
            global._mensaje_exito("El comprobante se anuló con éxito.");
            this.cargarRegistros();
          }
        }
      );
    },
    aumentarCantidad(index) {
      this.listaCompra[index].cantidad =
        parseFloat(this.listaCompra[index].cantidad) + 1;
    },
    disminuirCantidad(index) {
      this.listaCompra[index].cantidad = this.listaCompra[index].cantidad - 1;
      if (this.listaCompra[index].cantidad === 0) {
        delete this.listaCompra[index];
      }
    },
    agregarProductos() {
      let unidadMedida,
        subtotal,
        cantidad,
        costoproducto,
        cantidadpresentacion = null;

      unidadMedida = this.unidadmedida;
      costoproducto = parseFloat(this.costoproducto, 2);
      cantidad = this.cantidad;
      cantidadpresentacion = this.cantidadpresentacion;
      subtotal = cantidad * costoproducto;

      let productos = {
        doccompraid: 0,
        numItem: this.listaCompra.length + 1,
        productoid: this.producto,
        descripcionproducto: this.descripcionproducto,
        unidadmedida: unidadMedida,
        cantidadpresentacion: cantidadpresentacion,
        cantidad: cantidad,
        costoproducto: costoproducto,
        subtotal: subtotal,
      };
      if (
        this.producto != "" &&
        this.unidadmedida != "" &&
        this.cantidad != 0
      ) {
        let isNew;
        isNew = true;
        this.listaCompra.forEach((item) => {
          if (parseInt(item.productoid) == parseInt(this.producto)) {
            isNew = false;
          }
        });
        if (isNew) {
          this.listaCompra.push(productos);

          this.producto = null;
          this.unidadmedida = null;
          this.cantidad = null;
          this.costoproducto = null;
          this.cantidadpresentacion = null;
          this.$refs.producto.focus();
        } else {
          global._mensaje_advertencia(
            "Producto duplicado, debe actualizar el registro!"
          );
        }
      } else {
        global._mensaje_advertencia("Ingrese los datos correctos!");
      }
    },
    comboUnidadMedida: async function () {
      var res = await this.Unidad_Medida_Desplegable();
      this.listaUnidadMedida = res;
    },
    obtenerProducto: async function () {
      let producto = {
        productoid: this.producto,
      };
      let res = await this.ObtenerProducto(producto);

      if (res != null) {
        this.descripcionproducto = res.descripcionproducto;
        this.unidadmedida = res.unidadmedida;
        this.costoproducto = parseFloat(res.costo).toFixed(2);
        this.cantidadpresentacion = parseInt(res.cantidadunidadmedida);
        this.$refs.cantidad.focus();
      }
    },
    cambiarCantidad() {
      this.$refs.cantidad.focus();
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
    obtenerProveedorByNumRuc: async function () {
      let buscar = {
        numruc: this.numruc,
      };
      let res = await this.GetProveedorByNumRuc(buscar);

      if (res != null) {
        this.razonsocial = res.razonsocial;
        this.compra.proveedorid = res.proveedorid;
      } else {
        this.razonsocial = "PROVEEDOR NO EXISTE";
        this.compra.proveedorid = 0;
      }
    },
    cambiarPagina: function (paginaDestino) {
      this.cargarRegistros(paginaDestino);
    },
    comboTipoComprobante: async function () {
      let comprobante = {
        proceso: "C",
      };
      let res = await this.ListarTipoComprobante(comprobante);
      this.tipocomprobantes = res;
    },
    cargarRegistros: async function (pagina = 1) {
      this.cargando = true;
      let buscar = {
        page_index: pagina,
        page_size: 10,
        fecha_inicio: this.fecha_inicio,
        fecha_fin: this.fecha_fin,
      };

      let res = await this.ListadoCompras(buscar);
      this.listadoRegistro = res.datos.map((el) => ({
        ...el,
        fechacomprobante: dayjs(el.fechacomprobante).format("DD-MM-YYYY"),
        fecharecepcion: dayjs(el.fecharecepcion).format("DD-MM-YYYY"),
        fechacomprobante2: el.fechacomprobante,
        fecharecepcion2: el.fecharecepcion,
      }));

      this.totalPaginas = res.totalPaginas;
      this.cargando = false;
    },
    validarRegistro() {
      let valida = false;

      if (this.compra.tipocomprobanteid == null) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.tipocomprobanteid.focus();
        });
      } else if (this.compra.seriecomprobante == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.seriecomprobante.focus();
        });
      } else if (this.compra.numcomprobante == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.numcomprobante.focus();
        });
      } else if (this.compra.fechacomprobante == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.fechacomprobante.focus();
        });
      } else if (this.compra.fecharecepcion == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.fecharecepcion.focus();
        });
      } else if (this.compra.monedaid == 0) {
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
      }
      // else if (this.compra.condicionespagoid == 0) {
      //   this.showAdvertise = true;
      //   valida = true;
      //   setTimeout(() => {
      //     this.$refs.condicionespagoid.focus();
      //   });
      // }

      return valida;
    },
    guardarCambios: async function () {
      var res = null;
      let valor = this.validarRegistro();

      if (!valor && this.listaCompra.length > 0) {
        this.procesarDetalle();
        this.compra.user = this.usuario.usuario;

        global._swal_pregunta(
          "¿Está seguro que desea procesar la compra?",
          "Advertencia",
          async () => {
            this.isLoading = true;
            if (this.indiceModificando == -1) {
              res = await this.AgregarCompra(this.compra);
            } else {
              res = await this.ModificarCompra(this.compra);
            }
            if (res?.exito) {
              this.showAdvertise = false;
              this.isLoading = false;
              this.loadCompra();
              this.cargarRegistros();
              global._mensaje_exito(
                "Los cambios se han guardado correctamente"
              );
              this.cambiarTabListar();
            }
          }
        );
      } else if (valor) {
        //global._mensaje_advertencia("Debe llenar los campos vacios, gracias!");
        alert("Debe llenar los campos vacios, gracias!");
      } else if (this.listaCompra.length == 0) {
        global._mensaje_advertencia(
          "Detalle vacio, por favor verificar, gracias!"
        );
      }
    },
    procesarDetalle: function () {
      let numItem = 0;
      let detalleProducto = [];
      this.listaCompra.forEach((item) => {
        numItem = numItem + 1;
        let productos = {
          doccompraid: item.doccompraid,
          productoid: item.productoid,
          nitem: numItem,
          precio: parseFloat(item.costoproducto),
          importe: item.cantidad * parseFloat(item.costoproducto),
          cantidad: item.cantidad,
          cantidadpresentacion: item.cantidadpresentacion,
        };

        detalleProducto.push(productos);
      });
      this.compra.compradetalle = detalleProducto;
    },
  },

  mounted() {
    if (localStorage.getItem("login")) {
      this.usuario = JSON.parse(localStorage.getItem("login"));
    }
    this.comboTipoComprobante();
    this.cargarRegistros();

    this.comboProductos();
    this.comboUnidadMedida();
    this.ComboMoneda();
    this.ComboCondicionesPago();
    this.loadCompra();
  },
  computed: {
    valorventa: function () {
      let sum = 0;
      let valorventa = this.total / 1.18;
      sum = valorventa;
      this.compra.importe = sum;
      return sum;
    },
    igv: function () {
      let valorIGV = 0.18;
      let igv = 0;
      igv = this.valorventa * valorIGV;
      this.compra.igv = igv;
      return igv;
    },
    total: function () {
      let sum = 0;
      this.listaCompra.forEach(
        (item) => (sum += parseFloat(item.cantidad * item.costoproducto))
      );
      this.compra.total = sum;
      return sum;
    },
  },
};
</script>
<style lang="css" scoped>
.el-select {
  --el-select-input-focus-border-color: #e23e3d;
}
</style>
