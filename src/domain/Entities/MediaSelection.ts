import { Guid } from "guid-typescript";
import { MediaType } from "./MediaType";

export class MediaSelection{
    ID: Guid;
    Path: string;
    Type: MediaType;

    constructor(id: Guid, path: string, type: MediaType){
        this.ID = id;
        this.Path = path;
        this.Type = type;
    }
}