
class BaseCMemory implements CreepMemory {
    role: string = "";
    room: string = "";
    action: string = "";
    target: string = "";
}

class HaulerMemory extends BaseCMemory {
    collectionPoint:RoomPosition|undefined;
}
class HarvesterMemory extends BaseCMemory {
    harvestPoint:RoomPosition|undefined;
}
class BuilderMemory extends BaseCMemory {
    constructionSite:ConstructionSite|undefined;
}

class BaseRMemory implements RoomMemory {
    pathways: Dictionary<PathStep[]> = {};
    friendlies!: Creep[];
    hostiles!: Creep[];
    roomStructures!: AnyOwnedStructure[];
}

class NestMemory extends BaseRMemory {
    nestLayout:ConstructionSite[][]|undefined;//by ControllerLevel
}
