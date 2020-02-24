<template>
    <div :class="[{'alert': true}, 'alert-' + alert.type]">{{alert.msg}}</div>
    <!--<div :class="[{'alert': true}, alertMsg ? 'alert-' + alertMsg: '']">{{alertMsg.msg}}</div>-->
</template>

<script>
    export default {
        name: "Alert",
        props: {
            alert: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>
