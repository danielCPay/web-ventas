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
      const ruta = "/personal/listado?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    AgregarRegistro: async function (context, datos) {
      datos = {
        personal: datos,
      };

      var respuesta = null;
      await global._axios_post("/personal/agregar", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
    ModificarRegistro: async function (context, datos) {
      datos = {
        personal: datos,
      };

      var respuesta = null;
      await global._axios_put("/personal/modificar", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
    ObtenerRegistro: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "personal/obtener?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    Anular: async function (context, datos) {
      datos = {
        personal: datos,
      };
      var respuesta = null;
      await global._axios_put("/personal/anular", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
    CargoDesplegable: async function () {
      const ruta = "/cargo/desplegable";
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    PersonalDesplegable: async function () {
      const ruta = "/personal/desplegable";
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
  },
};
