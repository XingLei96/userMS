<template>
	<div class="login-container">
		<el-form
			ref="loginForm"
			:model="loginForm"
			:rules="loginRules"
			class="login-form"
			auto-complete="on"
			label-position="left"
		>
			<div class="title-container">
				<!-- <h3 class="title">Login Form</h3> -->
				<img class="logo" src="../../assets//logo/homeLogo.png" alt="">
			</div>

			<el-form-item prop="email">

				<span class="svg-container">
					<svg-icon icon-class="user" />
				</span>
				<el-input
					ref="email"
					v-model="loginForm.email"
					placeholder="Username"
					name="email"
					type="text"
					tabindex="1"
					auto-complete="on"
				/>
			</el-form-item>

			<el-form-item prop="password">
				<span class="svg-container">
					<svg-icon icon-class="password" />
				</span>
				<el-input
					:key="passwordType"
					ref="password"
					v-model="loginForm.password"
					:type="passwordType"
					placeholder="Password"
					name="password"
					tabindex="2"
					auto-complete="on"
					@keyup.enter.native="handleLogin"
				/>
				<span class="show-pwd" @click="showPwd">
					<svg-icon
						:icon-class="
							passwordType === 'password' ? 'eye' : 'eye-open'
						"
					/>
				</span>
			</el-form-item>

			<el-button
				:loading="loading"
				type="primary"
				style="width: 100%; margin-bottom: 30px"
				@click.prevent="handleLogin"
				>{{ $t("loginpage.login") }}</el-button
			>

			<!-- <div class="tips">
				<span style="margin-right: 20px">email: admin</span>
				<span> password: any</span>
			</div> -->
		</el-form>
	</div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import { login } from "@/api/user";
import local from "../../utils/local";

export default {
	name: "Login",
	data() {
		const validateUsername = (rule, value, callback) => {
			if (!validUsername(value)) {
				callback(new Error("Please enter the correct user name"));
			} else {
				callback();
			}
		};
		const validatePassword = (rule, value, callback) => {
			if (value.length < 6) {
				callback(
					new Error("The password can not be less than 6 digits")
				);
			} else {
				callback();
			}
		};
		return {
			loginForm: {
				email: "xinglei_96@163.com",
				password: "lxl199655",
			},
			loginRules: {
				email: [
					{
						required: true,
						trigger: "blur",
						// validator: validateUsername,
					},
				],
				password: [
					{
						required: true,
						trigger: "blur",
						validator: validatePassword,
					},
				],
			},
			loading: false,
			passwordType: "password",
			redirect: undefined,
		};
	},
	watch: {
		$route: {
			handler: function (route) {
				this.redirect = route.query && route.query.redirect;
			},
			immediate: true,
		},
	},
	methods: {
		showPwd() {
			if (this.passwordType === "password") {
				this.passwordType = "";
			} else {
				this.passwordType = "password";
			}
			this.$nextTick(() => {
				this.$refs.password.focus();
			});
		},
		handleLogin() {
			this.$refs.loginForm.validate((valid) => {
				if (valid) {
					this.loading = true;
					// login(this.loginForm).then((res) => {
					// 	this.$router.push({
					// 		path: this.redirect || "/",
					// 	});
					// 	this.loading = false;

					// 	let token = res.payload.token;
					// 	this.$store.commit("user/SET_TOKEN", token);
					// });
					this.$store
						.dispatch("user/login", this.loginForm)
						.then((res) => {
							console.log(this.loginForm.email)
						    local.set("email", this.loginForm.email);

							this.$router.push({
								path: this.redirect || "/",
							});
							this.loading = false;
						})
						.catch(() => {
							this.loading = false;
						});

					console.log(this.$store, "error submit!!");
				} else {
					return false;
				}
			});
		},
	},
};
</script>

<style lang="scss">

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
	.login-container .el-input input {
		color: $cursor;
	}
}

/* reset element-ui css */
.login-container {
	.el-input {
		display: inline-block;
		height: 47px;
		width: 85%;

		input {
			background: transparent;
			border: 0px;
			-webkit-appearance: none;
			border-radius: 0px;
			padding: 12px 5px 12px 15px;
			color: $light_gray;
			height: 47px;
			caret-color: $cursor;

			&:-webkit-autofill {
				box-shadow: 0 0 0px 1000px $bg inset !important;
				-webkit-text-fill-color: $cursor !important;
			}
		}
	}

	.el-form-item {
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(0, 0, 0, 0.1);
		border-radius: 5px;
		color: #454545;
	}
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.logo {
	width: 180px;
    margin-bottom: 20px;
}

.login-container {
	min-height: 100%;
	width: 100%;
	background-color: $bg;
	overflow: hidden;

	.login-form {
		position: relative;
		width: 520px;
		max-width: 100%;
		padding: 160px 35px 0;
		margin: 0 auto;
		overflow: hidden;
	}

	.tips {
		font-size: 14px;
		color: #fff;
		margin-bottom: 10px;

		span {
			&:first-of-type {
				margin-right: 16px;
			}
		}
	}

	.svg-container {
		padding: 6px 5px 6px 15px;
		color: $dark_gray;
		vertical-align: middle;
		width: 30px;
		display: inline-block;
	}

	.title-container {
		position: relative;

		.title {
			font-size: 26px;
			color: $light_gray;
			margin: 0px auto 40px auto;
			text-align: center;
			font-weight: bold;
		}
	}

	.show-pwd {
		position: absolute;
		right: 10px;
		top: 7px;
		font-size: 16px;
		color: $dark_gray;
		cursor: pointer;
		user-select: none;
	}
}
</style>
