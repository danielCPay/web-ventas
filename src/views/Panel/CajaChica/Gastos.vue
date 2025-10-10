<template>
  <div class="card-header">
    <h3 class="card-title">GASTOS CAJA CHICA</h3>
  </div>
  <div class="card-body pb-2">
    <h3 class="text-left">Lista de Gastos</h3>
    <div class="row">
      <div class="col-md-4 mb-3" style="text-align: center">
        <input type="date" class="form-control" v-model="fecha_inicio" />
      </div>
      <div class="col-md-4 mb-3" style="text-align: center">
        <input type="date" class="form-control" v-model="fecha_fin" />
      </div>

      <div class="col-md-4 mb-3" style="text-align: left">
        <button
          type="button"
          class="btn btn-primary"
          style="margin: 2px"
          @click="cargarRegistros()"
        >
          <i class="fe fe-search me-2"></i>Buscar
        </button>
        <button
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdropGastos"
          @click="cargarAgregar()"
        >
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
            <th scope="col">Fecha</th>
            <th scope="col">Concepto</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Moneda</th>
            <th scope="col">Monto</th>
            <th scope="col" class="text-center">Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in listaRegistros" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ item.fecha }}</td>
            <td>{{ item.concepto }}</td>
            <td>{{ item.descripcion }}</td>
            <td>{{ item.moneda }}</td>
            <td>{{ parseFloat(item.monto) }}</td>
            <td class="text-center">
              <i
                class="fa fa-pencil mx-1 text-yellow"
                role="button"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdropGastos"
                @click="cargarVer(item, index)"
              ></i>
              <i
                class="fa fa-trash mx-1 text-danger"
                role="button"
                @click="cargarEliminar(item, index)"
              ></i>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination justify-content-center mt-2">
        <paginate :page-count="totalPaginas" :click-handler="cambiarPagina" />
      </div>
    </div>
    <agregar-gasto
      id="staticBackdropGastos"
      :indiceModificando="indiceModificando"
      :gastosSelect="gastosSelect"
      @cerrarModal="cerrarModal"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import global from "../../../global";
import Paginate from "../../../components/varios/Paginate.vue";
import Loading from "../../../components/varios/Loading.vue";
import AgregarGasto from "../../../components/gastos/AgregarGasto.vue";
//Librayr
import dayjs from "dayjs";
export default {
  components: {
    Paginate,
    Loading,
    AgregarGasto,
  },
  data() {
    return {
      date: new Date(),
      fecha_inicio: dayjs(this.date).format("YYYY-MM-DD"),
      fecha_fin: dayjs(this.date).format("YYYY-MM-DD"),
      gastosSelect: null,
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
      ListarRegistros: "_gastos/ListarRegistros",
      VerificarCierreCajaNroLiquidacion:
        "_cajachica/VerificarCierreCajaNroLiquidacion",
    }),
    verificarCierreCajaNroLiquidacion: async function (item) {
      let caja = {
        nroliquidacion: item.nroliquidacion,
      };
      let res = await this.VerificarCierreCajaNroLiquidacion(caja);
      return res;
    },
    cargarAgregar: function () {
      this.indiceModificando = -1;
    },
    cargarVer: function (item, index) {
      this.gastosSelect = item;
      this.indiceModificando = index;
    },
    cargarEliminar: async function (item, index) {
      this.gastosSelect = { ...item };
      let res_caja = await this.verificarCierreCajaNroLiquidacion(item);
    
      if (res_caja.cierrecaja == 0) {
        global._swal_pregunta(
          "¿Está seguro que desea eliminar el registro?",
          "Advertencia",
          async () => {
            let res = await this.EliminarDocumento(this.cliente);
            if (res?.exito) {
              this.cargarRegistros();
              global._mensaje_exito("Se ha eliminado");
            }
          }
        );
      } else {
        global._mensaje_advertencia(
          "Lo sentimos, la caja asociada al gasto, se encuentra cerrada, contacte con el administrador del sistema."
        );
      }
    },
    cargarRegistros: async function (pagina = 1) {
      this.cargando = true;
      let buscador = {
        page_index: pagina,
        page_size: this.buscador.page_size,
        fecha_inicio: this.fecha_inicio,
        fecha_fin: this.fecha_fin,
      };
      var res = await this.ListarRegistros(buscador);

      this.listaRegistros = res.datos.map((el) => ({
        ...el,
        fecha:
          el.fecha != null ? dayjs(el.fecha).format("DD-MM-YYYY H:mm") : "",
        fechaeditar:
          el.fecha != null ? dayjs(el.fecha).format("YYYY-MM-DDTHH:mm") : "",
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
      this.gastosSelect = null;
      var modal = bootstrap.Modal.getInstance(
        document.getElementById("staticBackdropGastos")
      );
      modal.hide();
    },
  },
  mounted() {
    this.cargarRegistros();
  },
};
</script>
