<template>
    <div class="button-container" @click="click()">
        <span class="button-text">{{ this.setName }}</span>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
//import { Guid } from 'guid-typescript';

export default Vue.extend({
    name: "set-select-button",
    props: {
        setID: {type: String},
        setName: {type: String}
    },
    computed:{
        
    },
    data() {
        return {
            
        }
    },
    methods: {
        click(){
            var routePath = "/setPage/" + this.setID;
            this.$router.push({path: routePath});
        }
    },
    created(){

    }
});
</script>

<style scoped>
    .button-container{
        background-color: lightgray;
        margin: 10px;
        height: 40px;
        border-radius: 15px;
        display: flex;
        justify-content: center;
        box-shadow: 3px 3px 10px rgba(50, 50, 50, 0.65);
    }
    .button-container:hover{
        background-color: gray;
    }
    .button-text{
        margin: auto;
    }
</style>

