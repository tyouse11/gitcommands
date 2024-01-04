//Creating an adventure game

//Part 1: Humble Beginnings
//model a simple adventurer with basic properties such as health and an inventory

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


