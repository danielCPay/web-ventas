import global from "../../global";
//import { useCookies } from "vue3-cookies";
//const { cookies } = useCookies();

export default {
  namespaced: true,
  state: {
    listaProductos: [],
    personalid: null,
    fechapedido: "",
    pedidoid: 0,
    resetearCantidad: false,
    notificationList: [],
  },
  getters: {},
  mutations: {
    SOCKET_NEW_MESSAGE_RECEIVED(state, message) {
      state.notificationList.push(message);
    },
    SOCKET_NEW_NOTIFICATION_RECEIVED(state, notification) {
      state.notificationList.push(notification);
    },
    set_resetear_cantidad(state, resetearCantidad) {
      state.resetearCantidad = resetearCantidad;
    },
    lista_productos_agregar(state, payload) {
      state.listaProductos.push(payload);
    },
    lista_productos_eliminar(state, index) {
      state.listaProductos.splice(index, 1);
    },
    lista_productos_limpiar(state) {
      state.listaProductos = [];
    },
    seleccionar_personal(state, personalid) {
      state.personalid = personalid;
    },
    seleccionar_fecha_pedido(state, fechapedido) {
      state.fechapedido = fechapedido;
    },
    seleccionar_pedidoid(state, pedidoid) {
      state.pedidoid = pedidoid;
    },
    aumentarCantidad(state, payload) {
      state.listaProductos[payload].cantidad =
        state.listaProductos[payload].cantidad + 1;
    }, 
    disminuirCantidad(state, payload) {
      state.listaProductos[payload].cantidad =
        state.listaProductos[payload].cantidad - 1;
      if (state.listaProductos[payload].cantidad === 0) {
        delete state.listaProductos[payload];
      }
    },
  },
  actions: {
    ResetearCantidad(context, valor) {
      context.commit("set_resetear_cantidad", valor);
    },
    AumentarCantidad(context, datos) {
      context.commit("aumentarCantidad", datos);
    },
    DisminuirCantidad(context, datos) {
      context.commit("disminuirCantidad", datos);
    },
    SeleccionarPersonal: async function (context, personalid) {
      context.commit("seleccionar_personal", personalid);
    },
    SeleccionarFechaPedido: async function (context, fechapedido) {
      context.commit("seleccionar_fecha_pedido", fechapedido);
    },
    SeleccionarPedidoId: async function (context, pedidoid) {
      context.commit("seleccionar_pedidoid", pedidoid);
    },
    AgregarProductos: async function (context, datos) {
      context.commit("lista_productos_agregar", datos);
    },
    QuitarProductos: async function (context, index) {
      context.commit("lista_productos_eliminar", index);
    },
    LimpiarProductos: async function (context) {
      context.commit("lista_productos_limpiar");
    },
    AgregarPedido: async function (context, datos) {
      datos = {
        pedido: datos,
      };
      var respuesta = null;
      await global._axios_post("/pedido/agregar", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
    ModificarPedido: async function (context, datos) {
      datos = {
        pedido: datos,
      };
      var respuesta = null;
      await global._axios_put("/pedido/modificar", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
    PedidoGetIdMesa: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "/pedido/pedidogetmesaid?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    PedidoDetalleId: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "/pedido/pedidodetalleid?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    ActualizarEstadoPedido: async function (context, datos) {
      datos = {
        pedido: datos,
      };
      var respuesta = null;
      await global._axios_put(
        "/pedido/actualizarestadopedido",
        datos,
        (res, res2) => {
          respuesta = res2;
        }
      );
      return respuesta;
    },
    ActualizarMesaPedido: async function (context, datos) {
      datos = {
        pedido: datos,
      };
      var respuesta = null;
      await global._axios_put(
        "/pedido/actualizarmesapedido",
        datos,
        (res, res2) => {
          respuesta = res2;
        }
      );
      return respuesta;
    },
    AnularPedidoDetalle: async function (context, datos) {
      datos = {
        pedido: datos,
      };
      var respuesta = null;
      await global._axios_put(
        "/pedido/anularpedidodetalle",
        datos,
        (res, res2) => {
          respuesta = res2;
        }
      );
      return respuesta;
    },
    ListarPedidos: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "/pedido/listado?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    TransferirPedido: async function (context, datos) {
      datos = {
        pedido: datos,
      };
      var respuesta = null;
      await global._axios_post("/pedido/transferirpedido", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
  },
};
