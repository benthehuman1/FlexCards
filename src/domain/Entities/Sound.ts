import { Guid } from "guid-typescript";
import { Media } from "./Media";
import { MediaType } from "./MediaType";

export class Sound extends Media{
    Length: number; //Seconds

    constructor(){
        super();
        this.ID = Guid.createEmpty();
        this.Path = '';
        this.Name = '';
        this.FileFormat = '';
        this.MediaType = MediaType.IMAGE;
        this.Length = 10;
    }
}