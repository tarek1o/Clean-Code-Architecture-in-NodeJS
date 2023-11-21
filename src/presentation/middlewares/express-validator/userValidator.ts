import {body, param} from "express-validator";
import { MobilePhoneLocale } from "express-validator/src/options";
import ErrorExpressValidatorHandler from "../../errorHandlers/ErrorExpressValidatorHandler";
import container from '../../dependencyInjection/DI'
import { UserService } from "../../../application/services/UserService";
import { RoleService } from "../../../application/services/RoleService";

const userService = container.get<UserService>('IUserService');
const roleService = container.get<RoleService>('IRoleService');

const allowedMobilePhoneCountries: MobilePhoneLocale[] = ['am-AM' , 'ar-AE' , 'ar-BH' , 'ar-DZ' , 'ar-EG' , 'ar-EH' , 'ar-IQ' , 'ar-JO' , 'ar-KW' , 'ar-LB' , 'ar-LY' , 'ar-MA' , 'ar-OM' , 'ar-PS' , 'ar-SA' , 'ar-SY' , 'ar-TN' , 'ar-YE' , 'az-AZ' , 'be-BY' , 'bg-BG' , 'bn-BD' , 'bs-BA' , 'cs-CZ' , 'de-AT' , 'de-CH' , 'de-DE' , 'de-LU' , 'da-DK' , 'dv-MV' , 'dz-BT' , 'el-CY' , 'el-GR' , 'en-AG' , 'en-AI' , 'en-AU' , 'en-BM' , 'en-BS' , 'en-BW' , 'en-CA' , 'en-GB' , 'en-GG' , 'en-GH' , 'en-GY' , 'en-HK' , 'en-HN' , 'en-IE' , 'en-IN' , 'en-JM' , 'en-KE' , 'en-KI' , 'en-KN' , 'en-LS' , 'en-MT' , 'en-MU' , 'en-NA' , 'en-NG' , 'en-NZ' , 'en-PG' , 'en-PH' , 'en-PK' , 'en-RW' , 'en-SG' , 'en-SL' , 'en-SS' , 'en-TZ' , 'en-UG' , 'en-US' , 'en-ZA' , 'en-ZM' , 'en-ZW' , 'es-AR' , 'es-BO' , 'es-CL' , 'es-CO' , 'es-CR' , 'es-CU' , 'es-DO' , 'es-EC' , 'es-ES' , 'es-HN' , 'es-MX' , 'es-NI' , 'es-PA' , 'es-PE' , 'es-PY' , 'es-SV' , 'es-UY' , 'es-VE' , 'et-EE' , 'fa-AF' , 'fa-IR' , 'fi-FI' , 'fj-FJ' , 'fo-FO' , 'fr-BE' , 'fr-BF' , 'fr-BJ' , 'fr-CD' , 'fr-CH' , 'fr-CM' , 'fr-FR' , 'fr-GF' , 'fr-GP' , 'fr-MQ' , 'fr-PF' , 'fr-RE' , 'ga-IE' , 'he-IL' , 'hu-HU' , 'id-ID' , 'ir-IR' , 'it-CH' , 'it-IT' , 'it-SM' , 'ja-JP' , 'ka-GE' , 'kk-KZ' , 'kl-GL' , 'ko-KR' , 'ky-KG' , 'lt-LT' , 'lv-LV' , 'mg-MG' , 'mn-MN' , 'ms-MY' , 'my-MM' , 'mz-MZ' , 'nb-NO' , 'nl-AW' , 'nl-BE' , 'nl-NL' , 'ne-NP' , 'nn-NO' , 'pl-PL' , 'pt-AO' , 'pt-BR' , 'pt-PT' , 'ro-MD' , 'ro-RO' , 'ru-RU' , 'si-LK' , 'sk-SK' , 'sl-SI' , 'sq-AL' , 'sr-RS' , 'sv-SE' , 'tg-TJ' , 'th-TH' , 'tk-TM' , 'tr-TR' , 'uk-UA' , 'uz-Uz' , 'vi-VN' , 'zh-CN' , 'zh-HK' , 'zh-TW'];

export const addUserValidation = [
  body("input.firstName")
    .notEmpty().withMessage("First Name is required")
    .isString().withMessage("First Name must be string")
    .isLength({min: 3}).withMessage("Too short first name, 3 characters at least")
    .isLength({max: 32}).withMessage("Too long first name, 32 characters at most"),

  body("input.lastName")
    .notEmpty().withMessage("Last Name is required")
    .isString().withMessage("Last Name must be string")
    .isLength({min: 3}).withMessage("Too short last name, 3 characters at least")
    .isLength({max: 32}).withMessage("Too long last name, 32 characters at most"),

  body("input.email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email")
    .custom(async value => {
      const isEmailExist = await userService.findFirst({
        where: {
          email: { equals: value, mode: 'insensitive' },
        },
        select: {
          email: true
        }
      });
      if(isEmailExist) {
        throw new Error('This email already exists');
      }
      
      return true;
    }),

  body("input.password")
		.notEmpty().withMessage("Password is required")
    .isLength({min: 8}).withMessage('Password must be at least 8 characters'),
  
  body("input.mobilePhone")
		.optional()
		.isMobilePhone(allowedMobilePhoneCountries).withMessage("Invalid Mobile Phone"),
		
	body("input.whatsAppNumber")
		.optional()
		.isMobilePhone(allowedMobilePhoneCountries).withMessage("Invalid WhatsApp number"),
	
  body("input.bio")
    .optional()
    .isString().withMessage("Bio must be a string")
    .isLength({min: 10}).withMessage("Too short bio, must be at least 10 characters"),

  body("input.picture")
    .optional()
    .isURL().withMessage("picture must be in URL format"),

  body("input.roleId")
    .notEmpty().withMessage("Role is required")
    .isInt().withMessage("Role Id must be an integer number")
    .custom(async value => {
      const isRoleExist = await roleService.findUnique({
        where: {
          id: value
        },
        select: {
          id: true
        }
      })

      if(!isRoleExist) {
        throw new Error('This role is not exist');
      }

      return true;
    }),
  
  ErrorExpressValidatorHandler.catchExpressValidatorErrors
];

export const updateUserValidation = [
  body("input.firstName")
    .optional()
    .isString().withMessage("First Name must be string")
    .isLength({min: 3}).withMessage("Too short first name, 3 characters at least")
    .isLength({max: 32}).withMessage("Too long first name, 32 characters at most"),

  body("input.lastName")
    .optional()
    .isString().withMessage("Last Name must be string")
    .isLength({min: 3}).withMessage("Too short last name, 3 characters at least")
    .isLength({max: 32}).withMessage("Too long last name, 32 characters at most"),

  body("input.mobilePhone")
		.optional()
		.isMobilePhone(allowedMobilePhoneCountries).withMessage("Invalid Mobile Phone"),
		
	body("input.whatsAppNumber")
		.optional()
		.isMobilePhone(allowedMobilePhoneCountries).withMessage("Invalid WhatsApp number"),
  
  body("input.bio")
    .optional()
    .isString().withMessage("Bio must be a string")
    .isLength({min: 10}).withMessage("Too short bio, must be at least 10 characters"),

  body("input.picture")
    .optional()
    .isURL().withMessage("picture must be in URL format"),
  
  body("input.roleId")
    .optional()
    .isInt().withMessage("Role Id must be an integer number")
    .custom(async value => {
      const isRoleExist = await roleService.findUnique({
        where: {
          id: value
        },
        select: {
          id: true
        }
      })

      if(!isRoleExist) {
        throw new Error('This role is not exist');
      }
      return true;
    }),
  
  body("input.isBlocked")
    .optional()
    .isBoolean().withMessage("isBlocked must be a boolean; true or false"),
  
  ErrorExpressValidatorHandler.catchExpressValidatorErrors
];

export const updateUserEmailValidation = [
  body("input.email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email"),
  
  body("input.newEmail")
    .notEmpty().withMessage("New Email is required")
    .isEmail().withMessage("Invalid new email")
    .custom(async (value, {req}) => {
      const isEmailExist = await userService.findFirst({
        where: {
          email: { equals: value, mode: 'insensitive' },
        },
        select: {
          id: true,
          email: true
        }
      });
      if(isEmailExist && isEmailExist.id !== req.user.id) {
        throw new Error('This email already exists');
      }
      return true;
    }),

  body("input.password")
		.notEmpty().withMessage("Password is required"),

  ErrorExpressValidatorHandler.catchExpressValidatorErrors
];

export const updateUserPasswordValidation = [
  body("input.email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email"),

  body("input.password")
    .notEmpty().withMessage("Password is required"),
  
  body("input.newPassword")
    .notEmpty().withMessage("New Password is required")
    .isLength({min: 8}).withMessage('Password must be at least 8 characters'),
  
  ErrorExpressValidatorHandler.catchExpressValidatorErrors
]

// export const deleteRoleValidation = [
//   param("id")
//     .custom(async value => {
//       const role = await roleService.findUniqueRole({
//         where: {
//           id: +value
//         }
//       })

//       if(!role) {
//         throw new Error('This role is not exist');
//       }

//       if(role.slug === "student" || role.slug === "instructor" || role.slug === "super-admin") {
//         throw new Error('This role is not deletable');
//       }

//       return true;
//     }),

// 	ErrorExpressValidatorHandler.catchExpressValidatorErrors,
// ]