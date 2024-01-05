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

//Part 2

// Create a Character class which defines generic character entities...name, health(max 100), and inventory
// Character Class including a construction function that allows us to create new characters with whater name we would like

class Character {
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


// Re-create Robin using the Character class
const robin = new Character("Robin");
robin.inventory = ["sword", "potion", "artifact"];
robin.companion = new Character("Leo");
robin.companion.type = "Cat";
robin.companion.companion = new Character("Frank");
robin.companion.companion.type = "Flea";
robin.companion.companion.inventory = ["small hat", "sunglasses"];

// Companions rolling the dice
robin.companion.roll()
robin.companion.companion.roll()


