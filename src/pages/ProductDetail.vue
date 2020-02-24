<template>
    <div class="content">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="block product-detail">
                        <div class="section-title mb-4 d-flex justify-content-between align-items-center">
                            <h1>{{getProductDetail.name}}</h1>
                            <span>{{getProductDetail.price}}$</span>
                        </div>
                        <p>{{getProductDetail.desc}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "ProductDetail",
        computed: {
            ...mapGetters(['getProductDetail'])
        },
        created(){
            this.$store.dispatch('fetchProductDetail', this.$route.params.id);
        },
    }
</script>

<style scoped>

</style>
