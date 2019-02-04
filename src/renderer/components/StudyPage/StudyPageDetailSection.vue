<template>
    <div class="sectionRoot">
        <div class="content">
            <div v-if="!this.hidden" class="contentContainer">
                <div class= "textContent" v-if="sectionType == 'TEXT'">{{this.cardDetailSection.Content}}</div>
                <img class= "imageContent" v-if="sectionType == 'IMAGE'" :src="this.cardDetailSection.Content">
                <div class= "audioContent" v-if="sectionType == 'AUDIO'"><audio-player :audioSource="this.cardDetailSection.Content"></audio-player></div>
            </div>
            <div class="placeHolderQuestion" v-else>?</div>
        </div>
        <div class="label">
            {{this.cardDetailSection.Label}}
        </div>
        
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AudioPlayer from './../Controlls/AudioPlayer.vue';
import { CardDetailSectionType } from '../../../domain/Entities/CardDetailSectionType';
export default Vue.extend({
    components: {AudioPlayer},
    name: "study-page-detail-section",
    props: {
        cardDetailSection: {type: Object }, // CardDetailSection modified so .Content has image src.
        hidden: {type: Boolean }
    },
    computed:{
        sectionType(): string{
            var type = this.cardDetailSection.Type;
            if(type == CardDetailSectionType.IMAGE){return "IMAGE"}
            if(type == CardDetailSectionType.AUDIO){return "AUDIO"}
            if(type == CardDetailSectionType.TEXT){ return "TEXT"}
            return "";
        },
    },
    data() {
        return {
            label: this.cardDetailSection.Label,
            content: this.cardDetailSection.Content,
            type: this.cardDetailSection.Type
        }
    }
})
</script>

<style>
    .sectionRoot{
        width: 40vw;
        height: 40vw;
    }
    .content{
        width: 100%;
        height: 100%;
        display: flex;
    }
    .textContent{
        margin: auto;
        font-size: 45px;
        
    }
    .imageContent{
        height: 100%;
        margin: auto;
    }
    .label{
        text-align: center;
        font-size: 18px;
    }
    .placeHolderQuestion{
        font-size: 120px;
        margin: auto;
    }
    .contentContainer{
        display: flex;
        margin: auto;
        width: 100%;
        height: 100%;
    }
    .audioContent{
        margin: auto;
    }
    
</style>

