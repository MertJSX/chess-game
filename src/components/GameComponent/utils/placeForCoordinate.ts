import MapFrame from "../classes/MapFrame";
import { numberToLetter as NTL } from "../utils/numberToLetter";
export function rowPlaceForCoordinate(mapFrame: MapFrame, flipCoordinates: boolean) {

    if (!flipCoordinates && (mapFrame.position.col === 8)) {
        return mapFrame.position.row.toString();
    } else if (flipCoordinates && (mapFrame.position.col === 1)) {
        return mapFrame.position.row.toString();
    }
}
export function colPlaceForCoordinate(mapFrame: MapFrame, flipCoordinates: boolean) {
    if (!flipCoordinates && (mapFrame.position.row === 1)) {
        return NTL(mapFrame.position.col).toString();
    } else if (flipCoordinates && (mapFrame.position.row === 8)) {
        return NTL(mapFrame.position.col).toString();
    }
}