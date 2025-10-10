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
      const ruta = "/cliente/listado?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    AgregarRegistro: async function (context, datos) {
      datos = {
        cliente: datos,
      };

      var respuesta = null;
      await global._axios_post("/cliente/agregar", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
    ModificarRegistro: async function (context, datos) {
      datos = {
        cliente: datos,
      };

      var respuesta = null;
      await global._axios_put("/cliente/modificar", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
    ObtenerClienteGetNroDocumento: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "/cliente/getnrodocumento?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    Anular: async function (context, datos) {
      datos = {
        cliente: datos,
      };
      var respuesta = null;
      await global._axios_put("/cliente/anular", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
    ClienteDesplegable: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "/cliente/desplegable?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
  },
};
