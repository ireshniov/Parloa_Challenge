import * as path from 'path';
import { CustomerService } from '../../src/service';
import { CustomerDtoFilterByDistanceStream, CustomerDtoValidationStream, CustomerRowToDtoTransformStream } from '../../src/stream';

describe('CustomerService', () => {
    const customerService: CustomerService = new CustomerService(
        new CustomerRowToDtoTransformStream({ objectMode: true, highWaterMark: 100 }),
        new CustomerDtoValidationStream({ objectMode: true, highWaterMark: 100 }),
        new CustomerDtoFilterByDistanceStream({ objectMode: true, highWaterMark: 100 }),
    );

    console.log = jest.fn();
    console.error = jest.fn();

    it('#constructor should create new instance of CustomerService', () => {
        expect(customerService).toBeInstanceOf(CustomerService);
    });

    it('#getNearbyCustomerUuids should return filtered uuid list and log warnings', async () => {
        const result: string[] = await customerService.getNearbyCustomerUuids(path.resolve(__dirname, 'test_customers.txt'));

        const expected: string[] = ['02335e27-e152-4771-9a6b-5b88c3b29eb9', 'd5c05bd3-76d4-4c3c-9985-deb82751c611'];

        expect(result).toStrictEqual(expected);
        expect(console.log).toHaveBeenCalledWith('28353047-7789-4d0c-babb-adab12a4b082 is located far away (261.87 km)');
        expect(console.log).toHaveBeenCalledWith('b7e7100c-5054-4ac2-bd61-5c3825c33ed9 is located far away (340.37 km)');
        expect(console.error).toHaveBeenCalledWith('e6ee6861 contains invalid data');
        expect(console.error).toHaveBeenCalledWith('e187aea0-95a6-41a7-b75c-3956a48c558d contains invalid data');
    });
});
