<template>
  <vue-loading :fullPage="fullPage" :isLoading="isLoading" :spinner="spinner" />
  <div class="card-header">
    <h3 class="card-title">MANTENEDOR DE PRECIOS</h3>
    <div class="card-options">
      <a href="javascript:void(0)" class="btn btn-secondary btn-sm ms-2" @click="download_excel"><i
          class="fe fe-download me-2"></i>Descargar Productos</a>
      <a href="javascript:void(0)" class="btn btn-info btn-sm ms-2" @click="abrirVistaCodigosBarra">
        <i class="fe fe-printer me-2"></i>Imprimir Códigos de Barra
      </a>
    </div>
  </div>
  <div class="card-body pb-2">
    <h3 class="text-left">Lista de Presentaciones</h3>

    <div class="row">
      <div class="col-md-3 mb-3" style="text-align: center">
        <select class="form-control form-select" data-bs-placeholder="Sub Familia" v-model="buscador.idSubFamilia">
          <option value="">Sub Familia</option>
          <option v-for="item in cboSubFamilia" :key="item.id" :label="item.nombre" :value="item.id"></option>
        </select>
      </div>
      <div class="col-md-4 mb-3" style="text-align: center">
        <input type="text" class="form-control" placeholder="Descripción" v-model="buscador.descripcionProducto" />
      </div>

      <div class="col-md-5 mb-3" style="text-align: left">
        <button type="button" class="btn btn-primary" style="margin: 2px" @click="cargarRegistros()">
          <i class="fe fe-search me-2"></i>Buscar
        </button>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table" v-if="listaRegistros.length != 0">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Código</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Familia</th>
            <th scope="col">UND</th>
            <th scope="col">Precio</th>
            <th scope="col">Costo</th>
            <th scope="col">Marca</th>
            <th scope="col">Stock.Min</th>           
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in listaRegistros" :key="index">
            <th scope="row">
              <span :style="item.estadoid == 2
                ? 'text-decoration-line: line-through;color:red'
                : ''
                ">{{ index + 1 }}</span>
            </th>
            <td>
              <span :style="item.estadoid == 2
                ? 'text-decoration-line: line-through;color:red'
                : ''
                ">{{ item.codigo }}</span>
            </td>
            <td>
              <span :style="item.estadoid == 2
                ? 'text-decoration-line: line-through;color:red'
                : ''
                ">{{ item.descripcionproducto }}</span>
            </td>
            <td>
              <span :style="item.estadoid == 2
                ? 'text-decoration-line: line-through;color:red'
                : ''
                ">{{ item.descripcionsubfamilia }}</span>
            </td>
            <td>
              <span :style="item.estadoid == 2
                ? 'text-decoration-line: line-through;color:red'
                : ''
                ">{{ item.descripcionunidadmedida }}</span>
            </td>
            <td>
              <span :style="item.estadoid == 2
                ? 'text-decoration-line: line-through;color:red'
                : ''
                ">{{ item.precioventa }}</span>
            </td>
            <td>
              <span :style="item.estadoid == 2
                ? 'text-decoration-line: line-through;color:red'
                : ''
                ">{{ item.costo }}</span>
            </td>
            <td>
              <span :style="item.estadoid == 2
                ? 'text-decoration-line: line-through;color:red'
                : ''
                ">{{ item.marca }}</span>
            </td>
            <td>
              <span :style="item.estadoid == 2
                ? 'text-decoration-line: line-through;color:red'
                : ''
                ">{{ item.stockminimo }}</span>
            </td>          
          </tr>
        </tbody>
      </table>

      <div class="pagination justify-content-center mt-2">
        <paginate :page-count="totalPaginas" :click-handler="cambiarPagina" v-model="initialPage" />
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="staticBackdropMantenedorDecano" data-bs-backdrop="static" data-bs-keyboard="false"
      tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Productos</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
              <i class="fa fa-close"></i>
            </button>
          </div>
          <div class="modal-body">
            <div>
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <label>Código</label>
                    <input type="text" class="form-control" placeholder="Código" v-model="producto.codigo" />
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <label>Sub Familia</label>
                    <select class="form-control form-select" data-bs-placeholder="Sub Familia"
                      v-model="producto.subfamiliaid" ref="subfamiliaid" :style="showAdvertise && producto.subfamiliaid == 0
                        ? 'border-color: #e23e3d;'
                        : ''
                        ">
                      <option value="0">SELECCIONAR</option>
                      <option v-for="item in cboSubFamilia" :key="item.id" :label="item.nombre" :value="item.id">
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label>Descripción</label>
                <input type="text" class="form-control" v-model="producto.descripcionproducto" ref="descripcionproducto"
                  :style="showAdvertise && producto.descripcionproducto == ''
                    ? 'border-color: #e23e3d;'
                    : ''
                    " />
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <label>Marca</label>
                    <input type="text" class="form-control" v-model="producto.marca" ref="marca" :style="showAdvertise && producto.marca == ''
                      ? 'border-color: #e23e3d;'
                      : ''
                      " />
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <label>Stock Mínimo</label>
                    <input type="number" class="form-control" v-model="producto.stockminimo" ref="stockminimo" :style="showAdvertise && producto.stockminimo == 0
                      ? 'border-color: #e23e3d;'
                      : ''
                      " />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <label>Precio</label>
                    <input type="number" class="form-control" v-model="producto.precioventa" ref="precioventa" :style="showAdvertise && producto.precioventa == ''
                      ? 'border-color: #e23e3d;'
                      : ''
                      " />
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <label>Costo</label>
                    <input type="number" class="form-control" v-model="producto.costo" ref="costo" :style="showAdvertise && producto.costo == ''
                      ? 'border-color: #e23e3d;'
                      : ''
                      " />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <label>Und Medida</label>
                    <select class="form-control form-select" data-bs-placeholder="Und Medida"
                      v-model="producto.unidadmedidaid" ref="unidadmedidaid" :style="showAdvertise && producto.unidadmedidaid == 0
                        ? 'border-color: #e23e3d;'
                        : ''
                        ">
                      <option value="0">SELECCIONAR</option>
                      <option v-for="item in cboUnidadMedida" :key="item.id" :label="item.nombre" :value="item.id">
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <label>Cantidad Und Medida</label>
                    <input type="number" class="form-control" v-model="producto.cantidadunidadmedida"
                      ref="cantidadunidadmedida" :style="showAdvertise && producto.cantidadunidadmedida == 0
                        ? 'border-color: #e23e3d;'
                        : ''
                        " />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
              Cerrar
            </button>
            <button type="button" class="btn btn-success" @click="guardarCambios()">
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal Códigos de Barra -->
  <div class="modal fade" id="modalCodigosBarra" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Códigos de Barra de Productos</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <div class="row" id="lista-codigos-barra">
            <div class="col-4 mb-3 text-center" v-for="item in listaRegistros" :key="item.productoid">
              <div>
                <svg :id="'barcode-' + item.productoid"></svg>
                <div class="mt-1">{{ item.descripcionproducto }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          <button class="btn btn-primary" @click="imprimirCodigosBarra">Imprimir</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { mapActions } from "vuex";
import global from "../../../global";
import Paginate from "../../../components/varios/Paginate.vue";
import Loading from "../../../components/varios/Loading.vue";
import VueLoading from "../../../components/varios/VueLoading.vue";
//Librarys
import dayjs from "dayjs";
import * as XLSX from "xlsx/xlsx.mjs";
import JsBarcode from "jsbarcode";

export default {
  components: {
    Paginate,
    Loading,
    VueLoading,
  },
  data() {
    return {
      spinner: "bar-fade-scale",
      isLoading: false,
      fullPage: true,
      date: new Date(),
      usuario: {},
      cboSubFamilia: [],
      cboUnidadMedida: [],
      showAdvertise: false,
      indiceModificando: -1,
      producto: {},
      productoBase: {
        productoid: 0,
        descripcionproducto: "",
        marca: "",
        codigo: "",
        precioventa: 0,
        costo: 0,
        subfamiliaid: 0,
        unidadmedidaid: 0,
        stockminimo: 0,
        cantidadunidadmedida: 0,
      },
      listaRegistros: [],
      buscador: {
        page_index: 1,
        page_size: 10,
        idSubFamilia: "",
        descripcionProducto: "",
      },
      totalPaginas: 0,
      totalRegistros: 0,
      initialPage: 1,
      currentDate: dayjs(this.date).format("YYYY-MM-DD H:mm"),
      movimiento: {
        movimientoid: 0,
        fechamovimiento: "",
        nrodocumento: "",
        tipodocumento: "",
        razon: "",
        tipomovimiento: "",
        nronotaingreso: "",
        nronotasalida: "",
        user: "",
        movimientosdetalle: [
          {
            movimientoid: 0,
            insumoid: 0,
            cantidad: 0,
            precio: 0,
            importe: 0,
            almacenid: 0,
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions({
      ListarRegistros: "_producto/ListarRegistrosPrecios",
      AgregarRegistro: "_producto/AgregarRegistro",
      ModificarRegistro: "_producto/ModificarRegistro",
      EliminarRegistro: "_producto/EliminarRegistro",
      ObtenerRegistro: "_producto/ObtenerRegistro",
      SubFamiliaDesplegable: "_producto/SubFamiliaDesplegable",
      Unidad_Medida_Desplegable: "_unidadmedida/Unidad_Medida_Desplegable",
      AnularProducto: "_producto/Anular",
      AgregarPrecioProducto: "_preciospresentacion/AgregarRegistro",
      AgregarMovimiento: "_movimientos/AgregarMovimiento",
    }),
    verPreciosPorPresentacion: function (item) {
      this.$router.push({
        path: "preciosporpresentacion",
        query: {
          productoid: item.productoid,
          descripcionproducto: item.descripcionproducto,
        },
      });
    },
    download_excel: async function () {
      let export_excel = [];
      let listaProductos = await this.cargarRegistrosExcel();
      let currentDate = dayjs(this.date).format("YYYY-MM-DD");

      export_excel = listaProductos.map((el) => ({
        productoid: el.productoid,
        descripcionproducto: el.descripcionproducto,
        precio: parseFloat(el.costo),
        unidadmedida: el.descripcionunidadmedida,
        cantidad: 0,
        cantidadpresentacion: el.cantidadunidadmedida,
      }));
      let data = XLSX.utils.json_to_sheet(export_excel, {
        header: [
          "productoid",
          "descripcionproducto",
          "precio",
          "unidadmedida",
          "cantidadpresentacion",
          "cantidad",
        ],
      });
      data["A1"].v = "PRODUCTOID";
      data["B1"].v = "DESCRIPCIONPRODUCTO";
      data["C1"].v = "PRECIO";
      data["D1"].v = "UND";
      data["E1"].v = "CANTIDADPRESENTACION";
      data["F1"].v = "CANTIDAD";

      const workbook = XLSX.utils.book_new();
      const filename = "reporte-productos" + currentDate;
      XLSX.utils.book_append_sheet(workbook, data, currentDate);
      XLSX.writeFile(workbook, `${filename}.xlsx`);
    },  
 
    comboSubFamilia: async function () {
      var res = await this.SubFamiliaDesplegable();
      this.cboSubFamilia = res;
    },
    comboUnidadMedida: async function () {
      var res = await this.Unidad_Medida_Desplegable();
      this.cboUnidadMedida = res;
    },
    cargarAgregar: function () {
      this.producto = { ...this.productoBase };
      this.indiceModificando = -1;
    },
    cargarVer: function (item, index) {
      this.producto.productoid = item.productoid;
      this.producto.descripcionproducto = item.descripcionproducto;
      this.producto.marca = item.marca;
      this.producto.precioventa = item.precioventa;
      this.producto.costo = item.costo;
      this.producto.subfamiliaid = item.subfamiliaid;
      this.producto.unidadmedidaid = item.unidadmedidaid;
      this.producto.codigo = item.codigo;
      this.producto.stockminimo = item.stockminimo;
      this.producto.cantidadunidadmedida = item.cantidadunidadmedida;

      this.indiceModificando = index;
    },
    cargarAnular: async function (item, index) {
      let producto = {
        productoid: item.productoid,
        user: this.usuario.usuario,
      };
      global._swal_pregunta(
        "¿Está seguro que desea eliminar el registro?",
        "Advertencia",
        async () => {
          var res = await this.AnularProducto(producto);
          if (res?.exito) {
            this.cargarRegistros();
            global._mensaje_exito("Se ha eliminado");
          }
        }
      );
    },
    guardarCambios: async function () {
      var res = null;
      if (this.indiceModificando == -1) {
        let valor = this.validarFormulario();
        if (!valor) {
          res = await this.AgregarRegistro(this.producto);
          if (res?.exito) {
            await this.agregarPrecioProducto(res.datos.id);
          }
        }
      } else {
        res = await this.ModificarRegistro(this.producto);
      }
      if (res?.exito) {
        this.cargarRegistros();
        this.cerrarModal();
        global._mensaje_exito("Los cambios se han guardado correctamente");
      } else {
        global._mensaje_error(res.mensaje);
      }
    },
    guardarProductosImportacion: async function () {
      var res = null;
      if (this.indiceModificando == -1) {
        let valor = this.validarFormulario();
        if (!valor) {
          this.isLoading = true;

          res = await this.AgregarRegistro(this.producto);

          if (res?.exito) {
            //await this.agregarPrecioProductoImportacion(res.datos.id, precio);
            this.cargarRegistros();
          } else {
            ElNotification({
              title: "Error",
              duration: 1500,
              message: res.mensaje,
              type: "error",
            });
          }

          this.isLoading = false;
        }
      }
      return res;
    },
    agregarPrecioProducto: async function (productoid) {
      let preciospresentacion = {
        presentacionesid: 0,
        productoid: productoid,
        decripcionpresentacion: "UND",
        unidadmedidaid: "1",
        cantidadpresentacion: 1,
        precio: this.producto.precioventa,
      };

      await this.AgregarPrecioProducto(preciospresentacion);
    },
    agregarPrecioProductoImportacion: async function (productoid, decripcionpresentacion, precio) {
      var res = null;

      let preciospresentacion = {
        presentacionesid: 0,
        productoid: productoid,
        decripcionpresentacion: decripcionpresentacion,
        unidadmedidaid: "1",
        cantidadpresentacion: 1,
        precio: precio,
      };

      res = await this.AgregarPrecioProducto(preciospresentacion);

      return res;
    },
    validarFormulario() {
      let valida = false;

      if (this.producto.descripcionproducto == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.descripcionproducto.focus();
        });
      } else if (this.producto.marca == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.marca.focus();
        });
      } else if (this.producto.precioventa == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.precioventa.focus();
        });
      } else if (this.producto.costo == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.costo.focus();
        });
      } else if (this.producto.subfamiliaid == 0) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.subfamiliaid.focus();
        });
      } else if (this.producto.unidadmedidaid == 0) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.unidadmedidaid.focus();
        });
      } else if (this.producto.stockminimo == 0) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.stockminimo.focus();
        });
      } else if (this.producto.cantidadunidadmedida == 0) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.cantidadunidadmedida.focus();
        });
      }

      return valida;
    },
    cargarRegistros: async function (pagina = 1) {
      this.isLoading = true;
      let buscador = {
        page_index: pagina,
        page_size: this.buscador.page_size,
        idSubFamilia: this.buscador.idSubFamilia,
        descripcionProducto: this.buscador.descripcionProducto,
      };
      var res = await this.ListarRegistros(buscador);
      this.listaRegistros = res.datos;
      this.initialPage = res.paginaActual;
      this.buscador.page_index = res.paginaActual;
      this.totalPaginas = res.totalPaginas;
      this.totalRegistros = res.totalRegistros;
      this.isLoading = false;
    },
    cargarRegistrosExcel: async function () {
      this.isLoading = true;
      let buscador = {
        page_index: 1,
        page_size: this.totalRegistros,
        idSubFamilia: this.buscador.idSubFamilia,
        descripcionProducto: this.buscador.descripcionProducto,
      };
      var res = await this.ListarRegistros(buscador);
      let listaProductos = res.datos;
      this.isLoading = false;

      return listaProductos;
    },
    cambiarPagina: function (paginaDestino) {
      this.cargarRegistros(paginaDestino);
    },
    cerrarModal: function () {
      var modal = bootstrap.Modal.getInstance(
        document.getElementById("staticBackdropMantenedorDecano")
      );
      modal.hide();
    },
    abrirVistaCodigosBarra() {
      // Abre el modal y genera los códigos
      const modal = new bootstrap.Modal(document.getElementById("modalCodigosBarra"));
      modal.show();

      this.$nextTick(() => {
        this.generarCodigosBarra();
      });
    },

    generarCodigosBarra() {
      this.listaRegistros.forEach((item) => {
        console.log(item);
        const elementId = `barcode-${item.productoid}`;
        const svg = document.getElementById(elementId);

        if (svg) {
          JsBarcode(svg, item.codigo || "SIN-CODIGO", {
            format: "CODE128",
            lineColor: "#000",
            width: 2,
            height: 50,
            displayValue: true,
          });
        }
      });
    },

    imprimirCodigosBarra() {
      const contenido = document.getElementById("lista-codigos-barra").innerHTML;
      const ventana = window.open("", "_blank");
      ventana.document.write(`
      <html>
        <head>
          <title>Impresión de Códigos de Barra</title>
          <style>
            @media print {
              .barcode-item { page-break-inside: avoid; }
            }
            body { font-family: Arial, sans-serif; text-align: center; }
            svg { margin: 10px auto; display: block; }
          </style>
        </head>
        <body>${contenido}</body>
      </html>
    `);
      ventana.document.close();
      ventana.print();
    },
  },
  mounted() {
    if (localStorage.getItem("login")) {
      this.usuario = JSON.parse(localStorage.getItem("login"));
    }  
    this.comboSubFamilia();
    this.comboUnidadMedida();
    this.cargarRegistros();
  },
};
</script>
