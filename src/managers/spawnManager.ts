import { forEach } from "lodash";

export class SpawnManager{
    public static manageSpawn(spawn:StructureSpawn){
        var creepName =  this.GetCreepName("H");
        var bodies = [
             [WORK,WORK,WORK,WORK,WORK,WORK,WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
            ,[WORK,WORK,WORK,WORK,WORK,WORK,WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
            ,[WORK,WORK,WORK,WORK,WORK,WORK,WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
            ,[WORK,WORK,WORK,WORK,WORK,WORK,WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
            ,[WORK,WORK,WORK,WORK,WORK,WORK,WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
            ,[WORK,WORK,WORK,WORK,WORK,WORK,WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
            ,[WORK,WORK,WORK,WORK,WORK,WORK,WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
            ,[WORK,WORK,WORK,WORK,WORK,WORK,WORK, CARRY, CARRY, CARRY, CARRY, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
            ,[WORK,WORK,WORK,WORK,WORK,WORK,WORK, CARRY, CARRY, CARRY, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
            ,[WORK,WORK,WORK,WORK,WORK,WORK,WORK, CARRY, CARRY, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
            ,[WORK,WORK,WORK,WORK,WORK,WORK,WORK, CARRY, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
            ,[WORK,WORK,WORK,WORK,WORK,WORK, CARRY, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
            ,[WORK,WORK,WORK,WORK,WORK,WORK, CARRY, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
            ,[WORK,WORK,WORK,WORK,WORK, CARRY, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
            ,[WORK,WORK,WORK,WORK,WORK, CARRY, MOVE,MOVE,MOVE,MOVE,MOVE]
            ,[WORK,WORK,WORK,WORK, CARRY, MOVE,MOVE,MOVE,MOVE]
            ,[WORK,WORK,WORK, CARRY, MOVE,MOVE,MOVE]
            ,[WORK,WORK,CARRY, MOVE, MOVE]
            ,[WORK,CARRY,MOVE]
        ];
        if(!spawn.spawning && spawn.room.energyCapacityAvailable == spawn.room.energyAvailable)
            bodies.forEach(function(body, index, bodies){
                if(spawn.spawnCreep(body, creepName, { dryRun: true }) == 0)
                    console.log(`${spawn.spawnCreep(body, creepName)}`);
            });
    }

    private static GetCreepName(creepName:string):string{
        var creepCount = 0;
        while(Game.creeps[`${creepName}${this.pad(`${creepCount}`, 3)}`] != undefined)
            creepCount++;
        return `${creepName}${this.pad(`${creepCount}`, 3)}`;
    }

    private static pad (str:string, max:number):string {
        return str.length < max ? this.pad(`0${str}`, max) : str;
    }
}
