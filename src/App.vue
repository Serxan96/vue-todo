<template>
  <div id="app">
      <app-header></app-header>
      <transition name="slide" mode="out-in">
        <router-view></router-view>
      </transition>
  </div>
</template>

<script>
  import Header from './components/layout/Header'

  export default {
    name: 'app',
    components: {
        appHeader: Header
    },
    created(){
        this.$store.dispatch('initApp');
    }
  }
</script>

<style>
  .slide-enter {
    opacity: 0;
  }
  .slide-enter-active {
    animation: slide-in .3s ease-out forwards;
    transition: opacity .2s;
  }
  .slide-leave-active {
    animation: slide-out .3s ease-out forwards;
    transition: opacity .2s;
    opacity: 0;
  }

  @keyframes slide-in {
    from {
      transform: translateY(20px);
    }
    to {
      transform: translateY(0);
    }
  }
  @keyframes slide-out {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(20px);
    }
  }

  .error-block {
      color: red;
      font-size: 12px;
      margin-top: 2px;
  }
</style>
