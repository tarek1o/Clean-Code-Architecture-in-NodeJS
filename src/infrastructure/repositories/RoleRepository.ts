import { Prisma, Role } from "@prisma/client";
import { injectable } from "inversify";
import {IRoleRepository} from "../../application/interfaces/IRepositories/IRoleRepository"
import prisma from "../../domain/db";

@injectable()
export class RoleRepository implements IRoleRepository {
  constructor() {}

  count(args: Prisma.RoleCountArgs): Promise<number> {
    return prisma.role.count(args)
  }

  findMany(args: Prisma.RoleFindManyArgs): Promise<Role[]> {
    return prisma.role.findMany(args);
  }

  findUnique(args: Prisma.RoleFindUniqueArgs): Promise<Role | null> {
    return prisma.role.findUnique(args);
  }

  create(args: Prisma.RoleCreateArgs): Promise<Role> {
    return prisma.role.create(args);
  }

  update(args: Prisma.RoleUpdateArgs): Promise<Role> {
    return prisma.role.update(args);
  }

  delete(id: number): Promise<Role> {
    return prisma.role.delete({
      where: {
        id,
      }
    });
  }
}