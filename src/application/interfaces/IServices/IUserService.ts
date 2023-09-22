import { IFindOptions } from "../IInput/IFindOptions";

export interface IUserService {
    count(findOptions: IFindOptions): Promise<number>;
}