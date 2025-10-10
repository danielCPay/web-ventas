import global from "../../global";
//import { useCookies } from "vue3-cookies";
//const { cookies } = useCookies();

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    AgregarVenta: async function (context, datos) {
      datos = {
        venta: datos,
      };
      var respuesta = null;
      await global._axios_post("/ventas/agregar", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
    ListadoVentas: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "/ventas/listado?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    EnvioNubeFact: async function (context, datos) {
      datos = {
        venta: datos,
      };
      var respuesta = null;
      await global._axios_post("/ventas/envionubefact", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
    ActualizarVentaNubeFact: async function (context, datos) {
      datos = {
        venta: datos,
      };
      var respuesta = null;
      await global._axios_put(
        "/ventas/actualizarventanubefact",
        datos,
        (res, res2) => {
          respuesta = res2;
        }
      );
      return respuesta;
    },
    ConsultarComprobantenNubeFact: async function (context, datos) {
      datos = {
        venta: datos,
      };
      var respuesta = null;
      await global._axios_post(
        "/ventas/consultarnubefact",
        datos,
        (res, res2) => {
          respuesta = res2;
        }
      );
      return respuesta;
    },
    AnularVenta: async function (context, datos) {
      datos = {
        venta: datos,
      };
      var respuesta = null;
      await global._axios_put("/ventas/anular", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
    AnularComprobanteNubeFact: async function (context, datos) {
      datos = {
        venta: datos,
      };
      var respuesta = null;
      await global._axios_post("/ventas/anularnubefact", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
    ActualizarVenta: async function (context, datos) {
      datos = {
        venta: datos,
      };
      var respuesta = null;
      await global._axios_put("/ventas/actualizar", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
    PrinTicketVenta: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "/ventas/printticketventa?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    ObtenerDetalleDocVentaId: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "/ventas/detalleventa?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
  },
};
