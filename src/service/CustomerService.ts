import * as fs from 'fs';
import { CustomerDto } from '../dto';
import { CustomerDtoFilterByDistanceStream, CustomerDtoValidationStream, CustomerRowToDtoTransformStream } from '../stream';
import { asc } from '../util';

export class CustomerService {
    constructor(
        private readonly rowToDtoTransformStream: CustomerRowToDtoTransformStream,
        private readonly dtoValidationStream: CustomerDtoValidationStream,
        private readonly dtoFilterByDistanceStream: CustomerDtoFilterByDistanceStream,
    ) {}

    async getNearbyCustomerUuids(path: string): Promise<CustomerDto['uuid'][]> {
        // eslint-disable-next-line @typescript-eslint/no-require-imports,@typescript-eslint/no-var-requires
        const split = require('split');

        return new Promise((resolve, reject) => {
            const customerUuids: CustomerDto['uuid'][] = [];

            fs.createReadStream(path)
                .pipe(split(null, null, { trailing: false }))
                .pipe(this.rowToDtoTransformStream)
                .pipe(this.dtoValidationStream)
                .pipe(this.dtoFilterByDistanceStream)
                .on('data', (dto: CustomerDto): void => {
                    customerUuids.push(dto.uuid);
                })
                .on('end', (): void => {
                    resolve(customerUuids.sort(asc));
                })
                .on('error', (err: any): void => {
                    reject(err);
                });
        });
    }
}
