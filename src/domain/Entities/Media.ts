import { Guid } from "guid-typescript";
import { MediaType } from "./MediaType";

export abstract class Media{
    ID: Guid;
    Path: string;
    Name: string;
    FileFormat: string;
    MediaType: MediaType;
    UploadDateTime: number; //Unix Epoc

    constructor(){
        this.ID = Guid.createEmpty();
        this.Path = '';
        this.Name = '';
        this.FileFormat = '';
        this.MediaType = MediaType.IMAGE;
        this.UploadDateTime = Date.now();
    }
}