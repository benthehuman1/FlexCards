<template>
    <div id="SetPageRoute">
        <div id="header">
            <router-link to="/">Main Menu</router-link>
        
            <div class="setNameContainer" @mouseover="hoverEnter" @mouseleave="hoverLeave">
                    <span >{{setViewModel.Name}}</span>
                    <div v-if="this.isHovering" class="delete-button" @click="deleteThisSet">
                        <font-awesome-icon icon="times" class="ftA-times"></font-awesome-icon>
                    </div>
                <div class="studyButton" @click="clickStudy()" v-if="hasEnoughCardDetails"> Study! </div>
            </div>
        </div>
        
        <div id="MainContent">
            <div class="card-list">
                <div class="cardsLabel-container"><span class="cardsLabel">Cards:</span></div>
                <card-selection-list-item  :key="card.ID.toString()" v-for= "card in this.setViewModel.Cards" :cardName="card.Name" :cardID="card.ID" :setID="ID" @click.native="clickCardButton(card.ID)"></card-selection-list-item>
                <add-card-button v-on:addCard_New="addCard_New" v-on:addCard_Clone="addCard_Clone"></add-card-button>
            </div>
            <div class="card-detail-section">
                <router-view :key="$route.fullPath" v-on:deleteCard="deleteCard" v-on:addCardDetail="addDetail" v-on:deleteCardDetail="removeDetail"></router-view>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { SetViewModel } from '../../../domain/ViewModels/SetViewModel';
import { SetPageController } from "../../../controllers/SetPageController";
import { Guid } from 'guid-typescript';
import CardSelectionListItem from "./CardSelectionListItem.vue"
import AddCardButton from "./AddCardButton.vue";
import MediaNavDialog from "../Dialogs/MediaNavDialog.vue"
import { Card } from '../../../domain/Entities/Card';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
export default Vue.extend({
  name: "set-page", 
  computed:{
      hasAnyCards(): boolean{ return this.setViewModel.Cards.length > 0; },
      hasEnoughCardDetails(): boolean { return this.detailCount >= 4;}
  },
  data() {
    return {
      ID: this.$route.params.id,
      setViewModel: {} as SetViewModel,
      controller: {} as SetPageController,
      currentCardID: {} as Guid,
      isHovering: false,
      detailCount: 0
    };
  },
  components: { CardSelectionListItem, AddCardButton, MediaNavDialog, FontAwesomeIcon },
  methods: {
      getAsGuid(id: any): Guid{
          return Guid.parse("" + this.ID);
      },
      loadSetViewModel(){
          this.setViewModel = this.controller.GetSetForID(Guid.parse(this.ID));
      },
      clickCardButton(cardID: string){
          var routePath = "/setPage/" + this.ID + "/card/" + cardID;
          this.currentCardID = Guid.parse(cardID);

          this.$router.push({ path: routePath });
      },
      clickStudy(){
          var routePath = "/studyPage/" + this.ID;
          this.$router.push({path: routePath});
      },
      addCard_New(event_setName: string){
          //Back-End
          var newCard = this.controller.GenerateNewCard(event_setName);
          this.controller.AddNewCard(newCard, this.setViewModel.CardsFilePath);
          
          //Front-End
          this.setViewModel.Cards.push(newCard);
          this.clickCardButton(newCard.ID.toString());
          
      },
      deleteCard(cardID: any){
          var ID = Guid.parse(cardID);
          //Back-End
          this.controller.DeleteCard(ID, this.setViewModel.CardsFilePath);

          //Front-End
          var listCardsIds = this.setViewModel.Cards.map((card: Card) => {return card.ID.toString()});
          var indexOfDeletedCard = listCardsIds.indexOf(ID.toString());
          this.setViewModel.Cards.splice(indexOfDeletedCard, 1);

          var routePath = "/setPage/" + this.ID;
          this.$router.push({path: routePath});
      },
      addCard_Clone(event_setName: string){
          console.log("Clone: " + event_setName);
          //Back-End
          var newCard = this.controller.GenerateNewCard(event_setName);
          this.controller.AddNewCard(newCard, this.setViewModel.CardsFilePath);
          this.controller.CloneCardDetailsForCard(newCard, this.currentCardID, Guid.parse(this.ID));

          //Front-End
          this.setViewModel.Cards.push(newCard);
          this.clickCardButton(newCard.ID.toString());
      },
      hoverEnter(){this.isHovering = true;},
      hoverLeave(){this.isHovering = false;},
      deleteThisSet(){
          //Back-End
          this.controller.DeleteSet(Guid.parse(this.ID), this.setViewModel.CardsFilePath);
        
          //Front-End
          var routePath = "/";
          this.$router.push({path: routePath});

      },
      updateCardDetailCount(){ this.detailCount = this.controller.GetNumberOfDetailsForSet(Guid.parse(this.ID)) },
      addDetail(){ this.detailCount++; },
      removeDetail(){ this.detailCount--; }
  }, 
  created(){
      this.controller = new SetPageController();
      this.loadSetViewModel();
      this.updateCardDetailCount();
      console.log(this.setViewModel);
  }
})
</script>

<style>
    #MainContent{
        display: flex;
        height: 89vh;
    }
    #header{
        height: 10vh;
    }
    .card-list{
        width: 30vw;
        overflow-y: auto;
        overflow-x: auto;
    }
    .cardsLabel{
        margin: auto;
        font-size: 22px;
    }
    .cardsLabel-container{
        display: flex;
    }
    .card-detail-section{
        width: 70vw;
        height: 100%;
        overflow-y: auto;
        overflow-x: auto;
    }
    .setNameContainer{
        display: flex;
        justify-content: center;
        font-size: 40px;
        height: 50%;
        position: relative;
    }
    .studyButton{
        margin-left: 20px;
        font-size: 40px;
        background-color: lightgray;
        border-radius: 15px;
        display: flex;
        justify-content: center;
        box-shadow: 3px 3px 10px rgba(50, 50, 50, 0.65);
        position: absolute;
        right: 20px;
        font-size: 28px;
        height: 100%;
    }
    .studyButton:hover{
        background-color: gray;
    }
    .delete-button{
        width: 30px;
        height: 30px;
        margin-left: 5px;
        margin-top: 10px;
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
