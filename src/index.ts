import * as path from 'path';
import { CustomerDtoFilterByDistanceStream, CustomerDtoValidationStream, CustomerRowToDtoTransformStream, CustomerStreamFactory } from './stream';
import { CustomerService } from './service';

void (async (): Promise<void> => {
    const rowToDtoTransformStream: CustomerRowToDtoTransformStream = CustomerStreamFactory.createRowToDtoTransformStream();
    const dtoValidateStream: CustomerDtoValidationStream = CustomerStreamFactory.createDtoValidateStream();
    const dtoFilterByDistanceStream: CustomerDtoFilterByDistanceStream = CustomerStreamFactory.createDtoFilterByDistanceStream();

    const customerService: CustomerService = new CustomerService(rowToDtoTransformStream, dtoValidateStream, dtoFilterByDistanceStream);

    const uuids: string[] = await customerService.getNearbyCustomerUuids(path.resolve(__dirname, '..', 'customers.txt'));

    console.info('Customer IDs:');

    for (const uuid of uuids) {
        console.info(uuid);
    }
})();
