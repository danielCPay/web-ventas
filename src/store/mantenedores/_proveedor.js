import global from "../../global";
//import { useCookies } from "vue3-cookies";
//const { cookies } = useCookies();

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    ListarRegistros: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "/proveedor/listado?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    AgregarRegistro: async function (context, datos) {
      datos = {
        proveedor: datos,
      };

      var respuesta = null;
      await global._axios_post("/proveedor/agregar", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
    ModificarRegistro: async function (context, datos) {
      datos = {
        proveedor: datos,
      };

      var respuesta = null;
      await global._axios_put("/proveedor/modificar", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },    
    Anular: async function (context, datos) {
      datos = {
        proveedor: datos,
      };
      var respuesta = null;
      await global._axios_put("/proveedor/anular", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
  },
};
