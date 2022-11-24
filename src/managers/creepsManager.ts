
export class CreepsManager {
    public static manageCreep(creep:Creep){
        let pathways = creep.room.memory.pathways;
        var reverse = Game.time % 4 == 0;
        if(creep.memory === undefined)
            creep.memory = new CreepMemory();
        let cMem = creep.memory;
        if(creep.room.memory.hostiles.length > 0 && creep.getActiveBodyparts(ATTACK) > 0){
            creep.moveTo(creep.room.memory.hostiles[0]);
            creep.attack(creep.room.memory.hostiles[0]);
        }
        if(creep.room.memory.hostiles.length > 0 && creep.getActiveBodyparts(HEAL) > 0){
                var injured = creep.pos.findClosestByRange(FIND_MY_CREEPS,{
                    filter:(c) => c.hitsMax > c.hits
                });
                if(injured){
                    creep.moveTo(injured);
                    creep.heal(injured);
                }


        }
    }

    private static PickupDroppedEnergy(creep:Creep){
        if(creep.store.getFreeCapacity() > 0){
            let droppedEnergy = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 1, {
                filter: (r) => r.resourceType == RESOURCE_ENERGY
            });
            if(droppedEnergy.length > 0)
                creep.pickup(droppedEnergy[0]);
        }
    }

    private static HandleNearRuin(creep:Creep){
        let ruins = creep.pos.findInRange(FIND_RUINS, 1, {
            filter: (r) => r.store[RESOURCE_ENERGY] > 0
        });
        if(ruins.length > 0)
            creep.withdraw(ruins[0],RESOURCE_ENERGY);
    }
}
