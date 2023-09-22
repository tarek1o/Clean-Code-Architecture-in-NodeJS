import {IRoleService} from "../interfaces/IServices/IRoleService"
import {IRoleRepository} from "../interfaces/IRepositories/IRoleRepository"

export class RoleService implements IRoleService {
    constructor(private roleRepository: IRoleRepository) {
        
    }
}