import bcrypt from "bcrypt"
import { Prisma } from "@prisma/client";
import { inject, injectable } from "inversify";
import {IUserService} from "../interfaces/IServices/IUserService"
import {IUserRepository} from "../interfaces/IRepositories/IUserRepository"
import { ExtendedUser } from "../types/ExtendedUser";

@injectable()
export class UserService implements IUserService {
	constructor(@inject('IUserRepository') private userRepository: IUserRepository) {}

	count(args: Prisma.UserCountArgs): Promise<number> {
		return this.userRepository.count(args);
	}

	findMany(args: Prisma.UserFindManyArgs): Promise<ExtendedUser[]> {
		return this.userRepository.findMany(args);
	}

	findUnique(args: Prisma.UserFindUniqueArgs): Promise<ExtendedUser | null> {
    return this.userRepository.findUnique(args);
  }

	findFirst(args: Prisma.UserFindFirstArgs): Promise<ExtendedUser | null> {
		return this.userRepository.findFirst(args);
	}

	create(args: Prisma.UserCreateArgs): Promise<ExtendedUser> {
		args.data.password = bcrypt.hashSync(args.data.password, 10);
		return this.userRepository.create(args);
	}

	update(args: Prisma.UserUpdateArgs): Promise<ExtendedUser> {
		if(args.data.password) {
			args.data.password = bcrypt.hashSync(args.data.password.toString(), 10);
		}

		if(args.data.resetPasswordCode && (args.data.resetPasswordCode as any).code && !(args.data.resetPasswordCode as any).isVerified) {
			(args.data.resetPasswordCode as any).code = bcrypt.hashSync((args.data.resetPasswordCode as any).code.toString(), 10);
		}

		return this.userRepository.update(args);
	}

	delete(id: number): Promise<ExtendedUser> {
		return this.userRepository.delete(id);
	}
}