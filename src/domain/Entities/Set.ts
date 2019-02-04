import { Guid } from "guid-typescript";

export class Set{
    Name: string;
    FilePath: string;
    CardsPath: string;
    ID: Guid;

    constructor(){
        this.Name = '';
        this.FilePath = '';
        this.CardsPath = '';
        this.ID = Guid.createEmpty();
    }
}