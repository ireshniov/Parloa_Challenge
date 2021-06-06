import { plainToClass } from 'class-transformer';
import { CustomerDtoValidationStream } from '../../src/stream';
import { CustomerDto } from '../../src/dto';
import { getResult } from './util/StreamUtil';

describe('CustomerDtoValidationStream', () => {
    const stream: CustomerDtoValidationStream = new CustomerDtoValidationStream({ objectMode: true, highWaterMark: 100 });

    console.error = jest.fn();

    it('CustomerDtoValidationStream filter invalid CustomerDto', async () => {
        const dto1: CustomerDto = plainToClass(CustomerDto, {
            uuid: '51730bbd-9bce-4d28-ae30-580e2ddd1be8',
            lat: 50.43483821,
            long: 11.96975958,
        });

        const dto2: CustomerDto = plainToClass(CustomerDto, {
            uuid: 'e6ee6861',
            lat: 55.08068312,
            long: 12.86196247,
        });

        const dto3: CustomerDto = plainToClass(CustomerDto, {
            uuid: 'e187aea0-95a6-41a7-b75c-3956a48c558d',
            lat: 50.41642815,
            long: NaN,
        });

        const expected: CustomerDto[] = [dto1];

        stream.write(dto1);
        stream.write(dto2);
        stream.write(dto3);
        stream.end();

        const result: CustomerDto[] = await getResult(stream);

        expect(result).toStrictEqual(expected);
        expect(console.error).toHaveBeenCalledWith('e6ee6861 contains invalid data');
        expect(console.error).toHaveBeenCalledWith('e187aea0-95a6-41a7-b75c-3956a48c558d contains invalid data');
    });
});
