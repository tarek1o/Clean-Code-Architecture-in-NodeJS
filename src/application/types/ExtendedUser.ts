import { User } from "@prisma/client"
import { ExtendedRole } from "./ExtendedRole";

export interface ExtendedUser extends User {
  role?: ExtendedRole;
}