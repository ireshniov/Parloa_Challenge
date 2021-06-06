import { IsLatitude, IsLongitude, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export class CustomerDto {
    @IsUUID('4')
    uuid: string;

    @IsLatitude()
    @Transform(({ value }) => {
        return value && typeof value !== 'number' ? Number(value) : value;
    })
    lat: number;

    @IsLongitude()
    @Transform(({ value }) => {
        return value && typeof value !== 'number' ? Number(value) : value;
    })
    long: number;
}
