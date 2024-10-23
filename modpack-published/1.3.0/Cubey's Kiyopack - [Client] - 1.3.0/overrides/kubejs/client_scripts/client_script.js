// priority: 0

// Visit the wiki for more info - https://kubejs.com/

console.info('Hello, World! (Loaded client scripts)')

JEIEvents.hideItems(event => {
	
	// redundant item	
	let hexereiWoods = ["mahagony","willow","witch_hazel"]
	hexereiWoods.forEach(hexereiWood =>{
		let itemID = "hexerei:" + hexereiWood + "_woodcutter"
		event.hide(itemID)
	})

	let toolsList = ["pickaxe","shovel","axe","sword","hoe"];
	toolsList.forEach(tool => {
		let itemID = "embers:silver_" + tool
		event.hide(itemID)
	})

	event.hide("farmersdelight:wheat_dough")

	event.hide("nethersdelight:blackstone_furnace")

	event.hide("farmingforblockheads:feeding_trough")

	Ingredient.of("#comforts:hammocks").itemIds.forEach(hammock => {
		event.hide({output:hammock})
	})
	
})