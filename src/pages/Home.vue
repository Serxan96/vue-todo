<template>
    <div class="content">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="block product-list">
                        <div class="section-title mb-4 d-flex justify-content-between align-items-center">
                            <h1>Products</h1>
                            <router-link to="/add" class="btn btn-primary btn-sm">Add product</router-link>
                        </div>
                        <ul class="list-group" v-if="getProducts.length > 0">
                            <li v-for="(product, index) in getProducts" :key="product.key" class="list-group-item d-flex justify-content-between align-items-center" ref="product">
                                <router-link :to="'/product/' + product.key">{{product.name}}</router-link>
                                <div class="list-group-item__btns">
                                    <router-link :to="{name: 'Edit', params: {id: product.key, product: product}}" class="btn btn-primary btn-sm">Edit</router-link>
                                    <a href="#" class="btn btn-primary btn-sm" @click.prevent="removeProduct(index, product)">Delete</a>
                                </div>
                            </li>
                        </ul>
                        <div class="empty-block" v-else>
                            <span>There is no products...</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "Home",
        computed: {
            ...mapGetters(['getProducts'])
        },
        methods: {
            removeProduct(index, product){
                if(confirm('Are you sure?')){
                    this.$store.dispatch('removeProduct', product);
                    this.$refs.product[index].remove();
                }
            }
        }
    }
</script>

<style scoped>
    .empty-block {
        color: #727272;
        padding: 20px 10px;
        text-align: center;
        background: #eeeeee;
    }
</style>
