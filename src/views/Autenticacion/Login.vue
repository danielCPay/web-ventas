<template>
  <form class="login100-form validate-form" @submit.prevent="loguear">
    <h2 class="text-muted">STORE MANAGEMENT</h2>
    <!-- <div class="text-center">
            <img src="https://www.cqfll.pe/assets/web/images/logo.png" />
        </div> -->

    <span class="login100-form-title pb-5"> Iniciar Sesión </span>
    <p class="text-muted">Para acceder, ingrese sus credenciales</p>
    <div class="wrap-input100 validate-input input-group" id="Password-toggle">
      <a class="input-group-text bg-white text-muted">
        <i class="fe fe-shopping-cart header-link-icon" aria-hidden="true"></i>
      </a>
      <el-select placeholder="Seleccionar una tienda" v-model="store" size="large" @change="onStoreChange">
        <el-option v-for="item in stores" :key="item.id" :label="item.nombre" :value="item.id" />
      </el-select>
    </div>
    <div class="wrap-input100 validate-input input-group">
      <a class="input-group-text bg-white text-muted">
        <i class="icon icon-user" aria-hidden="true"></i>
      </a>
      <input class="input100 border-start-0 form-control ms-0" type="text" placeholder="Nombre de usuario"
        v-model="usuario" required />
    </div>
    <div class="wrap-input100 validate-input input-group" id="Password-toggle">
      <a class="input-group-text bg-white text-muted">
        <i class="icon icon-lock-open" aria-hidden="true"></i>
      </a>
      <input class="input100 border-start-0 form-control ms-0" type="password" placeholder="Contraseña"
        v-model="contrasena" required />
    </div>    
    <!-- <el-select
      placeholder="Seleccionar Perfil"
      v-model="perfil"
      size="large"
      style="width: 100%"
    >
      <el-option
        v-for="item in cboperfiles"
        :key="item.id"
        :label="item.nombre"
        :value="item.id"
      ></el-option>
    </el-select> -->
    <div class="text-end pt-4">
      <p class="mb-0">
        <router-link to="/recuperar-contrasena" class="text-primary ms-1">
          Olvidé mi contraseña
        </router-link>
      </p>
    </div>
    <div class="container-login100-form-btn">
      <button type="submit" class="login100-form-btn btn-primary">Login</button>
    </div>
    <div class="container-login100-form-btn">
      <button type="button" class="login100-form-btn btn-danger" @click="goGoogle">
        <i class="fa fa-google mx-2"></i>
        Iniciar con Google
      </button>
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";
import global from "../../global";
export default {
  data() {
    return {
      cboperfiles: [],
      usuario: "",
      contrasena: "",
      perfil: "",
      store: null,
      stores: [
        { id: 1, nombre: "Tienda Central" },
        { id: 2, nombre: "Segunda Tienda " }
      ],
    };
  },
  methods: {
    ...mapActions({
      login: "_login/login",
      Perfiles_Usuario: "_login/Perfiles_Usuario",
    }),
    comboPerfiles: async function () {
      let res = await this.Perfiles_Usuario();
      this.cboperfiles = res;
    },
    onStoreChange(val) {
      localStorage.setItem("store_login", val);
      console.log(val);
    },
    loguear: async function () {
      //   if (this.usuario == "admin@admin.com" && this.contrasena == "123456") {
      //     console.log(this.usuario, this.contrasena);
      //     this.$router.push({
      //       name: "panelInicio",
      //     });
      //     global._mensaje_exito("Bienvenido admin.");
      //     //this.$router.push("/");
      //   } else {
      //     global._mensaje_advertencia(
      //       "Datos incorrectos, intente de nuevo por favor, gracias."
      //     );
      //   }

      // let res = await this.login({
      //   usuario: this.usuario,
      //   contrasena: this.contrasena,
      // });
      // if (res != null) {
      //   console.log(res);
      //   this.$router.push({
      //     name: "panelInicio",
      //   });
      // } else {
      //   global._mensaje_advertencia(
      //     "Datos incorrectos, intente de nuevo por favor, gracias."
      //   );
      //    this.$router.go();
      // }
      if (this.store !== null) {
        if (
          await this.login({
            usuario: this.usuario,
            contrasena: this.contrasena,
          })
        ) {
          this.$router.push({
            name: "panelInicio",
          });
          global._mensaje_exito("Bienvenido " + this.usuario);
        } else {
          global._mensaje_advertencia(
            "Datos incorrectos, intente de nuevo por favor, gracias."
          );
          //this.$router.go();
        }
      } else {
        global._mensaje_advertencia(
          "Debe seleccionar una tienda, gracias."
        );
      }
    },
    goGoogle: async function () { },
  },
  mounted() {
    //this.comboPerfiles();
  },
};
</script>
