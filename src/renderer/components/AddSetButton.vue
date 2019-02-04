<template>
    <div class="button-container" @click="click()">
        
        <div v-if="this.isEditing" class="setName-text-container">
            <font-awesome-icon icon="times" class="ftA-Cancel" v-on:click.stop="click_editCancel()"/>
            <input type="text" v-model="setName" class="nameInput" autofocus>
            <font-awesome-icon icon="check" class="ftA-Check" v-on:click.stop="click_editConfirm()"/>
        </div>
        <span v-else class="button-text">+</span>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default Vue.extend({
    name: "add-set-button",
    components: { FontAwesomeIcon },
    props: {
        
    },
    computed:{
        
    },
    data() {
        return {
            isEditing: false,
            setName: "Set Name"
        }

    },
    methods: {
        click(){
            if(!this.isEditing) {this.isEditing = true;}
        },
        click_editCancel(){
            this.isEditing = false;
            
        },
        click_editConfirm(){
            this.isEditing = false;
            this.$emit('addSet', this.setName);
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
    .setName-text-container{
        display: flex;
        justify-content: center;
    }

    .button-container{
        background-color: lightgray;
        margin: 10px;
        height: 40px;
        width: 300px;
        border-radius: 15px;
        display: flex;
        justify-content: center;
        box-shadow: 3px 3px 10px rgba(50, 50, 50, 0.65);
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