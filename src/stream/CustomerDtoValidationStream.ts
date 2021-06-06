import { Transform, TransformOptions } from 'stream';
import { ValidationError, Validator } from 'class-validator';
import { CustomerDto } from '../dto';

export class CustomerDtoValidationStream extends Transform {
    private readonly validator: Validator = new Validator();

    constructor(options?: TransformOptions) {
        super(options);
    }

    async _transform(chunk: CustomerDto, _encoding: string, callback: (error?: Error | null, data?: any) => void): Promise<void> {
        const errors: ValidationError[] = await this.validator.validate(chunk);

        if (errors.length) {
            console.error(`${chunk.uuid} contains invalid data`);

            return callback();
        }

        return callback(null, chunk);
    }
}
