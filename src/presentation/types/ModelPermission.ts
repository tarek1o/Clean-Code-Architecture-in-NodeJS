export type AllowedModel = "User" | "Role" | "Instructor" | "Student";

export const AllowedModels = {
  Users: 'user',
  Roles: 'role',
  Instructors: 'instructor',
  Students: 'student'
}

export const Permissions = {
  Read: 'get',
  Create: 'post',
  Update: 'patch',
  Delete: 'delete'
}

Object.freeze(AllowedModels);
Object.freeze(Permissions);