import { Role } from "@prisma/client";

export interface ExtendedRole extends Role {
  allowedModels: {
    modelName: string;
    permissions: string[];
  }[]
}