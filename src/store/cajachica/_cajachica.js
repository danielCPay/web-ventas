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
      const ruta = "/cajachica/listado?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    ResumenCajaGastos: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "/cajachica/resumencajagastos?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    ResumenCajaIngreso: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "/cajachica/resumencajaingreso?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    ResumenCajaVentas: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "/cajachica/resumencajaventas?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    ResumenCajaTarjetas: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "/cajachica/resumencajatarjetas?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    ResumenCajaProductos: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "/cajachica/resumencajaproductos?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    GenerarNumeroCaja: async function () {
      const ruta = "/cajachica/generarnumerocaja";
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    ListarRegistros: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "/cajachica/listado?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    AgregarRegistro: async function (context, datos) {
      datos = {
        caja: datos,
      };

      var respuesta = null;
      await global._axios_post("/cajachica/agregar", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
    ModificarRegistro: async function (context, datos) {
      datos = {
        caja: datos,
      };

      var respuesta = null;
      await global._axios_put("/cajachica/modificar", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
    CierreCaja: async function (context, datos) {
      datos = {
        caja: datos,
      };

      var respuesta = null;
      await global._axios_put("/cajachica/cierre", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
    VerificarNumeroCaja: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "/cajachica/verificarnumerocaja?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    GenerarPDFCierreCaja: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "/cajachica/cierre/generar_pdf?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    VerificarCierreCajaNroLiquidacion: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "/cajachica/verificarcajanroliquidacion?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
  },
};
