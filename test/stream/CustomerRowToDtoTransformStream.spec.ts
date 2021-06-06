import { plainToClass } from 'class-transformer';
import { CustomerRowToDtoTransformStream } from '../../src/stream';
import { CustomerDto } from '../../src/dto';
import { getResult } from './util/StreamUtil';

describe('CustomerRowToDtoTransformStream', () => {
    const stream: CustomerRowToDtoTransformStream = new CustomerRowToDtoTransformStream({ objectMode: true, highWaterMark: 100 });

    console.error = jest.fn();

    it('CustomerRowToDtoTransformStream filter row that do not fit customer regex pattern and transform row to CustomerDto', async () => {
        const expected: CustomerDto[] = [
            plainToClass(CustomerDto, {
                uuid: '51730bbd-9bce-4d28-ae30-580e2ddd1be8',
                lat: 50.43483821,
                long: 11.96975958,
            }),
            plainToClass(CustomerDto, {
                uuid: 'e6ee6861',
                lat: 55.08068312,
                long: 12.86196247,
            }),
            plainToClass(CustomerDto, {
                uuid: 'e187aea0-95a6-41a7-b75c-3956a48c558d',
                lat: 50.41642815,
                long: NaN,
            }),
        ];

        stream.write('id: 51730bbd-9bce-4d28-ae30-580e2ddd1be8, lat: 50.43483821, long:11.96975958,');
        stream.write('row that do not fit customer regex pattern');
        stream.write('id: e6ee6861, lat: 55.08068312, long:12.86196247,');
        stream.write('id: e187aea0-95a6-41a7-b75c-3956a48c558d, lat: 50.41642815, long:x.26537009,');
        stream.end();

        const result: CustomerDto[] = await getResult(stream);

        expect(result).toStrictEqual(expected);
        expect(console.error).toHaveBeenCalledWith("row that do not fit customer regex pattern doesn't fit the customer pattern");
    });
});
