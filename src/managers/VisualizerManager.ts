import { Position } from "source-map";

export class VisualizerManager{
    public static visualizeRoom(room:Room): void{
        var visualizer = new RoomVisual(room.name);
        var rMem = room.memory;
        //SHOW PATHWAYS
        for(var pathKey in rMem.pathways){
            var path = rMem.pathways[pathKey];
            var pointsByPath:[number,number][] = [];
            path.forEach(point => pointsByPath.push([point.x,point.y]));
            var pathStyle:PolyStyle = {
                lineStyle: "dotted",
                stroke: "yellow",
                opacity: 0.1
            };
            visualizer.poly(pointsByPath, pathStyle);
        }
    }
}
