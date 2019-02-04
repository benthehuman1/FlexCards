<template>
    <div v-bind="{'player-container': hasName, 'player-container-no-name': !hasName}">
        <div v-bind:class="{'button-container': hasName, 'button-container-no-name': !hasName}" @click="playSound">
            <div class="button" v-bind:class="{'button-disabled' : !hasSource}">
                <font-awesome-icon icon="volume-up" class="ftA-volume-up" v-bind:class="{'ftA-volume-up-disabled' : !hasSource}"></font-awesome-icon>
            </div>
        </div>
        <div v-if="hasName" class="audio-name-container">
            <span class="audio-name">{{this.audioName}}</span>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
export default Vue.extend({
    name: "audio-player",
    components: {FontAwesomeIcon},
    props:{
        audioSource:{ type: String },
        audioName:  { type : String }
    },
    computed:{
        hasName()  :boolean{return this.audioName !== undefined || this.audioName   == "";},
        hasSource():boolean{return this.audioSource !== undefined && this.audioSource !== "";}
    },
    methods:{
        playSound(){
            if(this.hasSource){
                var audio = new Audio(this.audioSource);
                audio.play();
            }
        }
    }
})
</script>
<style scoped>
    .player-container{
        width: 100px;
        height: 100px;
    }
    .player-container-no-name{
        width: 66px;
        height: 66px;
    }
    .audio-name{
        text-align: center;
        margin: auto;
    }
    .audio-name-container{
        width: 100%;
        height: 30%;
        background-color: red;
        display: flex;
    }
    .button-container{
        display: flex;
        width: 100%;
        height: 70%;
    }
    .button-container-no-name{
        width: 100%;
        height: 100%;
    }
    .button{
        height: 66px;
        display: flex;
        margin: auto;
        width: 66px;
        border-radius: 50%;
        box-shadow: 0px 0px 14px 3px rgba(20, 20, 20, 0.5);
        background-color: lightgreen;
    }
    .button:hover{
        box-shadow: 0px 0px 14px 3px rgba(20, 20, 20, 0.7);
    }
    .ftA-volume-up{
        margin: auto;
        width: 70%;
        height: 70%;
    }
    .button-disabled{
        background-color: lightgray;
        box-shadow: none;
    }
    .ftA-volume-up-disabled{
        color: gray;
    }
</style>
