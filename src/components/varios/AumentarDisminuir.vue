<template>
  <div class="row row-sm">
    <!-- <h1>{{ setCantidad }}</h1> -->
    <div class="col">
      <div class="mb-0 me-2 sizes">
        <!-- <span class="fw-bold me-1">Cantidad:</span> -->
        <div class="input-group input-indec input-indec1 w-35 w-sm-50 mt-1">
          <span class="input-group-btn">
            <button
              type="button"
              class="minus btn btn-white btn-number btn-icon br-7"
              @click="disminuirCantidad"
            >
              <i class="fa fa-minus text-muted"></i>
            </button>
          </span>
          <input
            type="text"
            name="quantity"
            class="form-control text-center qty"
            v-model="cantidad"
            readonly
            style="background:white"
          />
          <span class="input-group-btn">
            <button
              type="button"
              class="quantity-right-plus btn btn-white btn-number btn-icon br-7 add"
              @click="aumentarCantidad"
            >
              <i class="fa fa-plus text-muted"></i>
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  props: {
    resetearCantidad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      cantidad: 1,
      aumentar: 1,
    };
  },
  methods: {
    ...mapActions({
      //ResetearCantidad: "_pedido/ResetearCantidad",
    }),
    aumentarCantidad() {
      this.cantidad = this.cantidad = ++this.aumentar;
      this.$emit("aumentarCantidad", this.cantidad);
    },
    disminuirCantidad() {
      this.cantidad = this.cantidad = --this.aumentar;
      this.$emit("disminuirCantidad", this.cantidad);
    },
  },
  computed: {
    ...mapState({}),
  },
  mounted() {},
  watch: {
    resetearCantidad(resetearCantidad) {
      if (resetearCantidad == true && this.cantidad > 1) {
        this.cantidad = 1;
        this.aumentar = 1;
      }
    },
  },
};
</script>
