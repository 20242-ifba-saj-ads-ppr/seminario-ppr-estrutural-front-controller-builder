class EntityFactory {
    constructor() {
        this.entities = {};
    }

    handlePrefabs = {
        spider: () => new Monster("spider", "Spider", 100, 20),
        spider_warrior: () => new Monster("spider_warrior", "Spider Warrior", 200, 40),
        spider_hider: () => new Monster("spider_hider", "Cave Spider", 600, 20)
    }

    registerMonster(prefab) {
        console.log(`[Log] New Entity Registered: ${prefab}`);
        this.entities[prefab] = this.handlePrefabs[prefab];
    }

    createMonster(prefab) {
        if (!this.entities[prefab]) {
            this.registerMonster(prefab);
        }
        console.log(`[Log] Instantiating New Entity: ${prefab}`);
        let newEntity = {};
        newEntity.source = this.entities[prefab]();
        newEntity.health = newEntity.source.maxhealth;
        return newEntity;
    }

    bulkCreateMonster(prefab, quantity) {
        let monsters = [];
        for (let i = 0; i < quantity; i++) {
            monsters.push(this.createMonster(prefab));
        }
        return monsters;
    }
}

class Monster {
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

class FrontController {
    constructor() {
        this.entityFactory = new EntityFactory();

        this.routes = {
            'createMonster': this.entityFactory.createMonster.bind(this.entityFactory),
            'bulkCreateMonster': this.entityFactory.bulkCreateMonster.bind(this.entityFactory)
        };
    }

    dispatch(request) {
        const { command, params } = request;
        if (this.routes[command]) {
            return this.routes[command](...params);
        } else {
            console.error(`[FrontController] Unknown command: ${command}`);
        }
    }
}

const frontController = new FrontController();

const spider = frontController.dispatch({ command: 'createMonster', params: ['spider'] });
const spiderWarrior = frontController.dispatch({ command: 'createMonster', params: ['spider_warrior'] });
const spiderHider = frontController.dispatch({ command: 'createMonster', params: ['spider_hider'] });

const bulkSpiders = frontController.dispatch({ command: 'bulkCreateMonster', params: ['spider', 6] });

console.log('Single Monster:', spider);
console.log('Spider Warrior:', spiderWarrior);
console.log('Spider Hider:', spiderHider);
console.log('Bulk Spiders:', bulkSpiders);
