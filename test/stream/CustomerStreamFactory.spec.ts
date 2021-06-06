import { CustomerDtoFilterByDistanceStream, CustomerDtoValidationStream, CustomerRowToDtoTransformStream, CustomerStreamFactory } from '../../src/stream';

describe('CustomerStreamFactory', () => {
    it('#createRowToDtoTransformStream should return new instance of CustomerRowToDtoTransformStream', () => {
        expect(CustomerStreamFactory.createRowToDtoTransformStream()).toBeInstanceOf(CustomerRowToDtoTransformStream);
    });

    it('#createDtoValidateStream should return new instance of CustomerDtoValidationStream', () => {
        expect(CustomerStreamFactory.createDtoValidateStream()).toBeInstanceOf(CustomerDtoValidationStream);
    });

    it('#createDtoFilterByDistanceStream should return new instance of CustomerDtoFilterByDistanceStream', () => {
        expect(CustomerStreamFactory.createDtoFilterByDistanceStream()).toBeInstanceOf(CustomerDtoFilterByDistanceStream);
    });
});
