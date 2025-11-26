<template>
  <vue-loading :fullPage="fullPage" :isLoading="isLoading" :spinner="spinner" />
  <!-- ROW-1 OPEN -->
  <div class="row" style="background-color: #eaedf7">
    <div class="col-xl-7 col-md-12">
      <!-- <buscar-cliente @cargarClienteId="cargarClienteId" /> -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">
            Datos de Facturación
            <span style="color: red" class="ms-2">Fecha:</span>
            <span class="ms-2">{{ currentDate }}</span>
          </h3>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-sm-6 col-md-6">
              <div class="form-group">
                <label class="form-label">Tipo de Comprobante <span class="text-red">*</span></label>
                <el-select placeholder="Seleccionar Tipo de Comprobante" v-model="tipocomprobante" size="large"
                  @change="cargarNumeracionComprobantes" style="width: 100%">
                  <el-option v-for="item in tipocomprobantes" :key="item.id" :label="item.nombre"
                    :value="item.id"></el-option>
                </el-select>
              </div>
            </div>
            <div class="col-sm-6 col-md-6">
              <div class="form-group">
                <label class="form-label">Moneda <span class="text-red">*</span></label>
                <el-select placeholder="Seleccionar Moneda" v-model="moneda" size="large" style="width: 100%">
                  <el-option v-for="item in monedas" :key="item.id" :label="item.nombre" :value="item.id"></el-option>
                </el-select>
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-group">
                <label class="form-label">Razón Social / Nombres <span class="text-red">*</span></label>
                <el-select placeholder="Seleccionar Cliente" v-model="clienteid" size="large" filterable
                  style="width: 100%">
                  <el-option v-for="item in clientes" :key="item.id" :label="item.nombre" :value="item.id"></el-option>
                </el-select>
              </div>
            </div>
            <!-- <div class="col-md-12">
              <div class="form-group">
                <label class="form-label"
                  >Dirección <span class="text-red">*</span></label
                >
                <input
                  type="email"
                  class="form-control"
                  placeholder="Dirección"
                  v-model="direccion"
                  readonly
                />
              </div>
            </div> -->
          </div>
        </div>
        <div class="card-footer">
          <button type="button" class="btn btn-primary">
            Agregar Nuevo Cliente
          </button>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Información del pago</h3>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-sm-6 col-md-6">
              <div class="form-group">
                <label class="form-label">Forma de Pago <span class="text-red">*</span></label>
                <el-select placeholder="Seleccionar Forma de Pago" v-model="formapagoid" size="large" ref="formapago"
                  @change="ComboTipoTarjetaFormaPago" style="width: 100%">
                  <el-option v-for="item in tipoformapago" :key="item.id" :label="item.nombre"
                    :value="item.id"></el-option>
                </el-select>
              </div>
            </div>
            <div class="col-sm-6 col-md-6">
              <div class="form-group">
                <label class="form-label">Tipo Tarjeta <span class="text-red">*</span></label>
                <el-select placeholder="Seleccionar Tipo de Tarjeta" v-model="tarjetacreditoid" size="large"
                  style="width: 100%" ref="tarjetacredito" @change="cambiarMonedaFocus">
                  <el-option v-for="item in tarjetacreditoformapago" :key="item.id" :label="item.nombre"
                    :value="item.id"></el-option>
                </el-select>
              </div>
            </div>
            <div class="col-sm-6 col-md-6">
              <div class="form-group">
                <label class="form-label">Moneda <span class="text-red">*</span></label>
                <el-select placeholder="Seleccionar la Moneda" v-model="monedaformapago" size="large"
                  style="width: 100%" ref="refmonedaformapago" @change="cambiarImporteFocus">
                  <el-option v-for="item in monedas" :key="item.id" :label="item.nombre" :value="item.id"></el-option>
                </el-select>
              </div>
            </div>
            <div class="col-sm-6 col-md-6">
              <div class="form-group">
                <label class="form-label">Importe <span class="text-red">*</span></label>
                <input type="number" class="form-control" min="0" ref="importeformapago" v-model="importeformapago"
                  :disabled="disabledImporteFormaPago" @keypress.enter="agregarFormaPago" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="table-responsive">
                <table class="table text-nowrap text-md-nowrap mb-0">
                  <thead>
                    <tr>
                      <th>Tipo Pago</th>
                      <th>Moneda</th>
                      <th>Importe</th>
                      <th>Tarjeta</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in formapagodocventa" :key="index" v-if="formapagodocventa.length != 0">
                      <td>{{ item.formapago }}</td>
                      <td>{{ item.moneda }}</td>
                      <td>{{ item.importe }}</td>
                      <td>{{ item.tarjeta }}</td>
                      <td class="text-center">
                        <i class="fa fa-trash mx-1 text-danger" role="button" @click="quitarFormaPago(index)"></i>
                      </td>
                    </tr>
                    <tr v-else>
                      <td colspan="4" class="text-center">Detalle Vacío</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <ul class="list-group border br-7 mt-5">
                <li class="list-group-item border-0">
                  Total
                  <span class="h6 fw-bold mb-0 float-end">
                    {{ seleccionmoneda == "SOLES" ? "S/." : "$/." }}
                    {{ totalPago }}
                  </span>
                </li>
                <li class="list-group-item border-0">
                  Abonado
                  <span class="h6 fw-bold mb-0 float-end text-blue">{{ seleccionmoneda == "SOLES" ? "S/." : "$/." }}
                    {{ totalAbonado }}</span>
                </li>
                <li class="list-group-item border-0">
                  Saldo
                  <span class="h4 fw-bold mb-0 float-end text-danger">{{ seleccionmoneda == "SOLES" ? "S/." : "$/."
                  }}{{ totalSaldo }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-5 col-md-12">
      <!-- <div class="card cart">
        <div class="card-header">
          <h3 class="card-title">Tipo de Comprobante</h3>
        </div>
        <div class="card-body">
          <div class="">
            <div class="row">
              <el-select
                placeholder="Tipo de Comprobante"
                v-model="tipocomprobante"
                size="large"
                @change="cargarNumeracionComprobantes"
              >
                <el-option
                  v-for="item in tipocomprobantes"
                  :key="item.id"
                  :label="item.nombre"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
            <br />
            <div class="row">
              <el-select placeholder="Moneda" v-model="moneda" size="large">
                <el-option
                  v-for="item in monedas"
                  :key="item.id"
                  :label="item.nombre"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
            <h4 class="fw-semibold">Percy Kewshun</h4>
            <p>4231 Bingamon Branch Road</p>
            <p>Chicago, IL-60654</p>
            <P>UTC-5: Eastern Standard Time (EST)</P>
            <p class="mb-0">22/09/2022</p>
          </div>
        </div>
        <div class="card-footer">
          <a href="javascript:void(0)" class="btn btn-primary"
            >Deliver to this Address</a
          >
        </div>
      </div> -->
      <div class="card cart">
        <div class="card-status bg-blue br-te-7 br-ts-7"></div>
        <div class="card-header">
          <h3 class="card-title">Detalle del Pedido</h3>
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{{
            listaProductos.length }}
          </span>
        </div>

        <div class="card-body">
          <div class="overflow-auto" style="height: 275px">
            <div class="" v-for="(item, index) in listaProductos" :key="index">
              <div class="d-flex">
                <div class="ms-3">
                  <h4 class="mb-1 fw-semibold fs-14">
                    <span>{{ item.descripcionproducto }}</span>
                  </h4>
                  <div class="text-black fs-14">
                    CANTIDAD: {{ parseFloat(item.cantidad).toFixed(2) }}
                    <!-- <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star-half-o"></i>
                    <i class="fa fa-star-o"></i> -->
                  </div>
                  <p class="tag tag-radius tag-round tag-primary">
                    {{ item.unidadmedida }}
                  </p>
                </div>
                <div class="ms-auto">
                  <span class="fs-16 fw-semibold">
                    S/.{{ parseFloat(item.precioventa).toFixed(2) }}</span>
                </div>
              </div>
            </div>
          </div>
          <ul class="list-group border br-7 mt-5">
            <!-- <li class="list-group-item border-0">
              Sub Total
              <span class="h6 fw-bold mb-0 float-end">S/. {{ total }} </span>
            </li> -->
            <!-- <li class="list-group-item border-0">
              Discount
              <span class="h6 fw-bold mb-0 float-end">0%</span>
            </li>
            <li class="list-group-item border-0">
              Shipping
              <span class="h6 fw-bold mb-0 float-end">Free</span>
            </li> -->
            <li class="list-group-item border-0">
              TOTAL
              <span class="h4 fw-bold mb-0 float-end">S/. {{ parseFloat(total).toFixed(2) }}</span>
            </li>
          </ul>
        </div>

        <div class="card-footer">
          <input type="button" class="btn btn-warning" value="Retornar" @click="RetornarGenerarVenta" />
          <input type="button" class="btn btn-primary float-end" value="Realizar Venta" :disabled="disabledButton"
            @click="guardarVenta" />
        </div>
      </div>
    </div>
  </div>
  <!-- ROW-1 CLOSED -->
</template>

<script>
import { mapActions, mapState } from "vuex";
//import BuscarCliente from "../../../components/ventas/BuscarCliente.vue";
import VueLoading from "../../../components/varios/VueLoading.vue";
// import EfectuarPago from "../../../components/ventas/EfectuarPago.vue";
import global from "../../../global.js";
//Librayr
import dayjs from "dayjs";

export default {
  name: "EmitirDocumentoVenta",
  components: {
    VueLoading,
  },
  data() {
    return {
      descripciontipocomprobante: "NOTA DE VENTA",
      tipodocumento: "",
      usuario: {},
      disabledButton: false,
      spinner: "bar-fade-scale",
      seleccionmoneda: "SOLES",
      tipocambio: 3.5,
      nrcaja: 3,
      disabledImporteFormaPago: false,
      docventaid: 0,
      formapagodocventa: [],
      importeformapago: 0,
      tarjetacreditoid: null,
      formapagoid: null,
      descripcionformapago: "",
      isLoading: false,
      fullPage: true,
      date: new Date(),
      currentDate: dayjs(this.date).format("YYYY-MM-DD H:mm"),
      tipocomprobantes: [],
      tipoformapago: [],
      tarjetacreditoformapago: [],
      numerodocumento: "",
      numerosiguiente: "",
      monedas: [],
      moneda: "",
      monedaformapago: null,
      tipocomprobante: "",
      clienteid: null,
      clientes: [],
      venta: {},
      ventaBase: {
        docventaid: 0,
        clienteid: 0,
        monedaid: 0,
        igv: 0,
        importe: 0,
        total: 0,
        tipocomprobanteid: 0,
        fecha: "",
        numdoc: "",
        nrcaja: 0,
        nroliquidacion: "",
        estado: "",
        user: "",
        ventadetalle: [
          {
            docventaid: 0,
            productoid: 0,
            nitem: "",
            precio: 0,
            cantidad: 0,
            importe: 0,
            presentacionesid: 0,
            estado: "",
          },
        ],
      },
      formapago: {},
      formapagoBase: {
        docventaid: 0,
        numdoc: "",
        fechapago: "",
        tipocambio: this.tipocambio,
        user: "",
        formapagodetalle: [
          {
            docventaid: 0,
            formapagoid: 0,
            importe: 0,
            moneda: "",
            tarjeta: "",
          },
        ],
      },
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
            insumoid: 0,
            cantidad: 0,
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
      AgregarVenta: "_venta/AgregarVenta",
      ListarMoneda: "_moneda/Listar",
      ListarTipoComprobante: "_tipocomprobante/Listar",
      LimpiarProductos: "_pedido/LimpiarProductos",
      NumeracionComprobante: "_numeracion/NumeracionComprobante",
      ActualizarUltimoNumeroUsado: "_numeracion/ActualizarUltimoNumeroUsado",
      ClienteDesplegable: "_cliente/ClienteDesplegable",
      DesplegarFormaPago: "_formapago/DesplegarFormaPago",
      DesplegarTarjetaCreditoFormaPago:
        "_tarjetacreditoformapago/DesplegarTarjetaCreditoFormaPago",
      AgregarFormaPagoDocVenta: "_formapagodocventa/AgregarFormaPagoDocVenta",
      EnvioNubeFact: "_venta/EnvioNubeFact",
      ActualizarVentaNubeFact: "_venta/ActualizarVentaNubeFact",
      VerificarNumeroCaja: "_cajachica/VerificarNumeroCaja",
      PrinTicketVenta: "_venta/PrinTicketVenta",
      AgregarMovimiento: "_movimientos/AgregarMovimiento",
    }),
    showDescripcionTipoComprobante() {
      this.tipocomprobantes.forEach((element) => {
        if (element.id == this.tipocomprobanteid) {
          this.descripciontipocomprobante = element.nombre;
        }
      });
    },
    procesarMovimientosAlmacen: async function () {
      this.movimiento.fechamovimiento = this.currentDate;
      this.movimiento.nrodocumento = this.numerodocumento;
      this.movimiento.tipodocumento = this.descripciontipocomprobante;
      this.movimiento.razon = "VENTA";
      this.movimiento.tipomovimiento = "SALIDA";
      this.movimiento.nronotaingreso = "";
      this.movimiento.nronotasalida = "";
      this.movimiento.user = this.usuario.usuario;

      let detalleProducto = [];
      this.listaProductos.forEach((item) => {
        let productos = {
          movimientoid: 0,
          productoid: item.productoid,
          cantidad: item.cantidad,
          presentacion: item.decripcionpresentacion,
          cantidadpresentacion: item.cantidadpresentacion,
          precio: parseFloat(item.precioventa),
          importe: item.cantidad * parseFloat(item.precioventa),
          presentacionesid: item.presentacionesid,
          almacenid: 1,
        };

        detalleProducto.push(productos);
      });

      this.movimiento.movimientosdetalle = detalleProducto;

      this.isLoading = true;
      this.textloading = "Procesando Movimiento Almacén";
      let res = await this.AgregarMovimiento(this.movimiento);

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
    verificarNumeroCaja: async function () {
      let parametros = {
        codusu: this.usuario.usuario,
      };
      let res = await this.VerificarNumeroCaja(parametros);
      if (res != null) {
        this.venta.user = this.usuario.usuario;
        this.venta.nroliquidacion = res.nrcajachica;
        console.log(res.nrcajachica);
        this.formapago.user = this.usuario.usuario;

        this.disabledButton = false;
        this.disabledImporteFormaPago = false;
      } else {
        global._mensaje_advertencia(
          "Por favor debe aperturar una caja, gracias."
        );
        this.disabledButton = true;
        this.disabledImporteFormaPago = true;
      }
    },
    agregarFormaPago() {
      if (
        this.importeformapago > 0 &&
        this.importeformapago <= this.totalSaldo
      ) {
        let formapago = {
          docventaid: 0,
          formapagoid: this.formapagoid,
          formapago: this.descripcionformapago,
          moneda: this.monedaformapago,
          importe: this.importeformapago,
          tarjeta:
            this.tarjetacreditoid == null ? "NINGUNA" : this.tarjetacreditoid,
        };

        this.formapagodocventa.push(formapago);
        console.log(formapago);
        this.formapagoid = null;
        this.monedaformapago = null;
        this.importeformapago = 0;
        this.tarjetacreditoid = null;
        this.descripcionformapago = "";
      } else if (this.importeformapago == 0) {
        global._mensaje_advertencia("Debe agregar el valor del importe");
      } else if (this.importeformapago > this.totalSaldo) {
        global._mensaje_advertencia("El importe es mayor al saldo a pagar");
      }
    },
    quitarFormaPago(index) {
      global._swal_pregunta(
        "¿Está seguro que desea quitar el registro?",
        "Advertencia",
        async () => {
          this.formapagodocventa.splice(index, 1);
        }
      );
    },
    ComboTipoTarjetaFormaPago: async function () {
      let formapago = {
        formapagoid: this.formapagoid,
      };
      let res = await this.DesplegarTarjetaCreditoFormaPago(formapago);
      console.log('ComboTipoTarjetaFormaPago' + res);
      this.tarjetacreditoformapago = res;

      this.tipoformapago.forEach((element) => {
        console.log('formapagoid ' + this.formapagoid);
        if (element.id == this.formapagoid) {
          this.descripcionformapago = element.nombre;
        }
      });
      this.$refs.tarjetacredito.focus();
    },
    cambiarMonedaFocus() {
      this.$refs.refmonedaformapago.focus();
    },
    cambiarImporteFocus() {
      this.seleccionmoneda = this.monedaformapago;
      this.$refs.importeformapago.focus();
    },
    ComboClientes: async function () {
      let tipodocumento = {
        tipodocumento: this.tipodocumento,
      };
      let res = await this.ClienteDesplegable(tipodocumento);
      this.clientes = res;
    },
    ComboFormaPago: async function () {
      let res = await this.DesplegarFormaPago();
      this.tipoformapago = res;
    },
    ComboTarjetaCreditoFormaPago: async function () {
      let res = await this.DesplegarTarjetaCreditoFormaPago();
      this.tarjetacreditoformapago = res;
    },
    procesarPagoDocVenta: async function () {
      if (this.formapagodocventa.length > 0) {
        this.formapago.docventaid = this.docventaid;
        this.formapago.numdoc = this.numerodocumento;
        this.formapago.fechapago = this.currentDate;
        this.formapago.tipocambio = this.tipocambio;
        //this.formapago.user = "jconcha";
        this.formapago.formapagodetalle = this.formapagodocventa;

        await this.AgregarFormaPagoDocVenta(this.formapago);
      }
    },
    guardarVenta: async function () {
      let res = null;
      let detalleProducto = [];
      let numItem = 0;

      if (
        this.listaProductos.length != 0 &&
        this.clienteid != null &&
        this.moneda != "" &&
        this.tipocomprobante != ""
      ) {
        if (this.formapagodocventa.length > 0 && this.totalSaldo > 0) {
          global._mensaje_advertencia(
            "Agregado una forma de pago, pero tiene un saldo pendiente, gracias."
          );
          return;
        }

        this.venta.clienteid = this.clienteid;
        this.venta.monedaid = this.moneda;
        this.venta.tipocomprobanteid = this.tipocomprobante;
        this.venta.fecha = this.currentDate;
        this.venta.numdoc = this.numerodocumento;
        this.venta.importe = 0;
        this.venta.igv = 0;
        this.venta.total = this.total;
        this.venta.estado = "EMITIDO";
        this.venta.nrcaja = 0;
        // this.venta.nroliquidacion = "0";

        this.listaProductos.forEach((item) => {
          numItem = numItem + 1;
          let productos = {
            docventaid: 0,
            productoid: item.productoid,
            nitem: numItem,
            precio: parseFloat(item.precioventa),
            importe: item.cantidad * parseFloat(item.precioventa),
            cantidad: item.cantidad,
            presentacion: item.decripcionpresentacion,
            cantidadpresentacion: item.cantidadpresentacion,
            presentacionesid: item.presentacionesid,
            estado: "ATENDIDO",
          };

          detalleProducto.push(productos);
        });

        this.venta.ventadetalle = detalleProducto;

        global._swal_pregunta(
          "¿Está seguro que desea procesar la venta?",
          "Advertencia",
          async () => {
            this.isLoading = true;
            this.textloading = "Generando comprobante en el sistema";
            res = await this.AgregarVenta(this.venta);

            if (res?.exito) {
              this.docventaid = res.datos.id;
              await this.procesarMovimientosAlmacen();
              await this.procesarPagoDocVenta();
              this.isLoading = false;
              global._mensaje_exito("El comprobante se generó con éxito.");
              this.ActualizarNumeracion();
              this.LimpiarProductos();
              this.printicketventa(this.docventaid);
              this.loadVenta();
              this.RetornarGenerarVenta();
            }
          }
        );
      } else if (this.listaProductos.length == 0) {
        global._mensaje_advertencia("Detalle vacio, gracias.");
      } else if (this.clienteid == null) {
        global._mensaje_advertencia("Debe seleccionar un cliente, gracias.");
      } else if (this.moneda == "") {
        global._mensaje_advertencia("Debe seleccionar una moneda, gracias.");
      } else if (this.tipocomprobante == "") {
        global._mensaje_advertencia(
          "Debe seleccionar un tipo de comprobante, gracias."
        );
      }
    },
    enviarComprobanteNubeFact: async function (docventaid, tipocomprobante) {
      if (tipocomprobante == 7 || tipocomprobante == 8) {
        let docventa = {
          docventaid: docventaid,
        };
        this.isLoading = true;
        try {
          let res = await this.EnvioNubeFact(docventa);

          if (res?.exito) {
            global._mensaje_exito(
              res.mensaje + " " + res.datos.sunat_description
            );
            this.isLoading = false;
            this.textloading = "Enviando comprobante a NubeFact";
            let docventanubefact = {
              docventaid: docventaid,
              aceptada_por_sunat: res.datos.aceptada_por_sunat,
              sunat_description: res.datos.sunat_description,
              enlace: res.datos.enlace,
              enlace_del_cdr: res.datos.enlace_del_cdr,
              enlace_del_pdf: res.datos.enlace_del_pdf,
              enlace_del_xml: res.datos.enlace_del_xml,
            };
            let resdocventanubefact = await this.ActualizarVentaNubeFact(
              docventanubefact
            );
          } else {
            ElNotification({
              title: "Error NubeFact",
              duration: 0,
              message: res.datos.errors,
              type: "error",
            });
            this.isLoading = false;
          }
        } catch (error) {
          this.isLoading = false;
          global._mensaje_error("Ocurrio un error", error);
        }
      }
    },
    ActualizarNumeracion: async function () {
      let numeracion = {
        tipodocumentoid: this.tipocomprobante,
        razon: "VENTA",
        ultimonumerousado: this.numerosiguiente,
      };
      await this.ActualizarUltimoNumeroUsado(numeracion);
    },
    RetornarGenerarVenta() {
      const origen = sessionStorage.getItem('origenVenta');
      console.log(origen);
      if (origen === 'rapida') {
        this.$router.push({ name: 'ventarapida' });
      } else {
        this.$router.push({ name: 'listadoproductos' });
      }
      // this.$router.push({
      //   name: "listadoproductos",
      // });
    },
    ComboMoneda: async function () {
      let res = await this.ListarMoneda();
      this.monedas = res;
    },
    ComboTipoComprobante: async function () {
      let comprobante = {
        proceso: "V",
      };
      let res = await this.ListarTipoComprobante(comprobante);
      this.tipocomprobantes = res;
    },
    loadVenta: function () {
      this.venta = { ...this.ventaBase };
    },
    printicketventa: async function (docventaid) {
      let parametros = {
        docventaid: docventaid,
      };
      await this.PrinTicketVenta(parametros);
    },
    loadFormaPagoDocVenta: function () {
      this.formapago = { ...this.formapagoBase };
    },
    cargarNumeracionComprobantes: async function () {
      let comprobante = {
        tipodocumento: this.tipocomprobante,
        razon: "VENTA",
      };

      let res = await this.NumeracionComprobante(comprobante);
      this.numerodocumento = res.numerodocumento;
      this.numerosiguiente = res.siguiente;

      if (this.tipocomprobante == 8 || this.tipocomprobante == 2) {
        this.tipodocumento = "RUC";
      } else {
        this.tipodocumento = "DNI";
      }
      this.ComboClientes();
      this.showDescripcionTipoComprobante();
    },
  },
  computed: {
    ...mapState({
      listaProductos: (state) => state._pedido.listaProductos,
      mesaid: (state) => state._mesa.mesaid,
      personalid: (state) => state._pedido.personalid,
      pedidoid: (state) => state._pedido.pedidoid,
    }),
    total: function () {
      let sum = 0;
      this.listaProductos.forEach(
        (item) => (sum += parseFloat(item.cantidad * item.precioventa))
      );
      return sum;
    },
    totalPago: function () {
      let sum = 0;
      this.listaProductos.forEach((item) =>
        this.seleccionmoneda == "SOLES"
          ? (sum += parseFloat(item.cantidad * item.precioventa))
          : (sum += Math.round(
            (item.cantidad * item.precioventa) / this.tipocambio
          ))
      );
      return sum;
    },
    totalAbonado: function () {
      let sum = 0;
      this.formapagodocventa.forEach(
        (item) => (sum += parseFloat(item.importe))
      );
      return sum;
    },
    totalSaldo: function () {
      let saldo = 0;
      let totalPago = this.totalPago;
      let abonado = this.totalAbonado;
      if (abonado > totalPago && totalPago > 0) {
        global._mensaje_advertencia(
          "El monto ingresado es mayor al total de la venta"
        );
        this.disabledImporteFormaPago = true;
        saldo = totalPago - abonado;
      } else {
        this.disabledImporteFormaPago = false;
        saldo = totalPago - abonado;
      }

      return saldo;
    },
  },
  mounted() {
    if (localStorage.getItem("login")) {
      this.usuario = JSON.parse(localStorage.getItem("login"));
    }
    this.isLoading = true;
    this.loadVenta();
    this.verificarNumeroCaja();
    this.ComboMoneda();
    this.ComboTipoComprobante();
    this.isLoading = false;
    this.tipocomprobante = "1";
    this.cargarNumeracionComprobantes();
    this.moneda = 1;
    this.clienteid = 1;
    this.ComboFormaPago();

    this.formapagoid = 2;
    this.ComboTipoTarjetaFormaPago();
    this.tarjetacreditoid = 1;
    this.monedaformapago = 1;

    this.importeformapago = this.totalPago;
    this.agregarFormaPago();
  },
};
</script>

<style></style>
