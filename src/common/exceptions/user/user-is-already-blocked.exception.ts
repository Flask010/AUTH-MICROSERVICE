import { HttpStatus } from "@nestjs/common";
import { BaseException } from "src/common/utils/base.exception";

export class UserIsAlreadyBlockedException extends BaseException {
  constructor() {
    super(`User is already blocked.`, HttpStatus.CONFLICT);
  }
}
