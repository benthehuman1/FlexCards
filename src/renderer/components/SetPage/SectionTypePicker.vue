<template>
    <div class= "picker-container">
        <div class="option" @click="click_text(); selectOption();" v-bind:class="{ 'option-left-pressed': textSelected }">
            <span class="option-text">Text</span>
        </div>
        <div class="option" @click="click_image(); selectOption();" v-bind:class="{ 'option-center-pressed': imageSelected }">
            <span class="option-text">Image</span>
        </div>
        <div class="option" @click="click_audio(); selectOption();" v-bind:class="{ 'option-right-pressed': audioSelected }">
            <span class="option-text">Audio</span>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { CardDetailSectionType } from '../../../domain/Entities/CardDetailSectionType';
export default Vue.extend({
    name: "section-type-picker",
    components: {FontAwesomeIcon},
    data() {
        return {
            detailSectionType: CardDetailSectionType.TEXT
            
        }
    },
    props: {
        sectionType: Number
    },
    computed:{
        imageSelected():boolean {return this.sectionType == CardDetailSectionType.IMAGE},
        audioSelected():boolean {return this.sectionType == CardDetailSectionType.AUDIO},
        textSelected() :boolean {return this.sectionType == CardDetailSectionType.TEXT}
    },

    methods: {
        click_image(){
            this.detailSectionType = CardDetailSectionType.IMAGE
        },
        click_audio(){
            this.detailSectionType = CardDetailSectionType.AUDIO
        },
        click_text(){
            this.detailSectionType = CardDetailSectionType.TEXT
        },
        selectOption(){
            this.$emit("select", this.detailSectionType);
        }
    },
    created(){
        this.detailSectionType = this.sectionType;
    }
})
</script>

<style scoped>
    .picker-container{
        width: 150px;
        height: 18px;
        background-color: lightgray;
        display: flex;
        overflow: hidden;
        box-shadow: 1px 1px 3px rgba(50, 50, 50, 0.65);
        border-radius: 5px;
        margin: auto;
        position: absolute;
        bottom: 6px;
        left: 50%;
        margin-left: -75px;
    }
    .option{
        width: 33.33%;
        height: 100%;
        display: flex;
    }
    .option-text{
        margin: auto;
        font-size: 14px;
    }
    
    .option-left-pressed{
        box-shadow: inset 0px 2px 3px grey, inset 2px 2px 3px grey, inset 2px -2px 3px grey;
        background-color: darkgray; 
    }
    .option-center-pressed{
        box-shadow: inset 0px 2px 3px grey, inset 0px -2px 3px grey; 
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