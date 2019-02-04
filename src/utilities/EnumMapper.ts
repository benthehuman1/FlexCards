import { MediaType } from "../domain/Entities/MediaType";

export class EnumMapper{
    public static MapEnum(enumInstance: any): string{
        var mt = MediaType.IMAGE;
        console.log(mt);
        return "";
    }
}