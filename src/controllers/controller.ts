import { ResponseError } from "../types/errors/response";

export class Controller {

  /**
   * Responds to the user with a successful request. By default only the
   * data needs to be provided, however, meta data and a response code can
   * be provided if required.
   *
   * @param {any}                     data The data to be sent back to the user
   * @param {any    =    {}}          meta Any required meta data
   * @param {number =    200}         code The response code, defaulted to 200
   */
  protected respondWithSuccess(data: any, meta: any = {}, code: number = 200): void {
    this.respond(data, true, code, meta);
  }

  /**
   * Responds to the user with a failing request. Information provided back
   * to the user is taken from a ResponseError or standard Error message.
   *
   * @param {ResponseError|Error} error The error to return
   */
  protected respondWithFailure(error: ResponseError | Error): void {
    this.respond(
      { name: error.name, message: error.message },
      false,
      error['code'] !== undefined ? error['code'] : 500,
      error.stack
    );
  }


  private respond(data: any, success: boolean, code: number, meta: any = {}): void {

  }

  /**
   * Gets a value from a given query key. If no value is found the
   * given default is returned instead.
   *
   * @param  {string} key          The required key
   * @param  {any}    defaultValue A defaut value to return
   * @return {any}                 The requested information
   */
  protected getQuery(key: string, defaultValue: any): any {
    return 'hello';
  }

  /**
   * Gets a value from a given parameter key. If no value is found the
   * given default is returned instead.
   *
   * @param  {string} key          The required key
   * @param  {string} defaultValue A default value to return
   * @return {string}              The requested information
   */
  protected getParam(key: string, defaultValue: string): string {
    return 'hello';
  }
}
