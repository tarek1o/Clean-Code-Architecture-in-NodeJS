import { Prisma, Role } from "@prisma/client"
import {inject, injectable } from "inversify"
import slugify from "slugify"
import {IRoleService} from "../interfaces/IServices/IRoleService"
import {IRoleRepository} from "../interfaces/IRepositories/IRoleRepository"

@injectable()
export class RoleService implements IRoleService {
	constructor(@inject('IRoleRepository') private roleRepository: IRoleRepository) {}
	
	count(args: Prisma.RoleCountArgs): Promise<number> {
		return this.roleRepository.count(args);
	}

	findMany(args: Prisma.RoleFindManyArgs): Promise<Role[]> {
		return this.roleRepository.findMany(args);
	}

	findUnique(args: Prisma.RoleFindUniqueArgs): Promise<Role | null> {
		return this.roleRepository.findUnique(args);
	}

	create(args: Prisma.RoleCreateArgs): Promise<Role> {
		args.data.slug = slugify(args.data.name, {trim: true, lower: true});
		return this.roleRepository.create(args);
	}

	update(args: Prisma.RoleUpdateArgs): Promise<Role> {
		if(args.data.name) {
			args.data.slug = slugify(args.data.name.toString(), {trim: true, lower: true});
		}
		return this.roleRepository.update(args);
	}

	delete(id: number): Promise<Role> {
		return this.roleRepository.delete(id);
	}
}