import { HttpStatus } from "@nestjs/common";
import { BaseException } from "src/common/utils/base.exception";

export class InvalidPasswordException extends BaseException {
  constructor() {
    super("Invalid Password.", HttpStatus.FORBIDDEN);
  }
}
