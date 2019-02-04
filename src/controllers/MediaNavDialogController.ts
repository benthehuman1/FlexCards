import { MediaQuery } from "../domain/Entities/MediaQuery";
import { MediaType } from "../domain/Entities/MediaType";
import { MediaService } from "../Services/MediaService";
import { Media } from "../domain/Entities/Media";
import {remote} from "electron"

export class MediaNavDialogController{
    
    mediaService: MediaService;

    constructor(){
        this.mediaService = new MediaService();
    }

    public static DEFAULT_MEDIA_QUERY(){
        var query = new MediaQuery()
        query.SearchTarget = "";
        query.MediaTypes = [MediaType.IMAGE, MediaType.AUDIO];
        query.ShowOption = "ALL";
        query.SortOption = "NAME";
        return query;
    }

    SelectFile(): string | undefined{
        var result = remote.dialog.showOpenDialog(
            {
                properties: ['openFile'],
                filters: [
                    { name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'gif'] },
                    { name: 'Audio', extensions: ['wav', 'mp3'] }]
            }
        );
        if(result === undefined) {return undefined; }
        return result[0];
    }

    AddNewMedia(mediaFilePath: string){
        this.mediaService.AddNewMedia(mediaFilePath);
    }

    QueryMedia(query: MediaQuery): Media[]{
        return this.mediaService.Query(query);
    }

    QueryDefault(): Media[]{
        return this.mediaService.Query(MediaNavDialogController.DEFAULT_MEDIA_QUERY());
    }

}