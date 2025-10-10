<template>
  <div class="row">
    <div class="col-sm-6 col-md-6">
      <div class="form-group">
        <label class="form-label"
          >Forma de Pago <span class="text-red">*</span></label
        >
        <el-select
          placeholder="Seleccionar Forma de Pago"
          v-model="formapagoid"
          size="large"
          ref="formapago"
          @change="ComboTipoTarjetaFormaPago"
          style="width: 100%"
        >
          <el-option
            v-for="item in tipoformapago"
            :key="item.id"
            :label="item.nombre"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="col-sm-6 col-md-6">
      <div class="form-group">
        <label class="form-label"
          >Tipo Tarjeta <span class="text-red">*</span></label
        >
        <el-select
          placeholder="Seleccionar Tipo de Tarjeta"
          v-model="tarjetacreditoid"
          size="large"
          style="width: 100%"
          ref="tarjetacredito"
          @change="cambiarMonedaFocus"
        >
          <el-option
            v-for="item in tarjetacreditoformapago"
            :key="item.id"
            :label="item.nombre"
            :value="item.nombre"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="col-sm-6 col-md-6">
      <div class="form-group">
        <label class="form-label">Moneda <span class="text-red">*</span></label>
        <el-select
          placeholder="Seleccionar la Moneda"
          v-model="monedaformapago"
          size="large"
          style="width: 100%"
          ref="refmonedaformapago"
          @change="cambiarImporteFocus"
        >
          <el-option
            v-for="item in monedas"
            :key="item.id"
            :label="item.nombre"
            :value="item.nombre"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="col-sm-6 col-md-6">
      <div class="form-group">
        <label class="form-label"
          >Importe <span class="text-red">*</span></label
        >
        <input
          type="number"
          class="form-control"
          min="0"
          ref="importeformapago"
          v-model="importeformapago"
          :disabled="disabledImporteFormaPago"
          @keypress.enter="agregarFormaPago"
        />
      </div>
    </div>
    <div class="col-md-12">
      <div class="table-responsive">
        <table class="table text-nowrap text-md-nowrap mb-0">
          <thead>
            <tr>
              <th>Tipo Pago</th>
              <th>Moneda</th>
              <th>Importe</th>
              <th>Tarjeta</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in formapagodocventa"
              :key="index"
              v-if="formapagodocventa.length != 0"
            >
              <td>{{ item.formapago }}</td>
              <td>{{ item.moneda }}</td>
              <td>{{ item.importe }}</td>
              <td>{{ item.tarjeta }}</td>
              <td class="text-center">
                <!-- <i
                          class="fa fa-pencil mx-1 text-yellow"
                          role="button"
                        ></i> -->
                <i
                  class="fa fa-trash mx-1 text-danger"
                  role="button"
                  @click="quitarFormaPago(index)"
                ></i>
              </td>
            </tr>
            <tr v-else>
              <td colspan="4" class="text-center">Detalle Vacío</td>
            </tr>
          </tbody>
        </table>
      </div>
      <ul class="list-group border-0 br-7 mt-0">
        <li class="list-group-item border-0">
          Total
          <span class="h6 fw-bold mb-0 float-end">S/. {{ total }} </span>
        </li>
        <li class="list-group-item border-0">
          Abonado
          <span class="h6 fw-bold mb-0 float-end">S/. {{ totalAbonado }}</span>
        </li>
        <li class="list-group-item border-0">
          Saldo
          <span class="h4 fw-bold mb-0 float-end">S/. {{ totalSaldo }}</span>
        </li>
      </ul>
    </div>
  </div>
  <div class="row">
    <input
      type="button"
      class="btn btn-primary"
      value="Realizar Pago"
      @click="procesarPagoDocVenta"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import global from "../../global.js";
//Librayr
import dayjs from "dayjs";
export default {
  name: "EfectuarPago",
  props: {
    total: {
      type: Number,
      default: 0,
    },
    docventaid: {
      type: String,
      default: "",
    },
    numdoc: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      monedas: [],
      date: new Date(),
      currentDate: dayjs(this.date).format("YYYY-MM-DD H:mm"),
      tipoformapago: [],
      disabledImporteFormaPago: false,
      importeformapago: 0,
      monedaformapago: null,
      formapagoid: null,
      tarjetacreditoid: null,
      formapagodocventa: [],
      tarjetacreditoformapago: [],
      formapago: {},
      formapagoBase: {
        docventaid: 0,
        numdoc: "",
        fechapago: "",
        tipocambio: 0,
        user: "jconcha",
        formapagodetalle: [
          {
            docventaid: 0,
            formapagoid: 0,
            importe: 0,
            moneda: "",
            tarjeta: "",
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions({
      ListarMoneda: "_moneda/Listar",
      DesplegarFormaPago: "_formapago/DesplegarFormaPago",
      DesplegarTarjetaCreditoFormaPago:
        "_tarjetacreditoformapago/DesplegarTarjetaCreditoFormaPago",
      AgregarFormaPagoDocVenta: "_formapagodocventa/AgregarFormaPagoDocVenta",
    }),
    loadFormaPagoDocVenta: function () {
      this.formapago = { ...this.formapagoBase };
    },
    ComboMoneda: async function () {
      let res = await this.ListarMoneda();
      this.monedas = res;      
    },
    agregarFormaPago() {
      if (
        this.importeformapago > 0 &&
        this.importeformapago <= this.totalSaldo
      ) {
        let formapago = {
          docventaid: 0,
          formapagoid: this.formapagoid,
          formapago: this.descripcionformapago,
          moneda: this.monedaformapago,
          importe: this.importeformapago,
          tarjeta:
            this.tarjetacreditoid == null ? "NINGUNA" : this.tarjetacreditoid,
        };

        this.formapagodocventa.push(formapago);

        this.formapagoid = null;
        this.monedaformapago = null;
        this.importeformapago = 0;
        this.tarjetacreditoid = null;
        this.descripcionformapago = "";
      } else if (this.importeformapago == 0) {
        global._mensaje_advertencia("Debe agregar el valor del importe");
      } else if (this.importeformapago > this.totalSaldo) {
        global._mensaje_advertencia("El importe es mayor al saldo a pagar");
      }
    },
    quitarFormaPago(index) {
      global._swal_pregunta(
        "¿Está seguro que desea quitar el registro?",
        "Advertencia",
        async () => {
          this.formapagodocventa.splice(index, 1);
        }
      );
    },
    ComboTipoTarjetaFormaPago: async function () {
      let formapago = {
        formapagoid: this.formapagoid,
      };
      let res = await this.DesplegarTarjetaCreditoFormaPago(formapago);
      this.tarjetacreditoformapago = res;

      this.tipoformapago.forEach((element) => {
        if (element.id == this.formapagoid) {
          this.descripcionformapago = element.nombre;
        }
      });
      this.$refs.tarjetacredito.focus();
    },
    cambiarMonedaFocus() {      
      this.$refs.refmonedaformapago.focus();
    },
    cambiarImporteFocus() {     
      this.$refs.importeformapago.focus();
    },
    ComboFormaPago: async function () {
      let res = await this.DesplegarFormaPago();
      this.tipoformapago = res;
    },
    ComboTarjetaCreditoFormaPago: async function () {
      let res = await this.DesplegarTarjetaCreditoFormaPago();
      this.tarjetacreditoformapago = res;
    },
    procesarPagoDocVenta: async function () {
      if (this.formapagodocventa.length > 0) {
        global._swal_pregunta(
          "¿Está seguro que desea procesar el pago?",
          "Advertencia",
          async () => {
            this.formapago.docventaid = this.docventaid;
            this.formapago.numdoc = this.numdoc;
            this.formapago.fechapago = this.currentDate;
            this.formapago.tipocambio = 0;
            this.formapago.user = "jconcha";
            this.formapago.formapagodetalle = this.formapagodocventa;

            let res = await this.AgregarFormaPagoDocVenta(this.formapago);
            if (res?.exito) {
              global._mensaje_exito(
                "Los cambios se han guardado correctamente"
              );
              this.loadFormaPagoDocVenta();
              this.formapagodocventa = [];
              this.$emit("closeDialogEfectuarPago");
            }           
          }
        );
      } else {
        global._mensaje_advertencia("Detalle vacio, gracias.");
      }
    },
  },
  computed: {
    totalAbonado: function () {
      let sum = 0;
      this.formapagodocventa.forEach(
        (item) => (sum += parseFloat(item.importe))
      );
      return sum;
    },
    totalSaldo: function () {
      let saldo = 0;
      let total = this.total;
      let abonado = this.totalAbonado;
      if (abonado > total && total > 0) {
        global._mensaje_advertencia(
          "El monto ingresado es mayor al total de la venta"
        );
        this.disabledImporteFormaPago = true;
        saldo = total - abonado;
      } else {
        this.disabledImporteFormaPago = false;
        saldo = total - abonado;
      }

      return saldo;
    },
  },
  mounted() {
    this.loadFormaPagoDocVenta();
    this.ComboMoneda();
    this.ComboFormaPago();
  },
};
</script>

<style></style>
