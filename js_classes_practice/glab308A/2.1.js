//Creating an adventure game

//Part 1: Humble Beginnings
//model a simple adventurer (object) with basic properties such as health and an inventory

const adventurer = {
    name: "Robin",
    health: 10,
    inventory: ["sword", "potion", "artifact"],
    companion: {
        name: "Leo",
        type: "Cat",
        companion: {
            name: "Frank",
            type: "Flea",
            belongings: ["small hat", "sunglasses"]
        }
       },
    //method for dice rolls
    roll (mod = 0) {
        const result = Math.floor(Math.random() * 20) + 1 + mod
        console.log(`${this.name} rolled a ${result}.`)
    }
}
//calling the method to test it
adventurer.roll()
adventurer.roll()

//create a loop that logs each item in Robin's inventory
adventurer.inventory.forEach(item => {
    console.log(item)
})

//Part 2: Class Fantasy

// Create a Character class which defines generic character entities...name, health(max 100), and inventory
// Character Class including a construction function that allows us to create new characters with whater name we would like

class Character {
    // static max_health property 
    static max_health = 100

    constructor(name) {
        this.name = name
        this.health = 100
        this.inventory = []
    }
    // Every character should be able to make rolls. Add the roll method to the Character Class
    roll (mod = 0) {
    const result = Math.floor(Math.random() * 20) + 1 + mod
    console.log(`${this.name} rolled a ${result}.`)
    }
}


// // Re-create Robin using the Character class
// const robin = new Character("Robin");
// robin.inventory = ["sword", "potion", "artifact"];
// robin.companion = new Character("Leo");
// robin.companion.type = "Cat";
// robin.companion.companion = new Character("Frank");
// robin.companion.companion.type = "Flea";
// robin.companion.companion.inventory = ["small hat", "sunglasses"];

// // Companions rolling the dice
// robin.companion.roll()
// robin.companion.companion.roll()


//Part 3: Class Features

// Create an Adventurer class.

class Adventurer extends Character {
    static roles = ["Fighter", "Healer", "Wizard", "Ranger"]

    constructor (name, role) {
    super(name);
    // Adventurers have specialized roles.
    // Check to ensure that a given role matches one of the 'roles' array values
    if (!Adventurer.roles.includes(role)) {
        throw new Error(`Invalid role. Available roles: ${Adventurer.roles.join(", ")}`)
    }
    this.role = role;
    // Every adventurer starts with a bed and 50 gold coins.
    this.inventory.push("bedroll", "50 gold coins");
    }
    // Adventurers have the ability to scout ahead of them.
    scout () {
    console.log(`${this.name} is scouting ahead...`);
    super.roll();
    }
   }

   // Create a Companion class with properties and methods specific to the companions
class Companion extends Character {
    constructor (name, type) {
        super(name)
        this.type = type
        this.belongings = []
    }
    carry(item) {
        this.belongings.push(item)
        console.log(`${this.name} is carrying ${item}.`)
    }
}


// Change the declarion of Robind and the companions to use the new Adventurer and Companion classes

//const robin = new Adventurer("Robin", "Ranger")
//robin.inventory = ["sword", "potion", "artifact"]

const leo = new Companion("Leo", "Cat")

const frank = new Companion("Frank", "Flea")
frank.carry("small hat")
frank.carry("sunglasses")

//robin.companion = leo
leo.companion = frank

// See the objects
//console.log(robin)
console.log(leo)
console.log(frank)

// Verify that Leo is a companion of Robin's
//console.log(robin.companion === leo)

// Verify that Frank is a companion of Leo
//1`console.log(leo.companion === frank)


// Part 4: Class Uniforms - done in Character and Adventurer classes


// Part 5: Gather your party

class AdventurerFactory {
    constructor (role) {      
    this.role = role;
    this.adventurers = [];
    }
    generate (name) {
        const newAdventurer = new Adventurer(name, this.role);
        this.adventurers.push(newAdventurer);
    }
    findByIndex (index) {
        return this.adventurers[index];
    }
    findByName (name) {
        return this.adventurers.find((a) => a.name === name);
    }
   }
   
   const healers = new AdventurerFactory("Healer");
   const robin = healers.generate("Robin");