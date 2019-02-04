<template>
    <div id="studyPageRoute">
        <div class="exit-button botton-container" @click="exit()"><span class="exitText">Save and Exit</span></div>
        <div class="sections">
            <study-page-detail-section v-bind:hidden="false" v-bind:cardDetailSection="getDisplaySection(this.activeCardDetail.FromSection)"></study-page-detail-section>
            <div class="arrowSection">
                <span class="arrow-container"><font-awesome-icon icon="arrow-right" class="arrow"/></span>
            </div>
            <study-page-detail-section v-bind:hidden="!this.flipped" v-bind:cardDetailSection="getDisplaySection(this.activeCardDetail.ToSection)"></study-page-detail-section>
        </div>
        <div class="rate_flipContainer">
            <div class="flip-button-container botton-container" v-if="!this.flipped" @click="flip()"><span class="button-text">Flip</span></div>
            <div v-else> Rate your confidence. </div>
        </div>
        <div class="confidenceBarContainer" v-if="this.flipped">
            <div class="confidenceBar">
                <div class="confidenceBarItem rank_1" @click="rate(1)"><span class="confidenceBarItemNumber">1</span></div>
                <div class="confidenceBarItem rank_2" @click="rate(2)"><span class="confidenceBarItemNumber">2</span></div>
                <div class="confidenceBarItem rank_3" @click="rate(3)"><span class="confidenceBarItemNumber">3</span></div>
                <div class="confidenceBarItem rank_4" @click="rate(4)"><span class="confidenceBarItemNumber">4</span></div>
                <div class="confidenceBarItem rank_5" @click="rate(5)"><span class="confidenceBarItemNumber">5</span></div>
            </div>
        </div>    
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ModMinQueue } from "../../../utilities/ModMinQueue"
import { CardDetail } from '../../../domain/Entities/CardDetail';
import { StudyPageController } from "../../../controllers/StudyPageController";
import { Guid } from 'guid-typescript';
import { CardDetailSection } from '../../../domain/Entities/CardDetailSection';
import { CardDetailSectionType } from '../../../domain/Entities/CardDetailSectionType';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import StudyPageDetailSection from "./StudyPageDetailSection.vue"
export default Vue.extend({
    name: "study-page",
    components:{ StudyPageDetailSection, FontAwesomeIcon },
    computed:{
        
    },
    data() {
        return {
            setID: this.$router.currentRoute.params.setID,
            cardDetailQueue: {} as ModMinQueue<CardDetail>,
            controller: {} as StudyPageController,
            activeCardDetail: {} as CardDetail,
            mediaIDMap: {} as Map<string, string>,
            flipped: false
        }
    },
    methods: {
        getDisplaySection(section: CardDetailSection): CardDetailSection{
            // -FIGURE THIS OUT- //
            if(section.Type == CardDetailSectionType.TEXT){ return section;}
            var result = new CardDetailSection();
            result.Type = section.Type;
            result.Label = section.Label;

            //Parse Out the image source
            //NOTE: For the Mapping to work with guids as keys, pass them in as strings that the map thinks are anys. 
            result.Content = this.getMediaSourceFromImageID(section.Content);

            return result;
        },
        getMediaSourceFromImageID(imgID: any): string{
            var result = this.mediaIDMap.get(imgID);
            return "" + result;
        },
        getArrowSrc(){
            var isDev = true;
            return isDev ? "src/staticImages/arrow-right.svg" : process.resourcesPath + "/src/staticImages/arrow-right.svg";
        },
        flip(){
            this.flipped = true;
        },
        rate(rating: number){
            
            var detail = this.activeCardDetail;
            if(   rating == 1  ){ detail.SkillLevel = detail.SkillLevel * 0.3; }
            else if(rating == 2){ detail.SkillLevel = detail.SkillLevel * 0.6; }
            else if(rating == 3){ detail.SkillLevel = detail.SkillLevel * 0.9; }
            else if(rating == 4){ detail.SkillLevel = detail.SkillLevel * 1.3; }
            else if(rating == 5){ detail.SkillLevel = detail.SkillLevel * 1.6; }

            this.cardDetailQueue.push(detail);
            this.flipped = false;
            this.activeCardDetail = this.cardDetailQueue.pop();
        },
        exit() {
            console.log("Bye");
            this.cardDetailQueue.push(this.activeCardDetail);
            this.controller.SaveCardDetails(Guid.parse(this.setID), this.cardDetailQueue);

            var routePath = "/setPage/" + this.setID;
            this.$router.push({path: routePath});
        }
    },
    created(){
        this.setID = this.$router.currentRoute.params.setID;
        this.controller = new StudyPageController();
        var setGuid = Guid.parse(this.setID);
        this.cardDetailQueue = this.controller.GetCardDetailQueue(setGuid);
        this.mediaIDMap = this.controller.GetMediaIDMap(this.cardDetailQueue);

        this.activeCardDetail = this.cardDetailQueue.pop();
    }
})
</script>

<style scoped>
    .sections{
        display: flex;
        justify-content: center;
    }
    .arrowSection{
        width: 62px;
        display: flex;
    }
    .arrow-container{
        width: 64px;
        display: flex;
    }
    .arrow{
        margin: auto;
        height: 60px;
        width: 100%;
    }
    .rate_flipContainer{
        padding: 50px;
        margin: auto;
        display: flex;
        justify-content: center;
    }
    .botton-container{
        background-color: lightgray;
        border-radius: 15px;
        display: flex;
        justify-content: center;
        box-shadow: 3px 3px 10px rgba(50, 50, 50, 0.65);
    }
    .flip-button-container{
        height: 40px;
        width: 100px;
    }
    .botton-container:hover{
        background-color: gray;
    }
    .button-text{
        margin: auto;
    }
    .confidenceBar{
        height: 50px;
        width: 500px;
        display: flex;
        border-radius: 15px;
        border-color: darkcyan;
        background-color: black;
        overflow: hidden;
        margin: auto;
        border-width: 2px;
        border-style: solid;
    }
    .confidenceBarItem{
        width: 20%;
        display: flex;
    }
    .confidenceBarItem:hover{
        opacity: 0.7;
    }
    
    .confidenceBarItemNumber{
        margin: auto;
    }
    .rank_1{background-color: red;}
    .rank_2{background-color: orange;}
    .rank_3{background-color: yellow;}
    .rank_4{background-color: greenyellow;}
    .rank_5{background-color: lightgreen;}

    .exit-button{
        width: 150px;
        height: 30px;
        padding: 10px;
    }
    .exitText{
        margin: auto;
    }
</style>
