import bcrypt from "bcrypt"
import prisma from "../../domain/db"
import { AllowedModels, Permissions } from "../../presentation/types/ModelPermission";

export const upsertMainItemsIntoDB = async () => {
  const {firstName, lastName, email, password} = process.env;

  const allowedModelsForInstructor = [
    {
      modelName: AllowedModels.Users,
      permissions: [Permissions.Read, Permissions.Create, Permissions.Update, Permissions.Delete]
    },
    {
      modelName: AllowedModels.Instructors,
      permissions: [Permissions.Read, Permissions.Create, Permissions.Update, Permissions.Delete]
    },
    {
      modelName: AllowedModels.Students,
      permissions: [Permissions.Read]
    },
  ];

  const allowedModelsForStudent = [
    {
      modelName: AllowedModels.Users,
      permissions: [Permissions.Read, Permissions.Create, Permissions.Update, Permissions.Delete]
    },
    {
      modelName: AllowedModels.Students,
      permissions: [Permissions.Read, Permissions.Create, Permissions.Update, Permissions.Delete]
    },
    {
      modelName: AllowedModels.Instructors,
      permissions: [Permissions.Read]
    },
  ];

  const allowedModelsForSuperAdmin = [
    {
      modelName: AllowedModels.Roles,
      permissions: [Permissions.Read, Permissions.Create, Permissions.Update, Permissions.Delete]
    },
    {
      modelName: AllowedModels.Users,
      permissions: [Permissions.Read, Permissions.Create, Permissions.Update, Permissions.Delete]
    },
    {
      modelName: AllowedModels.Instructors,
      permissions: [Permissions.Read, Permissions.Create, Permissions.Update, Permissions.Delete]
    },
    {
      modelName: AllowedModels.Students,
      permissions: [Permissions.Read, Permissions.Create, Permissions.Update, Permissions.Delete]
    },
  ];

  await Promise.all([
    prisma.role.upsert({
      where: {
        slug: 'super-admin',
      },
      update: {
        allowedModels: allowedModelsForSuperAdmin
      },
      create: {
        name: 'Super Admin',
        slug: 'super-admin',
        description: "This is highly privileged and authoritative user role within a system or organization's administrative hierarchy.",        
        allowedModels: allowedModelsForSuperAdmin,
        users: {
          create: {
            firstName: firstName || "Tarek",
            lastName: lastName || "Eslam",
            email: email || "tarekeslam159@gmail.com",
            password: bcrypt.hashSync(password || "Ta123456789*", 10)
          }
        }
      },
    }),
    prisma.role.upsert({
      where: {
        slug: 'instructor',
      },
      update: {
        allowedModels: allowedModelsForInstructor    
      },
      create: {
        name: 'Instructor',
        slug: 'instructor',
        allowedModels: allowedModelsForInstructor
      },
    }),   
    prisma.role.upsert({
      where: {
        slug: 'student',
      },
      update: {
        allowedModels: allowedModelsForStudent    
      },
      create: {
        name: 'Student',
        slug: 'student',
        allowedModels: allowedModelsForStudent
      },
    })
  ]);

  console.log("The main items are upsert into the database successfully ✅");
}