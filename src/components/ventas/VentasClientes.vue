<template>
  <vue-loading
    :fullPage="fullPage"
    :isLoading="isLoading"
    :spinner="spinner"
    :text="textloading"
  />
  <div class="table-responsive">
    <div class="text-center">
      <loading :mostrar="cargando" />
    </div>
    <table id="data-table" class="table table-bordered text-nowrap mb-0">
      <thead class="border-top">
        <tr>
          <!-- <th class="bg-transparent border-bottom-0" style="width: 5%">
            Venta Id
          </th> -->
          <th class="bg-transparent border-bottom-0">T.Comprobante</th>
          <th class="bg-transparent border-bottom-0">Cliente</th>
          <th class="bg-transparent border-bottom-0">Fecha</th>
          <th class="bg-transparent border-bottom-0">Total</th>
          <th class="bg-transparent border-bottom-0">N° DOC</th>
          <!-- <th class="bg-transparent border-bottom-0">Sunat</th> -->
          <th class="bg-transparent border-bottom-0" style="width: 10%">
            Estado
          </th>
          <th class="bg-transparent border-bottom-0" style="width: 5%">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="border-bottom"
          v-for="(item, index) in listaRegistros"
          :key="index"
        >
          <!-- <td class="text-center">
            <div class="mt-0 mt-sm-2 d-block">
              <h6 class="mb-0 fs-14 fw-semibold">{{item.docventaid}}</h6>
            </div>
          </td> -->
          <td>
            <div class="d-flex">
              <div class="ms-3 mt-0 mt-sm-2 d-block">
                <h6 class="mb-0 fs-14 fw-semibold">
                  <span
                    :style="
                      item.estado == 'ANULADO'
                        ? 'text-decoration-line: line-through;color:red'
                        : ''
                    "
                  >
                    {{ item.descripciontipocomprobante }}</span
                  >
                </h6>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex">
              <div class="ms-3 mt-0 mt-sm-2 d-block">
                <h6 class="mb-0 fs-14 fw-semibold">
                  <p
                    class="overflow-ellipsis"
                    :style="
                      item.estado == 'ANULADO'
                        ? 'text-decoration-line: line-through;color:red'
                        : ''
                    "
                  >
                    {{ item.razonsocial }}
                  </p>
                </h6>
              </div>
            </div>
          </td>
          <td>
            <span
              class="mt-sm-2 d-block"
              :style="
                item.estado == 'ANULADO'
                  ? 'text-decoration-line: line-through;color:red'
                  : ''
              "
              >{{ item.fecha }}</span
            >
          </td>
          <td>
            <span
              class="fw-semibold mt-sm-2 d-block"
              :style="
                item.estado == 'ANULADO'
                  ? 'text-decoration-line: line-through;color:red'
                  : ''
              "
              >{{ parseFloat(item.total).toFixed(2) }}</span
            >
          </td>
          <td>
            <div class="d-flex">
              <div class="mt-0 mt-sm-3 d-block">
                <h6 class="mb-0 fs-14 fw-semibold">
                  <span
                    :style="
                      item.estado == 'ANULADO'
                        ? 'text-decoration-line: line-through;color:red'
                        : ''
                    "
                  >
                    {{ item.numdoc }}</span
                  >
                </h6>
              </div>
            </div>
          </td>
          <!-- <td>
            <div class="d-flex">
              <div class="mt-0 mt-sm-3 d-block">
                <h6 class="mb-0 fs-14 fw-semibold">
                  <span
                    :style="
                      item.estado == 'ANULADO'
                        ? 'text-decoration-line: line-through;color:red'
                        : ''
                    "
                  >
                    {{ item.aceptada_por_sunat }}</span
                  >
                </h6>
              </div>
            </div>
          </td> -->
          <td>
            <div class="mt-sm-1 d-block">
              <span
                v-if="item.estado == 'CANCELADO'"
                class="badge bg-success-transparent rounded-pill text-success p-2 px-3"
                >{{ item.estado }}</span
              >
              <span
                v-else-if="item.estado == 'EMITIDO'"
                class="badge bg-warning-transparent rounded-pill text-warning p-2 px-3"
                >{{ item.estado }}</span
              >
              <span
                v-else-if="item.estado == 'ANULADO'"
                class="badge bg-danger-transparent rounded-pill text-danger p-2 px-3"
                >{{ item.estado }}</span
              >
            </div>
          </td>
          <td>
            <div class="g-2">
              <!-- <a
                class="btn text-primary btn-sm"
                title="Efectuar Pago"
                @click="dialogEfectuarPago(item)"
                ><span class="fe fe-dollar-sign fs-14"></span
              ></a> -->
              <a
                class="btn text-success btn-sm"
                title="Imprimir"
                @click="imprimirComprobante(item)"
                ><span class="fe fe-printer fs-14"></span
              ></a>
              <a
                class="btn text-primary btn-sm"
                title="Detalle Venta"
                @click="abrirModalDetalleVenta(item)"
                ><span class="fe fe-shopping-cart fs-14"></span
              ></a>
              <!-- <a
                class="btn text-primary btn-sm"
                title="Enviar Nube Fact"
                @click="enviarComprobanteNubeFact(item)"
                ><span class="fe fe-upload-cloud fs-14"></span
              ></a> -->
              <a
                class="btn text-danger btn-sm"
                title="Anular Venta"
                @click="anularDocumentoVenta(item)"
                ><span class="fe fe-trash-2 fs-14"></span
              ></a>
              <a
                class="btn text-yellow btn-sm"
                title="Editar Venta"
                @click="cargarVer(item)"
                ><span class="fa fa-pencil fs-14"></span
              ></a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination justify-content-center mt-2">
      <paginate :page-count="totalPaginas" :click-handler="cambiarPagina" />
    </div>
    <!-- Modal -->
    <el-dialog
      v-model="dialogVisibleEfectuarPago"
      title="Efectuar Pago"
      width="45%"
      top="1%"
    >
      <efectuar-pago
        :total="total"
        :docventaid="docventaid"
        :numdoc="numdoc"
        @closeDialogEfectuarPago="closeDialogEfectuarPago"
      />
    </el-dialog>

    <!-- Modal Editar -->
    <el-dialog
      v-model="dialogVisibleEditar"
      title="Editar Venta"
      width="45%"
      top="1%"
    >
      <div class="row">
        <div class="col-sm-6 col-md-6">
          <div class="form-group">
            <label class="form-label"
              >Fecha <span class="text-red">*</span></label
            >
            <input type="text" class="form-control" readonly v-model="fecha" />
          </div>
        </div>
        <div class="col-sm-6 col-md-6">
          <div class="form-group">
            <label class="form-label"
              >Cliente <span class="text-red">*</span></label
            >
            <el-select
              placeholder="Seleccionar Cliente"
              size="large"
              filterable
              style="width: 100%"
              v-model="venta.clienteid"
            >
              <el-option
                v-for="item in clientes"
                :key="item.id"
                :label="item.nombre"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="row">
        <input
          type="button"
          class="btn btn-primary"
          value="Editar Venta"
          @click="guardarVenta"
        />
      </div>
    </el-dialog>
    <!-- Modal -->

    <!-- Modal Editar -->
    <detalle-venta id="staticBackdropDetalleVenta" :docventaid="docventaid" />
    <!-- Modal -->
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Paginate from "../../components/varios/Paginate.vue";
import Loading from "../../components/varios/Loading.vue";
import EfectuarPago from "./EfectuarPago.vue";
import global from "../../global.js";
import DetalleVenta from "../../components/ventas/DetalleVenta.vue";
//LIBRARY
import VueLoading from "../../components/varios/VueLoading.vue";
export default {
  name: "VentasClientes",
  components: { Paginate, Loading, EfectuarPago, VueLoading },
  props: {
    ventasFiltros: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      textloading: "",
      clientes: [],
      usuario: {},
      spinner: "bar-fade-scale",
      isLoading: false,
      fullPage: true,
      dialogVisibleEfectuarPago: false,
      dialogVisibleEditar: false,
      listaRegistros: [],
      totalPaginas: 0,
      cargando: false,
      total: 0,
      docventaid: 0,
      numdoc: "",
      fecha: "",
      venta: {},
      ventaBase: {
        docventaid: 0,
        user: "",
        clienteid: 0,
      },
    };
  },
  methods: {
    ...mapActions({
      ListadoVentas: "_venta/ListadoVentas",
      EnvioNubeFact: "_venta/EnvioNubeFact",
      ConsultarComprobantenNubeFact: "_venta/ConsultarComprobantenNubeFact",
      ActualizarVentaNubeFact: "_venta/ActualizarVentaNubeFact",
      AnularVenta: "_venta/AnularVenta",
      ActualizarEstadoPedido: "_pedido/ActualizarEstadoPedido",
      AnularComprobanteNubeFact: "_venta/AnularComprobanteNubeFact",
      ClienteDesplegable: "_cliente/ClienteDesplegable",
      ActualizarVenta: "_venta/ActualizarVenta",
      PrinTicketVenta: "_venta/PrinTicketVenta",
    }),
    abrirModalDetalleVenta: function (item) {
      this.docventaid = parseInt(item.docventaid);
      new bootstrap.Modal($("#staticBackdropDetalleVenta")).show(); // Abrir modal
    },
    printicketventa: async function (docventaid) {
      let parametros = {
        docventaid: docventaid,
      };
      await this.PrinTicketVenta(parametros);
    },
    guardarVenta: async function () {
      let res = null;

      global._swal_pregunta(
        "¿Está seguro que desea actualizar la venta?",
        "Advertencia",
        async () => {
          this.isLoading = true;
          this.textloading = "Actualizando comprobante en el Sistema.";
          res = await this.ActualizarVenta(this.venta);

          if (res?.exito) {
            this.dialogVisibleEditar = false;
            global._mensaje_exito("El comprobante se actualizo con éxito.");
            this.isLoading = false;
            this.cargarRegistros();
          }
        }
      );
    },
    loadVenta: function () {
      this.venta = { ...this.ventaBase };
    },
    ComboClientes: async function () {
      let tipodocumento = {
        tipodocumento: "",
      };
      let res = await this.ClienteDesplegable(tipodocumento);
      this.clientes = res;
    },
    cargarVer(item) {
      this.ComboClientes();
      this.fecha = item.fecha;
      this.venta.clienteid = parseInt(item.clienteid);
      this.venta.docventaid = item.docventaid;
      this.venta.user = this.usuario.usuario;
      this.dialogVisibleEditar = true;
    },
    imprimirComprobante(item) {
      this.printicketventa(item.docventaid);
    },
    openurlArchivo(url) {
      window.open(url, "_blank");
    },
    enviarComprobanteNubeFact: async function (item) {
      if (item.tipodocumentoid == 7 || item.tipodocumentoid == 8) {
        global._swal_pregunta(
          "¿Está seguro que desea enviar el comprobante a NubeFact?",
          "Advertencia",
          async () => {
            this.isLoading = true;
            this.textloading = "Enviando comprobante a NubeFact";
            let docventa = {
              docventaid: item.docventaid,
            };

            let res = "";

            try {
              res = await this.EnvioNubeFact(docventa);

              if (res?.exito) {
                global._mensaje_exito("El comprobante se envio correctamente");
                await this.actualizarEnvioNubefact(item.docventaid);
                this.isLoading = false;
              } else {
                ElNotification({
                  title: "Error NubeFact",
                  duration: 0,
                  message: res.datos.errors,
                  type: "error",
                });
                await this.actualizarEnvioNubefact(item.docventaid);
                this.isLoading = false;
              }
            } catch (error) {
              this.isLoading = false;
              global._mensaje_error("Ocurrio un error", error);
            }
          }
        );
      }
    },
    anularDocumentoVentaNubeFact: async function (item) {
      this.textloading = "Consultando comprobante a NubeFact";
      let consultadocventa = {
        docventaid: item.docventaid,
      };

      let resconsultanubefact = await this.ConsultarComprobantenNubeFact(
        consultadocventa
      );
      console.log("resconsultanubefact", resconsultanubefact);
      try {
        if (resconsultanubefact?.exito) {
          let venta = {
            docventaid: item.docventaid,
          };
          this.textloading = "Anulando comprobante a NubeFact";
          let res = await this.AnularComprobanteNubeFact(venta);
          console.log("Anulando", res);
          if (res?.exito) {
            ElNotification({
              title: "Éxito",
              duration: 0,
              message: "El comprobante se anuló correctamente.",
              type: "success",
            });
          } else {
            ElNotification({
              title: "Error Anulación en NubeFact",
              duration: 0,
              message: res.mensaje,
              type: "error",
            });
          }
        } else {
          ElNotification({
            title: "Error Consultando a NubeFact",
            duration: 0,
            message: resconsultanubefact.mensaje,
            type: "error",
          });
        }
      } catch (error) {
        this.isLoading = false;
        global._mensaje_error("Ocurrio un error", error);
      }
    },
    anularDocumentoVenta: async function (item) {
      let venta = {
        docventaid: item.docventaid,
        user: this.usuario.usuario,
        observacion: "ERROR DE SISTEMA",
      };

      try {
        global._swal_pregunta(
          "¿Está seguro que desea anular el registro?",
          "Advertencia",
          async () => {
            this.isLoading = true;
            this.textloading = "Anulando comprobante en el sistema";
            let resventa = await this.AnularVenta(venta);
            if (resventa?.exito) {
              ElNotification({
                title: "Éxito",
                duration: 0,
                message: "El combrobante se ha anulado correctamente.",
                type: "success",
              });
              // await this.anularPedidoVenta(item.pedidoid);
              // await this.anularDocumentoVentaNubeFact(item);
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
    anularPedidoVenta: async function (pedidoid) {
      this.textloading = "Anulando pedido en el sistema";
      let parametros_pedido = {
        pedidoid: pedidoid,
        estado: "A",
      };

      let res_estado_pedido = await this.ActualizarEstadoPedido(
        parametros_pedido
      );

      if (res_estado_pedido?.exito) {
        ElNotification({
          title: "Éxito",
          duration: 0,
          message: "El pedido se ha anulado correctamente.",
          type: "success",
        });
        //global._mensaje_exito("El pedido se ha anulado correctamente");
      }
    },
    actualizarEnvioNubefact: async function (docventaid) {
      this.textloading = "Consultando comprobante a NubeFact";
      let consultadocventa = {
        docventaid: docventaid,
      };
      let resconsultanubefact = await this.ConsultarComprobantenNubeFact(
        consultadocventa
      );

      if (resconsultanubefact?.exito) {
        this.textloading = "Actualizando comprobante a NubeFact";
        let actualizardocventanubefact = {
          docventaid: docventaid,
          aceptada_por_sunat: resconsultanubefact.datos.aceptada_por_sunat,
          sunat_description: resconsultanubefact.datos.sunat_description,
          enlace: resconsultanubefact.datos.enlace,
          enlace_del_cdr: resconsultanubefact.datos.enlace_del_cdr,
          enlace_del_pdf: resconsultanubefact.datos.enlace_del_pdf,
          enlace_del_xml: resconsultanubefact.datos.enlace_del_xml,
        };
        await this.ActualizarVentaNubeFact(actualizardocventanubefact);

        this.cargarRegistros();
      } else {
        ElNotification({
          title: "Error NubeFact",
          duration: 0,
          message: resconsultanubefact,
          type: "error",
        });
      }
    },
    closeDialogEfectuarPago() {
      this.cargarRegistros();
      this.dialogVisibleEfectuarPago = false;
    },
    dialogEfectuarPago(rows) {
      if (rows.estado == "EMITIDO") {
        this.dialogVisibleEfectuarPago = true;
        this.docventaid = rows.docventaid;
        this.total = parseFloat(rows.total);
        this.numdoc = rows.numdoc;
      } else {
        global._mensaje_advertencia(
          "El comprobante ya se encuentra cancelado, gracias."
        );
      }
    },
    cargarRegistros: async function (pagina = 1) {
      this.cargando = true;
      let buscar = {
        page_index: pagina,
        page_size: 10,
        estado: this.ventasFiltros.estado,
        fecha_inicio: this.ventasFiltros.fecha_inicio,
        fecha_fin: this.ventasFiltros.fecha_fin,
        tipodocumentoid: this.ventasFiltros.tipodocumentoid,
        personalid: this.ventasFiltros.personalid,
      };

      let res = await this.ListadoVentas(buscar);
      this.listaRegistros = res.datos.map((el) => ({
        ...el,
        aceptada_por_sunat:
          el.aceptada_por_sunat == 1
            ? "SI"
            : el.aceptada_por_sunat == 0
            ? "NO"
            : "",
      }));

      this.totalPaginas = res.totalPaginas;
      this.cargando = false;
    },
    cambiarPagina: function (paginaDestino) {
      this.cargarRegistros(paginaDestino);
    },
  },
  watch: {
    ventasFiltros(ventasFiltros) {
      if (ventasFiltros != null) {
        this.cargarRegistros();
      } else {
      }
    },
  },
  mounted() {
    if (localStorage.getItem("login")) {
      this.usuario = JSON.parse(localStorage.getItem("login"));
    }
    this.loadVenta();
    this.cargarRegistros();
  },
};
</script>

<style lang="css" scoped>
p {
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
}

.overflow-ellipsis {
  text-overflow: ellipsis;
}
</style>
