export class MemoryManager {
    public static clearMemory(){
        // Automatically delete memory of missing creeps
        for (const name in Memory.creeps)
            if (!(name in Game.creeps))
                delete Memory.creeps[name];
   }

}
