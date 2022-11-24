import { MemoryManager} from "./MemoryManager";
import { RoomManager} from "./RoomManager";
import { SpawnManager} from "./SpawnManager";
import { CreepsManager} from "./CreepsManager";


export class GameManager {
    public static run(){
        MemoryManager.clearMemory();
        for(var roomKey in Game.rooms)
            RoomManager.analyzeRoom(Game.rooms[roomKey]);
        for(var spawnKey in Game.spawns)
            SpawnManager.manageSpawn(Game.spawns[spawnKey]);
        for(var creepKey in Game.creeps)
            CreepsManager.manageCreep(Game.creeps[creepKey]);
        for(var roomKey in Game.rooms)
            RoomManager.manageRoom(Game.rooms[roomKey]);
    }
}
