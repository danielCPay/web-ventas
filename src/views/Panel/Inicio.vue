<template>
  <!-- <div class="text-center mt-3 pt-4">
        <b><h2>DASHBOARD</h2></b>
        <img src="https://lobbyfix.com/wp-content/uploads/2021/09/facility-management-1024x799.jpg" class="img-fluid" alt="">
    </div> -->
  <div class="main-container container-fluid" style="background-color: #eaedf7">
    <div class="store-banner mb-4">
      <div class="store-icon">
        <i class="el-icon-shopping-cart-full"></i>
      </div>
      <div class="store-info">
        <h2 class="store-title">Estás en</h2>
        <h1 class="store-name">{{ nombreTienda }}</h1>
      </div>
    </div>


    <!-- <div class="col-sm-12 col-md-12 col-lg-12 col-xl-9">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Sales Analytics</h3>
          </div>
          <div class="card-body">
            <div class="d-flex mx-auto text-center justify-content-center mb-4">
              <div class="d-flex text-center justify-content-center me-3">
                <span class="dot-label bg-primary my-auto"></span>Total Sales
              </div>
              <div class="d-flex text-center justify-content-center">
                <span class="dot-label bg-secondary my-auto"></span>Total Orders
              </div>
            </div>
            <div class="chartjs-wrapper-demo">
              <canvas id="transactions" class="chart-dropshadow"></canvas>
            </div>
          </div>
        </div>
      </div> -->
    <!-- COL END -->
    <!-- <div class="col-sm-12 col-md-12 col-lg-12 col-xl-3">
        <div class="card overflow-hidden">
          <div class="card-body pb-0 bg-recentorder">
            <h3 class="card-title text-white">Recent Orders</h3>
            <div class="chartjs-wrapper-demo">
              <canvas id="recentorders" class="chart-dropshadow"></canvas>
            </div>
          </div>
          <div id="flotback-chart" class="flot-background"></div>
          <div class="card-body">
            <div class="d-flex mb-4 mt-3">
              <div
                class="avatar avatar-md bg-secondary-transparent text-secondary bradius me-3"
              >
                <i class="fe fe-check"></i>
              </div>
              <div class="">
                <h6 class="mb-1 fw-semibold">Delivered Orders</h6>
                <p class="fw-normal fs-12">
                  <span class="text-success">3.5%</span> increased
                </p>
              </div>
              <div class="ms-auto my-auto">
                <p class="fw-bold fs-20">1,768</p>
              </div>
            </div>
            <div class="d-flex">
              <div
                class="avatar avatar-md bg-pink-transparent text-pink bradius me-3"
              >
                <i class="fe fe-x"></i>
              </div>
              <div class="">
                <h6 class="mb-1 fw-semibold">Cancelled Orders</h6>
                <p class="fw-normal fs-12">
                  <span class="text-success">1.2%</span> increased
                </p>
              </div>
              <div class="ms-auto my-auto">
                <p class="fw-bold fs-20 mb-0">3,675</p>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    <!-- COL END -->


  </div>
</template>
<script>
export default {
  data() {
    return {
      nombreTienda: "",
    };
  },
  mounted() {
    const tienda = localStorage.getItem("store_login");
    if (tienda === "1") {
      this.nombreTienda = "🛒 Tienda Central";
    } else if (tienda === "2") {
      this.nombreTienda = "🏬 Segunda Tienda";
    } else {
      this.nombreTienda = "❓ Desconocida";
    }
  },
};
</script>
<style scoped>
.store-banner {
  display: flex;
  align-items: center;
  padding: 20px 30px;
  border-radius: 15px;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  animation: fadeInDown 0.6s ease;
}

.store-icon {
  font-size: 60px;
  margin-right: 25px;
  animation: popIn 0.4s ease;
}

.store-info .store-title {
  font-size: 18px;
  margin: 0;
  opacity: 0.8;
}

.store-info .store-name {
  font-size: 32px;
  margin: 0;
  font-weight: bold;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes popIn {
  0% {
    transform: scale(0.7);
    opacity: 0;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>