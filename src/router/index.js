import { createRouter, createWebHistory } from "vue-router";
//import _login from '../store/_login';

const AutenticacionContainer = () =>
  import("../containers/AutenticacionContainer.vue");
const PanelContainer = () => import("../containers/PanelContainer.vue");

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/",
    component: PanelContainer,
    children: [
      {
        path: "/",
        name: "panelInicio",
        //meta: { necesita_autenticacion: true },
        component: () => import("../views/Panel/Inicio.vue"),
      },
      {
        path: "/mantenedores/producto",
        name: "producto",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Panel/Mantenedores/Producto.vue"),
      },
      {
        path: "/mantenedores/cliente",
        name: "cliente",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Panel/Mantenedores/Cliente.vue"),
      },
      {
        path: "/mantenedores/proveedor",
        name: "proveedor",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Panel/Mantenedores/Proveedor.vue"),
      },
      {
        path: "/mantenedores/subfamilia",
        name: "subfamilia",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Panel/Mantenedores/SubFamilia.vue"),
      },
      {
        path: "/mantenedores/personal",
        name: "personal",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Panel/Mantenedores/Personal.vue"),
      },
      {
        path: "/mantenedores/insumo",
        name: "insumo",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Panel/Mantenedores/Insumo.vue"),
      },
      {
        path: "/mantenedores/mesa",
        name: "mesa",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Panel/Mantenedores/Mesa.vue"),
      },
      {
        path: "/ventas/monitoreomesas",
        name: "monitoreomesas",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Panel/Ventas/MonitoreoMesas.vue"),
      },
      {
        path: "/ventas/emitirdocumentoventa",
        name: "emitirdocumentoventa",
        meta: { necesita_autenticacion: true },
        component: () =>
          import("../views/Panel/Ventas/EmitirDocumentoVenta.vue"),
      },
      {
        path: "/ventas/verificarpedido",
        name: "verificarpedido",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Panel/Ventas/VerificarPedido.vue"),
      },
      {
        path: "/ventas/listadoventas",
        name: "listadoventas",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Panel/Ventas/ListadoVentas.vue"),
      },
      {
        path: "/ventas/listadoproductos",
        name: "listadoproductos",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Panel/Ventas/ListadoProductos.vue"),
      },
      {
        path: "/cajachica/resumencaja",
        name: "resumencaja",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Panel/CajaChica/ResumenCaja.vue"),
      },
      {
        path: "/cajachica/gastos",
        name: "gastos",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Panel/CajaChica/Gastos.vue"),
      },
      {
        path: "/cajachica/caja",
        name: "caja",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Panel/CajaChica/Caja.vue"),
      },
      {
        path: "/mantenedores/preciosporpresentacion",
        name: "preciosporpresentacion",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Panel/Mantenedores/PreciosPorPresentacion.vue"),
      },
      {
        path: "/pedidos/listadopedidos",
        name: "listadopedidos",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Panel/Pedidos/ListadoPedidos.vue"),
      },
      {
        path: "/compras/modulocompras",
        name: "modulocompras",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Panel/Compras/ModuloCompras.vue"),
      },
      {
        path: "/almacen/notaingreso",
        name: "notaingreso",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Panel/Almacen/NotaIngreso.vue"),
      },
      {
        path: "/almacen/notasalida",
        name: "notasalida",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Panel/Almacen/Notasalida.vue"),
      },
      {
        path: "/almacen/movimientosalmacen",
        name: "movimientosalmacen",
        meta: { necesita_autenticacion: true },
        component: () =>
          import("../views/Panel/Almacen/MovimientosAlmacen.vue"),
      },
      {
        path: "/almacen/stockproductos",
        name: "stockproductos",
        meta: { necesita_autenticacion: true },
        component: () => import("../views/Panel/Almacen/StockProductos.vue"),
      },
    ],
  },
  {
    path: "/",
    component: AutenticacionContainer,
    children: [
      {
        path: "/login",
        //meta: { necesita_autenticacion: false, redirigir_cuando_este_logueado: true },
        component: () => import("../views/Autenticacion/Login.vue"),
      },
      {
        path: "/recuperar-contrasena",
        //meta: { necesita_autenticacion: false },
        component: () =>
          import("../views/Autenticacion/RecuperarContrasena.vue"),
      },
      {
        path: "/logout",
        //meta: { necesita_autenticacion: true },
        component: () => import("../views/Autenticacion/Logout.vue"),
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory("/web/"),
  routes: routes,
});

export default router;
