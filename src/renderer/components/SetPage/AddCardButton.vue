<template>
    <div class="button-container" @click="click()">
        <span v-if="!this.isEditing" class="button-text">+</span>
        <div v-else-if="this.isEditing && !this.isChooseNewOrClone" class="cardName-text-container">
            <font-awesome-icon icon="times" class="ftA-Cancel" v-on:click.stop="click_editCancel()"/>
            <input type="text" v-model="cardName" class="nameInput" autofocus>
            <font-awesome-icon icon="check" class="ftA-Check" v-on:click.stop="click_editConfirm()"/>
        </div>
        <span v-else>
            <span v-on:click.stop="click_editNew()">New</span> 
            or 
            <span v-on:click.stop="click_editClone()">Clone</span>
        </span>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default Vue.extend({
    name: "add-card-button",
    components: { FontAwesomeIcon },
    props: {
        
    },
    computed:{
        
    },
    data() {
        return {
            isEditing: false,
            isChooseNewOrClone: false,
            cardName: "Card Name"
        }

    },
    methods: {
        click(){
            if(!this.isEditing) {this.isEditing = true;}
        },
        click_editCancel(){
            this.exitEdit();
            
        },
        click_editConfirm(){
            this.isChooseNewOrClone = true;
        },
        click_editNew(){
            this.$emit('addCard_New', this.cardName);
            this.exitEdit();
        },
        click_editClone(){
            this.$emit('addCard_Clone', this.cardName);
            this.exitEdit();
        },
        exitEdit(){
            this.isEditing = false;
            this.isChooseNewOrClone = false;
        }
    },
    created(){

    }
});
</script>

<style scoped>
    .ftA-Check{
        color: green;
        width: 10%;
        height: 100%;
    }
    .ftA-Cancel{
        color: #aa0000;
        width: 10%;
        height: 100%;
    }
    .cardName-text-container{
        display: flex;
        justify-content: center;
    }

    .button-container{
        background-color: lightgray;
        margin: 10px;
        height: 40px;
        border-radius: 15px;
        display: flex;
        justify-content: center;
        box-shadow: 3px 3px 10px rgba(50, 50, 50, 0.65);
        margin-bottom: 20px;
    }
    .button-container:hover{
        background-color: gray;
    }
    .button-text{
        margin: auto;
        font-size: 24px;
    }
    .nameInput{
        border: none;
        font-size: 16px;
        background-color: rgba(0, 0, 0, 0.00);
        text-align: center;
        width: 75%;
    }
    .nameInput:focus{
        outline-width: 0;
    }
</style>