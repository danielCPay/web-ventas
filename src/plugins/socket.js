import Vue from "vue";
import VueSocketIO from "vue-3-socket.io";

export default function socket() {
  return (store) => {
    Vue.use(
      new VueSocketIO({
        debug: false,
        connection: "http://localhost:5000", //options object is Optional
        vuex: {
          store,
          actionPrefix: "SOCKET_",
          mutationPrefix: "SOCKET_",
        },
      })
    );
  };
}
