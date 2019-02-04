<template>
    <div class="button-container">
        <span class="button-text">
            {{ cardName }}
        </span>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "card-selection-list-item",
    props: {
        cardID: {type: Object},
        setID: {type: String},
        cardName: {type: String}
    },
    computed:{
        
    },
    data() {
        return {
            ID: this.cardID,
            name: this.cardName
        }
    },
    methods: {

    },
    created(){

    }
})
</script>

<style scoped>
    .button-container{
        background-color: lightgray;
        margin: 5px 10px 10px 10px;
        height: 40px;
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
    }
</style>

