<template>
    <header class="header mb-5">
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <div class="container">
                <router-link class="navbar-brand" to="/">Vue Todo</router-link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto">
                        <router-link class="nav-item" tag="li" to="/" exact>
                            <a class="nav-link" href="#">Home</a>
                        </router-link>
                        <li class="nav-item">
                            <a class="nav-link" href="https://github.com/Serxan96/vue-todo" target="_blank">Github</a>
                        </li>
                        <li class="nav-item" v-if="isAuth">
                            <a class="nav-link" href="#" @click.prevent="logout">Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
    export default {
        name: "Header",
        methods: {
            logout(){
                this.$store.dispatch('logout');
            }
        },
        computed: {
            isAuth(){
                return !!this.$store.getters.loggedIn
            }
        }
    }
</script>

<style scoped>

</style>
