import HttpException from './HttpException';

export default class InternalServerErrorException extends HttpException {
  private static status = 500;

  constructor(message?: string) {
    super(InternalServerErrorException.status, message || 'Internal Server Error');
  }
}
