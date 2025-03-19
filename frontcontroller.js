// ====================
// Domínio / Modelo
// ====================
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

// ====================
// Componente de Criação (Factory)
// ====================
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

// ====================
// Handlers / Commands
// ====================

class CreateEntityHandler {
    constructor(entityFactory) {
        this.entityFactory = entityFactory;
    }

    execute(params) {
        const [prefab] = params;
        return this.entityFactory.createEntity(prefab);
    }
}

// ====================
// Dispatcher
// ====================

class Dispatcher {
    constructor() {
        this.handlers = {};
    }

    registerHandler(command, handler) {
        this.handlers[command] = handler;
    }

    dispatch(request) {
        const { command, params } = request;
        const handler = this.handlers[command];
        if (handler) {
            return handler.execute(params);
        } else {
            console.error(`[Dispatcher] Unknown command: ${command}`);
            return null;
        }
    }
}

// ====================
// Front Controller
// ====================
class FrontController {
    constructor() {
        this.entityFactory = new EntityFactory();

        // Registro das entidades na fábrica
        this.entityFactory.registerEntity('spider', () => new Monster("spider", "Spider", 100, 20));
        this.entityFactory.registerEntity('spider_warrior', () => new Monster("spider_warrior", "Spider Warrior", 200, 40));
        this.entityFactory.registerEntity('npc_villager', () => new NPC("npc_villager", "Villager"));

        // Configuração do dispatcher com seus respectivos handlers
        this.dispatcher = new Dispatcher();
        this.dispatcher.registerHandler('createEntity', new CreateEntityHandler(this.entityFactory));
    }

    // Método que pode incluir lógica de pré-processamento, autenticação, etc.
    dispatchRequest(request) {
        console.log(`[FrontController] Received request: ${JSON.stringify(request)}`);
        // Aqui pode ocorrer autenticação, logging, etc.
        return this.dispatcher.dispatch(request);
    }
}

// ====================
// Demonstração de Uso
// ====================

const frontController = new FrontController();

const spider = frontController.dispatchRequest({ command: 'createEntity', params: ['spider'] });
const spiderWarrior = frontController.dispatchRequest({ command: 'createEntity', params: ['spider_warrior'] });
const villager = frontController.dispatchRequest({ command: 'createEntity', params: ['npc_villager'] });

console.log('Single Monster:', spider);
console.log('Spider Warrior:', spiderWarrior);
console.log('Villager NPC:', villager);
