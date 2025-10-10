<template>
  <vue-loading :fullPage="fullPage" :isLoading="isLoading" :spinner="spinner" />
  <div class="card-header">
    <h3 class="card-title">MANTENEDOR DE PRODUCTOS</h3>
    <div class="card-options">
      <input type="file" id="files" style="display: none" />
      <a href="javascript:void(0)" class="btn btn-success btn-sm" @click="openDocumentFile"><i
          class="fe fe-upload me-2"></i>Importar Productos</a>
      <a href="javascript:void(0)" class="btn btn-secondary btn-sm ms-2" @click="download_excel"><i
          class="fe fe-download me-2"></i>Descargar Productos</a>
    </div>
  </div>
  <div class="card-body pb-2">
    <h3 class="text-left">Lista de Productos</h3>

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
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdropMantenedorDecano"
          style="margin: 2px" @click="cargarAgregar()">
          <i class="fe fe-file me-2"></i>
          Agregar
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
            <th scope="col" class="text-center">Opciones</th>
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
            <td class="text-center">
              <i title="Editar" class="fa fa-pencil mx-1 text-yellow" role="button" data-bs-toggle="modal"
                data-bs-target="#staticBackdropMantenedorDecano" @click="cargarVer(item, index)"></i>
              <i title="Agregar Precios" class="fa fa-money mx-1 text-blue" role="button"
                @click="verPreciosPorPresentacion(item)"></i>
              <i title="Eliminar" class="fa fa-trash mx-1 text-danger" role="button"
                @click="cargarAnular(item, index)"></i>
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
      ListarRegistros: "_producto/ListarRegistros",
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
    openDocumentFile() {
      const inputFile = document.getElementById("files");
      inputFile.click();
    },
    // async fileUpload(e) {
    //   var files = e.target.files,
    //     f = files[0];
    //   var reader = new FileReader();
    //   reader.onload = async function (e) {
    //     var data = new Uint8Array(e.target.result);
    //     var workbook = XLSX.read(data, { type: "array" });
    //     let sheetName = workbook.SheetNames[0];
    //     let worksheet = workbook.Sheets[sheetName];
    //     let json = XLSX.utils.sheet_to_json(worksheet);
    //     json.forEach((item) => {
    //       this.producto.productoid = 0;
    //       this.producto.codigo = item.CODIGO;
    //       this.producto.descripcionproducto = item.DESCRIPCION;
    //       this.producto.precioventa = item.PRECIO;
    //       this.producto.subfamiliaid = item.SUBFAMILIA;
    //       this.producto.unidadmedidaid = item.UND;
    //       this.producto.costo = item.COSTO;
    //       this.producto.marca = item.MARCA;
    //       this.producto.stockminimo = item.STOCKMINIMO;
    //       this.producto.cantidadunidadmedida = item.CANTIDADPORUND;
    //       this.guardarCambiosImportacion(item.PRECIO);
    //     });
    //     global._mensaje_exito("Importando los productos....");
    //   }.bind(this);
    //   reader.readAsArrayBuffer(f);
    // },
    async fileUpload(e) {
      var files = e.target.files,
        f = files[0];
      var reader = new FileReader();

      reader.onload = async function (e) {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, { type: "array" });
        let sheetName = workbook.SheetNames[0];
        let worksheet = workbook.Sheets[sheetName];
        let json = XLSX.utils.sheet_to_json(worksheet);

        // Agrupamos los productos por descripción, marca, und, subfamilia
        let productosMap = {};
        let contadorCodigo = 1;

        for (const item of json) {
          const key = `${item.DESCRIPCION}|${item.MARCA}|${item.UND}|${item.SUBFAMILIA}`;
          let productoId;
          let presentacionId;

          if (!productosMap[key]) {
            // Generar código automáticamente
            const codigoGenerado = `P-${contadorCodigo.toString().padStart(4, '0')}`;
            contadorCodigo++;

            // Crear producto base
            this.producto.productoid = 0;
            this.producto.codigo = codigoGenerado;
            this.producto.descripcionproducto = item.DESCRIPCION;
            this.producto.marca = item.MARCA;
            this.producto.unidadmedidaid = item.UND;
            this.producto.subfamiliaid = item.SUBFAMILIA;
            this.producto.stockminimo = item.STOCKMINIMO || 0;

            const res = await this.guardarProductosImportacion(); // ← sigue usando tu lógica

            if (res?.exito) {
              productoId = res.datos.id;
              productosMap[key] = {
                id: productoId,
                codigo: codigoGenerado,
              };
            } else {
              console.warn("Error al guardar producto base:", res?.mensaje);
              continue;
            }
          } else {
            productoId = productosMap[key].id;
          }

          // Crear presentación     
          const resPres = await this.agregarPrecioProductoImportacion(productoId, item.PRESENTACION, item.PRECIO);
          console.log(resPres);
          if (resPres?.exito) {
            presentacionId = resPres.datos.id;
            await this.procesarMovimientosAlmacen([{
              movimientoid: 0,
              productoid: productoId,
              cantidad: item.STOCKINICIAL || 0,
              presentacion: 'UNIDAD',
              cantidadpresentacion: item.CANTIDADPORUND,
              precio: parseFloat(item.PRECIO),
              importe: parseFloat(item.PRECIO) * (item.STOCKINICIAL || 0),
              presentacionesid: presentacionId,
              almacenid: 1, // ← si solo tienes uno, lo puedes dejar fijo
            }]);

          } else {
            console.warn("Error al guardar presentación:", resPres?.mensaje);
          }
        }

        global._mensaje_exito("Importación completa: productos, presentaciones y stock inicial.");
      }.bind(this);

      reader.readAsArrayBuffer(f);
    },
    procesarMovimientosAlmacen: async function (detalles) {
      this.movimiento.fechamovimiento = this.currentDate;
      this.movimiento.nrodocumento = "";
      this.movimiento.tipodocumento = "";
      this.movimiento.razon = "Importación desde Excel";
      this.movimiento.tipomovimiento = "ENTRADA";
      this.movimiento.nronotaingreso = "";
      this.movimiento.nronotasalida = "";
      this.movimiento.user = this.usuario.usuario;

      this.movimiento.movimientosdetalle = detalles;

      this.isLoading = true;
      this.textloading = "Procesando Movimiento Almacén";
      let res = await this.AgregarMovimiento(this.movimiento);

      if (res?.exito) {
        ElNotification({
          title: "Success",
          duration: 1500,
          message: "Movimiento Almacén se generó correctamente",
          type: "success",
        });
      } else {
        console.warn("Error al registrar movimientos:", res?.mensaje);
      }

      this.isLoading = false;
      return res;
    },

    /*procesarMovimientosAlmacen: async function (detalles) {
      this.movimiento.fechamovimiento = this.currentDate;
      this.movimiento.nrodocumento = "";
      this.movimiento.tipodocumento = "";
      this.movimiento.razon = "Importación desde Excel";
      this.movimiento.tipomovimiento = "ENTRADA";
      this.movimiento.nronotaingreso = "";
      this.movimiento.nronotasalida = "";
      this.movimiento.user = this.usuario.usuario;

      let detalleProducto = [];
      this.listaProductos.forEach((item) => {
        let productos = {
          movimientoid: 0,
          productoid: item.productoid,
          cantidad: item.cantidad,
          presentacion: item.decripcionpresentacion,
          cantidadpresentacion: item.cantidadpresentacion,
          precio: parseFloat(item.precioventa),
          importe: item.cantidad * parseFloat(item.precioventa),
          presentacionesid: item.presentacionesid,
          almacenid: 1,
        };

        detalleProducto.push(productos);
      });

      this.movimiento.movimientosdetalle = detalleProducto;

      this.isLoading = true;
      this.textloading = "Procesando Movimiento Almacén";
      let res = await this.AgregarMovimiento(this.movimiento);

      if (res?.exito) {
        this.isLoading = false;
        ElNotification({
          title: "Success",
          duration: 1500,
          message: "Movimiento Almacén se generó correctamente",
          type: "success",
        });
      }
    },*/

    setupFileInput() {
      document
        .getElementById("files")
        .addEventListener("change", this.fileUpload, false);
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
  },
  mounted() {
    if (localStorage.getItem("login")) {
      this.usuario = JSON.parse(localStorage.getItem("login"));
    }
    this.setupFileInput();
    this.comboSubFamilia();
    this.comboUnidadMedida();
    this.cargarRegistros();
  },
};
</script>
