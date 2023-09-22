import { injectable } from "inversify";
import { IFindOptions } from "../../application/interfaces/IInput/IFindOptions";
import {IUserRepository} from "../../application/interfaces/IRepositories/IUserRepository"
import db from "../../domain/db"

@injectable()
export class UserRepository implements IUserRepository {
    constructor() {}

    count(findOptions: IFindOptions): Promise<number> {
        return db.user.count(findOptions);
    }
}