import MapFrame from "./MapFrame";
export class Map {
    map: MapFrame[];
    constructor() {
        this.map = [];
        
        const colors = ['black', 'white'];
        for (let row = 8; row >= 1; row--) { 
            for (let col = 1; col <= 8; col++) {
                const positionName = String.fromCharCode(96 + col) + row;
                const color = (row + col) % 2 === 0 ? colors[0] : colors[1];
                this.map.push(new MapFrame({ row, col }, positionName, color));
            }
        }
    }
}