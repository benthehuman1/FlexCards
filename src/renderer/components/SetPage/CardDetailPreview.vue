<template>
    <div class="CardDetailPreviewRoot" v-bind:class="{'root-edit': this.isEditing}" @mouseover="mouseOver" @mouseleave="mouseLeave">
        <!-- From -->
        <div class="from_to_section" v-if="!this.isEditing">
            <div class="sectionLabel">{{this.detail.FromSection.Label}}</div>
            <card-detail-section-content-preview :section="fromSection" :mediaMap="this.mediaIDMap"></card-detail-section-content-preview>
        </div>
        <div v-else class="from_to_section">
            <card-detail-section-edit :detailSection="fromSection" :mediaMap="this.mediaIDMap"></card-detail-section-edit>
        </div>
        <!-- Arrow -->
        <div class="arrowSection">
            <font-awesome-icon icon="arrow-right" v-bind:class="{'ftA-arrow-right-pushed' : this.showEditingButtons, 'ftA-arrow-right' : !this.showEditingButtons}"></font-awesome-icon> 
        </div>
         <!-- To -->
        <div class="from_to_section" v-if="!this.isEditing">
            <div class="sectionLabel">{{this.detail.ToSection.Label}}</div>
            <card-detail-section-content-preview :section="toSection" :mediaMap="this.mediaIDMap"></card-detail-section-content-preview>
        </div>
        <div v-else class="from_to_section">
            <card-detail-section-edit :detailSection="toSection" :mediaMap="this.mediaIDMap"></card-detail-section-edit>
        </div>
         <!-- Edit Button / Buttons -->
        <div v-if="this.showEditingButtons" class="editing-state-buttons">
            <span v-if="this.isHovering && !this.isEditing" class=" button-container edit-button" @click="enterEditing">Edit</span>
            <span v-if="this.isEditing" class="button-container save-button" @click="saveEdits">Save</span>
            <span v-if="this.isEditing" class="button-container save-button" @click="cancelEdits">Cancel</span>
        </div>
        <div v-if="this.isHovering && !this.isEditing" class="button-container delete-button" @click="deleteDetail">
            <font-awesome-icon icon="times" class="ftA-times"></font-awesome-icon>
        </div>
        <image-preview v-if="this.isShowingImagePreview" :imgSource="this.imagePreviewSource" v-on:close-preview="closeImagePreview"></image-preview>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { CardDetailSection } from '../../../domain/Entities/CardDetailSection';
import { CardDetail } from '../../../domain/Entities/CardDetail';
import SectionTypePicker  from './SectionTypePicker.vue';
import CardDetailSectionContentPreview  from './CardDetailSectionContentPreview.vue';
import CardDetailSectionEdit  from './CardDetailSectionEdit.vue';
import ImagePreview from './../Dialogs/ImagePreview.vue';
import AudioPlayer from './../Controlls/AudioPlayer.vue';
import { CardDetailSectionType } from '../../../domain/Entities/CardDetailSectionType';
export default Vue.extend({
    name: "card-detail-preview",
    props: ["cardDetail", "mediaMap", "isNew"],
    components: {FontAwesomeIcon, SectionTypePicker, ImagePreview, AudioPlayer, CardDetailSectionEdit, CardDetailSectionContentPreview},
    computed: {
        fromSection(): CardDetailSection{return <CardDetailSection> this.detail.FromSection},
        fromSectionType(): string{ 
            var type = this.fromSection.Type;
            if(type == CardDetailSectionType.IMAGE){return "IMAGE"}
            if(type == CardDetailSectionType.AUDIO){return "AUDIO"}
            if(type == CardDetailSectionType.TEXT){return "TEXT"}
            return "";
        },

        toSection():   CardDetailSection{return <CardDetailSection> this.detail.ToSection},
        toSectionType(): string{
            var type = this.toSection.Type;
            if(type == CardDetailSectionType.IMAGE){return "IMAGE"}
            if(type == CardDetailSectionType.AUDIO){return "AUDIO"}
            if(type == CardDetailSectionType.TEXT){return "TEXT"}
            return "";
        },
        isEitherSectionContentEmpty(): boolean {return this.toSection.Content == "" || this.fromSection.Content == ""},
        isEitherSectionLabelEmpty(): boolean {return this.toSection.Label == "" || this.fromSection.Label == ""},
        showEditingButtons(): boolean {return this.isHovering || this.isEditing}
    },    
    data() {
        return {
            detail: this.cardDetail,
            mediaIDMap: this.mediaMap as Map<string, string>,
            isHovering: false,
            isEditing: false,
            isShowingImagePreview: false,
            imagePreviewSource: "",
            detailClone: {} as CardDetail
            
        }
    },
    methods: {
        GetMediaSrcFromID(mediaID: string){
            var result = this.mediaIDMap.get(mediaID);
            return result;
        },
        mouseOver(){this.isHovering = true},
        mouseLeave(){this.isHovering = false},
        enterEditing(){
            this.isEditing = true;
            this.detailClone = this.detail.GetClone();
        },
        saveEdits(){
            if(this.isEitherSectionContentEmpty || this.isEitherSectionLabelEmpty){this.cancelEdits(); return;}
            if(this.isNew){this.saveAsNewDetail(); return; }
            this.$emit('saveDetail', this.detail);
            this.isEditing = false;
            this.detailClone = new CardDetail();
        },
        cancelEdits(){
            this.detail = this.detailClone;
            this.isEditing = false;
        },
        showImagePreview(source: string){
            this.imagePreviewSource = source;
            this.isShowingImagePreview = true;
        },
        closeImagePreview(){
            this.isShowingImagePreview = false;
            this.imagePreviewSource = "";
        },
        saveAsNewDetail(){
            this.$emit("saveAsNew", this.detail);
            this.isEditing = false;
        },
        deleteDetail(){
            this.$emit("deleteDetail");
        }
    },
    created(){
        
    },
    destroyed(){
        if(this.isEditing){this.cancelEdits();};
    }
})
</script>

<style scoped>
    .CardDetailPreviewRoot{
        background-color: #9497F4;
        height: 100px;
        border-radius: 10px;
        display: flex;
        margin: 5px;
        position: relative;
    }
    .root-edit{
        height: 140px;
    }
    .from_to_section{
        width: 45%;
        position: relative;
        display: flex;
    }
    .arrowSection{
        width: 10%;
        display: flex;
        position: relative;
    }
    .ftA-arrow-right{
        width: 50px;
        height: 50px;
        margin: auto;
    }
    .ftA-arrow-right-pushed{
        position: absolute;
        width: 100%;
        top: 17%;
        height: 50px;
    }
    .previewImage{
        height: 90%;
        margin: auto;
    }
    .previewImage-edit{
        height: 100%;
        margin: auto;
    }
    .sectionContent{
        margin: auto;
        font-size: 40px;
        display: flex;
    }
    .sectionLabel{
        position: absolute;
        color: #333333;
        left: 5px;
        top: 5px;
    }
    .edit-button{
        width: 100%;
    }
    .delete-button{
        position: absolute;
        right: 4px;
        top: 3px;
    }
    .ftA-times{
        color: maroon;
        margin: auto;
        width: 20px;
        height: 20px;
    }
    .editing-state-buttons{
        position: absolute;
        display: flex;
        height: 25px;
        bottom: 2px;
        left: 50%;
        margin-left: -60px;
        width: 120px;
    }
    .button-container{
        background-color: lightgray;
        height: 22px;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        box-shadow: 2px 2px 6px rgba(50, 50, 50, 0.65);
    }
    .button-container:hover{
        background-color: gray;
    }
    .save-button{
        width: 100%;
        
        margin: auto 2px;
        font-size: 15px;
        height: 20px;
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
    .ftA-edit{
        width: 27px;
        height: 27px;
        margin: auto;
    }
    .audio-player-container{
        margin: auto;
    }
    
</style>