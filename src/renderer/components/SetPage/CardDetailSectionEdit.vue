<template>
    <div class="section-root">
        <input type="text" class="sectionLabel" v-model="detailSection.Label">
        <div class="content-selection">
            <div v-if="sectionType == 'TEXT'" class="text-content-selection">
                <div class="text-content-edit-container">
                    <textarea rows="4" cols="50" class="text-content-edit" v-model="detailSection.Content"></textarea>
                </div>
            </div>

            <div v-else class="media-content-selection">
                <div v-if="sectionType == 'IMAGE'" class="media-selection image-selection">
                    <font-awesome-icon v-if="mediaSource == ''" icon="image" class="ftA-image"></font-awesome-icon>
                    <img :src="mediaSource" class="previewImage-edit" @click="showImagePreview(GetMediaSrcFromID(detailSection.Content))">
                </div>
                <div v-if="sectionType == 'AUDIO'" class="media-selection audio-selection">
                    <div class="audio-player-container"><audio-player :audioSource="mediaSource"></audio-player></div>
                </div>
                <div class="media-selection-edit-button-container">
                    <div class="media-selection-edit-button" @click="showMediaSelectionDialog">
                        <font-awesome-icon icon="edit" class="ftA-edit"></font-awesome-icon>
                    </div>
                </div>
            </div>
        </div>
        <section-type-picker :sectionType="detailSection.Type" v-on:select="sectionTypeUpdate"></section-type-picker>
    <image-preview v-if="this.isShowingImagePreview" :imgSource="this.imagePreviewSource" v-on:close-preview="closeImagePreview"></image-preview>
    <media-nav-dialog v-if="this.isShowingMediaSelection" v-on:close-dialog="closeMediaSelectionDialog" v-on:selected="selectMedia"></media-nav-dialog>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SectionTypePicker  from './SectionTypePicker.vue';
import ImagePreview from './../Dialogs/ImagePreview.vue';
import AudioPlayer from './../Controlls/AudioPlayer.vue';
import MediaNavDialog from "../Dialogs/MediaNavDialog.vue";
import { CardDetailSectionType } from '../../../domain/Entities/CardDetailSectionType';
import { MediaSelection } from '../../../domain/Entities/MediaSelection';
import { MediaType } from '../../../domain/Entities/MediaType';
export default Vue.extend({
    name: "card-detail-section-edit",
    components: {SectionTypePicker, ImagePreview, AudioPlayer, MediaNavDialog},
    props: {
        detailSection: Object,
        mediaMap: Map as {}
    },
    computed:{
        sectionType():string{
            var type = this.detailSection.Type;
            if(type == CardDetailSectionType.IMAGE){return "IMAGE"}
            if(type == CardDetailSectionType.AUDIO){return "AUDIO"}
            if(type == CardDetailSectionType.TEXT){return "TEXT"}
            return "";
        },
        mediaSource(): string{
            var src = this.GetMediaSrcFromID(this.detailSection.Content);
            if(!src){return "";}
            return src;
        }
    },
    data(){
        return {
            isShowingImagePreview: false,
            imagePreviewSource: "",
            mediaIDMap: this.mediaMap as Map<string, string>,
            isShowingMediaSelection: false
        }
    },
    methods: {
        saveDetails(){
            this.$emit("saveSection", this.detailSection)
        },
        showImagePreview(source: string){
            this.imagePreviewSource = source;
            this.isShowingImagePreview = true;
        },
        closeImagePreview(){
            this.isShowingImagePreview = false;
            this.imagePreviewSource = "";
        },
        GetMediaSrcFromID(mediaID: string){
            var result = this.mediaIDMap.get(mediaID);
            return result;
        },
        sectionTypeUpdate(sectionType: CardDetailSectionType){
            this.detailSection.Type = sectionType;
            this.detailSection.Content = "";
        },
        showMediaSelectionDialog(){
            this.isShowingMediaSelection = true;
        },
        closeMediaSelectionDialog(){
            this.isShowingMediaSelection = false;
        },
        selectMedia(media: MediaSelection){
            this.mediaIDMap.set(media.ID.toString(), media.Path);
            this.detailSection.Content = media.ID.toString();
            if(media.Type == MediaType.IMAGE){this.detailSection.Type = CardDetailSectionType.IMAGE}
            if(media.Type == MediaType.AUDIO){this.detailSection.Type = CardDetailSectionType.AUDIO}
        }
    }
})
</script>

<style scoped>
    
    .sectionLabel{
        border: none;
        font-size: 13px;
        position: absolute;
        top: 5px;
        left: 8px;
        border-radius: 3px;
        background-color: lightgray;
        box-shadow: 1px 1px 3px rgba(50, 50, 50, 0.65);
    }
    .sectionLabel:focus{
        outline-width: 0;
    }
    .content-selection{
        margin: auto;
        height: 60%;
        width: 96%;
        box-sizing: border-box;
    }
    .text-content-edit{
        padding: 0px;
        width: 100%;
        height: 100%;
        border: none;
        font-size: 14px;
        background: none;
    }
    .text-content-edit-container{
        width: 100%;
        height: 100%;
        padding: 3px;
        background-color: lightgray;
        border-radius: 4px;
        box-sizing: border-box;
        box-shadow: 1px 1px 3px rgba(50, 50, 50, 0.65);
    }
    .text-content-edit:focus{
        outline-width: 0;
    }
    .text-content-selection{
        padding: 2px;
        height: 100%;
        box-sizing: border-box;
    }
    .media-content-selection{
        display: flex;
        position: relative;
        height: 100%;
    }
    .media-selection{
        width: 100%;
        display: flex;
    }
    .media-selection-edit-button-container{
        position: absolute;
        right: 0;
        width: 35px;
        height: 100%;
        display: flex;
        margin-right: 3px;
    }
    .media-selection-edit-button{
        width: 35px;
        height: 35px;
        display: flex;
        margin: auto;
        background-color: lightgray;
        border-radius: 10px;
        box-shadow: 1px 1px 3px rgba(50, 50, 50, 0.65);
    }
    .media-selection-edit-button:hover{
        background-color: gray;
    }
    .ftA-edit{
        width: 27px;
        height: 27px;
        margin: auto;
    }
    .audio-player-container{
        margin: auto;
    }
    .root-edit{
        height: 140px;
    }
    .section-root{
        width: 100%;
        display: flex;
    }
    .previewImage-edit{
        height: 95%;
        margin: auto;
    }
    .ftA-image{
        margin: auto;
        width: 100%;
        height: 66px;
    }
</style>
