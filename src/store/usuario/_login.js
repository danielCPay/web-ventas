import global from "../../global";
//import { useCookies } from "vue3-cookies";
//const { cookies } = useCookies();

export default {
  namespaced: true,
  state: {
    usuario: {},
  },
  getters: {
    usuario: ({ usuario }) => {
      return usuario;
    },
  },
  mutations: {
    login(state, data) {
      //state.jwt = data.jwt;
      state.usuario = data;
      //state.tipo_usuario = data.type;
    },
    logout: function (state) {
      //state.jwt = null;
      state.usuario = null;
      //state.tipo_usuario = null;
    },
  },
  actions: {
    login: async function (context, datos) {
      var respuesta = false;
      await global._axios_post("/usuario/login", datos, (res) => {
        ///console.log(res);
        if (res != null) {
          context.commit("login", res);
          localStorage.setItem("login", JSON.stringify(res));
          respuesta = true;
        } else {
          respuesta = false;
        }
      });
      return respuesta;
    },
    Perfiles_Usuario: async function () {
      const ruta = "/perfilusuario/desplegable";
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
  },
};
