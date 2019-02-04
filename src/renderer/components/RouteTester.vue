<template>
    <div id = "RTester">
        <span>This is an RT</span>
        {{ $route.params.id }}
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "route-tester",
    data() {
        return {
            arr: ["A", "B"]
        };
    },
})
</script>

<style>
    #RTester{
        background-color: brown;
    }
</style>

