import { Prisma, Role } from "@prisma/client";

export interface IRoleService {
  count(args: Prisma.RoleCountArgs): Promise<number>;
  findMany(args: Prisma.RoleFindManyArgs): Promise<Role[]>;
  findUnique(args: Prisma.RoleFindUniqueArgs): Promise<Role | null>
  create(args: Prisma.RoleCreateArgs): Promise<Role>;
  update(args: Prisma.RoleUpdateArgs): Promise<Role>;
  delete(id: number): Promise<Role>;
}