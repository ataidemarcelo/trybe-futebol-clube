import HttpException from './HttpException';

export default class UnprocessableEntityException extends HttpException {
  private static status = 422;

  constructor(message?: string) {
    super(UnprocessableEntityException.status, message || 'Unprocessable Entity.');
  }
}
