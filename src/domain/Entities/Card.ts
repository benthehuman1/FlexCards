import { Guid } from "guid-typescript";

export class Card{
    ID: Guid;
    Name: string;

    constructor(){
        this.ID = Guid.createEmpty();
        this.Name = "";
    }
}