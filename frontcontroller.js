class Entity {
    constructor(prefab, name, maxhealth, damage) {
        this.prefab = prefab;
        this.name = name;
        this.maxhealth = maxhealth;
        this.damage = damage;
    }

    details() {
        console.log(`[Log] ${this.prefab} information:
            name: ${this.name}
            maxhealth: ${this.maxhealth}
            damage: ${this.damage}`);
    }
}

class Monster extends Entity {
    constructor(prefab, name, maxhealth, damage) {
        super(prefab, name, maxhealth, damage);
    }
}

class NPC extends Entity {
    constructor(prefab, name) {
        super(prefab, name, 100, 0);
    }
}

class EntityFactory {
    constructor() {
        this.entities = {};
    }

    registerEntity(prefab, factoryMethod) {
        console.log(`[Log] New Entity Registered: ${prefab}`);
        this.entities[prefab] = factoryMethod;
    }

    createEntity(prefab) {
        if (!this.entities[prefab]) {
            console.error(`[Error] No entity registered for: ${prefab}`);
            return null;
        }
        console.log(`[Log] Instantiating New Entity: ${prefab}`);
        return this.entities[prefab]();
    }
}

class FrontController {
    constructor() {
        this.entityFactory = new EntityFactory();
        
        this.entityFactory.registerEntity('spider', () => new Monster("spider", "Spider", 100, 20));
        this.entityFactory.registerEntity('spider_warrior', () => new Monster("spider_warrior", "Spider Warrior", 200, 40));
        this.entityFactory.registerEntity('npc_villager', () => new NPC("npc_villager", "Villager"));
    }

    dispatch(request) {
        const { command, params } = request;
        if (command === 'createEntity') {
            return this.entityFactory.createEntity(params[0]);
        } else {
            console.error(`[FrontController] Unknown command: ${command}`);
        }
    }
}

const frontController = new FrontController();

const spider = frontController.dispatch({ command: 'createEntity', params: ['spider'] });
const spiderWarrior = frontController.dispatch({ command: 'createEntity', params: ['spider_warrior'] });
const villager = frontController.dispatch({ command: 'createEntity', params: ['npc_villager'] });

console.log('Single Monster:', spider);
console.log('Spider Warrior:', spiderWarrior);
console.log('Villager NPC:', villager);