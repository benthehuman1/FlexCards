<template>
    <div class="media-item-container" @click="toggleSelect" v-bind:class="{ 'media-item-selected': this.isSelected }">
        <font-awesome-icon v-if="this.media.MediaType == 0" icon="image" class="media-type-icon image-icon" @click="previewImage"></font-awesome-icon>
        <font-awesome-icon v-else icon="volume-up" class="media-type-icon sound-icon" @click="previewSound"></font-awesome-icon>
        <span class="media-name" :title="this.media.Name">{{this.media.Name}}</span>
        <span class="media-filetype">{{this.media.FileFormat.toUpperCase()}}</span>
        <image-preview v-if="showingPreview" :imgSource="this.media.Path" :imgName="this.media.Name" v-on:close-preview="closeMedia"></image-preview>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import  ImagePreview  from "./ImagePreview.vue";
import { Media } from '../../../domain/Entities/Media';
export default Vue.extend({
    name: "media-nav-item",
    components: {FontAwesomeIcon, ImagePreview},
    props: {
        media: { type: Object as () => Media}
        
    },
    data(){
        return {
            showingPreview: false,
            isSelected: false
        }
    },
    methods: {
        previewImage(){
            this.showingPreview = true;
        },
        closeMedia(){
            this.showingPreview = false;
        },
        toggleSelect(){
            this.isSelected = !this.isSelected;
            if(this.isSelected){ this.$emit('selected'); }//Handling on dialog
            else{                this.$emit('deselected'); }
        },
        deselect(){ 
            this.isSelected = false; 
        },
        previewSound(){
            var sound = new Audio(this.media.Path);
            sound.play();
        }
    },
    created(){
        
    }
})
</script>

<style scoped>
    .media-item-container{
        background-color: lightgray;
        height: 25px;
        border-radius: 5px;
        padding-left: 5px;
        padding-right: 5px;
        display: flex;
        align-items: center;
        margin-bottom: 3px;
        border: darkgray;
        border-style: solid;
        border-width: 2px;
    }
    .media-item-selected{
        background-color: gray;
        border-color: gray;
    }
    .media-type-icon{
        width: 10%
    }
    .media-name{
        width: 75%;
        margin-left: 5px;
        overflow: hidden;
        white-space: nowrap;
    }
    .media-filetype{
        width: 15%;
        text-align: end;
    }
    .sound-icon{
        color: darkolivegreen;
    }
    .image-icon{
        color: maroon;
    }
</style>
