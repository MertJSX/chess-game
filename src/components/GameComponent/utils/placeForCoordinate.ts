import MapFrame from "../classes/MapFrame";
import { numberToLetter as NTL } from "../utils/numberToLetter";
export function rowPlaceForCoordinate(mapFrame: MapFrame) {
    console.log(mapFrame.position.col);
    
    if (mapFrame.position.col === 8) {
        return mapFrame.position.row.toString();
    } else {
        return false;
    }
}
export function colPlaceForCoordinate(mapFrame: MapFrame) {
    if (mapFrame.position.row === 1) {
        return NTL(mapFrame.position.col);
    } else {
        return false;
    }
}