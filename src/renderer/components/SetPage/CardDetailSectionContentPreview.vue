<template>
    <div class="content-container fillFlex" >
        <div v-if="sectionType == 'TEXT'" class="fillFlex">
            <span class="text-content simple-center">{{this.sectionContent}}</span>
        </div>
        <div v-if="sectionType == 'IMAGE'" class="fillFlex">
            <img :src="this.sectionContent" class="previewImage simple-center" @click="showImagePreview">
        </div>
        <div v-if="sectionType == 'AUDIO'" class="fillFlex">
            <audio-player :audioSource="this.sectionContent" class="simple-center"></audio-player>
        </div>
        <image-preview v-if="this.isShowingImagePreview" :imgSource="this.sectionContent" v-on:close-preview="closeImagePreview"></image-preview>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import AudioPlayer from './../Controlls/AudioPlayer.vue';
import ImagePreview from './../Dialogs/ImagePreview.vue';
import { CardDetailSectionType } from '../../../domain/Entities/CardDetailSectionType';
export default Vue.extend({
    name: "card-detail-section-content-preview",
    components: {AudioPlayer, ImagePreview},
    props: ["section", "mediaMap"],
    data(){
        return {
            isShowingImagePreview: false
        }
    },
    computed:{
        sectionType(): string{
            var type = this.section.Type;
            if(type == CardDetailSectionType.IMAGE){return "IMAGE"}
            if(type == CardDetailSectionType.AUDIO){return "AUDIO"}
            if(type == CardDetailSectionType.TEXT){ return "TEXT"}
            return "";
        },
        isMediaContent(): boolean {return this.sectionType == "IMAGE" || this.sectionType == "AUDIO"},
        sectionContent():string {
            if(this.isMediaContent){
                return this.GetMediaSrcFromID(this.section.Content);
            }
            return this.section.Content;
        },
        mediaMapper(): Map<string, string>{
            return <Map<string, string>> this.mediaMap;
        }
    },
    methods:{
        GetMediaSrcFromID(mediaID: string): string{
            var result = this.mediaMap.get(mediaID);
            return result;
        },
        showImagePreview(){ this.isShowingImagePreview = true;},
        closeImagePreview(){this.isShowingImagePreview = false;}
    }
})
</script>
<style scoped>
    .previewImage{
        height: 90%;
        margin: auto;
    }
    .fillFlex{
        width: 100%;
        height: 100%;
        display: flex;
    }
    .simple-center{
        margin: auto;
    }
    .text-content{
        font-size: 30px;
    }
</style>
