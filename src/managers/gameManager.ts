import { MemoryManager} from "managers/memoryManager";
import { SpawnManager} from "managers/spawnManager";
import { RoomManager} from "managers/roomManager";
import { CreepsManager} from "managers/creepsManager";
export class GameManager {
    public static run(){
        MemoryManager.clearMemory();
        for(var roomKey in Game.rooms)
            RoomManager.manageRoom(roomKey);
        for(var spawnKey in Game.spawns)
            SpawnManager.manageSpawn(spawnKey);
        for(var creepKey in Game.creeps)
            CreepsManager.manageCreep(creepKey);

    }
}
