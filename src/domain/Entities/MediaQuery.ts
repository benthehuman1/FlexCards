import { MediaType } from "./MediaType";

export class MediaQuery{
    SearchTarget: string;
    MediaTypes: MediaType[];
    SortOption: string; //"NAME" or "DATE"
    ShowOption: string; //"SET" or "ALL"

    constructor(){
        this.SearchTarget = '';
        this.MediaTypes = [];
        this.SortOption = "NAME";
        this.ShowOption = "ALL";
    }
}