<template>
    <div class= "m-dropdown-container">
        <select class="custom-select" v-model="selectedOption" @change="updateSortOption">
            <option value="NAME" selected="selected">Name       </option>
            <option value="DATE" >Upload Date</option>
        </select>
    </div>
</template>
<select v-model="selected">
  <!-- inline object literal -->
  <option v-bind:value="{ number: 123 }">123</option>
</select>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "dropdown-media-nav-sorting",
    data() {
        return {
            selectedOption: {} as any
        }
    },
    props: {
        
    },
    computed:{
        
    },

    methods: {
        updateSortOption(){
            this.$emit("select", this.selectedOption);
        }
    },
    created(){
        this.selectedOption = "NAME";
    }
})
</script>

<style scoped>
    .custom-select{
        background: lightgray;
        height: 25px;
        box-shadow: 1px 1px 3px rgba(50, 50, 50, 0.65);
        font: inherit;
        border: none;
        text-align-last: center;
    }
</style>