<template>
    <div class="content">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="block add-product mb-5">
                        <div class="section-title mb-4 d-flex justify-content-between align-items-center">
                            <h1>Edit Product</h1>
                        </div>
                        <form @submit.prevent="editProduct">
                            <div class="form-group">
                                <label>Name</label>
                                <input type="text" class="form-control" v-model="product.name">
                                <div class="error-block" v-if="$v.product.name.$error">
                                    <span v-if="!$v.product.name.required">Field is required.</span>
                                    <span v-if="!$v.product.name.minLength">Name must have at least {{$v.product.name.$params.minLength.min}} letters.</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Price</label>
                                <input type="number" class="form-control" v-model="product.price">
                                <div class="error-block" v-if="submitted && $v.product.price.$error">
                                    <span v-if="!$v.product.price.required">Field is required.</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Description</label>
                                <textarea rows="6" class="form-control" v-model="product.desc"></textarea>
                                <div class="error-block" v-if="submitted && $v.product.desc.$error">
                                    <span v-if="!$v.product.desc.required">Field is required.</span>
                                    <span v-if="!$v.product.desc.minLength">Description must have at least {{$v.product.desc.$params.minLength.min}} letters.</span>
                                </div>
                            </div>

                            <button class="btn btn-primary">Edit product</button>
                            <a href="#" class="btn btn-link" @click.prevent="$router.go(-1)">Back</a>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {required, minLength} from 'vuelidate/lib/validators'

    export default {
        name: "EditProduct",
        data(){
            return {
                submitted: false,
            }
        },
        props: {
            product: {
                type: Object,
                required: true
            }
        },
        methods: {
            editProduct(){
                this.submitted = true;
                this.$v.$touch();

                if(!this.$v.$error){
                    this.$store.dispatch('editProduct', {...this.product})
                }
            }
        },
        validations: {
            product: {
                name: {
                    required,
                    minLength: minLength(3),
                },
                price: {
                    required,
                },
                desc: {
                    required,
                    minLength: minLength(5),
                }
            }
        }
    }
</script>

<style scoped>

</style>
