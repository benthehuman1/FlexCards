import { JsonRepository } from "./JsonRepository";
import { Guid } from "guid-typescript";
import { Image } from "../domain/Entities/Image";
import { MediaType } from "../domain/Entities/MediaType";
import { Config } from "../utilities/Config";

export class ImageRepository extends JsonRepository{
    constructor(){
        super("src/data/Images.json");
    }
    private getImageSourceFromEntity(image: any): string {return Config.RESOURCE_PATH() + image.Path;}
    
    GetImageSourceForIDs(imageIDs: Guid[]): Map<Guid, string> {
        var result = new Map<Guid, string>();
        var containsID = function(id: string){ return imageIDs.indexOf(Guid.parse(id)) > -1}
        var releventImageJson = <Array<any>> this.Data.Images.filter((image: any) => containsID)
        let ME = this;
        
        releventImageJson.forEach(function(img: any){
            result.set(img.ID, ME.getImageSourceFromEntity(img));
        });

        return result;
    }

    GetImageSourceForID(imageID: Guid): string | undefined{
        var index = this.Data.Images.indexOf(imageID.toString());
        return (index > -1) ? this.getImageSourceFromEntity(this.Data.Images[index]) : undefined;
    }

    GetAllImages(): Image[]{
        var result: Image[] = [];
        this.Data.Images.forEach(function(img: any){
            var image = new Image();
            image.ID = Guid.parse(img.ID);
            image.Name = img.Name;
            image.Path = Config.RESOURCE_PATH() + img.Path;
            image.FileFormat = img.FileFormat;
            image.MediaType = MediaType.IMAGE;
            image.UploadDateTime = img.UploadDateTime;

            image.Width = img.Width;
            image.Height = img.Height
            result.push(image)
        });
        return result;
    }

    AddNewImage(img: Image): void{
        this.Data.Images.push(img);
        this.saveData();
    }

}