import global from "../../global";
//import { useCookies } from "vue3-cookies";
//const { cookies } = useCookies();

export default {
  namespaced: true,
  state: {
    divVerMesas: true,
    mesaid: 0,
    pisoid:1
  },
  getters: {},
  mutations: {
    set_divVerMesas(state, estado) {
      state.divVerMesas = estado;
    },
    set_mesaid(state, mesaid) {
      state.mesaid = mesaid;
    },
    set_pisoid(state, pisoid) {
      state.pisoid = pisoid;
    },
  },
  actions: {
    cargarMesaId: async function (context, mesaid) {
      context.commit("set_mesaid", mesaid);
    },
    cargarPisoId: async function (context, pisoid) {
      context.commit("set_pisoid", pisoid);
    },
    ListadoPisoById: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "/mesa/listadopisobyid?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    ActualizarEstadoMesa: async function (context, datos) {
      datos = {
        mesa: datos,
      };
      var respuesta = null;
      await global._axios_put(
        "/mesa/actualizarestadomesa",
        datos,
        (res, res2) => {
          respuesta = res2;
        }
      );
      return respuesta;
    },
    ListarRegistros: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "/mesa/listado?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    AgregarRegistro: async function (context, datos) {
      datos = {
        mesa: datos,
      };
      var respuesta = null;
      await global._axios_post("/mesa/agregar", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
    ModificarRegistro: async function (context, datos) {
      datos = {
        mesa: datos,
      };
      var respuesta = null;
      await global._axios_put("/mesa/modificar", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
    AnularRegistro: async function (context, datos) {
      datos = {
        mesa: datos,
      };
      var respuesta = null;
      await global._axios_delete("/mesa/anular", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
  },
};
