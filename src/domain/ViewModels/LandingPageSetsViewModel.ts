import { Set } from "../Entities/Set";

export class LandingPageSetsViewModel{
    sets: Set[];

    constructor(sets: Set[]){
        this.sets = sets;
    }
}