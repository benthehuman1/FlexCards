<template>
    <div class="CardDetailPreviewRoot">
        <div class="add-button" @click="addNewCardDetail">
            <font-awesome-icon icon="plus" class="ftA-plus"></font-awesome-icon>
        </div>
        
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import AudioPlayer from './../Controlls/AudioPlayer.vue';
export default Vue.extend({
    name: "add-card-detail",
    components: {FontAwesomeIcon, AudioPlayer},
    methods:{
        addNewCardDetail(){
            this.$emit("newCardDetail");
        }
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
    }
    .from_to_section{
        width: 45%;
        position: relative;
        display: flex;
    }
    .arrowSection{
        width: 10%;
        display: flex;
    }
    .arrow{
        height: 60px;
        margin: auto;
    }
    .previewImage{
        height: 90%;
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
    .add-button{
        width: 66px;
        height: 66px;
        background-color: lightgray;
        margin: auto;
        border-radius: 50%;
        display: flex;
        box-shadow: 0px 0px 14px 3px rgba(20, 20, 20, 0.5);
    }
    .add-button:hover{
        background-color: gray;
        box-shadow: 0px 0px 14px 6px rgba(20, 20, 20, 0.7);
    }
    .ftA-plus{
        margin: auto;
        width: 65%;
        height: 65%;
    }
    
</style>