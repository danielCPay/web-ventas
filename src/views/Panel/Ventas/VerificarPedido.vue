<template>
  <vue-loading :fullPage="fullPage" :isLoading="isLoading" :spinner="spinner" />
  <!-- PAGE-HEADER -->
  <!-- CONTAINER -->
  <div class="main-container container-fluid">
    <!-- PAGE-HEADER END -->
    <div class="row" style="background-color: #eaedf7">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xl-8">
        <div class="card cart">
          <div class="card-header">
            <h3 class="card-title">
              Detalle del Pedido
              <span style="color: red">Mesa: Nº {{ mesaid }}</span>
            </h3>
            <div class="card-options">
              <a
                href="javascript:void(0)"
                class="btn btn-primary btn-sm"
                @click="imprimirPrecuenta()"
                >Imprimir PreCuenta</a
              >
              <!-- <a
                href="javascript:void(0)"
                class="btn btn-secondary btn-sm ms-2"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdropGastos"
                >Registro de Gastos</a
              > -->
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-6">
                <form class="form-horizontal">
                  <div class="row mb-4">
                    <label class="col-md-4 form-label">MOZO</label>
                    <div class="col-md-8">
                      <el-select
                        placeholder="Seleccionar Mozo"
                        filterable
                        v-model="mozo"
                        @change="selecccionarMozo"
                      >
                        <el-option
                          v-for="item in cboPersonal"
                          :key="item.id"
                          :label="item.nombre"
                          :value="item.id"
                        ></el-option>
                      </el-select>
                    </div>
                  </div>
                </form>

                <!-- <select
                  class="form-control form-select form-select-sm select2"
                  data-bs-placeholder="Personal"
                  v-model="personalid"
                  @change="selecccionarMozo"
                >
                  <option value="0">SELECCIONAR MOZO</option>
                  <option
                    v-for="item in cboPersonal"
                    :key="item.id"
                    :label="item.nombre"
                    :value="item.id"
                  ></option>
                </select> -->
              </div>
            </div>

            <div class="table-responsive">
              <table class="table table-bordered table-vcenter">
                <thead>
                  <tr class="border-top">
                    <th>#</th>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in listaProductos" :key="index">
                    <td>
                      {{ item.nitem }}
                    </td>
                    <td>{{ item.descripcionproducto }}</td>
                    <td class="fw-bold">{{ parseFloat(item.preciocarta) }}</td>
                    <td>
                      <div class="handle-counter" id="handleCounter4">
                        <button
                          type="button"
                          class="counter-minus btn btn-white lh-2 shadow-none"
                          @click="DisminuirCantidad(index)"
                        >
                          <i class="fa fa-minus text-muted"></i>
                        </button>
                        <input
                          type="text"
                          :value="`${item.cantidad}`"
                          class="qty"
                          min="1"
                          readonly
                        />
                        <button
                          type="button"
                          class="counter-plus btn btn-white lh-2 shadow-none"
                          @click="AumentarCantidad(index)"
                        >
                          <i class="fa fa-plus text-muted"></i>
                        </button>
                      </div>
                    </td>
                    <td>
                      {{ parseFloat(item.cantidad * item.preciocarta) }}
                    </td>
                    <td>
                      <div class="d-flex g-2">                    
                        <a
                          class="btn text-danger bg-danger-transparent btn-icon py-1"
                          title="Quitar Producto"
                          @click="abrirModal(item, index)"
                          ><span class="bi bi-trash fs-16"></span
                        ></a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- <div class="card-footer">
          <div class="row">
            <div class="col-md-6 col-sm-6">
              <div class="input-group mb-1">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search ..."
                />
                <span class="input-group-text btn btn-primary"
                  >Apply Coupon</span
                >
              </div>
            </div>
            <div class="col-md-6 col-sm-6 text-end">
              <a
                href="javascript:void(0)"
                class="btn btn-default disabled btn-md"
                >Update Cart</a
              >
            </div>
          </div>
        </div> -->
        </div>
      </div>
      <div class="col-lg-12 col-xl-4 col-sm-12 col-md-12">
        <div class="card">
          <div class="card-header">
            <div class="card-title">Totales de Pedido</div>
            <div class="card-options">
              <a
                href="javascript:void(0)"
                class="btn btn-secondary btn-sm"
                @click="emitirComprobante"
                >Emitir Comprobante</a
              >
            </div>
          </div>
          <div class="card-body py-2">
            <div class="table-responsive">
              <table class="table table-borderless text-nowrap mb-0">
                <tbody>
                  <tr>
                    <td class="text-start">Sub Total</td>
                    <td class="text-end">
                      <span class="fw-bold ms-auto">S/. {{ total }}</span>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-start">Additional Discount</td>
                    <td class="text-end">
                      <span class="fw-bold text-success">0</span>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-start">Delivery Charges</td>
                    <td class="text-end">
                      <span class="fw-bold text-green">0 (Free)</span>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-start">Tax</td>
                    <td class="text-end">
                      <span class="fw-bold text-danger">0</span>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-start">Coupon Discount</td>
                    <td class="text-end">
                      <span class="fw-bold text-success">0</span>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-start">Vat Tax</td>
                    <td class="text-end"><span class="fw-bold">0</span></td>
                  </tr>
                  <tr>
                    <td class="text-start fs-18">Total</td>
                    <td class="text-end">
                      <span class="ms-2 fw-bold fs-23">S/. {{ total }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="card-footer">
            <div class="btn-list">
              <a
                href="javascript:void(0)"
                class="btn btn-primary"
                @click="productosSearch"
                ><i class="fa fa-arrow-left me-1"></i>Productos</a
              >
              <a
                href="javascript:void(0)"
                class="btn btn-success float-sm-end"
                @click="guardarPedido"
                >Procesar<i class="fa fa-arrow-right ms-1"></i
              ></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- ROW-1 CLOSED -->
  <!-- Modal -->
  <div
    class="modal fade"
    id="staticBackdropMensajeCocina"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">
            Escribe un Mensaje para Cocina
          </h5>
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
              <label>Mensaje Cocina</label>
              <input
                type="text"
                class="form-control"
                placeholder="Mensaje Cocina"
                maxlength="45"               
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
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  </div>

  <observacion-anulacion
    id="staticBackdropObservacion"
    @cerrarModal="cerrarModalObservacion"
    @guardarObservacion="guardarObservacion"
  />
</template>
<script>
import { mapActions, mapState } from "vuex";
import global from "../../../global.js";
import VueLoading from "../../../components/varios/VueLoading.vue";
import ObservacionAnulacion from "../../../components/varios/ObservacionAnulacion.vue";
//Librayr
import dayjs from "dayjs";

export default {
  name: "VerificarPedido",
  components: {
    VueLoading,
    ObservacionAnulacion,
  },
  data() {
    return {
      usuario: {},
      spinner: "bar-fade-scale",
      mozo: 0,
      cboPersonal: [],
      fullPage: true,
      isLoading: false,
      date: new Date(),
      currentDate: dayjs(this.date).format("YYYY-MM-DD, H:mm"),
      indexListaProductos: -1,   
      anularPedido: {
        pedidoid: 0,
        productoid: 0,
        index: -1,
        observacion: "",
      },
      pedido: {},
      pedidoBase: {
        pedidoid: 0,
        personalid: 0,
        fechapedido: "",
        mesaid: 0,
        estado: "",
        user: "",
        pedidodetalle: [
          {
            pedidoid: 0,
            productoid: 0,
            nitem: "",
            cantidad: 0      
          },
        ],
      },
    };
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
        (item) => (sum += parseFloat(item.cantidad * item.preciocarta))
      );
      return sum;
    },
  },
  methods: {
    ...mapActions({
      QuitarProductos: "_pedido/QuitarProductos",
      LimpiarProductos: "_pedido/LimpiarProductos",
      AgregarPedido: "_pedido/AgregarPedido",
      ModificarPedido: "_pedido/ModificarPedido",
      AumentarCantidad: "_pedido/AumentarCantidad",
      DisminuirCantidad: "_pedido/DisminuirCantidad",
      PersonalDesplegable: "_personal/PersonalDesplegable",
      SeleccionarPersonal: "_pedido/SeleccionarPersonal",
      AnularPedidoDetalle: "_pedido/AnularPedidoDetalle",
    }),
    abrirModal: function (item, index) {
      if (item.pedidoid == 0) {
        this.quitarProductosPedido(item, index);
      } else {
        this.anularPedido.pedidoid = item.pedidoid;
        this.anularPedido.productoid = item.productoid;
        this.anularPedido.index = index;
        new bootstrap.Modal($("#staticBackdropObservacion")).show(); // Abrir modal
      }
    },
    guardarObservacion(observacion) {
      let index = this.anularPedido.index;
      this.anularPedido.observacion = observacion;
      this.quitarProductosPedido(this.anularPedido, index);
      this.cerrarModalObservacion();
    },
    sendNotificationPedido(mesaid) {
      let date = new Date();
      let currentDate = dayjs(date).format("YYYY-MM-DD H:mm");

      let newNotification = {
        mesa: mesaid,
        fecha: currentDate,
      };

      //this.$socket.emit("newNotification", newNotification);
    },
    imprimirPrecuenta() {
      if (this.pedidoid > 0) {
        ///SE IMPRIME LA PRECUENTA
      } else {
        global._mensaje_advertencia(
          "No existe aún, un pedido registrado para esta mesa, gracias."
        );
      }
    },
    emitirComprobante() {
      if (this.pedidoid > 0) {
        this.$router.push({
          name: "emitirdocumentoventa",
        });
      } else {
        global._mensaje_advertencia(
          "No existe aún, un pedido registrado para esta mesa, gracias."
        );
      }
    },      
    cerrarModalObservacion: function () {
      var modal = bootstrap.Modal.getInstance(
        document.getElementById("staticBackdropObservacion")
      );
      modal.hide();
    },   
    comboPersonal: async function () {
      var res = await this.PersonalDesplegable();
      this.cboPersonal = res;
    },
    guardarPedido: async function () {
      let res = null;
      let detalleProducto = [];
      let numItem = 0;

      if (
        this.listaProductos.length != 0 &&
        this.personalid != null &&
        this.mesaid != 0
      ) {
        this.pedido.pedidoid = this.pedidoid;
        this.pedido.fechapedido = this.currentDate;
        this.pedido.mesaid = this.mesaid;
        this.pedido.estado = "P";
        this.pedido.user = this.usuario.usuario;
        this.pedido.personalid = this.personalid;
        this.listaProductos.forEach((item) => {
          numItem = numItem + 1;
          let productos = {
            pedidoid: item.pedidoid,
            productoid: item.productoid,
            nitem: numItem,
            cantidad: item.cantidad           
          };

          detalleProducto.push(productos);
        });

        this.pedido.pedidodetalle = detalleProducto;

        global._swal_pregunta(
          "¿Está seguro que desea procesar el pedido?",
          "Advertencia",
          async () => {
            this.isLoading = true;
            if (this.pedidoid == 0) {
              res = await this.AgregarPedido(this.pedido);
            } else {
              res = await this.ModificarPedido(this.pedido);
            }

            if (res?.exito) {
              this.sendNotificationPedido(this.mesaid);

              this.isLoading = false;
              this.loadPedido();
              this.LimpiarProductos();
              global._mensaje_exito(
                "Los cambios se han guardado correctamente"
              );
              //this.cargarMesas(true);
              this.retornarMesas();
            }
          }
        );
      } else if (this.listaProductos.length == 0) {
        global._mensaje_advertencia("Detalle vacio, gracias.");
      } else if (this.personalid == null) {
        global._mensaje_advertencia("Debe seleccionar un mozo, gracias.");
      } else if (this.mesaid == 0) {
        global._mensaje_advertencia("Debe seleccionar una mesa, gracias.");
      }
    },
    productosSearch() {
      this.$router.push({
        name: "listadoproductos",
      });
    },
    retornarMesas() {
      this.$router.push({
        name: "monitoreomesas",
      });
    },
    loadPedido: function () {
      this.pedido = { ...this.pedidoBase };
    },
    selecccionarMozo() {     
      this.SeleccionarPersonal(this.mozo);
    },
    quitarProductosPedido(item, index) {
      global._swal_pregunta(
        "¿Está seguro que desea eliminar el registro?",
        "Advertencia",
        async () => {
          if (item.pedidoid == 0) {
            this.QuitarProductos(index);
            global._mensaje_exito("Item se eliminó con éxito");
          } else {
            let pedido = {
              pedidoid: item.pedidoid,
              productoid: item.productoid,
              codusu: this.usuario.usuario,
              observacion: item.observacion,
            };
            this.isLoading = true;

            try {
              let res = await this.AnularPedidoDetalle(pedido);
              if (res?.exito) {
                this.QuitarProductos(index);
                global._mensaje_exito("Item se eliminó con éxito");
                this.isLoading = false;
              }
            } catch (error) {
              this.isLoading = false;
              global._mensaje_error("Ocurrio un error", error);
            }
          }
        }
      );
    },
  },
  mounted() {
    if (localStorage.getItem("login")) {
      this.usuario = JSON.parse(localStorage.getItem("login"));
    }
    this.loadPedido();
    this.comboPersonal();
    this.mozo = this.personalid;
  },
};
</script>
