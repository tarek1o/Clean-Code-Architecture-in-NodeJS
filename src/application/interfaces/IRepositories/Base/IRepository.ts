import { IFindOptions } from "../../IInput/IFindOptions";

export interface IRepository {
    count(findOptions: IFindOptions): Promise<number>;
}