<template>
  <div
    class="modal fade"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Detalle de Venta</h5>
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
          <div class="table-responsive">
            <!-- <div class="text-center">
              <loading :mostrar="cargando" />
            </div> -->
            <table class="table" v-if="listaRegistros.length != 0">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">PRODUCTO</th>
                  <th scope="col">CANTIDAD</th>
                  <th scope="col">PRECIO</th>
                  <th scope="col">IMPORTE.</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in listaRegistros" :key="index">
                  <th scope="row">{{ index + 1 }}</th>
                  <td>{{ item.descripcionproducto }}</td>
                  <td>{{ parseFloat(item.cantidad) }}</td>
                  <td>{{ parseFloat(item.precio, 2) }}</td>
                  <td>{{ parseFloat(item.importe, 2) }}</td>
                </tr>
              </tbody>
            </table>
            <!-- <div class="pagination justify-content-center mt-2">
              <paginate
                :page-count="totalPaginas"
                :click-handler="cambiarPagina"
                v-model="initialPage"
              />
            </div> -->
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="closeModal"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import global from "../../global.js";
export default {
  name: "DetalleVenta",
  props: {
    docventaid: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      listaRegistros: [],
    };
  },
  methods: {
    ...mapActions({
      ObtenerDetalleDocVentaId: "_venta/ObtenerDetalleDocVentaId",
    }),
    cargarRegistros: async function () {
      let parametros = {
        docventaid: this.docventaid,
      };
      let res = await this.ObtenerDetalleDocVentaId(parametros);
      console.log(res);
      this.listaRegistros = res;
    },
  },
  watch: {
    docventaid() {
      if (this.docventaid != 0) {
        this.cargarRegistros();
      } else {
        this.listaRegistros = [];
      }
    },
  },
  mounted() {},
};
</script>

<style></style>
