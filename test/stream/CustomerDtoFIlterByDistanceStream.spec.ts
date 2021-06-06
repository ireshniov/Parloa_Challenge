import { plainToClass } from 'class-transformer';
import { CustomerDtoFilterByDistanceStream } from '../../src/stream';
import { CustomerDto } from '../../src/dto';
import { getResult } from './util/StreamUtil';

describe('CustomerDtoFilterByDistanceStream', () => {
    const stream: CustomerDtoFilterByDistanceStream = new CustomerDtoFilterByDistanceStream({ objectMode: true, highWaterMark: 100 });

    console.log = jest.fn();

    it('CustomerDtoFilterByDistanceStream filter customers with location more than 100km from Parloa location', async () => {
        const dto1: CustomerDto = plainToClass(CustomerDto, {
            uuid: '02335e27-e152-4771-9a6b-5b88c3b29eb9',
            lat: 53.14583735,
            long: 13.23311883,
        });

        const dto2: CustomerDto = plainToClass(CustomerDto, {
            uuid: '21205447-2c4c-417b-9ce6-8645ca87743c',
            lat: 54.66374411,
            long: 18.06501014,
        });

        const dto3: CustomerDto = plainToClass(CustomerDto, {
            uuid: '129b3b89-1b29-4aaa-a30c-b7e1a1dd46a0',
            lat: 52.48658232,
            long: 13.79447524,
        });

        const expected: CustomerDto[] = [dto1, dto3];

        stream.write(dto1);
        stream.write(dto2);
        stream.write(dto3);
        stream.end();

        const result: CustomerDto[] = await getResult(stream);

        expect(result).toStrictEqual(expected);
        expect(console.log).toHaveBeenCalledWith('21205447-2c4c-417b-9ce6-8645ca87743c is located far away (388.75 km)');
    });
});
