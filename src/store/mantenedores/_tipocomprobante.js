import global from "../../global";
//import { useCookies } from "vue3-cookies";
//const { cookies } = useCookies();

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {       
    Listar: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "/tipocomprobante/listar?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
  },
};
