import { ObjectSchema } from 'joi';

import { BadRequest } from '../../exceptions';

class JoiValidation<T> {
  private schema: ObjectSchema;

  constructor(schema: ObjectSchema) {
    this.schema = schema;
  }

  public validate = (data: T): T => {
    const { error } = this.schema.validate(data);
    if (error) {
      throw new BadRequest('All fields must be filled');
    }
    return data;
  };
}

export default JoiValidation;
