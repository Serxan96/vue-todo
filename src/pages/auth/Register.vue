<template>
    <div class="content">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 offset-lg-3">
                    <div class="form-area block">
                        <div class="form-area__title mb-4 text-center">
                            <h1>Sign Up</h1>
                        </div>
                        <form @submit.prevent="registerUser">
                            <div class="form-group">
                                <label>Email address</label>
                                <input type="email" class="form-control" v-model="userData.email">
                                <div class="error-block" v-if="submitted && $v.userData.email.$error">
                                    <span v-if="!$v.userData.email.required">Email is required.</span>
                                    <span v-if="!$v.userData.email.email">Please enter valid email address.</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Password</label>
                                <input type="password" class="form-control" v-model="userData.password">
                                <div class="error-block" v-if="submitted && $v.userData.password.$error">
                                    <span v-if="!$v.userData.password.required">Password is required.</span>
                                    <span v-if="!$v.userData.password.minLength">Password must contain at least {{$v.userData.password.$params.minLength.min}} characters!</span>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary btn-block">Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {required, email, minLength} from 'vuelidate/lib/validators'

    export default {
        name: "Register",
        data(){
            return {
                userData: {
                    email: '',
                    password: '',
                },
                submitted: false,
            }
        },
        methods: {
            registerUser(){
                this.submitted = true;
                this.$v.$touch();

                if(!this.$v.$error){
                    this.$store.dispatch('loginRegister', {...this.userData, type: 'register'})
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
                    minLength: minLength(4)
                },
            },
        },
    }
</script>

<style scoped>

</style>
