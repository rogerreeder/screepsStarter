import { Console } from "console";
import { rmdir } from "fs";
import { PlanningManager } from "./PlanningManager";
import { VisualizerManager } from "./VisualizerManager";

export class RoomManager {
    public static manageRoom(room:Room): void{
        var rMem = room.memory;
        if(!rMem) return;
            var usableTowers:StructureTower[] = room.find(FIND_MY_STRUCTURES,{
                filter: (r) =>
                r.structureType == STRUCTURE_TOWER
                && r.store[RESOURCE_ENERGY] > 0
            });
            usableTowers.forEach(function(tower, index, usableTowers){
                var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
//                if(closestHostile)
//                    tower.attack(closestHostile);
//                var injured = tower.pos.findClosestByRange(FIND_MY_CREEPS,{
//                    filter:(c) => c.hitsMax > c.hits
//                });
//                if(injured)
//                    tower.heal(injured);
                var closestDamagedStructure = tower.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                    filter: (s) => (s.hitsMax - s.hits) > s.hitsMax/3
                });
                if(closestDamagedStructure)
                    tower.repair(closestDamagedStructure)
            });
    }
    public static analyzeRoom(room:Room): void{
        if(!room.memory)
            room.memory = new RoomMemory();
        var rMem = this.validateRoomMemory(room);
        rMem.hostiles = room.find(FIND_HOSTILE_CREEPS);
        rMem.friendlies = room.find(FIND_MY_CREEPS);
        rMem.roomStructures = room.find(FIND_MY_STRUCTURES);
        rMem.creepRoles = _.countBy(rMem .friendlies, (c) => c.memory.role);
        rMem.structureCounts = _.countBy(rMem.roomStructures, (s) => s.structureType);
        if(this.isMine(room))
        {
            if(!rMem.sources){
                rMem.sources = {};
                var sources:Source[] = room.find(FIND_SOURCES);
                sources.forEach(function(source, index, sources){
                    rMem.sources[source.id] = `${source.pos.x}:${source.pos.y}`
                });
            }
            if(rMem.pathways === undefined) {
                rMem.pathways = {};
                var count = 0;
                var spawns = <StructureSpawn[]>_.filter( rMem.roomStructures, (structure) => structure.structureType == STRUCTURE_SPAWN);
                for(var sourceKey in rMem.sources){
                    var source = Game.getObjectById(sourceKey as Id<Source>);
                    if(source){
                        //path from source to spawn and to controller
                        if(room.controller)
                        {
                            var newPath = source?.pos.findPathTo(room.controller,{
                                swampCost:1,
                                plainCost:1,
                                ignoreCreeps: true
                            });
                            if(newPath) {
                                rMem.pathways[`s1_${count}_c1`] = newPath;
                            }
                        }
                        var spawnCount = 0;
                        spawns.forEach(function (spawn) {
                            var newPath = source?.pos.findPathTo(spawn,{
                                swampCost:1,
                                plainCost:1,
                                ignoreCreeps: true
                            });
                            if(newPath) {
                                rMem.pathways[`s1_${count}_s2_${spawnCount}`] = newPath;
                                spawnCount++;
                            }
                        });
                        count++;
                    }
                }
            }
        }
        VisualizerManager.visualizeRoom(room);
    }

    private static isMine(room:Room):boolean{
        return (room.controller != undefined && room.controller.my);
    }

    private static validateRoomMemory(room: Room):RoomMemory{
        if(!room.memory)
            room.memory = new RoomMemory();
        return room.memory;
    }
    private static calculateContainer(source:Source):void{
        //place a flag where the container should be put
        var spawns = source.room.find(FIND_MY_SPAWNS);
        spawns.forEach(function(spawn, index, spawns){

        })

    }
}
