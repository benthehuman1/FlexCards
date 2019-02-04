import { Config } from "../utilities/Config";

export class StaticResourcesRepository{
    public static ImageNotFoundSource(): string {return Config.RESOURCE_PATH() + "src/staticImages/ImageNotFound.png"}
}