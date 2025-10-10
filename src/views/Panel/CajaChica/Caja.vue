<template>
  <div class="card-header">
    <h3 class="card-title">APERTURA Y CIERRE DE CAJA</h3>
  </div>
  <div class="card-body pb-2">
    <h3 class="text-left">Lista de Cajas</h3>
    <div class="row">
      <div class="col-md-4 mb-3" style="text-align: center">
        <input type="date" class="form-control" v-model="fecha_inicio" />
      </div>
      <div class="col-md-4 mb-3" style="text-align: center">
        <input type="date" class="form-control" v-model="fecha_fin" />
      </div>

      <div class="col-md-4 mb-3" style="text-align: left">
        <button type="button" class="btn btn-primary" style="margin: 2px" @click="cargarRegistros()">
          <i class="fe fe-search me-2"></i>Buscar
        </button>
        <button class="btn btn-primary" @click="cargarAgregar()">
          <i class="fe fe-file me-2"></i>
          Agregar
        </button>
      </div>
    </div>
    <div class="table-responsive">
      <div class="text-center">
        <loading :mostrar="cargando" />
      </div>
      <table class="table" v-if="listaRegistros.length != 0">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Usuario</th>
            <th scope="col">Fecha Apertura</th>
            <th scope="col">Nº Caja</th>
            <th scope="col">Monto</th>
            <th scope="col">Fecha Cierre</th>
            <th scope="col">Cierre Caja</th>
            <th scope="col" class="text-center">Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in listaRegistros" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ item.codusu }}</td>
            <td>{{ item.fechaapertura }}</td>
            <td>{{ item.nrcajachica }}</td>
            <td>{{ parseFloat(item.monto) }}</td>
            <td>{{ item.fechacierrecajachica }}</td>
            <td>{{ item.cierrecaja }}</td>
            <td class="text-center">
              <i class="fa fa-pencil mx-1 text-yellow" role="button" title="Editar" @click="cargarVer(item, index)"></i>
              <i class="fa fa-eye mx-1 text-primary" role="button" title="Ver Cierre" data-bs-toggle="modal"
                data-bs-target="#staticBackdropVer" @click="cargarPDFCierreCaja(item)"></i>
              <i class="fa fa-unlock mx-1 text-danger" title="Cierre Caja" role="button" @click="cierreCaja(item)"></i>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination justify-content-center mt-2">
        <paginate :page-count="totalPaginas" :click-handler="cambiarPagina" />
      </div>
    </div>
    <agregar-caja id="staticBackdropCaja" :indiceModificando="indiceModificando" :cajaSelect="cajaSelect"
      @cerrarModal="cerrarModal" />
    <!-- Modal -->
    <div class="modal fade" id="staticBackdropVer" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-fullscreen modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Ver</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal()">
              <i class="fa fa-close"></i>
            </button>
          </div>
          <vue-loading :fullPage="false" :isLoading="isLoadingPDF" :spinner="spinner" />
          <div class="modal-body">
            <iframe :src="url_pdf_iframe" frameborder="0" allowfullscreen id="iframe"></iframe>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="closeModal()">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
  </div>
</template>

<script>
import { mapActions } from "vuex";
import global from "../../../global";
import Paginate from "../../../components/varios/Paginate.vue";
import Loading from "../../../components/varios/Loading.vue";
import AgregarCaja from "../../../components/caja/AgregarCaja.vue";
import VueLoading from "../../../components/varios/VueLoading.vue";
//Librayr
import dayjs from "dayjs";
export default {
  components: {
    Paginate,
    Loading,
    AgregarCaja,
    VueLoading,
  },
  data() {
    return {
      usuario: {},
      interval: null,
      isLoadingPDF: false,
      spinner: "spinner",
      url_pdf_iframe: "",
      date: new Date(),
      fecha_inicio: dayjs(this.date).format("YYYY-MM-DD"),
      fecha_fin: dayjs(this.date).format("YYYY-MM-DD"),
      cajaSelect: null,
      cargando: false,
      cboSubFamilia: [],
      indiceModificando: -1,
      listaRegistros: [],
      buscador: {
        page_index: 1,
        page_size: 10,
      },
      totalPaginas: 0,
    };
  },
  methods: {
    ...mapActions({
      ListarRegistros: "_cajachica/ListarRegistros",
      CierreCaja: "_cajachica/CierreCaja",
      VerificarNumeroCaja: "_cajachica/VerificarNumeroCaja",
    }),
    closeModal() {
      this.url_pdf_iframe = "";
    },
    cargarPDFCierreCaja: function (item) {
      this.url_pdf_iframe = `${global.ruta_api}/cajachica/cierre/generar_pdf?nroliquidacion=${item.nrcajachica}&codusu=${item.codusu}
      &fechaapertura=${item.fechaapertura}`;
      this.isLoadingPDF = true;
      let this2 = this;
      document.querySelector("iframe").addEventListener("load", function () {
        return (this2.isLoadingPDF = false);
      });
    },
    cargarAgregar: async function () {
      let res = await this.verificarNumeroCaja();
      if (res != null) {
        global._mensaje_advertencia(
          "Existe una caja abierta para este usuario, gracias."
        );
      } else {
        new bootstrap.Modal($("#staticBackdropCaja")).show(); // Abrir modal
      }
      this.indiceModificando = -1;
    },
    cargarVer: function (item, index) {
      if (item.cierrecaja != "CERRADA") {
        new bootstrap.Modal($("#staticBackdropCaja")).show(); // Abrir modal
        this.cajaSelect = item;
        this.indiceModificando = index;
      } else {
        global._mensaje_advertencia(
          "Caja se encuentra cerrada, Comuníquese con el Administrador del Sistema"
        );
      }
    },
    cierreCaja: async function (item) {
      let caja = {
        caja_chica_id: item.caja_chica_id,
      };
      global._swal_pregunta(
        "¿Está seguro que desea cerrar la caja?",
        "Advertencia",
        async () => {
          var res = await this.CierreCaja(caja);
          if (res?.exito) {
            this.cargarRegistros();
            global._mensaje_exito("Caja se ha cerrado con éxito.");
          }
        }
      );
    },
    cargarRegistros: async function (pagina = 1) {
      this.cargando = true;
      let buscador = {
        page_index: pagina,
        page_size: this.buscador.page_size,
        codusu: this.usuario.usuario,
        fecha_inicio: this.fecha_inicio,
        fecha_fin: this.fecha_fin,
      };
      var res = await this.ListarRegistros(buscador);

      this.listaRegistros = res.datos.map((el) => ({
        ...el,
        fechaapertura:
          el.fechaapertura != null
            ? dayjs(el.fechaapertura).format("DD-MM-YYYY H:mm")
            : "",
        fechacierrecajachica:
          el.fechacierrecajachica != null
            ? dayjs(el.fechacierrecajachica).format("DD-MM-YYYY H:mm")
            : "",
        cierrecaja: el.cierrecaja == 0 ? "ABIERTA" : "CERRADA",
      }));
      this.buscador.page_index = res.paginaActual;
      this.totalPaginas = res.totalPaginas;
      this.cargando = false;
    },
    cambiarPagina: function (paginaDestino) {
      this.cargarRegistros(paginaDestino);
    },
    cerrarModal: function () {
      this.cargarRegistros();
      this.cajaSelect = null;
      var modal = bootstrap.Modal.getInstance(
        document.getElementById("staticBackdropCaja")
      );
      modal.hide();
    },
    verificarNumeroCaja: async function () {
      let parametros = {
        codusu: this.usuario.usuario,
      };
      let res = await this.VerificarNumeroCaja(parametros);

      return res;
    },
  },
  mounted() {
    if (localStorage.getItem("login")) {
      this.usuario = JSON.parse(localStorage.getItem("login"));
    }
    this.cargarRegistros();
  },
};
</script>

<style lang="css" scoped>
iframe {
  width: 100%;
  height: 100%;
}
</style>
