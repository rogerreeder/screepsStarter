import { AntMemory } from "classes/antMemory";

export class CreepsManager {
    public static manageCreep(creepKey:string){
        var creep = Game.creeps[creepKey];
        var sources = creep.room.find(FIND_SOURCES);
        var spawns = creep.room.find(FIND_MY_SPAWNS);
        var controller = creep.room.controller;
        if(!creep.memory)
            creep.memory = new AntMemory();
        var cp = <AntMemory> creep.memory;
        if(!cp.target)
            cp.target = sources[Math.floor(Math.random() * sources.length)].id;
        if(!(cp.action))
            cp.action = "HARVEST";
        if(cp.action === "HARVEST" && creep.store.getFreeCapacity() == 0)
            cp.action = Math.floor(Math.random() * 4) == 0 ? "REFILL" : "UPGRADE";
        if(cp.action === "UPGRADE" && creep.store.getUsedCapacity() == 0)
            cp.action = "HARVEST";
        if(cp.action === "REFILL" && creep.store.getUsedCapacity() == 0)
            cp.action = "HARVEST";
        var source:Source = <Source>Game.getObjectById(cp.target);
        switch(cp.action) {
            case "HARVEST":
                if(source){
                    creep.harvest(source);
                    creep.moveTo(source.pos);
                }
                break;
            case "UPGRADE":
                if(controller){
                    creep.upgradeController(controller);
                    creep.moveTo(controller.pos);
                }
                break;
            case "REFILL":
                if(spawns[0]){
                    creep.transfer(spawns[0], RESOURCE_ENERGY);
                    creep.moveTo(spawns[0].pos);
                }
                break;
            }
    }
}
