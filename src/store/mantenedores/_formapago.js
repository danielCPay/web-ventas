import global from "../../global";
//import { useCookies } from "vue3-cookies";
//const { cookies } = useCookies();

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {       
    DesplegarFormaPago: async function () {
      const ruta = "/formapago/desplegable";
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
  },
};
