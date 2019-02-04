import { CardDetailSectionType } from "./CardDetailSectionType";
export class CardDetailSection { 
    Type: CardDetailSectionType;
    Content: string; //actual content, or source.
    Label: string;

    constructor(){
        this.Content = '';
        this.Label = '';
        this.Type = CardDetailSectionType.TEXT
    }
}