export class SpawnManager{
    public static manageSpawn(spawnKey:string){
        var spawn = Game.spawns[spawnKey];
        var creepName =  this.GetCreepName("H");
        var body = [WORK, CARRY, MOVE];
        if(spawn.spawnCreep(body, creepName, { dryRun: true }) == 0)
            spawn.spawnCreep(body, creepName);
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
