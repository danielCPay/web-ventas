import global from "../../global";
//import { useCookies } from "vue3-cookies";
//const { cookies } = useCookies();

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    AgregarNotaIngreso: async function (context, datos) {
      datos = {
        notaingreso: datos,
      };
      var respuesta = null;
      await global._axios_post("/notaingreso/agregar", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
    ActualizarNotaIngreso: async function (context, datos) {
      datos = {
        notaingreso: datos,
      };
      var respuesta = null;
      await global._axios_put("/notaingreso/modificar", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
    ListadoNotaIngreso: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "/notaingreso/listado?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    AnularNotaIngreso: async function (context, datos) {
      datos = {
        notaingreso: datos,
      };
      var respuesta = null;
      await global._axios_put("/notaingreso/anular", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
    NumeracionNotaingreso: async function (context) {
      const ruta = "/notaingreso/numeracionnotaingreso";
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    DetelleNotaIngreso: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "/notaingreso/detellenotaingreso?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    AnularNotaIngresoDetalle: async function (context, datos) {
      datos = {
        notaingreso: datos,
      };
      var respuesta = null;
      await global._axios_put("/notaingreso/anulardetalle", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
  },
};
