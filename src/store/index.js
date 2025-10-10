import { createStore, Store } from "vuex";
import _producto from "./mantenedores/_producto";
import _cliente from "./mantenedores/_cliente";
import _proveedor from "./mantenedores/_proveedor";
import _personal from "./mantenedores/_personal";
import _familia from "./mantenedores/_familia";
import _categoria from "./mantenedores/_categoria";
import _pedido from "./pedido/_pedido";
import _moneda from "./mantenedores/_moneda";
import _tipocomprobante from "./mantenedores/_tipocomprobante";
import _numeracion from "./mantenedores/_numeracion";
import _almacen from "./mantenedores/_almacen";
import _venta from "./venta/_venta";
import _formapago from "./mantenedores/_formapago";
import _tarjetacreditoformapago from "./mantenedores/_tarjetacreditoformapago";
import _formapagodocventa from "./venta/_formapagodocventa";
import _cajachica from "./cajachica/_cajachica";
import _gastos from "./cajachica/_gastos";
import _login from "./usuario/_login";
import _compra from "./compra/_compra";
import _notaingreso from "./almacen/_notaingreso";
import _notasalida from "./almacen/_notasalida";
import _movimientos from "./almacen/_movimientos";
import _conceptomovimiento from "./mantenedores/_conceptomovimiento";
import _subfamilia from "./mantenedores/_subfamilia";
import _unidadmedida from "./mantenedores/_unidadmedida";
import _preciospresentacion from "./mantenedores/_preciospresentacion"
export default createStore({
  actions: {},
  modules: {
    _producto,
    _cliente,
    _proveedor,
    _personal,
    _familia,
    _pedido,
    _moneda,
    _tipocomprobante,
    _numeracion,
    _venta,
    _formapago,
    _tarjetacreditoformapago,
    _formapagodocventa,
    _cajachica,
    _gastos,
    _login,
    _compra,
    _notaingreso,
    _notasalida,
    _movimientos,
    _almacen,
    _conceptomovimiento,
    _subfamilia,
    _unidadmedida,
    _preciospresentacion
  },
});
