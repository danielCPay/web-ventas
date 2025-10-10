import global from "../../global";
//import { useCookies } from "vue3-cookies";
//const { cookies } = useCookies();

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    AgregarFormaPagoDocVenta: async function (context, datos) {
      datos = {
        formapago: datos,
      };
      var respuesta = null;
      await global._axios_post("/formapagodocventa/agregar", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
  },
};
