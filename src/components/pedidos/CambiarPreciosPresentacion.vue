<template>
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
            Precios Por Presentación
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
          <div class="table-responsive">
            <table class="table table-bordered table-vcenter">
              <thead>
                <tr class="border-top">
                  <th>Presentación</th>
                  <th>Und</th>
                  <th>Cant</th>
                  <th>Precio</th>
                  <th>#</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in listaPrecios"
                  :key="'item-' + index"
                  v-if="listaPrecios.length != 0"
                >
                  <td>{{ item.decripcionpresentacion }}</td>
                  <td>{{ item.descripcionunidadmedida }}</td>
                  <td>
                    {{ parseFloat(item.cantidadpresentacion).toFixed(2) }}
                  </td>
                  <td>{{ parseFloat(item.precio).toFixed(2) }}</td>

                  <td class="text-center">
                    <i
                      title="Seleccionar"
                      class="fa fa-check mx-1 text-danger"
                      role="button"
                      @click="seleccionarPrecio(item, index)"
                    ></i>
                  </td>
                </tr>
                <tr v-else>
                  <td colspan="8" class="text-center">Detalle Vacío</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    selectProductoid: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      listaPrecios: [],
    };
  },
  methods: {
    ...mapActions({
      ListadoPreciosProductos: "_preciospresentacion/ListadoPreciosProductos",
    }),
    seleccionarPrecio(item) {
      this.$emit("seleccionarPrecio", item);
    },
    cargarPreciosProductos: async function (productoid) {
      let producto = {
        productoid: productoid,
      };

      let precios = await this.ListadoPreciosProductos(producto);
      this.listaPrecios = precios;
    },
  },
  watch: {
    selectProductoid(productoid) {
      if (productoid != 0) {
        this.cargarPreciosProductos(productoid);
      }
    },
  },
};
</script>

<style></style>
