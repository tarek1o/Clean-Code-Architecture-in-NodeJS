import {IUserService} from "../interfaces/IServices/IUserService"
import {IUserRepository} from "../interfaces/IRepositories/IUserRepository"
import { IFindOptions } from "../interfaces/IInput/IFindOptions";
import { inject, injectable } from "inversify";

@injectable()
export class UserService implements IUserService {
    constructor(@inject('IUserRepository') private userRepository: IUserRepository) {}

    count(findOptions: IFindOptions): Promise<number> {
        return this.userRepository.count(findOptions);
    }
}