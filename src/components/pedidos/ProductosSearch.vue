<template>
  <div class="col-xl-12 col-lg-8">
    <div class="row">
      <div class="col-xl-12">
        <div class="card p-0">
          <div class="card-body p-4">
            <div class="row">
              <div class="col-xl-12 col-lg-8 col-md-8 col-sm-8">
                <div class="input-group d-flex w-100 float-start">
                  <input type="text" class="form-control border-end-0 my-2" placeholder="Search ..."
                    v-model="buscador.descripcionProducto" @input="searchProducto()" />
                  <button class="btn input-group-text bg-transparent border-start-0 text-muted my-2">
                    <i class="fe fe-search text-muted" aria-hidden="true"></i>
                  </button>
                </div>
              </div>

              <!-- <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                <ul class="nav item2-gl-menu float-end my-2">
                  <el-select
                    v-model="mozo"
                    filterable
                    @change="selecccionarMozo"
                    placeholder="Seleccionar Mozo"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in cboPersonal"
                      :key="item.id"
                      :label="item.nombre"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </ul>
              </div> -->
              <!-- <div class="col-xl-3 col-lg-12">
                <a
                  href="javascript:void(0)"
                  @click="cambiarMesas"
                  class="btn btn-primary btn-block float-end my-2"
                  ><i class="fa fa-plus-square me-2"></i>Mesas</a
                >
              </div> -->
            </div>
          </div>
        </div>
        <div class="card p-0">
          <div class="card-body p-4">
            <div class="row">
              <div class="panel panel-primary">
                <div class="tab-menu-heading">
                  <div class="tabs-menu1">
                    <!-- Tabs -->
                    <ul class="nav panel-tabs">
                      <li v-for="(item, index) in subFamilia" :key="index">
                        <a :href="'#tab' + index" class="fs-11" :class="subfamiliaSelect == item.id ? 'active' : ''"
                          data-bs-toggle="tab" @click="selecccionarSubFamilia(item.id)">{{ item.nombre }}</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="panel-body tabs-menu-body" style="background-color: #eaedf7">
                  <div class="tab-content">
                    <div class="tab-pane active" id="tab5">
                      <div class="tab-content">
                        <div class="text-center">
                          <!-- <loading :mostrar="cargando" /> -->
                          <vue-loading :fullPage="fullPage" :isLoading="isLoading" :spinner="spinner" :text="''" />
                        </div>

                        <div class="tab-pane active">
                          <div class="row">
                            <div class="col-md-6 col-xl-4 col-sm-6" v-for="(item, index) in resultadoBusqueda.datos"
                              :key="index">
                              <div class="card">
                                <div class="product-grid6">
                                  <div class="card-body pt-3">
                                    <div class="product-content text-center">
                                      <h1 class="title fw-bold fs-12">
                                        <a href="javascript:void(0)">{{
                                          item.descripcionproducto
                                          }}</a>
                                      </h1>
                                      <div class="mb-1 text-primary">
                                        {{ item.marca }}
                                      </div>
                                      <div class="price">
                                        S/.
                                        {{
                                          parseFloat(item.precioventa).toFixed(
                                            2
                                          )
                                        }}<span class="ms-4">
                                          S/.
                                          {{
                                            parseFloat(
                                              precioAnterior(item.precioventa)
                                            ).toFixed(2)
                                          }}</span>
                                      </div>
                                      <aumentar-disminuir @aumentarCantidad="aumentarCantidad"
                                        @disminuirCantidad="disminuirCantidad" :resetearCantidad="resetearCantidad" />
                                    </div>
                                  </div>
                                  <div class="card-footer text-center">
                                    <a href="javascript:void(0)" class="btn btn-primary mb-0"
                                      @click="cargarProductosPedido(item)"><i
                                        class="fe fe-shopping-cart me-2"></i>Agregar</a>
                                    <!-- <a href="wishlist.html" class="btn btn-outline-primary mb-1"
                    ><i class="fe fe-heart me-2 wishlist-icon"></i>Add to
                    wishlist</a
                  > -->
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="mb-5">
                              <div class="float-left">
                                <paginate :page-count="resultadoBusqueda.totalPaginas" :click-handler="cambiarPagina" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="tab-pane" id="tab-12">
                          <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12" v-for="(item, index) in resultadoBusqueda.datos"
                              :key="index">
                              <div class="card overflow-hidden">
                                <div class="card-body">
                                  <div class="row g-0">
                                    <div class="col-xl-3 col-lg-12 col-md-12">
                                      <div class="product-list">
                                        <div class="product-image">
                                          <ul class="icons">
                                            <li>
                                              <a href="shop-description.html"
                                                class="bg-primary border-primary border"><i
                                                  class="fe fe-eye text-white"></i></a>
                                            </li>
                                            <li>
                                              <a href="add-product.html" class="bg-success border-success border"><i
                                                  class="fe fe-edit text-white"></i></a>
                                            </li>
                                            <li>
                                              <a href="wishlist.html" class="bg-danger border-danger border"><i
                                                  class="fe fe-x text-white"></i></a>
                                            </li>
                                          </ul>
                                        </div>
                                        <div class="br-be-0 br-te-0">
                                          <a href="shop-description.html" class="">
                                          </a>
                                          <img src="/assets/images/pngs/1.jpg" alt="img"
                                            class="cover-image br-7 w-100" />
                                        </div>
                                      </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-12 col-md-12 border-end my-auto">
                                      <div class="card-body">
                                        <div class="mb-3">
                                          <a href="shop-description.html" class="">
                                            <h3 class="fw-bold fs-30 mb-3">
                                              {{ item.descripcionproducto }}
                                            </h3>
                                            <div class="mb-2 text-warning">
                                              <i class="fa fa-star fs-18 text-warning"></i>
                                              <i class="fa fa-star fs-18 text-warning"></i>
                                              <i class="fa fa-star fs-18 text-warning"></i>
                                              <i class="fa fa-star-half-o fs-18 text-warning"></i>
                                              <i class="fa fa-star-o fs-18 text-warning"></i>
                                            </div>
                                          </a>
                                          <p class="fs-16">
                                            {{ item.descripcionsubfamilia }}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="col-xl-3 col-lg-12 col-md-12 my-auto">
                                      <div class="card-body p-0">
                                        <div class="price h3 text-center mb-5 fw-bold">
                                          S/. {{ item.precioventa }}
                                        </div>
                                        <a href="cart.html" class="btn btn-primary btn-block"><i
                                            class="fe fe-shopping-cart me-2"></i>Add to cart</a>
                                        <a href="wishlist.html" class="btn btn-outline-primary btn-block mt-2"><i
                                            class="fe fe-heart me-2 wishlist-icon"></i>Add to wishlist</a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="mb-5">
                              <div class="float-end">
                                <paginate :page-count="resultadoBusqueda.totalPaginas" :click-handler="cambiarPagina" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- COL-END -->
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import VueLoading from "../varios/VueLoading.vue";
import Paginate from "../varios/Paginate.vue";
import AumentarDisminuir from "../varios/AumentarDisminuir.vue";
import SubFamilias from "../../components/pedidos/SubFamilias.vue";
export default {
  components: {
    Paginate,
    VueLoading,
    AumentarDisminuir,
    SubFamilias,
  },
  data() {
    return {
      subFamiliaId: "",
      subfamiliaSelect: null,
      subFamilia: [],
      spinner: "spinner",
      resetearCantidad: false,
      cantidad: 1,
      cargando: false,
      fullPage: false,
      isLoading: false,
      listaRegistros: [],
      buscador: {
        page_index: 1,
        page_size: 10,
        idSubFamilia: "",
        descripcionProducto: "",
      },
      totalPaginas: 0,
    };
  },
  methods: {
    selecccionarSubFamilia(subfamiliaid) {
      this.subFamiliaId = subfamiliaid;
      this.searchProducto();
    },
    listarSubFamilia: async function () {
      let buscar = {
        familiaid: 1,
      };
      var res = await this.SubFamiliaGetId(buscar);
      this.subFamilia = [
        {
          id: "",
          nombre: "TODOS",
        },
        ...res,
      ].sort((a, b) => a.id - b.id);
      this.subfamiliaSelect = 0;
    },
    aumentarCantidad(cantidad) {
      this.resetearCantidad = false;
      this.cantidad = cantidad;
    },
    disminuirCantidad(cantidad) {
      this.resetearCantidad = false;
      this.cantidad = cantidad;
    },
    ...mapActions({
      ListarRegistros: "_producto/ListarRegistros",
      selectSubFamilia: "_familia/selectSubFamilia",
      AgregarProductos: "_pedido/AgregarProductos",
      SeleccionarPersonal: "_pedido/SeleccionarPersonal",
      SubFamiliaGetId: "_familia/SubFamiliaGetId",
    }),
    selecccionarMozo() {
      this.SeleccionarPersonal(this.mozo);
    },
    cambiarMesas() {
      this.$router.push({
        name: "monitoreomesas",
      });
    },
    cargarProductosPedido(item) {
      ElNotification({
        title: "Éxito",
        duration: 1500,
        message:
          "Se agregó " + this.cantidad + " " + item.descripcionproducto + ".",
        type: "success",
      });

      this.resetearCantidad = true;
      let productos = {
        cantidad: this.cantidad,
        descripcionproducto: item.descripcionproducto,
        nitem: "",
        pedidoid: 0,
        precioventa: item.precioventa,
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
    cargarRegistros: async function (datos) {
      await this.selectSubFamilia(datos.busqueda);
    },
    searchProducto: async function () {
      this.isLoading = true;
      let buscador = {
        page_index: 1,
        page_size: 10,
        idSubFamilia: this.subFamiliaId,
        descripcionProducto: this.buscador.descripcionProducto,
      };
      await this.selectSubFamilia(buscador);
      this.isLoading = false;
    },
    cambiarPagina: async function (numeroPagina) {
      let buscador = {
        page_index: numeroPagina,
        page_size: 10,
        idSubFamilia: this.subFamiliaId,
        descripcionProducto: this.buscador.descripcionProducto,
      };
      await this.selectSubFamilia(buscador);
    },
    precioAnterior(precioventa) {
      return parseFloat(precioventa) + 10;
    },
  },
  mounted() {
    this.listarSubFamilia();
    this.searchProducto();
  },
  watch: {},
  computed: {
    ...mapState({
      resultadoBusqueda: (state) => state._familia.resultadoBusqueda,
      divVerMesas: (state) => state._mesa.divVerMesas,
      listaProductos: (state) => state._pedido.listaProductos,
    }),
  },
};
</script>

<style></style>
