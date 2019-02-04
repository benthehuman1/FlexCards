import { JsonRepository } from "./JsonRepository";
import { Guid } from "guid-typescript";
import { Set } from "../domain/Entities/Set";

export class MainDataRepository extends JsonRepository{
    constructor(){
        super("src/data/MainData.json");
    }

    GetSetByID(ID: Guid): Set{
        var result = new Set();
        var setData: any = this.Data.Sets.filter((set: any) => set.ID == ID.toString())[0];

        result.Name = setData.Name;
        result.FilePath = setData.FilePath;
        result.CardsPath = setData.CardsPath;
        result.ID = setData.ID;

        return result;
    }
    
    GetSetFilePathByID(ID: Guid): string{
        var setData: any = this.Data.Sets.filter((set: any) => set.ID == ID.toString())[0];
        return setData.CardsPath;
    }


    GetAllSets(): Set[]{
        var mapJsonSetToEntity = function(json: any): Set{
            var set = new Set();
            set.Name = json.Name;
            set.FilePath = json.Name;
            set.CardsPath = json.CardsPath;
            set.ID = json.ID;

            return set;
        }

        return this.Data.Sets.map((json: any) => mapJsonSetToEntity(json));
    }

    AddSet(newSet: Set): void{
        this.Data.Sets.push(newSet);
        this.saveData();
    }

    DeleteSet(setID: Guid){
        var isTargetSet = (set: any) => {return setID.toString() == "" + set.ID}
        for(var i = 0; i < this.Data.Sets.length; i++){
            if(isTargetSet(this.Data.Sets[i])){
                this.Data.Sets.splice(i, 1);
                this.saveData();
                return;
            }
        }
    }
}