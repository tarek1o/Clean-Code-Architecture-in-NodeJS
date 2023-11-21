import {Request} from "express"
import { ExtendedUser } from "../../application/types/ExtendedUser"

export interface ExtendedRequest extends Request {
  user?: ExtendedUser
}