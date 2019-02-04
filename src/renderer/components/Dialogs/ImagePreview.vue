<template>
    <div id="dialog-background">
        <div class="dialog-container">
            <span class="image-name" v-if="hasName">{{this.imgName}}</span>
            <div class="image-container">
                <font-awesome-icon icon="times" class="ftA-cancel" @click="close()"></font-awesome-icon>
                <img :src="this.imgSource"/>
            </div>
        </div>
        
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
export default Vue.extend({
    name: "image-preview",
    components: {FontAwesomeIcon},
    props:{
        imgSource: { type: String },
        imgName: {type : String }
    },
    computed:{
        hasName():boolean{return this.imgName !== undefined || this.imgName === "";}
    },
    methods: {
        close(){
            this.$emit('close-preview');
        }
    },
    
    created(){
        
    }
})
</script>

<style scoped>
    #dialog-background{
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100vw;
        height: 100vh;
        display: flex;
        background-color: rgba(0,0,0,0.3);
        z-index: 10;
    }
    .image-container{
        margin: auto;
        position: relative;
    }
    .ftA-cancel{
        width: 30px;
        height: 30px;
        position: absolute;
        right: 0;
        top: 0;
    }
    .image-name{
        font-size: 30px;
        background-color: lightgray;
        padding: 2px 10px;
        border-radius: 12px 12px 0px 0px;
    }
    .dialog-container{
        margin: auto;
        text-align: center;
    }
</style>
