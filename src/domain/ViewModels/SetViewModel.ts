import { Card } from "../Entities/Card";

export class SetViewModel{
    Name: string;
    Cards: Card[];
    CardsFilePath: string;

    constructor(){
        this.Name = "";
        this.Cards = [];
        this.CardsFilePath = "";
    }
}