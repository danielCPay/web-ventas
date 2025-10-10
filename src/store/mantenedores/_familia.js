import global from "../../global";
//import { useCookies } from "vue3-cookies";
//const { cookies } = useCookies();

export default {
  namespaced: true,
  state: {
    subFamiliaId: "",
    resultadoBusqueda: {
      totalRegistros: 0,
      registrosPorPagina: 0,
      paginaActual: 0,
      totalPaginas: 0,
      datos: [],
    },
    //productos: [],
  },
  getters: {},
  mutations: {
    set_subFamiliaId(state, payload) {
      state.subFamiliaId = payload.idSubFamilia;
    },
    set_resultadoBusqueda(state, payload) {
      state.resultadoBusqueda = payload;
    },
  },
  actions: {
    selectSubFamilia: async function (context, parametros) {
      var query_string = "";
      query_string = global._json_to_query_string(parametros);
      const ruta = "/producto/presentacion/listado?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        context.commit("set_subFamiliaId", parametros);
        context.commit("set_resultadoBusqueda", res);
        respuesta = res;
      });
      return respuesta;
    },
    FamiliaDesplegable: async function () {
      const ruta = "/familia/desplegable";
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    SubFamiliaGetId: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "/subfamilia/getid?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
  },
};
