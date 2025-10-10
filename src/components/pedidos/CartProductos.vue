<template>
  <!-- <notifications-vue-3 :position="position" /> -->
  <vue-loading :fullPage="fullPage" :isLoading="isLoading" :spinner="spinner" />
  <div class="dropdown d-flex message">
    <a class="nav-link icon" data-bs-toggle="dropdown"
      ><i class="fe fe-shopping-cart"></i>
      <span
        class="position-absolute top-1 start-100 translate-middle badge rounded-pill bg-secondary"
        >{{ listaProductos.length }}
        <span class="visually-hidden">unread messages</span>
      </span>
    </a>
    <div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
      <div class="drop-heading border-bottom">
        <div class="d-flex">
          <h6 class="mt-1 mb-0 fs-16 fw-semibold text-dark">Listado</h6>
          <div class="ms-auto">
            <a href="javascript:void(0)" class="text-muted p-0 fs-12"
              >Productos</a
            >
          </div>
        </div>
      </div>
      <div class="message-menu">
        <div class="overflow-auto" :style="`${styleHeight}`">
          <a
            class="dropdown-item d-flex"
            v-for="(item, index) in listaProductos"
            :key="index"
          >
            <span
              class="avatar avatar-md brround me-3 align-self-center cover-image"
              data-bs-image-src="../assets/images/users/1.jpg"
            ></span>
            <div class="wd-90p">
              <div class="d-flex">
                <h5 class="mb-1">
                  {{ item.descripcionproducto }}
                </h5>
                <small class="text-muted ms-auto text-end">
                  S/. {{ item.preciocarta }}
                </small>
              </div>
              <span
                >Presentación:
                <span class="text-success">{{ item.presentacion }}</span>
                <a
                  href="javascript:void(0)"
                  class="text-muted ms-auto text-end"
                  title="Quitar producto"
                  @click="quitarProductosPedido(item, index)"
                >
                  <i class="fe fe-trash-2 text-danger"> </i>
                </a>
              </span>
              <p class="fs-13 text-muted mb-0">Cantidad: {{ item.cantidad }}</p>
              <!-- <a
                href="javascript:void(0)"
                class="fs-13 text-muted mb-0"
                @click="quitarProductosPedido(index)"
              >
                <i class="fe fe-trash-2 text-danger"> </i>
              </a> -->
            </div>
          </a>
        </div>
      </div>
      <div class="dropdown-divider m-0"></div>
      <div class="dropdown-footer">
        <a
          href="javascript:void(0)"
          class="dropdown-item text-center p-3 text-muted"
          @click="verificarPedido"
          v-if="listaProductos.length > 0"
        >
          <i class="fe fe-check-circle"></i>
          Detalle del Pedido</a
        >

        <a
          href="javascript:void(0)"
          class="dropdown-item text-center p-3 text-muted"
          v-else
        >
          <i class="fe fe-check-circle"></i>
          Detalle vacio</a
        >
        <div class="row">
          <div class="col mt-1 px-4">
            <a
              href="javascript:void(0)"
              class="btn btn-primary btn-pill w-sm btn-sm py-2"
              @click="guardarPedido"
              v-show="listaProductos.length > 0"
            >
              <i class="fe fe-check-circle"></i>
              Procesar
            </a>
          </div>
          <div class="col" v-show="listaProductos.length > 0">
            <span class="float-end p-2 fs-17 fw-semibold">S/. {{ total }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import global from "../../global";
import VueLoading from "../varios/VueLoading.vue";
// import NotificationsVue3 from "../varios/NotificationsVue3.vue";
//Librayr
import dayjs from "dayjs";

export default {
  name: "CartProductos",
  components: {
    VueLoading,
    //NotificationsVue3,
  },
  data() {
    return {
      spinner: "bar-fade-scale",
      position: "top right",
      fullPage: true,
      isLoading: false,
      date: new Date(),
      currentDate: dayjs(this.date).format("YYYY-MM-DD, H:mm"),
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
    styleHeight: function () {
      let style = "height:auto";
      if (this.listaProductos.length > 0) {
        style = "height:250px";
      }
      return style;
    },
  },
  methods: {
    ...mapActions({
      QuitarProductos: "_pedido/QuitarProductos",
      AgregarPedido: "_pedido/AgregarPedido",
      ModificarPedido: "_pedido/ModificarPedido",
      LimpiarProductos: "_pedido/LimpiarProductos",
    }),
    verificarPedido() {
      this.$router.push({
        name: "verificarpedido",
      });
    },
    quitarProductosPedido(item, index) {
      global._swal_pregunta(
        "¿Está seguro que desea eliminar el registro?",
        "Advertencia",
        async () => {
          if (item.pedidoid == 0) {
            this.QuitarProductos(index);
            ElNotification({
              title: "Advertencia",
              message: "Se eliminó el producto, correctamente.",
              type: "warning",
            });
          } else {
            ElNotification({
              title: "Advertencia",
              message: "Pedido ya fue registrado, verifique en el Detalle del Pedido.",
              type: "warning",
            });
            this.$router.push({
              name: "verificarpedido",
            });
          }
        }
      );

      //this.QuitarProductos(index);
    },
    loadPedido: function () {
      this.pedido = { ...this.pedidoBase };
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
        this.pedido.user = "danfranc2013";
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
              this.cambiarMesas();
              global._mensaje_exito(
                "Los cambios se han guardado correctamente"
              );
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
    cambiarMesas() {
      this.$router.push({
        name: "monitoreomesas",
      });
    },
  },
  mounted() {
    this.loadPedido();
  },
};
</script>

<style></style>
