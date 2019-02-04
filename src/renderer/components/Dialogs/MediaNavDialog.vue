<template>
    <div id= "dialog-background">
        <div class="blur"></div>
        <div class="dialog-container blur">
            <div class="dialog-controls">
                <span class="dialog-header">Media Navigation</span>
                <font-awesome-icon icon="times" class="ftA-cancel" @click="close()"></font-awesome-icon>
                </div>
            <div class="list-options">
                <div class="options-section">
                    <span class="option">
                        <span>Type:</span>
                        <multi-picker-media-nav v-on:select="updateQuery_MediaTypes" class="option-controll"></multi-picker-media-nav>
                    </span>
                    <span class="option">
                        <span>Sort By:</span>
                        <dropdown-media-nav-sorting v-on:select="updateQuery_SortOption" class="option-controll"></dropdown-media-nav-sorting>
                    </span>
                </div>
                <div class="options-section">
                    <input type="text" class="search-bar" v-model="searchTerm" @change="updateQuery_SearchTarget">
                    <font-awesome-icon icon="search" class="ftA-search" @click="mediaSearch"></font-awesome-icon>
                </div>
            </div>
            <div class="list-container">
                <media-nav-item ref="mediaItem" v-for="(mediaItem, index) in this.media" :key="mediaItem.ID.toString()" :media = "mediaItem" v-on:selected="mediaSelected(index)" v-on:deselected="mediaDeselected(index)"></media-nav-item>
            </div>
            <div class="media-info-footer">
                <div class="media-footer-section">
                    <span class="selected-media-name">{{ this.selectedMediaName }}</span>
                </div>
                <div class="media-footer-section">
                    <div class="button" v-if="isMediaSelected" @click="selectMedia"> 
                        <span class="dialog-button-text">Select</span>
                        <font-awesome-icon icon="check"></font-awesome-icon>
                    </div>
                    <div class="button" @click="openFileDialog()">
                        <span class="dialog-button-text">Add</span>
                        <font-awesome-icon icon="plus"></font-awesome-icon>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import MultiPickerMediaNav from "../Controlls/MultiPickerMediaNav.vue"
import DropdownMediaNavSorting from "../Controlls/DropdownMediaNavSorting.vue"
import DropdownMediaNavFilter from "../Controlls/DropdownMediaNavFilter.vue"
import MediaNavItem from "./MediaNavItem.vue"
import { Media } from '../../../domain/Entities/Media';
import { MediaSelection } from '../../../domain/Entities/MediaSelection';
import { MediaNavDialogController } from '../../../controllers/MediaNavDialogController';
import { MediaQuery } from '../../../domain/Entities/MediaQuery';
import { MediaType } from '../../../domain/Entities/MediaType';

export default Vue.extend({
    name: "media-nav-dialog",
    components: {MultiPickerMediaNav, DropdownMediaNavSorting, DropdownMediaNavFilter, FontAwesomeIcon, MediaNavItem},
    
    computed:{
        selectedMedia(): Media{
            return this.media[this.selectedIndex];
        },
        selectedMediaName(): string{
            if(this.selectedIndex == -1){return "";}
            var selectedMedia = this.selectedMedia;
            return selectedMedia.Name + "." + selectedMedia.FileFormat.toLowerCase();
        },
        isMediaSelected(): boolean{
            return this.selectedIndex != -1;
        }
    },
    data(){
        return{
            mediaController: {} as MediaNavDialogController,
            media: [] as Media[],
            currentQuery: {} as MediaQuery,
            searchTerm: "",
            selectedIndex: -1
        }
    },
    methods: {
        close(){
            this.$emit('close-dialog')
        },
        openFileDialog(){
            var selectedFile = this.mediaController.SelectFile();
            if(selectedFile !== undefined){ this.addNewFile(selectedFile); }
        },
        addNewFile(file: string){
            this.mediaController.AddNewMedia(file);
            this.media = this.mediaController.QueryDefault();
        },
        updateQuery_MediaTypes(event_selections: any /* imageSelected: bool, audioSelected: bool  */){
            this.currentQuery.MediaTypes = [];
            if(event_selections.imageSelected){this.currentQuery.MediaTypes.push(MediaType.IMAGE)}
            if(event_selections.audioSelected){this.currentQuery.MediaTypes.push(MediaType.AUDIO)}
        },
        updateQuery_SortOption(option: string /*NAME or DATE*/){
            this.currentQuery.SortOption = option;
        },
        updateQuery_SearchTarget(){
            this.currentQuery.SearchTarget = this.searchTerm;
        },
        mediaSearch(){
            this.runMediaQuery();
        },
        runMediaQuery(){
            this.media = this.mediaController.QueryMedia(this.currentQuery);
            var media = this.$refs.mediaItem as any[]; //MediaNavItem

            //Clear Selections
            media.forEach((x: any) => { x.deselect(); });
            this.selectedIndex = -1;
        },
        mediaSelected(index: number){
            var media = this.$refs.mediaItem as Vue[];

            var item =  media[this.selectedIndex] as any; //MediaNavItem
            //Deselect Previous Item
            if(this.selectedIndex != -1){
                item.deselect();
                this.selectedIndex = -1;
            }
            this.selectedIndex = index;
        },
        mediaDeselected(index: number){
            if(index == this.selectedIndex){this.selectedIndex = -1;}
        },
        selectMedia(){
            this.$emit('selected', new MediaSelection(this.selectedMedia.ID, this.selectedMedia.Path, this.selectedMedia.MediaType));
            this.close();
        }
    },
    created(){
        this.mediaController = new MediaNavDialogController();
        this.currentQuery = MediaNavDialogController.DEFAULT_MEDIA_QUERY();
        this.media = this.mediaController.QueryMedia(this.currentQuery);
        
    }
})
</script>

<style scoped>
    #dialog-background{
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100vw;
        height: 100vh;
        display: flex;
        background-color: rgba(0,0,0,0.3);
        z-index: 10;
    }
    
    .dialog-container{
        width: 300px;
        height: 450px;
        background: rgb(163, 234, 254);
        margin: auto;
        border-radius: 10px;
        padding: 4px;
        z-index: 10;
        box-shadow: 0px 0px 8px 4px rgba(0,0,0,0.5);
    }
    
    .dialog-controls{
        height: 5%;
        display: flex;
        justify-content: flex-end;
    }
    .list-options{
        height: 15%;
        justify-content: space-around;
    }
    .list-container{
        height: 63%;
        overflow-y: auto;
        overflow-x: auto;
        padding: 5px;

    }
    .media-info-footer{
        height: 13%;
    }
    .options-section{
        height: 50%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 5px;
        padding-left: 5px;
    }
    .search-bar{
        width: 80%;
        height: 22px;
        border-style: solid;
        border-width: 2px;
        border-color: darkgrey;
        font-size: 16px;
        border-radius: 5px;
    }
    .search-bar:focus{
        outline-width: 0;
    }
    .ftA-search{
        width: 10%;
        height: 22px;
    }
    .ftA-cancel{
        height: 22px;
        width: 22px;
    }
    .dialog-header{
        width: 90%;
        text-align: center;
    }
    .option{
        display: flex;
        align-items: center;
    }
    .option-controll{
        margin-left: 5px;
    }
    .media-footer-section{
        height: 50%;
        padding-left: 5px;
        padding-right: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .media-name-edit{
        width: 80%;
        height: 22px;
        background-color: rgba(0,0,0,0);
        border: none;
        font-size: 16px;
        text-align: center;
    }
    .selected-media-name{
        width: 100%;
        height: 22px;
        font-size: 16px;
        text-align: center;
        background-color: rgba(0,0,0,0);
    }
    .media-name-edit:focus{
        outline-width: 0;
    }
    .button{
        width: 100%;
        border-radius: 5px;
        background-color: lightgray;
        height: 100%;
        box-shadow: 1px 1px 3px rgba(50, 50, 50, 0.65);
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0px 5px;
    }
    .button:hover{
        background-color: gray;
    }
    .dialog-button-text{
        margin-right: 15px;
        font-size: 20px;
    }

</style>