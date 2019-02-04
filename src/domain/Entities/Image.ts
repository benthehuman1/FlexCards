import { Guid } from "guid-typescript";
import { Media } from "./Media";
import { MediaType } from "./MediaType";

export class Image extends Media{
    Width: number;
    Height: number;

    constructor(){
        super();
        this.ID = Guid.createEmpty();
        this.Path = '';
        this.Name = '';
        this.FileFormat = '';
        this.MediaType = MediaType.IMAGE;
        this.Width = 100;
        this.Height = 100;
    }
}