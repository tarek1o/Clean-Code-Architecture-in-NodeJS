import { Prisma } from "@prisma/client";
import { IRepository } from "./Base/IRepository";
import { ExtendedUser } from "../../types/ExtendedUser";

export interface IUserRepository extends IRepository<ExtendedUser> {
  findFirst(args: Prisma.UserFindFirstArgs): Promise<ExtendedUser | null>;
}