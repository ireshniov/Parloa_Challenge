import { asc } from '../../src/util';

describe('SortUtil', () => {
    it('#asc should return 1', () => {
        const dataset: { elem1: string; elem2: string }[] = [
            {
                elem1: 'cb1c3c35-43cc-47b4-a528-8e9345a7cb7b',
                elem2: '51730bbd-9bce-4d28-ae30-580e2ddd1be8',
            },
            {
                elem1: 'AAAbbCC',
                elem2: '0AAA-test',
            },
            {
                elem1: '-0aaa-test',
                elem2: '-0AAA-test',
            },
        ];

        for (const data of dataset) {
            expect(asc(data.elem1, data.elem2)).toEqual(1);
        }
    });

    it('#asc should return -1', () => {
        const dataset: { elem1: string; elem2: string }[] = [
            {
                elem2: 'cb1c3c35-43cc-47b4-a528-8e9345a7cb7b',
                elem1: '51730bbd-9bce-4d28-ae30-580e2ddd1be8',
            },
            {
                elem2: 'AAAbbCC',
                elem1: '0AAA-test',
            },
            {
                elem2: '-0aaa-test',
                elem1: '-0AAA-test',
            },
        ];

        for (const data of dataset) {
            expect(asc(data.elem1, data.elem2)).toEqual(-1);
        }
    });

    it('#asc should return 0', () => {
        const dataset: { elem1: string }[] = [
            {
                elem1: '51730bbd-9bce-4d28-ae30-580e2ddd1be8',
            },
            {
                elem1: '0AAA-test',
            },
            {
                elem1: '-0AAA-test',
            },
        ];

        for (const data of dataset) {
            expect(asc(data.elem1, data.elem1)).toEqual(0);
        }
    });
});
