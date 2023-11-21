import {ExtendedUser} from "../../application/types/ExtendedUser";

export abstract class UserMapper {
  static map(users: ExtendedUser[]) {
    return users.map(({password, passwordUpdatedTime, resetPasswordCode, roleId, ...rest}) => rest)
  };
}