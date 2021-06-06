import { Stream } from 'stream';
import { CustomerDto } from '../../../src/dto';

export async function getResult(stream: Stream): Promise<any> {
    return new Promise((resolve, reject) => {
        const result: CustomerDto[] = [];

        stream
            .on('data', (data: CustomerDto): void => {
                result.push(data);
            })
            .on('end', (): void => {
                resolve(result);
            })
            .on('error', (err: any) => {
                reject(err);
            });
    });
}
