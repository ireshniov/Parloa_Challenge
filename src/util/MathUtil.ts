import { IPoint } from '../interface';

const R: number = 6371e3; // metres

export function getGreatCircleDistance(point1: IPoint, point2: IPoint): number {
    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    const long1: number = (point1.long * Math.PI) / 180;
    const long2: number = (point2.long * Math.PI) / 180;
    const lat1: number = (point1.lat * Math.PI) / 180;
    const lat2: number = (point2.lat * Math.PI) / 180;

    // Haversine formula
    const dLong: number = long2 - long1;
    const dLat: number = lat2 - lat1;

    const a: number = Math.pow(Math.sin(dLat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dLong / 2), 2);

    const c: number = 2 * Math.asin(Math.sqrt(a));

    return c * R;
}
