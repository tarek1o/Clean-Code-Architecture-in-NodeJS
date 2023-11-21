import { Prisma } from "@prisma/client";
import { ExtendedUser } from "../../types/ExtendedUser";

export interface IUserService {
  count(args: Prisma.UserCountArgs): Promise<number>;
  findMany(args: Prisma.UserFindManyArgs): Promise<ExtendedUser[]>;
  findUnique(args: Prisma.UserFindUniqueArgs): Promise<ExtendedUser | null>
  findFirst(args: Prisma.UserFindFirstArgs): Promise<ExtendedUser | null> 
  create(args: Prisma.UserCreateArgs): Promise<ExtendedUser>;
  update(args: Prisma.UserUpdateArgs): Promise<ExtendedUser>;
  delete(id: number): Promise<ExtendedUser>;
}