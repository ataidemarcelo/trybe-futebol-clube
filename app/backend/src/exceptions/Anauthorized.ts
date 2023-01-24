import HttpException from './HttpException';

export default class UnauthorizedException extends HttpException {
  private static status = 401;

  constructor(message?: string) {
    super(UnauthorizedException.status, message || 'Unauthorized');
  }
}
