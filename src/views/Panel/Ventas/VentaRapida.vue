<template>
  <vue-loading :fullPage="fullPage" :isLoading="isLoading" :spinner="spinner" />
  <div>
    <!-- ROW-1 OPEN -->
    <div class="row row-cards" style="background-color: #eaedf7">
      <div class="col-xl-12 col-md-12">
        <div class="card">
          <div class="card-status bg-blue br-te-7 br-ts-7"></div>
          <div class="card-header">
            <span class="fs-16 fw-semibold ms-2">FECHA </span><span class="fs-16 ms-2"> {{ currentDate }}</span>
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{{
              listaProductos.length }}
            </span>
          </div>
          <div class="input-group d-flex w-100 float-end">
            <input type="text" class="form-control border-end-0 my-2" placeholder="Search ..." ref="barcodeInput"
              v-model="barcode" @keyup.enter="buscarPorCodigo" />
            <button class="btn input-group-text bg-transparent border-start-0 text-muted my-2">
              <i class="fe fe-search text-muted" aria-hidden="true"></i>
            </button>
          </div>
          <div class="overflow-auto" style="height: 400px">
            <div class="card-body">
              <div class="" v-for="(item, index) in listaProductos" :key="index" v-show="listaProductos.length > 0">
                <div class="d-flex">
                  <div class="ms-3">
                    <h4 class="mb-1 fw-semibold fs-14">
                      <span>{{ item.descripcionproducto }}</span>
                    </h4>
                    <div class="text-black fs-14">
                      CANTIDAD:
                      <button type="button" class="ms-3 btn btn-icon btn-teal btn-sm mb-1" title="Disminuir Cantidad"
                        :disabled="item.pedidoid == 0 ? false : true" @click="DisminuirCantidad(index)">
                        <i class="fa fa-minus"></i>
                      </button>
                      <span class="fs-12 ms-3">
                        {{ parseFloat(item.cantidad).toFixed(2) }}
                      </span>
                      <button type="button" class="ms-3 btn btn-icon btn-teal btn-sm mb-1" title="Aumentar Cantidad"
                        :disabled="item.pedidoid == 0 ? false : true" @click="AumentarCantidad(index)">
                        <i class="fa fa-plus"></i>
                      </button>
                    </div>

                    <p class="fs-12 fw-semibold">
                      <a href="javascript:void(0)" class="cursor: pointer;" @click="
                        selectPreciosPresentacion(item.productoid, index)
                        ">
                        <span class="tag tag-radius tag-round tag-primary">
                          {{ item.unidadmedida }}</span></a>
                    </p>
                  </div>
                  <div class="ms-auto">
                    <div class="text-black fs-14">
                      S/.
                      <button type="button" class="ms-3 btn btn-icon btn-red btn-sm mb-1" title="Disminuir Precio"
                        :disabled="item.pedidoid == 0 ? false : true" @click="DisminuirPrecio(index)">
                        <i class="fa fa-minus"></i>
                      </button>
                      <span class="fs-12 ms-3">
                        {{ parseFloat(item.precioventa).toFixed(2) }}
                      </span>
                      <button type="button" class="ms-3 btn btn-icon btn-red btn-sm mb-1" title="Aumentar Precio"
                        :disabled="item.pedidoid == 0 ? false : true" @click="AumentarPrecio(index)">
                        <i class="fa fa-plus"></i>
                      </button>
                      <a href="javascript:void(0)" class="text-muted ms-3 text-end" title="Quitar producto"
                        @click="abrirModal(item, index)">
                        <i class="fe fe-trash-2 text-danger"> </i>
                      </a>
                    </div>
                    <!-- <span class="fs-14 fw-semibold">
                      S/.{{ parseFloat(item.precioventa).toFixed(2) }}</span> -->

                  </div>
                </div>
              </div>

              <div class="text-center" v-show="listaProductos.length == 0">
                <span class="fw-bold fs-18">Detalle Vacio</span>
              </div>
            </div>
          </div>

          <div class="card-footer">
            <!-- <input
              type="button"
              class="btn btn-primary"
              value="Emitir Comprobante"
              @click="emitirComprobante"
            /> -->
            <input type="button" class="btn btn-primary float-sm" value="Realizar Pedido" @click="guardarPedido" />
            <span class="h4 fw-bold float-end">Total S/. {{ parseFloat(total).toFixed(2) }}</span>
            <!-- <div class="btn-list">
              <input
                type="button"
                class="btn btn-primary"
                value="Emitir Comprobante"
                @click="emitirComprobante"
              />
              <input
                type="button"
                class="btn btn-success float-sm-end"
                value="Realizar Pedido"
                @click="guardarPedido"
              />
            </div> -->
          </div>
        </div>
      </div>
      <!-- COL-END -->
      <!-- <sub-familias /> -->
      <!-- ROW-1 CLOSED -->
    </div>
    <!-- ROW-1 END -->
  </div>
  <!-- Modal Observacion Anulacion -->
  <observacion-anulacion id="staticBackdropObservacion" @cerrarModal="cerrarModalObservacion"
    @guardarObservacion="guardarObservacion" />
  <!-- Fin Modal Observacion Anulacion -->

  <!-- Modal Observacion Anulacion -->
  <cambiar-precios-presentacion id="staticBackdropPreciosPresentacion" :selectProductoid="selectProductoid"
    @seleccionarPrecio="seleccionarPrecio" />
  <!-- Fin Modal Observacion Anulacion -->
</template>

<script>
// import SubFamilias from "../../../components/pedidos/SubFamilias.vue";
import ObservacionAnulacion from "../../../components/varios/ObservacionAnulacion.vue";
import Productos from "../../../components/pedidos/ProductosSearch.vue";
import VueLoading from "../../../components/varios/VueLoading.vue";
import CambiarPreciosPresentacion from "../../../components/pedidos/CambiarPreciosPresentacion.vue";
import global from "../../../global";
//Librayr
import dayjs from "dayjs";
import { mapActions, mapState } from "vuex";
import { nextTick } from "vue";

export default {
  components: {
    Productos,
    VueLoading,
    ObservacionAnulacion,
    CambiarPreciosPresentacion,
  },
  data() {
    return {
      barcode: "",
      selectProductoid: 0,
      usuario: {},
      indexListaProductos: -1,
      textomensajecocina: "",
      spinner: "bar-fade-scale",
      position: "top right",
      fullPage: true,
      isLoading: false,
      date: new Date(),
      currentYear: dayjs(this.date).format("YYYY"),
      currentMonth: dayjs(this.date).format("MM"),
      currentDate: dayjs(this.date).format("YYYY-MM-DD, H:mm"),
      topproductos: [],
      anularPedido: {},
      anularPedidoBase: {
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
            cantidad: 0,
            mensajecocina: "",
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions({
      //ListarTopProductos: "_producto/ListarTopProductos",
      AgregarPedido: "_pedido/AgregarPedido",
      ModificarPedido: "_pedido/ModificarPedido",
      LimpiarProductos: "_pedido/LimpiarProductos",
      QuitarProductos: "_pedido/QuitarProductos",
      AnularPedidoDetalle: "_pedido/AnularPedidoDetalle",
      AumentarCantidad: "_pedido/AumentarCantidad",
      DisminuirCantidad: "_pedido/DisminuirCantidad",
      AumentarPrecio: "_pedido/AumentarPrecio",
      DisminuirPrecio: "_pedido/DisminuirPrecio",
      ObtenerPreciosPresentacion: "_producto/ObtenerPreciosPresentacion",
      AgregarProductos: "_pedido/AgregarProductos",
    }),
    seleccionarPrecio(item) {
      console.log(item);
      this.listaProductos[this.indexListaProductos].unidadmedida =
        item.descripcionunidadmedida;
      this.listaProductos[this.indexListaProductos].precioventa = item.precio;
      this.listaProductos[this.indexListaProductos].cantidadpresentacion =
        item.cantidadpresentacion;
      this.listaProductos[this.indexListaProductos].descripcionproducto =
        item.decripcionpresentacion;
      this.listaProductos[this.indexListaProductos].presentacionesid =
        item.presentacionesid;

      this.closeModalCambiarPreciosPresentacion();
    },
    closeModalCambiarPreciosPresentacion: function () {
      var modal = bootstrap.Modal.getInstance(
        document.getElementById("staticBackdropPreciosPresentacion")
      );
      modal.hide();
    },
    selectPreciosPresentacion(selectProductoid, index) {
      this.indexListaProductos = index;
      this.selectProductoid = parseInt(selectProductoid);
      new bootstrap.Modal($("#staticBackdropPreciosPresentacion")).show(); // Abrir modal
    },
    verificarProductoItem() {
      let productonoregistrado = false;
      this.listaProductos.forEach((item) => {
        if (item.pedidoid == 0) {
          productonoregistrado = true;
        }
      });
      return productonoregistrado;
    },

    abrirModal: function (item, index) {
      if (item.pedidoid == 0) {
        this.quitarProductosPedido(item, index);
      } else {
        this.loadPedidoAnulacion();
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
      this.loadPedidoAnulacion();
      this.cerrarModalObservacion();
    },
    cerrarModalObservacion: function () {
      var modal = bootstrap.Modal.getInstance(
        document.getElementById("staticBackdropObservacion")
      );
      modal.hide();
    },
    cambiarMesas() {
      this.$router.push({
        name: "monitoreomesas",
      });
    },
    guardarPedido: async function () {
      if (this.listaProductos.length > 0) {
        this.$router.push({
          name: "emitirdocumentoventa",
        });
      }
    },
    loadPedido: function () {
      this.pedido = { ...this.pedidoBase };
    },
    loadPedidoAnulacion: function () {
      this.anularPedido = { ...this.anularPedidoBase };
    },
    sendNotificationPedido(mesaid) {
      let date = new Date();
      let currentDate = dayjs(date).format("YYYY-MM-DD H:mm");

      // let newNotification = {
      //   mesa: mesaid,
      //   fecha: currentDate,
      // };

      //this.$socket.emit("newNotification", newNotification);
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
    CargarTopProductos: async function () {
      let parametros = {
        mes: this.currentMonth,
        anio: this.currentYear,
      };
      let res = await this.ListarTopProductos(parametros);
      this.topproductos = res;
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

          this.cargarProductosPedido(producto);
        } else {
          ElNotification({
            title: "Error",
            message: "Producto no encontrado",
            type: "error",
          });
        }
      } catch (error) {
        ElNotification({
          title: "Error",
          message: "Código no encontrado o conexión fallida",
          type: "error",
        });
      }

      // Limpia el input para el siguiente escaneo
      this.barcode = "";
      this.$refs.barcodeInput.focus();
    },
    cargarProductosPedido(item) {
      ElNotification({
        title: "Éxito",
        duration: 1500,
        message:
          "Se agregó " + 1 + " " + item.decripcionpresentacion + ".",
        type: "success",
      });

      this.resetearCantidad = true;
      let productos = {
        cantidad: 1,
        descripcionproducto: item.decripcionpresentacion,
        nitem: "",
        pedidoid: 0,
        precioventa: item.precio,
        marca: item.marca,
        unidadmedida: "UND",
        decripcionpresentacion: "UNIDAD",
        cantidadpresentacion: 1,
        presentacionesid: item.presentacionesid,
        productoid: item.productoid,
      };
      this.AgregarProductos(productos);
      this.cantidad = 1;
    },
  },
  computed: {
    ...mapState({
      listaProductos: (state) => state._pedido.listaProductos,
      mesaid: (state) => state._mesa.mesaid,
      //fechapedido: (state) => state._pedido.fechapedido,
      personalid: (state) => state._pedido.personalid,
      pedidoid: (state) => state._pedido.pedidoid,
      total: function () {
        let sum = 0;
        this.listaProductos.forEach(
          (item) => (sum += parseFloat(item.cantidad * item.precioventa))
        );
        return sum;
      },
      totalConDescuento() {
        if (this.tipoDescuento === "porcentaje") {
          return this.total - (this.total * this.descuento) / 100;
        } else {
          return this.total - this.descuento;
        }
      },
    }),
  },
  mounted() {
    if (localStorage.getItem("login")) {
      this.usuario = JSON.parse(localStorage.getItem("login"));
    }
    this.loadPedido();

    nextTick(() => {
      if (this.$refs.barcodeInput) {
        this.$refs.barcodeInput.focus();
      }
    });

    window.addEventListener("click", () => {
      if (this.$refs.barcodeInput) {
        this.$refs.barcodeInput.focus();
      }
    });
    //this.CargarTopProductos();
  },
};
</script>

<style></style>
