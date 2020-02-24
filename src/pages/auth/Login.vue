<template>
    <div class="content">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 offset-lg-3">
                    <div class="form-area block">
                        <div class="form-area__title mb-4 text-center">
                            <h1>Sign in</h1>
                        </div>
                        <form @submit.prevent="loginUser">
                            <div class="form-group">
                                <label>Email address</label>
                                <input type="email" class="form-control" v-model="userData.email">
                                <div class="error-block" v-if="submitted && $v.userData.email.$error">
                                    <span v-if="!$v.userData.email.required">Email is required.</span>
                                    <span v-if="!$v.userData.email.email">Please enter valid email address.</span>
                                </div>
                                <div class="error-block" v-if="errorMessages.email">Invalid email address.</div>
                            </div>
                            <div class="form-group">
                                <label>Password</label>
                                <input type="password" class="form-control" v-model="userData.password">
                                <div class="error-block" v-if="submitted && $v.userData.password.$error">
                                    <span v-if="!$v.userData.password.required">Password is required.</span>
                                </div>
                                <div class="error-block" v-if="errorMessages.password">Invalid password.</div>
                            </div>
                            <div class="form-group text-center">
                                <span>Don't have an account?</span> <router-link to="/register">Sign Up</router-link>
                            </div>
                            <button type="submit" class="btn btn-primary btn-block">Sign in</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {required, email} from 'vuelidate/lib/validators'

    export default {
        name: "Login",
        data(){
            return {
                userData: {
                    email: '',
                    password: '',
                },
                errorMessages: {
                    email: false,
                    password: false,
                },
                submitted: false,
            }
        },
        computed: {
            ...mapGetters(['getMessage'])
        },
        methods: {
            loginUser(){
                this.submitted = true;
                this.$v.$touch();

                if(!this.$v.$error){
                    this.$store.dispatch('loginRegister', {...this.userData, type: 'login'})
                        .catch(e => {
                            if(this.getMessage.message === 'EMAIL_NOT_FOUND'){
                                this.errorMessages.email = true;

                                setTimeout(() => {
                                    this.errorMessages.email = false
                                },3000)
                            }
                            else if(this.getMessage.message === 'INVALID_PASSWORD') {
                                this.errorMessages.password = true;

                                setTimeout(() => {
                                    this.errorMessages.password = false
                                },3000)
                            }
                        })
                }
            }
        },
        validations: {
            userData: {
                email: {
                    required,
                    email,
                },
                password: {
                    required,
                },
            },
        },
    }
</script>

<style scoped>

</style>
