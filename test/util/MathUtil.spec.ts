import { getGreatCircleDistance } from '../../src/util';
import { IPoint } from '../../src/interface';

describe('MathUtil', () => {
    it('#getGreatCircleDistance should return distance between two points', () => {
        const dataset: { first: IPoint; second: IPoint; result: number }[] = [
            {
                first: {
                    lat: 49.61790927,
                    long: 13.17178599,
                },
                second: {
                    lat: 53.27620379,
                    long: 18.19087354,
                },
                result: 534952.4369753089,
            },
            {
                first: {
                    lat: 50.79438882,
                    long: 16.15860958,
                },
                second: {
                    lat: 53.11368755,
                    long: 14.03961756,
                },
                result: 295934.83625388594,
            },
            {
                first: {
                    lat: 50.4549391,
                    long: 10.12018809,
                },
                second: {
                    lat: 55.29794181,
                    long: 11.21015653,
                },
                result: 543444.1607192289,
            },
        ];

        for (const data of dataset) {
            expect(getGreatCircleDistance(data.first, data.second)).toStrictEqual(data.result);
        }
    });
});
