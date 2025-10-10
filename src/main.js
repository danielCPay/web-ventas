import { createApp } from "vue";
import App from "./App.vue";

import router from "./router/index.js";
import store from "./store";
import VueSweetalert2 from "vue-sweetalert2"; // https://sweetalert2.github.io/
import "sweetalert2/dist/sweetalert2.min.css";

// import VueSocketIO from "vue-3-socket.io";
// import SocketIO from "socket.io-client";

const app = createApp(App);
app.use(router);
app.use(store);
app.use(VueSweetalert2);
window.Swal = app.config.globalProperties.$swal;

//const options = { path: "/app/" }; //Options object to pass into SocketIO
// app.use(
//   new VueSocketIO({
//     debug: true,
//     connection: SocketIO("http://localhost:5000", store), //options object is Optional
//     vuex: {
//       store,
//       actionPrefix: "SOCKET_",
//       mutationPrefix: "SOCKET_",
//     },
//   })
// );

app.mount("#app_");
