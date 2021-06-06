import { Transform, TransformOptions } from 'stream';
import { plainToClass } from 'class-transformer';
import { CustomerDto } from '../dto';

export class CustomerRowToDtoTransformStream extends Transform {
    private readonly regexp: RegExp = new RegExp('id:\\s*(?<uuid>.+),\\s*lat:\\s*(?<lat>.+),\\s*long:\\s*(?<long>.+),', 'i');

    constructor(options?: TransformOptions) {
        super(options);
    }

    _transform(chunk: string, _encoding: string, callback: (error?: Error | null, data?: any) => void): void {
        const match: RegExpExecArray | null = this.regexp.exec(chunk);

        if (!match) {
            console.error(`${chunk} doesn't fit the customer pattern`);

            return callback();
        }

        const dto: CustomerDto = plainToClass(CustomerDto, { ...match.groups });

        return callback(null, dto);
    }
}
