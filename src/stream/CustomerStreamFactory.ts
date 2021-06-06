import { TransformOptions } from 'stream';
import { CustomerRowToDtoTransformStream } from './CustomerRowToDtoTransformStream';
import { CustomerDtoValidationStream } from './CustomerDtoValidationStream';
import { CustomerDtoFilterByDistanceStream } from './CustomerDtoFilterByDistanceStream';

export class CustomerStreamFactory {
    static createRowToDtoTransformStream(options: TransformOptions = { objectMode: true, highWaterMark: 100 }): CustomerRowToDtoTransformStream {
        return new CustomerRowToDtoTransformStream(options);
    }

    static createDtoValidateStream(options: TransformOptions = { objectMode: true, highWaterMark: 100 }): CustomerDtoValidationStream {
        return new CustomerDtoValidationStream(options);
    }

    static createDtoFilterByDistanceStream(options: TransformOptions = { objectMode: true, highWaterMark: 100 }): CustomerDtoFilterByDistanceStream {
        return new CustomerDtoFilterByDistanceStream(options);
    }
}
