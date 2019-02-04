import { Guid } from "guid-typescript";
import { ImageRepository } from "../repositories/ImageRepository";
import { Image } from "../domain/Entities/Image";
import { StaticResourcesRepository } from "../repositories/StaticResourcesRepository";
import { MediaType } from "../domain/Entities/MediaType";
import { nativeImage} from 'electron'

export class ImageService{
    
    imageRepo: ImageRepository;

    constructor(){
        this.imageRepo = new ImageRepository;
    }
    GetImageSourceForIDs(imageIDs: Guid[]): Map<Guid, string> {
        return this.imageRepo.GetImageSourceForIDs(imageIDs);
    }

    GetAllImages(): Image[]{
        return this.imageRepo.GetAllImages();
    }
    
    GetImageSourceForID(imageID: Guid): string{
        var result = this.imageRepo.GetImageSourceForID(imageID);
        return result === undefined ? StaticResourcesRepository.ImageNotFoundSource() : result;
    }

    AddNewImage(id: Guid, filePath: string, fileName: string, fileFormat: string): Image{
        var model = this.GenerateNewImageModel(id, filePath, fileName, fileFormat);
        this.imageRepo.AddNewImage(model);
        return model;
    }
    
    private GenerateNewImageModel(id: Guid, filePath: string, fileName: string, fileFormat: string): Image{
        
        
        var result =        new Image();
        result.ID =         id;
        result.Path =       filePath;
        result.Name =       fileName;
        result.FileFormat = fileFormat;
        result.MediaType =  MediaType.IMAGE;
        
        var imgSize =   nativeImage.createFromPath(filePath).getSize();
        result.Height = imgSize.height;
        result.Width =  imgSize.width;
        
        return result;
    }
}