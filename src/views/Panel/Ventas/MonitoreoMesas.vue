<template>
  <div class="row">
    <div class="col-md-12 col-xl-12">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Monitoreo de Mesas</h3>
          <div class="card-options">
            <a
              href="javascript:void(0)"
              class="btn btn-success btn-sm"
              @click="loadDialogVisibleTransferirPedido"
              >Transferir Pedidos</a
            >
            <a
              href="javascript:void(0)"
              class="btn btn-primary btn-sm ms-2"
              @click="resumenCaja"
              >Resumen de Caja</a
            >
            <a
              href="javascript:void(0)"
              class="btn btn-secondary btn-sm ms-2"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdropGastos"
              >Registro de Gastos</a
            >
          </div>
        </div>
        <div class="card-body">
          <div class="text-center">
            <vue-loading
              :fullPage="fullPage"
              :isLoading="isLoading"
              :spinner="spinner"
              :text="textloading == '' ? '' : textloading"
            />
          </div>
          <div class="panel panel-primary">
            <div class="tab-menu-heading">
              <div class="tabs-menu1">
                <!-- Tabs -->
                <ul class="nav panel-tabs">
                  <li v-for="(item, index) in listaPiso" :key="index">
                    <a
                      :href="'#tab' + pisoid"
                      :class="
                        pisoSelect == item.id || item.id == pisoid
                          ? 'active'
                          : ''
                      "
                      data-bs-toggle="tab"
                      @click="listarMesas(item.id)"
                      >{{ item.nombre }}</a
                    >
                  </li>
                </ul>
              </div>
            </div>
            <div class="panel-body tabs-menu-body">
              <div class="tab-content">
                <div class="tab-pane active" id="tab5">
                  <div class="mesas">
                    <div v-for="(item, index) in listaMesas" :key="index">
                      <button
                        type="button"
                        :class="
                          item.estadodisponibilidad == 'L'
                            ? 'btn btn-success dropdown-toggle'
                            : 'btn btn-danger dropdown-toggle'
                        "
                        style="width: 110px"
                        data-bs-toggle="dropdown"
                      >
                        <i class="fe fe-airplay"></i>
                        {{ item.descripcionmesa }} <span class="caret"></span>
                      </button>
                      <ul
                        class="dropdown-menu"
                        role="menu"
                        style="font-size: 12px"
                      >
                        <li class="dropdown-plus-title">
                          Opciones
                          <b class="fa fa-angle-up" aria-hidden="true"></b>
                        </li>
                        <li>
                          <a
                            class="dropdown-item"
                            href="javascript:void(0)"
                            @click="cambiarDivMesas(item.mesaid)"
                            >Agregar Pedido
                            <span class="float-end me-3"
                              ><i class="fe fe-shopping-cart"></i></span
                          ></a>
                        </li>
                        <!-- <li>
                          <a
                            class="dropdown-item"
                            href="javascript:void(0)"
                            @click="listarPedidosTransferencia(item.mesaid)"
                            v-show="item.estadodisponibilidad == 'P'"
                            >Transferir Pedido
                            <span class="float-end me-3"
                              ><i class="fe fe-truck"></i></span
                          ></a>
                        </li> -->
                        <!-- <li>
                          <a
                            class="dropdown-item"
                            href="javascript:void(0)"
                            @click="detallePedido(item.mesaid)"
                            v-show="item.estadodisponibilidad == 'P'"
                            >Detalle del Pedido
                            <span class="float-end me-3"
                              ><i class="fe fe-truck"></i></span
                          ></a>
                        </li> -->
                        <!-- <li class="divider"></li> -->
                        <li>
                          <a
                            class="dropdown-item"
                            href="javascript:void(0)"
                            @click="emitirDocumentaVenta(item.mesaid)"
                            v-show="item.estadodisponibilidad == 'P'"
                            >Emitir Comprobante
                            <span class="float-end me-3"
                              ><i class="fe fe-file-text"></i></span
                          ></a>
                        </li>
                        <li>
                          <a
                            class="dropdown-item"
                            href="javascript:void(0)"
                            @click="AnularMesa(item.mesaid)"
                            v-show="item.estadodisponibilidad == 'P'"
                            >Anular Mesa
                            <span class="float-end me-3"
                              ><i class="fe fe-x-circle"></i></span
                          ></a>
                        </li>
                        <li>
                          <a
                            class="dropdown-item"
                            href="javascript:void(0)"
                            @click="loadDialogVisibleCambioMesa(item.mesaid)"
                            v-show="item.estadodisponibilidad == 'P'"
                            >Cambio de Mesa
                            <span class="float-end me-3"
                              ><i class="fe fe-trending-up"></i></span
                          ></a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Cambio de Mesa-->
    <el-dialog
      v-model="dialogVisibleCambioMesa"
      :title="`Cambio de Mesa ${mesaid}`"
      width="30%"
      :before-close="handleClose"
    >
      <label class="form-label"
        >Seleccione la Mesa a Cambiar <span class="text-red">*</span></label
      >
      <el-select v-model="cambiomesaid" placeholder="Seleccione una mesa">
        <el-option
          v-for="item in mesasdisponibles"
          :key="item.mesaid"
          :label="item.descripcionmesa"
          :value="item.mesaid"
        ></el-option>
      </el-select>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisibleCambioMesa = false"
            >Cancelar</el-button
          >
          <el-button
            type="primary"
            @click="cambioMesa()"
            :disabled="!cambiomesaValid"
            >Confirmar</el-button
          >
        </span>
      </template>
    </el-dialog>
    <!-- Fin Modal Cambio de Mesa-->

    <!-- Modal Transferencia de Pedidos-->
    <el-dialog
      v-model="dialogVisibleTransferencia"
      :title="`Transferir Pedidos`"
      width="50%"
      :before-close="handleClose"
      top="1%"
    >
      <!-- <el-transfer v-model="pedidostransferir" :data="listapedidostransferir" /> -->
      <!-- ROW-3 -->
      <div class="row">
        <div class="col-xl-6 col-md-12">
          <div class="card">
            <div class="card-header">
              <el-select
                v-model="demesaid"
                placeholder="Seleccione una mesa"
                @change="changePedidosTransferenciaDe()"
              >
                <el-option
                  v-for="item in mesasocupadas"
                  :key="item.mesaid"
                  :label="item.descripcionmesa"
                  :value="item.mesaid"
                ></el-option>
              </el-select>
            </div>
            <div class="card-body pb-0">
              <div
                class="d-sm-flex"
                v-for="(item, index) in listapedidosportransferir"
                :key="index"
              >
                <div>
                  <i class="task-icon bg-primary"></i>
                  <h6 class="fw-semibold">
                    {{ item.presentacion
                    }}<span class="text-muted fs-11 mx-2 fw-normal">{{
                      item.productoid
                    }}</span>
                  </h6>
                  <p class="text-muted fs-12">
                    {{ item.descripcionproducto }}
                    <a href="javascript:void(0)" class="fw-semibold">
                      {{ item.cantidad }}</a
                    >
                  </p>
                </div>
                <div class="ms-auto d-md-flex">
                  <a
                    href="javascript:void(0)"
                    class="text-muted me-2"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Transferir Pedido"
                    @click="confirmarTransferirPedido(item, index)"
                    aria-label="Edit"
                    ><span class="fe fe-arrow-right"></span
                  ></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-6 col-md-12">
          <div class="card">
            <div class="card-header">
              <el-select
                v-model="amesaid"
                placeholder="Seleccione una mesa"
                @change="changePedidosTransferenciaA()"
              >
                <el-option
                  v-for="item in mesasocupadas"
                  :key="item.mesaid"
                  :label="item.descripcionmesa"
                  :value="item.mesaid"
                ></el-option>
              </el-select>
            </div>
            <div class="card-body pb-0">
              <div
                class="d-sm-flex"
                v-for="(item, index) in pedidosatransferir"
                :key="index"
              >
                <div>
                  <i class="task-icon bg-primary"></i>
                  <h6 class="fw-semibold">
                    {{ item.presentacion
                    }}<span class="text-muted fs-11 mx-2 fw-normal">{{
                      item.productoid
                    }}</span>
                  </h6>
                  <p class="text-muted fs-12">
                    {{ item.descripcionproducto }}
                    <a href="javascript:void(0)" class="fw-semibold">
                      {{ item.cantidad }}</a
                    >
                  </p>
                </div>
                <div class="ms-auto d-md-flex" v-if="item.pedidoid == 0">
                  <a
                    href="javascript:void(0)"
                    class="text-muted"
                    title="Quitar"
                    @click="quitarPedidoaTransferir(index)"
                    ><span class="fe fe-trash-2"></span
                  ></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisibleTransferencia = false"
            >Cancelar</el-button
          >
          <el-button type="primary">Confirmar</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- Fin Modal Transferencia de Pedidos-->
  </div>
  <agregar-gasto
    id="staticBackdropGastos"
    :indiceModificando="-1"
    :gastosSelect="null"
    @cerrarModal="cerrarModalGastos"
  />
</template>

<script>
import { mapActions, mapState } from "vuex";
import VueLoading from "../../../components/varios/VueLoading.vue";
import global from "../../../global";
import AgregarGasto from "../../../components/gastos/AgregarGasto.vue";
//Librayr
import dayjs from "dayjs";
export default {
  // sockets: {
  //   connect: function () {
  //     console.log("socket connected");
  //   },
  //   desconnect: function () {
  //     console.log("socket desconnect");
  //   },
  //   sendUpdateList: function () {
  //     this.listarMesas();
  //   },
  // },
  components: { VueLoading, AgregarGasto },
  data() {
    return {
      demesaid: "",
      amesaid: "",
      pedidosatransferir: [],
      listapedidosportransferir: [],
      date: new Date(),
      pisoSelect: 0,
      spinner: "bar-fade-scale",
      mesaid: 0,
      pedidoid: 0,
      dialogVisibleCambioMesa: false,
      dialogVisibleTransferencia: false,
      cambiomesaid: null,
      mesasdisponibles: [],
      mesasocupadas: [],
      cargando: false,
      fullPage: false,
      isLoading: false,
      textloading: "Espere por favor...",
      showAdvertise: false,
      listaMesas: [],
      listaPiso: [],
    };
  },
  methods: {
    ...mapActions({
      ListadoMesas: "_mesa/ListadoPisoById",
      cargarMesaId: "_mesa/cargarMesaId",
      PedidoGetIdMesa: "_pedido/PedidoGetIdMesa",
      PedidoDetalleId: "_pedido/PedidoDetalleId",
      AgregarProductos: "_pedido/AgregarProductos",
      SeleccionarPersonal: "_pedido/SeleccionarPersonal",
      SeleccionarFechaPedido: "_pedido/SeleccionarFechaPedido",
      SeleccionarPedidoId: "_pedido/SeleccionarPedidoId",
      LimpiarProductos: "_pedido/LimpiarProductos",
      ActualizarEstadoMesa: "_mesa/ActualizarEstadoMesa",
      ActualizarEstadoPedido: "_pedido/ActualizarEstadoPedido",
      ActualizarMesaPedido: "_pedido/ActualizarMesaPedido",
      ListarPiso: "_piso/ListarPiso",
      cargarPisoId: "_mesa/cargarPisoId",
      AnularPedidoDetalle: "_pedido/AnularPedidoDetalle",
      TransferirPedido: "_pedido/TransferirPedido",
    }),
    cerrarModalGastos: function () {
      var modal = bootstrap.Modal.getInstance(
        document.getElementById("staticBackdropGastos")
      );
      modal.hide();
    },
    handleClose(done) {
      ElMessageBox.confirm("¿Estás segura de cerrar este diálogo?")
        .then(() => {
          done();
        })
        .catch(() => {
          // catch error
        });
    },
    cambiarDivMesas: async function (mesaid) {
      this.isLoading = true;
      this.fullPage = true;
      await this.cargarMesaId(mesaid);
      await this.verificarPedidoMesaId(mesaid);
      this.isLoading = false;

      this.$router.push({
        name: "listadoproductos",
      });
    },
    detallePedido: async function (mesaid) {
      this.isLoading = true;
      this.fullPage = true;
      await this.cargarMesaId(mesaid);
      await this.verificarPedidoMesaId(mesaid);
      this.isLoading = false;
      this.$router.push({
        name: "verificarpedido",
      });
    },
    resumenCaja() {
      this.$router.push({
        name: "resumencaja",
      });
    },
    emitirDocumentaVenta: async function (mesaid) {
      this.isLoading = true;
      this.fullPage = true;
      await this.cargarMesaId(mesaid);
      await this.verificarPedidoMesaId(mesaid);
      this.isLoading = false;
      this.$router.push({
        name: "emitirdocumentoventa",
      });
    },
    AnularMesa: async function (mesaid) {
      global._swal_pregunta(
        "¿Está seguro que desea anular la mesa?",
        "Advertencia",
        async () => {
          this.isLoading = true;
          this.fullPage = true;
          this.textloading = "Actualizando estado de Mesa...";

          let parametros_mesa = {
            mesaid: mesaid,
            estadodisponibilidad: "L",
          };

          let res_estado_mesa = await this.ActualizarEstadoMesa(
            parametros_mesa
          );

          if (res_estado_mesa?.exito) {
            this.textloading = "Actualizando estado de Pedido...";
            await this.DevuelvePedidoId(mesaid);

            let parametros_pedido = {
              pedidoid: this.pedidoid,
              estado: "A",
            };

            let res_estado_pedido = await this.ActualizarEstadoPedido(
              parametros_pedido
            );

            if (res_estado_pedido?.exito) {
              this.isLoading = false;
              this.textloading = "";
              //this.$socket.emit("sendUpdateList");
              global._mensaje_exito(
                "Los cambios se han guardado correctamente"
              );
              this.listarMesas();
            } else {
              global._mensaje_error("Ocurrio un error actualizando el pedido.");
              this.isLoading = false;
              this.textloading = "";
            }
          } else {
            global._mensaje_error(
              "Ocurrio un error actualizando el estado de la mesa."
            );
            this.isLoading = false;
            this.textloading = "";
          }
        }
      );
    },
    DevuelvePedidoId: async function (mesaid) {
      let buscar = {
        mesaid: mesaid,
      };

      var res = await this.PedidoGetIdMesa(buscar);

      if (res != null) {
        this.pedidoid = res.pedidoid;
      }
    },
    verificarPedidoMesaId: async function (mesaid) {
      let buscar = {
        mesaid: mesaid,
      };
      var res = await this.PedidoGetIdMesa(buscar);

      if (res != null) {
        this.SeleccionarPersonal(res.personalid);
        this.SeleccionarPedidoId(res.pedidoid);
        this.SeleccionarFechaPedido(
          dayjs(res.fechapedido).format("YYYY-MM-DD, H:mm")
        );
        await this.detallePedidoMesaId(res.pedidoid);
      } else {
        this.SeleccionarPedidoId(0);
        this.SeleccionarPersonal(null);
        this.SeleccionarFechaPedido(
          dayjs(this.date).format("YYYY-MM-DD, H:mm")
        );
        this.LimpiarProductos();
      }
    },
    detallePedidoMesaId: async function (pedidoid) {
      let buscar = {
        pedidoid: pedidoid,
      };
      var res = await this.PedidoDetalleId(buscar);
      res.forEach((item) => {
        this.AgregarProductos(item);
      });

      return res;
    },
    listarMesas: async function (piso = this.pisoid) {
      //console.log(piso);
      this.cargarPisoId(piso);

      this.isLoading = true;
      //this.fullPage = true;
      let buscar = {
        pisoid: piso,
      };
      var res = await this.ListadoMesas(buscar);
      this.listaMesas = res;
      this.isLoading = false;
      //this.fullPage = false;
      this.LimpiarProductos();
      this.SeleccionarPersonal(null);
    },
    loadDialogVisibleCambioMesa(mesaid) {
      this.listarMesasDisponibles();
      this.mesaid = mesaid;
      this.dialogVisibleCambioMesa = true;
    },
    listarMesasOcupadas: async function () {
      let buscar = {
        pisoid: this.pisoid,
      };

      var res = await this.ListadoMesas(buscar);

      this.mesasocupadas = res.filter(
        (item) => item.estadodisponibilidad == "P"
      );
    },
    listarMesasDisponibles: async function () {
      let buscar = {
        pisoid: this.pisoid,
      };

      var res = await this.ListadoMesas(buscar);

      this.mesasdisponibles = res.filter(
        (item) => item.estadodisponibilidad == "L"
      );
    },
    quitarPedidoaTransferir(index) {
      this.pedidosatransferir.splice(index, 1);
    },
    confirmarTransferirPedido(item, index) {
      console.log(this.pedidosatransferir.length + 1);
      global._swal_pregunta(
        "¿Está seguro que desea transferir el pedido?",
        "Advertencia",
        async () => {
          this.procesarTransferirPedido(item, index);
        }
      );
    },
    procesarTransferirPedido: async function (item, index) {
      this.isLoading = true;
      this.fullPage = true;
      this.textloading = "Transfiriendo pedido...";
      this.listapedidosportransferir.splice(index, 1);
      let nitem = this.pedidosatransferir.length + 1;
      let producto = {
        cantidad: item.cantidad,
        descripcionproducto: item.descripcionproducto,
        enviado: item.enviado,
        estado: item.estado,
        mensajecocina: item.mensajecocina,
        nitem: nitem,
        pedidoid: this.pedidoidatrasferir,
        preciocarta: item.preciocarta,
        presentacion: item.presentacion,
        productoid: item.productoid,
        usercr: this.usuario.usuario,
      };

      this.pedidosatransferir.push(producto);

      let pedido = {
        pedidoid: item.pedidoid,
        productoid: item.productoid,
        codusu: this.usuario.usuario,
        observacion: "Pedido Transferido",
      };
      let res = await this.AnularPedidoDetalle(pedido);

      if (res?.exito) {
        let res_transferencia = await this.TransferirPedido(producto);
        if (res_transferencia?.exito) {
          global._mensaje_exito("Los cambios se han guardado correctamente");
          this.isLoading = false;
          this.textloading = "";
          this.changePedidosTransferenciaDe();
          this.changePedidosTransferenciaA();
        } else {
          this.isLoading = false;
        }
      } else {
        this.isLoading = false;
      }
    },

    loadDialogVisibleTransferirPedido() {
      this.listarMesasOcupadas();
      this.dialogVisibleTransferencia = true;
    },
    changePedidosTransferenciaDe: async function () {
      let mesaid = this.demesaid;

      let buscar = {
        mesaid: mesaid,
      };

      let res = await this.PedidoGetIdMesa(buscar);
      if (res != null) {
        let res_detalle = await this.listarPedidosTransferencia(res.pedidoid);
        this.listapedidosportransferir = res_detalle;
      }
    },
    changePedidosTransferenciaA: async function () {
      let mesaid = this.amesaid;

      let buscar = {
        mesaid: mesaid,
      };

      let res = await this.PedidoGetIdMesa(buscar);
      if (res != null) {
        this.pedidoidatrasferir = res.pedidoid;
        let res_detalle = await this.listarPedidosTransferencia(res.pedidoid);
        this.pedidosatransferir = res_detalle;
      }
    },
    listarPedidosTransferencia: async function (pedidoid) {
      this.isLoading = true;
      this.fullPage = true;
      this.textloading = "Cargando lista de Pedidos...";

      let res = await this.detallePedidoMesaId(pedidoid);
      let res_detalle = [];

      if (res != null) {
        res_detalle = await this.detallePedidoMesaId(pedidoid);
      } else {
        res_detalle = [];
      }
      this.isLoading = false;

      return res_detalle;
    },
    cambioMesa: async function () {
      global._swal_pregunta(
        "¿Está seguro que desea cambiar la mesa?",
        "Advertencia",
        async () => {
          this.isLoading = true;
          this.fullPage = true;
          this.textloading = "Procesando el cambio de mesa...";
          let res_estado_mesa_desde = await this.procesarCambioMesa(
            this.mesaid,
            "L"
          );
          if (res_estado_mesa_desde?.exito) {
            let res_estado_mesa_hasta = await this.procesarCambioMesa(
              this.cambiomesaid,
              "P"
            );
            if (res_estado_mesa_hasta?.exito) {
              await this.DevuelvePedidoId(this.mesaid);
              await this.actualizarMesaPedido(this.pedidoid, this.cambiomesaid);
              //this.$socket.emit("sendUpdateList");
              global._mensaje_exito(
                "Los cambios se han guardado correctamente"
              );
              this.isLoading = false;
              this.textloading = "";
              this.cambiomesaid = null;

              this.dialogVisibleCambioMesa = false;
              this.listarMesas();
            } else {
              this.isLoading = false;
              this.textloading = "";
            }
          } else {
            this.isLoading = false;
            this.textloading = "";
          }
        }
      );
    },

    procesarCambioMesa: async function (mesaid, estado) {
      let parametros_mesa_desde = {
        mesaid: mesaid,
        estadodisponibilidad: estado,
      };

      let res = await this.ActualizarEstadoMesa(parametros_mesa_desde);
      return res;
    },
    actualizarMesaPedido: async function (pedidoid, mesaid) {
      let pedido = {
        pedidoid: pedidoid,
        mesaid: mesaid,
      };
      let res = await this.ActualizarMesaPedido(pedido);
      return res;
    },
    cerrarModal: function () {
      var modal = bootstrap.Modal.getInstance(
        document.getElementById("staticBackdropMantenedorDecano")
      );
      modal.hide();
    },
    listarPiso: async function () {
      let res = await this.ListarPiso();
      // this.listaPiso = [
      //   {
      //     id: null,
      //     nombre: "Todos",
      //   },
      //   ...res,
      // ].sort((a, b) => a.id - b.id);
      this.pisoSelect = 0;
      this.listaPiso = res;
    },
  },
  computed: {
    ...mapState({
      personalid: (state) => state._pedido.personalid,
      notificationList: (state) => state._pedido.notificationList,
      pisoid: (state) => state._mesa.pisoid,
    }),
    cambiomesaValid() {
      return this.cambiomesaid != null;
    },
  },
  mounted() {
    if (localStorage.getItem("login")) {
      this.usuario = JSON.parse(localStorage.getItem("login"));
    }
    this.listarPiso();
    //this.$socket.emit("sendUpdateList");
    //this.listarMesas();
  },
};
</script>

<style lang="css" scoped>
.mesas {
  display: grid;
  grid-template-columns: repeat(auto-fill, 110px);
  gap: 20px;
  padding: 5px;
  justify-content: center;
}
</style>
