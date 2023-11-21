import { param } from "express-validator";
import ErrorExpressValidatorHandler from "../../errorHandlers/ErrorExpressValidatorHandler";

export const idValidation = [
  param("id")
    .isInt({min: 1}).withMessage('Invalid id format, must be an integer number more than or equal to 1'),

	ErrorExpressValidatorHandler.catchExpressValidatorErrors,
]