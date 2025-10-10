import global from "../../global";
//import { useCookies } from "vue3-cookies";
//const { cookies } = useCookies();

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    AgregarCompra: async function (context, datos) {
      datos = {
        compra: datos,
      };
      var respuesta = null;
      await global._axios_post("/compras/agregar", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
    ModificarCompra: async function (context, datos) {
      datos = {
        compra: datos,
      };
      var respuesta = null;
      await global._axios_put("/compras/modificar", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
    ListadoCompras: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "/compras/listado?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    ListadoComprasProvisionar: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "/compras/listadoprovisionar?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    DetalleCompras: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "/compras/detalle?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    DetalleComprasProvisionar: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "/compras/detalleprovisionar?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    AnularCompra: async function (context, datos) {
      datos = {
        compra: datos,
      };
      var respuesta = null;
      await global._axios_put("/compras/anular", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
    AnularCompraDetalle: async function (context, datos) {
      datos = {
        compra: datos,
      };
      var respuesta = null;
      await global._axios_put("/compras/anulardetalle", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
    CondicionesPago: async function () {
      const ruta = "/compras/condicionespago";
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    ExisteNumeroFactura: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "/compras/existenumerofactura?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
  },
};
