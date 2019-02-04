<template>
    <div id = "CardDetailsPanelRoot">
        <div class="cardNameContainer" @mouseenter="startNameHover" @mouseleave="endNameHover">
            <span class="cardName">{{ this.cardDetails.cardName }}</span>
            <div class="delete-button-container" v-if="this.isNameHovering">
                <div class="delete-button" @click="deleteThisCard">
                    <font-awesome-icon icon="times" class="ftA-times"></font-awesome-icon>
                </div>
            </div>
        </div>
        <div>
            <card-detail-preview :key="detail.ID.toString()" v-for="(detail, index) in this.cardDetails.details" :cardDetail="detail" :mediaMap="cardDetails.mediaIDMap" v-on:saveDetail="saveDetail" v-on:saveAsNew="saveNewCardDetail" v-on:deleteDetail="deleteDetailSingle(detail, index)" :isNew="isDetailNew(detail)"></card-detail-preview>
            <add-card-detail v-on:newCardDetail="addNewCardDetail"></add-card-detail>
        </div>
    </div>
</template>

<script lang="ts">
//:key="card.ID.toString()" v-for= "card in this.setViewModel.Cards"
import Vue from 'vue'
import { SetPage_CardDetailsViewModel } from '../../../domain/ViewModels/SetPage_CardDetailsViewModel';
import { SetPageController } from '../../../controllers/SetPageController';
import { Guid } from 'guid-typescript';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import CardDetailPreview from "./CardDetailPreview.vue";
import AddCardDetail from "./AddCardDetail.vue";
import { CardDetail } from '../../../domain/Entities/CardDetail';
export default Vue.extend({
    name: "card-details-panel-root",
    props: {
        cardID: {type: Object},
    },
    computed:{
        
    },
    components: { CardDetailPreview, AddCardDetail, FontAwesomeIcon },
    data() {
        return {
            CardID: this.$route.params.cardID,
            setID: this.$route.params.id,
            cardDetails: {} as SetPage_CardDetailsViewModel,
            controller: {} as SetPageController,
            setFilePath: "",
            newnessOfCardDetails: {} as Map<Guid, boolean>,
            isNameHovering: false
        }
    },
    methods: {
        loadCardDetailsViewModel(){
            this.setFilePath = this.controller.GetSetPathByID(Guid.parse(this.setID));
            var cardID = Guid.parse(this.$route.params.cardID);
            this.cardDetails = this.controller.GetCardDetailsForCard(cardID, this.setFilePath);
        },
        saveDetail(detail: CardDetail){
            this.controller.UpdateCardDetail(detail, this.setFilePath);
        },
        addNewCardDetail(){
            var newDeet = new CardDetail() as any;
            newDeet.CardID = Guid.parse(this.CardID);
            this.cardDetails.details.push(newDeet);
            this.$emit('addCardDetail');
        },
        updateNewnessOfCardDetails(){
            var currentDetailIds = this.cardDetails.details.map((deet: CardDetail) => { return deet.ID; });
            this.newnessOfCardDetails = this.controller.GetNewnessOfCardDetails(currentDetailIds, this.setFilePath);
        },
        isDetailNew(detail: CardDetail): boolean{
            var result = this.newnessOfCardDetails.get(detail.ID);
            return result !== undefined ? result : true;
        },
        saveNewCardDetail(detail: CardDetail){
            this.controller.AddNewCardDetail(detail, this.setFilePath);
            console.log(detail);
        },
        deleteDetailSingle(detail: any, index: number){
            var ID = Guid.parse("" + detail.ID);
            this.controller.DeleteCardDetail(ID, this.setFilePath);
            this.cardDetails.details.splice(index, 1);
            this.$emit('deleteCardDetail')
        },
        deleteThisCard(){
            this.$emit("deleteCard", this.CardID);
        },
        startNameHover(){this.isNameHovering = true; },
        endNameHover(){this.isNameHovering = false; }
    },
    created(){
        this.controller = new SetPageController();
        this.loadCardDetailsViewModel();
        this.updateNewnessOfCardDetails();
    }
})
</script>

<style scoped>
    
    .cardNameContainer{
        display: flex;
        justify-content: center;
        position: relative;
        height: 38px;
    }
    .cardName{
        margin: auto;
        font-size: 36px;
    }
    #CardDetailsPanelRoot{
        margin-bottom: 20px;
    }
    .delete-button-container{
        width: 50px;
        height: 100%;
        display: flex;
        position: absolute;
        right: 10px;
    }
    .delete-button{
        width: 30px;
        height: 30px;
        margin: auto;
        background-color: lightgray;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        box-shadow: 2px 2px 6px rgba(50, 50, 50, 0.65);
    }
    .delete-button:hover{
        background-color: gray;
    }
    .ftA-times{
        width: 25px;
        height: 25px;
        margin: auto;
        color: maroon;
    }
</style>