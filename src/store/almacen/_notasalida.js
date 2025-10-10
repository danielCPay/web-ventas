import global from "../../global";
//import { useCookies } from "vue3-cookies";
//const { cookies } = useCookies();

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    AgregarNotaSalida: async function (context, datos) {
      datos = {
        notasalida: datos,
      };
      var respuesta = null;
      await global._axios_post("/notasalida/agregar", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
    ActualizarNotaSalida: async function (context, datos) {
      datos = {
        notasalida: datos,
      };
      var respuesta = null;
      await global._axios_put("/notasalida/modificar", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
    ListadoNotaSalida: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "/notasalida/listado?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    AnularNotaSalida: async function (context, datos) {
      datos = {
        notasalida: datos,
      };
      var respuesta = null;
      await global._axios_put("/notasalida/anular", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
    NumeracionNotaSalida: async function (context) {
      const ruta = "/notasalida/numeracionnotasalida";
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    DetelleNotaSalida: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "/notasalida/detellenotasalida?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    AnularNotaSalidaoDetalle: async function (context, datos) {
      datos = {
        notasalida: datos,
      };
      var respuesta = null;
      await global._axios_put(
        "/notasalida/anulardetalle",
        datos,
        (res, res2) => {
          respuesta = res2;
        }
      );
      return respuesta;
    },
  },
};
