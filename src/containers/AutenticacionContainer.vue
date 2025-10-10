<template>
	<!-- BACKGROUND-IMAGE -->
	<div class="login-img">
		<!-- GLOABAL LOADER -->
		<div id="global-loader">
			<img
				src="/assets/images/loader.svg"
				class="loader-img"
				alt="Loader"
			/>
		</div>
		<!-- /GLOABAL LOADER -->

		<!-- PAGE -->
		<div class="page">
			<div class="">
				<!-- CONTAINER OPEN -->
				<div class="col col-login mx-auto mt-7">
					<div class="text-center">
						<!--
						<img
							src="/assets/images/brand/logo-white.png"
							class="header-brand-img"
							alt=""
						/>
						-->
					</div>
				</div>

				<div class="container-login100">
					<div class="wrap-login100 p-6">
						<router-view></router-view>
					</div>
				</div>
				<!-- CONTAINER CLOSED -->
			</div>
		</div>
		<!-- End PAGE -->
	</div>
</template>

<script>
export default {
	name: "AutenticacionContainer",
	components: {},
	mounted() {
		load(); // custom.js
	},
};
</script>
