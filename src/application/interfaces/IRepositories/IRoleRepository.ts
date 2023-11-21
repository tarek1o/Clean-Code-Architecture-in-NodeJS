import { Role } from "@prisma/client";
import { IRepository } from "./Base/IRepository";

export interface IRoleRepository extends IRepository<Role> {
}