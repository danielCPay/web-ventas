<template>
  <div class="panel panel-primary">
    <div class="tab-menu-heading">
      <div class="tabs-menu1">
        <!-- Tabs -->
        <ul class="nav panel-tabs" style="font-size:11px">
          <li v-for="(item, index) in subFamilia" :key="index">
            <a :href="'#tab' + index" data-bs-toggle="tab">{{ item.nombre }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="panel-body tabs-menu-body">
      <div class="tab-content">
        <div class="tab-pane active" id="tab5"></div>
        <div class="tab-pane" id="tab6"></div>
      </div>
    </div>
  </div>
  <!-- <div class="card">
    <div class="card-header">
      <div class="card-title">Categorias</div>
    </div>
    <div class="card-body">
      <ul class="list-group">
        <li
          class="list-group-item border-0 p-0"
          v-for="(item, index) in subFamilia"
          :key="index"
        >
          <a href="javascript:void(0)" @click="clickSubFamilia(item.id)" class="link-primary"
            ><i class="fe fe-chevron-right"></i> {{ item.nombre }}
          </a>
          <span class="product-label">{{item.productos}}</span>
        </li>
      </ul>
    </div>
  </div> -->
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      familia: [],
      subFamilia: [],
    };
  },
  methods: {
    ...mapActions({
      FamiliaDesplegable: "_familia/FamiliaDesplegable",
      SubFamiliaGetId: "_familia/SubFamiliaGetId",
      selectSubFamilia: "_familia/selectSubFamilia",
    }),
    clickSubFamilia(subFamiliaId) {
      let buscador = {
        page_index: 1,
        page_size: 10,
        idSubFamilia: subFamiliaId,
        descripcionProducto: "",
      };
      this.selectSubFamilia(buscador);
    },
    listarFamilia: async function () {
      var res = await this.FamiliaDesplegable();
      this.familia = res;
    },
    listarSubFamilia: async function () {
      let buscar = {
        familiaid: 1,
      };
      var res = await this.SubFamiliaGetId(buscar);
      this.subFamilia = res;
    },
  },
  computed: {
    ...mapState({
      subFamiliaId: (state) => state._familia.subFamiliaId,
    }),
  },
  mounted() {
    this.listarSubFamilia();
  },
};
</script>

<style lang="css" scoped>
.subFamilia {
  display: grid;
  grid-template-columns: repeat(auto-fill, 90px);
  gap: 2px;
  padding: 1px;
  margin: auto;
  justify-content: center;
}
</style>
