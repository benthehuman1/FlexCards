<template>
    <div class= "m-picker-container">
        <div class="option" @click="click_image(); selectOption();" v-bind:class="{ 'option-left-pressed': imageSelected }">
            <font-awesome-icon icon="image" class="option-icon"/>
        </div>
        <div class="option" @click="click_audio(); selectOption();" v-bind:class="{ 'option-right-pressed': audioSelected }">
            <font-awesome-icon icon="volume-up" class="option-icon"/>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
export default Vue.extend({
    name: "multi-picker-media-nav-media",
    components: {FontAwesomeIcon},
    data() {
        return {
            imageSelected: true,
            audioSelected: true,
        }
    },
    props: {
        
    },
    computed:{
        
    },

    methods: {
        click_image(){
            this.imageSelected = !this.imageSelected;
        },
        click_audio(){
            this.audioSelected = !this.audioSelected;
        },
        selectOption(){
            this.$emit("select", { imageSelected: this.imageSelected, audioSelected: this.audioSelected });
        }
    },
    created(){
        
    }
})
</script>

<style scoped>
    .m-picker-container{
        width: 50px;
        height: 25px;
        background-color: lightgray;
        display: flex;
        overflow: hidden;
        box-shadow: 1px 1px 3px rgba(50, 50, 50, 0.65);
        border-radius: 5px;
    }
    .option{
        width: 50%;
        height: 100%;
        display: flex;
    }
    
    .option-left-pressed{
        box-shadow: inset 0px 2px 3px grey, inset 2px 2px 3px grey, inset 2px -2px 3px grey;
        background-color: darkgray;  
    }
    .option-right-pressed{
        box-shadow: inset -2px 0px 3px gray, inset 0px 2px 3px gray, inset 0px -2px 3px gray;
        background-color: darkgray;  
    }
    .option-icon{
        margin: auto;
    }
</style>