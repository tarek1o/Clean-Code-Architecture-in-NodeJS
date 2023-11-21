import { Prisma } from "@prisma/client";
import { injectable } from "inversify";
import prisma from "../../domain/db"
import {IUserRepository} from "../../application/interfaces/IRepositories/IUserRepository"
import { ExtendedUser } from "../../application/types/ExtendedUser";

@injectable()
export class UserRepository implements IUserRepository {
	constructor() {}

  count(args: Prisma.UserCountArgs): Promise<number> {
    return prisma.user.count(args)
  }

  findMany(args: Prisma.UserFindManyArgs): Promise<ExtendedUser[]> {
    return prisma.user.findMany(args);
  }

  findUnique(args: Prisma.UserFindUniqueArgs): Promise<ExtendedUser | null> {
    return prisma.user.findUnique(args);
  }

  findFirst(args: Prisma.UserFindFirstArgs): Promise<ExtendedUser | null> {
    return prisma.user.findFirst(args);
  }

  create(args: Prisma.UserCreateArgs): Promise<ExtendedUser> {
    return prisma.user.create(args);
  }

  update(args: Prisma.UserUpdateArgs): Promise<ExtendedUser> {
    return prisma.user.update(args);
  }

  delete(id: number): Promise<ExtendedUser> {
    return prisma.user.delete({
      where: {
        id,
      }
    });
  }
}