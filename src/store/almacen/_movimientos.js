import global from "../../global";
//import { useCookies } from "vue3-cookies";
//const { cookies } = useCookies();

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    AgregarMovimiento: async function (context, datos) {
      datos = {
        movimientos: datos,
      };
      var respuesta = null;
      await global._axios_post(
        "/movimientosalmacen/agregar",
        datos,
        (res, res2) => {
          respuesta = res2;
        }
      );
      return respuesta;
    },
    ActualizarMovimiento: async function (context, datos) {
      datos = {
        movimientos: datos,
      };
      var respuesta = null;
      await global._axios_put(
        "/movimientosalmacen/modificar",
        datos,
        (res, res2) => {
          respuesta = res2;
        }
      );
      return respuesta;
    },
    ListadoStock: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "/movimientosalmacen/listadostock?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    MovimientosAlmacenProductos: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta =
        "/movimientosalmacen/productos?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
  },
};
