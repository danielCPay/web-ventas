//import { useCookies } from "vue3-cookies";
//const { cookies } = useCookies();
import axios from "axios";
// const tienda = localStorage.getItem("store_login");
// const apiBaseUrl =
//   tienda === "1" ? import.meta.env.VITE_API : import.meta.env.VITE_API2;
// console.log(apiBaseUrl);
export default {
  get ruta_api() {
    const tienda = localStorage.getItem("store_login");
    return tienda === "1"
      ? import.meta.env.VITE_API
      : import.meta.env.VITE_API2;
  },
  TXT_WHATSAPP_MENSAJE: "Hola, necesito ayuda para actualizar mis datos.",
  TXT_WHATSAPP_NUMERO: "+51951067283",
  CONCEPTO_CUOTA: 2,
  CONCEPTO_FOMAF: 8,
  CONCEPTO_CERTIFICADO: 15,
  CONCEPTO_CERTIFICADO_DESCRIPCION: "CERTIFICADO DE HABILIDAD Q.F",
  _to_base64(cadena) {
    return btoa(cadena);
  },
  _swal_pregunta(text, text_title, callback) {
    Swal.fire({
      title: text_title,
      text: text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        callback();
      }
    });
  },
  _mensaje_advertencia: function (msj) {
    return Swal.fire("Advertencia", msj, "warning");
  },
  _mensaje_exito: function (msj) {
    return Swal.fire("Éxito", msj, "success");
  },
  _mensaje_error: function (msj) {
    return Swal.fire("Error", msj, "error");
  },
  _axios_get(ruta, funcion = null, funcion2 = null) {
    return this._axios("get", ruta, undefined, funcion, funcion2);
  },
  _axios_get2(ruta, parametros = null, funcion = null, funcion2 = null) {
    return this._axios("get", ruta, parametros, funcion, funcion2);
  },
  _axios_post(ruta, parametros = null, funcion = null, funcion2 = null) {
    return this._axios("post", ruta, parametros, funcion, funcion2);
  },
  _axios_put(ruta, parametros = null, funcion = null, funcion2 = null) {
    return this._axios("put", ruta, parametros, funcion, funcion2);
  },
  _axios_delete(ruta, parametros = null, funcion = null, funcion2 = null) {
    return this._axios("delete", ruta, parametros, funcion, funcion2);
  },
  _axios_patch(ruta, parametros = null, funcion = null, funcion2 = null) {
    return this._axios("patch", ruta, parametros, funcion, funcion2);
  },
  //_obtener_jwt() {
  //	return cookies.get('jwt');
  //},
  _axios: function (metodo, ruta, parametros, funcion, funcion2) {
    //if (cookies.isKey('jwt')) {
    //	if (cookies.get('jwt') != null && cookies.get('jwt') != undefined) {
    //		axios.defaults.headers.common['Authorization'] = 'Bearer ' + this._obtener_jwt();
    //	}
    //}
    return axios
      .request({
        method: metodo,
        url: this.ruta_api + ruta,
        data: parametros,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        let respuesta = response.data;
        if (respuesta.exito) {
          if (funcion != null) funcion(respuesta.datos, respuesta);
        } else {
          //console.log("GLOBAL:", respuesta.datos);
          funcion(
            respuesta.mensaje ||
              respuesta.datos.errors ||
              "Sucedió un error, intentelo nuevamente",
            respuesta
          );
          // return (
          //   respuesta.mensaje ||
          //   respuesta.datos.errors ||
          //   "Sucedió un error, intentelo nuevamente"
          // );
          // this._mensaje_error(
          //   respuesta.mensaje ||
          //     respuesta.datos.errors ||
          //     "Sucedió un error, intentelo nuevamente"
          // );
        }
      })
      .catch((e) => {
        console.log(e, e.message);
      })
      .finally(() => {
        if (funcion2 != null) funcion2();
      });
  },
  _objeto_es_vacio: function (obj) {
    return Object.keys(obj).length == 0;
  },
  _evaluar_ruta_parametro: function (ruta, parametro_ruta = "") {
    if (parametro_ruta != "") parametro_ruta = "/" + parametro_ruta;
    return ruta + parametro_ruta;
  },
  _cargar_tooltip: function (tooltip = "tooltip") {
    //https://stackoverflow.com/questions/66286043/add-tooltip-via-javascript-in-bootstrap-5
    var tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="' + tooltip + '"]')
    );
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      //document.addEventListener("hide.bs.tooltip", function () {
      //	new bootstrap.Tooltip(tooltipTriggerEl);
      //});
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  },
  _json_to_query_string: function (json) {
    json = Object.keys(json).map((item) => {
      return item + "=" + json[item] || "";
    });
    return json.join("&");
  },
};
