import global from "../../global";
//import { useCookies } from "vue3-cookies";
//const { cookies } = useCookies();

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    ListarPiso: async function () {
      const ruta = "/piso/desplegable";
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    AgregarRegistro: async function (context, datos) {
      datos = {
        piso: datos,
      };
      var respuesta = null;
      await global._axios_post("/piso/agregar", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
    ModificarRegistro: async function (context, datos) {
      datos = {
        piso: datos,
      };
      var respuesta = null;
      await global._axios_put("/piso/modificar", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
  },
};
