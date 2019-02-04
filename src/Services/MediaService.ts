import { ImageService } from "./ImageService";
import { SoundService } from "./SoundService";
import { Media } from "../domain/Entities/Media";
import { MediaQuery } from "../domain/Entities/MediaQuery";
import { MediaType } from "../domain/Entities/MediaType";
import { FileUtility } from "../repositories/localFiles";
import { Config } from "../utilities/Config";
import { Guid } from "guid-typescript";

export class MediaService{
    imageService: ImageService;
    soundService: SoundService;

    
    constructor(){
        this.imageService = new ImageService();
        this.soundService = new SoundService();
    }

    GetAllMedia(): Media[]{
        var result: Media[] = []
        result = result.concat(this.imageService.GetAllImages());
        result = result.concat(this.soundService.GetAllSounds());
        return result;
    }

    Query(query: MediaQuery): Media[]{
        var matchesSearchTarget = ((x: Media) => {return x.Name.indexOf(query.SearchTarget) > -1});
        var matchesMediaTypes = ((x: Media) => {return query.MediaTypes.indexOf(x.MediaType) > -1});
        var sortComparator;
        if(query.SortOption === "NAME") {sortComparator = ((a: Media, b: Media) => {return a.Name.toLowerCase().localeCompare(b.Name.toLowerCase())});}
        if(query.SortOption === "DATE") {sortComparator = ((a: Media, b: Media) => {return a.UploadDateTime - b.UploadDateTime});}

        var media = this.GetAllMedia();
        if(query.SearchTarget != "") {media = media.filter(m => matchesSearchTarget(m))}
        media = media.filter(m =>   matchesMediaTypes(m))
        media.sort(sortComparator);
        return media;
    }

    AddNewMedia(filePath: string): Media{
        var fileExtenstion = this.GetMediaFileExtension(filePath);
        var fileName = this.GetMediaFileName(filePath);
        var mediaFileType = this.GetMediaFileType(fileExtenstion);
        
        var mediaDestinationPath = "";
        var newMedia: Media;

        switch(mediaFileType){
            case MediaType.IMAGE:
                mediaDestinationPath = Config.IMAGES_PATH() + fileName + "." + fileExtenstion.toLowerCase(); 
                FileUtility.CopyFileToNewLocation(filePath, Config.RESOURCE_PATH() + mediaDestinationPath);
                newMedia = this.imageService.AddNewImage(Guid.create(), mediaDestinationPath, fileName, fileExtenstion);
                break;
            case MediaType.AUDIO:
                mediaDestinationPath = Config.AUDIO_PATH() + fileName + "." + fileExtenstion.toLowerCase();
                FileUtility.CopyFileToNewLocation(filePath, Config.RESOURCE_PATH() + mediaDestinationPath);
                newMedia = this.soundService.AddNewSound(Guid.create(), mediaDestinationPath, fileName, fileExtenstion);
                break;
            default:
                mediaDestinationPath = Config.IMAGES_PATH() + fileName + "." + fileExtenstion.toLowerCase(); 
                FileUtility.CopyFileToNewLocation(filePath, Config.RESOURCE_PATH() + mediaDestinationPath);
                newMedia = this.imageService.AddNewImage(Guid.create(), mediaDestinationPath, fileName, fileExtenstion);
        }
        return newMedia;
    }

    GetMediaSourceForIDs(mediaIDs: Guid[]): Map<string, string> {
        var result = new Map<string, string>();
        var filteredMedia = this.GetAllMedia().filter((x: Media) => {return mediaIDs.findIndex((y: Guid) => {return x.ID.equals(y)}) > -1})
        var mediaPath: (x: Media) => string;
        if(Config.IS_DEV()){ mediaPath = (x: Media) => {return x.Path}}
        else {               mediaPath = (x: Media) => {return x.MediaType == MediaType.IMAGE ? /*Config.IMAGES_PATH() +*/ x.Path : /*Config.AUDIO_PATH() +*/ x.Path}}
        
        filteredMedia.forEach((x: Media) => {result.set(x.ID.toString(), mediaPath(x))})

        return result;
    }

    private GetMediaFileExtension(filePath: string): string{
        var fileExtensionRegEx = /\.(.+)$/g;
        var result = fileExtensionRegEx.exec(filePath);
        if(result != null){ return result[1].toUpperCase() }
        return "";
    }

    private GetMediaFileName(filePath: string): string{
        var fileNameRegEx;
        if(Config.PLATFORM() == "WINDOWS"){fileNameRegEx = /[A-Z]{1}:\\(?:.+\\)*(.+)\.(.+)$/g}
        else/*             MAC          */{fileNameRegEx = /\/([^\/]+)\.[^\/]+/g;}
        var result = fileNameRegEx.exec(filePath);
        if(result != null){ 
            return result[1]; 
        }
        return "";
    }

    private GetMediaFileType(fileExt: string): MediaType{
        if(fileExt == 'PNG' || fileExt == 'JPG' || fileExt == 'JPEG' || fileExt == 'GIF') {return MediaType.IMAGE; }
        else if (fileExt == 'WAV' || fileExt == 'MP3') {return MediaType.AUDIO; }
        return MediaType.IMAGE; //Default
    }
}