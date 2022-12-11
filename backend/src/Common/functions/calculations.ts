import { location } from '../interfaces/location.interface';
/**
 * Returns the distance between both points in kilometers.
 * A function adapted for the ‘Haversine’ formula.
 * @param point1: location
 * @param point2: location
 * @returns distance: number 
 */
export function getDistanceBetween(point1: location, point2: location) {
  let R: number = 6371; // Radius of the earth in km
  let deg2rad = (deg: number) => deg * (Math.PI / 180);
  let dLat: number = deg2rad(point2.lat - point1.lat); // deg2rad below
  let dLon: number = deg2rad(point2.lng - point1.lng);
  let a: number =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(point1.lat)) *
      Math.cos(deg2rad(point2.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  let c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d: number = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
