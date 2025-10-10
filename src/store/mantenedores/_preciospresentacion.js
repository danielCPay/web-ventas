import global from "../../global";
//import { useCookies } from "vue3-cookies";
//const { cookies } = useCookies();

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {   
    AgregarRegistro: async function (context, datos) {
      datos = {
        preciospresentacion: datos,
      };

      var respuesta = null;
      await global._axios_post("/preciospresentacion/agregar", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
    ModificarRegistro: async function (context, datos) {
      datos = {
        preciospresentacion: datos,
      };

      var respuesta = null;
      await global._axios_put("/preciospresentacion/modificar", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
    EliminarRegistro: async function (context, datos) {
      datos = {
        decano: datos,
      };
      var respuesta = null;
      await global._axios_delete("/insumo/eliminar", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
    ListadoPreciosProductos: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "/preciospresentacion/listadopreciosproductos?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    }    
  },
};
