<template>
<div id="LandingPageRoot" >
  <div>
    <h1>flexCards Prototype</h1>
    <div class="setsLabel-container"><span class="setsLabel">Sets:</span></div>
    <set-select-button :key="set.ID.toString()"  v-for="set in setsViewModel.sets" :set-name="set.Name" :set-i-d="set.ID.toString()"></set-select-button>
    <add-set-button v-on:addSet="addNewSet"></add-set-button>
  </div>
  <div class="footer">
    Version for Linguisics 101 / 301. Direct any questions to bakizaric@wisc.edu
  </div>
</div>
</template>

<script lang="ts">
import Vue from "vue";
import SetSelectButton  from "./SetSelectButton.vue";
import AddSetButton  from "./AddSetButton.vue";
import { LandingPageController } from "../../controllers/landingpagecontroller";
import { LandingPageSetsViewModel } from "../../domain/ViewModels/LandingPageSetsViewModel";
import { Guid } from "guid-typescript";
import { Set } from "../../domain/Entities/Set";

export default Vue.extend({
  name: "landing-page",
  data() {
    return {
      setsViewModel: {} as LandingPageSetsViewModel,
      controller: {} as LandingPageController
    };
  },
  components: { SetSelectButton, AddSetButton },
  methods: {
    open(link: string) {
      this.$electron.shell.openExternal(link);
    },
    loadSetsViewModel(){
      this.setsViewModel = this.controller.GetAllSets();
    },
    addNewSet(event_setName: string){
  
      var newSet = new Set();
      newSet.Name = event_setName;
      newSet.ID = Guid.create();

      //These are literally so, so bad
      newSet.FilePath = "src/data/sets/" + event_setName
      newSet.CardsPath = "src/data/sets/" + event_setName + "/Cards.json"

      this.controller.CreateNewSet(newSet);
      this.loadSetsViewModel();
    }
  }, 
  created(){
    this.controller = new LandingPageController();
    this.loadSetsViewModel();
  }
});
</script>

<style scoped>
  #LandingPageRoot{
    display: flex;
    justify-content: center;
  }
  .add-set-button{
        background-color: lightgray;
        margin: 10px;
        height: 40px;
        border-radius: 15px;
        display: flex;
        justify-content: center;
        box-shadow: 3px 3px 10px rgba(50, 50, 50, 0.65);
  }
  .add-set-button:hover{
      background-color: gray;
  }
  .button-text{
      margin: auto;
  }
  .setsLabel{
    text-align: center;
    font-size: 22px;
    margin: auto;
  }
  .setsLabel-container{
    display: flex;
    height: 22px;
  }
  .footer{
    position: absolute;
    text-align: center;
    font-size: 12px;
    bottom: 4px;
  }
</style>
