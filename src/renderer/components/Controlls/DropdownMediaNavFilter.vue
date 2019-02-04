<template>
    <div class= "m-dropdown-container">
        <select class="custom-select">
            <option value="NULL">-Show-</option>
            <option value="SET">This Set</option>
            <option value="ALL">All Media</option>
        </select>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "dropdown-media-nav-filter",
    data() {
        return {
            
        }
    },
    props: {
        
    },
    computed:{
        
    },

    methods: {
        
    },
    created(){
        
    }
})
</script>

<style scoped>
    .custom-select{
        background: lightgray;
        height: 25px;
        box-shadow: 1px 1px 3px rgba(50, 50, 50, 0.65);
        font: inherit;
        border: none;
        text-align-last: center;
    }
</style>