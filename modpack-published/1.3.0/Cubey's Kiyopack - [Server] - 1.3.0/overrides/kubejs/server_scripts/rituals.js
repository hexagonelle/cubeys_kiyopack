ServerEvents.recipes(event => {

	//Elder Guardian summoning
	event.recipes.summoningrituals.altar("plushies:elder_guardian_plushie")	
		.mobOutput('elder_guardian')
		.input(Item.of('minecraft:potion', '{Potion:"minecraft:long_water_breathing"}').weakNBT())
		.input(Item.of('minecraft:potion', '{Potion:"minecraft:long_water_breathing"}').weakNBT())
		.input(Item.of('minecraft:potion', '{Potion:"minecraft:long_water_breathing"}').weakNBT())
		.input('3x minecraft:diamond')
		.input('3x minecraft:emerald')
		.input('3x minecraft:lapis_lazuli')
		.recipeTime(100) // 5 seconds
		.blockBelow('minecraft:prismarine_bricks')
		.id('kubejs:summoning/elder_guardian');

	//sheep summoning
	event.recipes.summoningrituals.altar("plushies:sheep_plushie")
		.mobOutput('sheep')
		.mobOutput('sheep')
		.input('minecraft:diamond')
		.input('minecraft:shears')
		.input('3x minecraft:wheat')
		.input('3x minecraft:white_wool')
		.recipeTime(100) // 5 seconds
		.id('kubejs:summoning/sheep');
	//cow summoning
	event.recipes.summoningrituals.altar("plushies:cow_plushie")
		.mobOutput('cow')
		.mobOutput('cow')
		.input('minecraft:diamond')
		.input('minecraft:bucket')
		.input('3x minecraft:wheat')
		.input('3x minecraft:leather')
		.recipeTime(100) // 5 seconds
		.id('kubejs:summoning/cow');
	//chicken summoning
	event.recipes.summoningrituals.altar("plushies:chicken_plushie")
		.mobOutput('chicken')
		.input('minecraft:diamond')
		.input('3x minecraft:wheat_seeds')
		.recipeTime(100) // 5 seconds
		.id('kubejs:summoning/chicken');
	//pig summoning
	event.recipes.summoningrituals.altar("plushies:pig_plushie")
		.mobOutput('pig')
		.mobOutput('pig')
		.input('minecraft:diamond')
		.input('minecraft:saddle')
		.input('3x minecraft:carrot')
		.input('3x minecraft:red_mushroom')
		.recipeTime(100) // 5 seconds
		.id('kubejs:summoning/pig');
});

SummoningRituals.start(event => {
	let conditionFailed = false;
	let biomeName = event.level.getBiome(
		BlockPos(
			event.pos.x,
			event.pos.y,
			event.pos.z
		)
	);
	biomeName = biomeName.toString();
	// Utils.server.tell(biomeName);

	let biomeNameArray = biomeName.split(" / ");
	biomeName = biomeNameArray[1];
	// Utils.server.tell(biomeName);

	biomeNameArray = biomeName.split("]");
	biomeName = biomeNameArray[0];
	// Utils.server.tell(biomeName);

	// for the Elder Guardian summoning ritual...
	if (event.recipe.id == 'kubejs:summoning/elder_guardian'){
		event.player.sendSystemMessage(event.player.username + ` is attempting to summon an Elder Guardian!`);
		
		// if the player does not have conduit power, cancel the craft
		if (!event.player || !event.player.hasEffect('minecraft:conduit_power')){
			conditionFailed = true;
			event.player.sendSystemMessage("Player does not have the conduit power effect");
		}

		// if the player is not in the deep ocean biome, cancel the craft
		if (biomeName != "minecraft:deep_ocean"){
			conditionFailed = true;
			event.player.sendSystemMessage("Player is not in the Deep Ocean biome");
		}

		// if the player is not below y=42, cancel the craft
		if (event.pos.y > 32) {
			conditionFailed = true;
			event.player.sendSystemMessage("Player is above y=32");
		}
	}
	
	if (conditionFailed){
		event.cancel();
	} else if(event.recipe.id == 'kubejs:summoning/elder_guardian'){
		// lets a lightning strike hit the altar when starting the ritual
		event.level.spawnLightning(event.pos.x, event.pos.y, event.pos.z, true);
	} else return;
});

ServerEvents.recipes(event => {
	event.shaped("summoningrituals:altar",
		[
			'ABC',
			'DDD',
			'EDE'
		],
		{
			A: "minecraft:candle",
			B: "minecraft:red_carpet",
			C: "minecraft:wither_skeleton_skull",
			D: "minecraft:dark_oak_planks",
			E: "minecraft:gold_nugget"
		}
	)
})