import { HttpException, HttpStatus } from "@nestjs/common";

export class BaseException extends HttpException {
  constructor(
    public errorMessage: string,
    public code: HttpStatus,
  ) {
    super(errorMessage, code);
  }
}
