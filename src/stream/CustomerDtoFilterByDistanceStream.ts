import { Transform, TransformOptions } from 'stream';
import { CustomerDto } from '../dto';
import { IPoint } from '../interface';
import { getGreatCircleDistance } from '../util';

export class CustomerDtoFilterByDistanceStream extends Transform {
    private readonly location: IPoint = {
        lat: 52.493256,
        long: 13.446082,
    };

    // distance in meters
    private readonly maxDistance: number = 100000;

    constructor(options?: TransformOptions) {
        super(options);
    }

    async _transform(chunk: CustomerDto, _encoding: string, callback: (error?: Error | null, data?: any) => void): Promise<void> {
        const distance: number = getGreatCircleDistance(this.location, { lat: chunk.lat, long: chunk.long });

        if (this.isFarAway(distance)) {
            console.log(`${chunk.uuid} is located far away (${(distance / 1000).toFixed(2)} km)`);

            return callback();
        }

        return callback(null, chunk);
    }

    private isFarAway(distance: number): boolean {
        return distance > this.maxDistance;
    }
}
