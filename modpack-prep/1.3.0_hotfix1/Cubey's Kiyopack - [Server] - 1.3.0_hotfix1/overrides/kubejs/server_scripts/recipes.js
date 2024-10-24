ServerEvents.tags('item', event => {
	// Add a forge tag for unstripped logs
	// This way recipes can distinguish between unstripped and stripped

	event.removeAll('forge:unstripped_logs')
	const logsList = event.get('minecraft:logs').getObjectIds()
	const blacklistStripped = Ingredient.of(/.*stripped.*/)
	logsList.forEach(log => {
		if (!blacklistStripped.test(log)) event.add('forge:unstripped_logs', log)
	})
	event.add('minecraft:logs', 'ad_astra:aeronos_stem')
	event.add('minecraft:logs', 'ad_astra:strophar_stem')
	event.add('minecraft:logs', 'iceandfire:dreadwood_log')

	const unstrippedLogsList = event.get('forge:unstripped_logs').getObjectIds()
	const blacklistWood = Ingredient.of(/.*wood.*/)
	const blacklistHyphae = Ingredient.of(/.*hyphae.*/)
	const blacklistCarved = Ingredient.of(/.*carved.*/)
	unstrippedLogsList.forEach(log => {
		if (
			!blacklistWood.test(log) &&
			!blacklistHyphae.test(log) &&
			!blacklistCarved.test(log)
		)
		{
			event.add('forge:tree_trunks', log)
		}
	})
	event.remove('forge:tree_trunks','occultism:otherworld_log_natural')

	const treeTrunksList = event.get('forge:tree_trunks').getObjectIds()
	treeTrunksList.forEach(trunk => {
		let plank = String(trunk).replace("_log","_planks")
		plank = String(plank).replace("_stem","_planks")
		event.add('forge:regular_planks', plank)
	})

	event.add('forge:gems/sulfur','createloveandwar:sulphur')
	event.add('forge:dusts/sulfur','createloveandwar:raw_sulphur')

	//fix tallow & animal fat
	event.add('hexerei:tallow_meltable', 'delightful:animal_fat')
	event.add('hexerei:tallow_meltable', 'occultism:tallow')
	event.add('forge:tallow', 'occultism:tallow')
	event.add('forge:tallow', 'hexerei:animal_fat')
	event.add('forge:tallow', 'delightful:animal_fat')
})

ServerEvents.recipes(event => {

	// Define some arrays:

	// list of the 16 minecraft colors
	const minecraftColors = [
		"white",
		"light_gray",
		"gray",
		"black",
		"brown",
		"red",
		"orange",
		"yellow",
		"lime",
		"green",
		"cyan",
		"light_blue",
		"blue",
		"purple",
		"magenta",
		"pink"
	];

	// names for some tools and the corresponding materials 
	const toolMaterials = [
		["iron","iron_ingot"],
		["gold","gold_ingot"],
		["diamond","diamond"]
	];

	// names for construction wand materials
	const constructionWandMaterials = [
		["stone","cobblestone"],
		["iron","iron_ingot"],
		["diamond","diamond"],
		["infinity","nether_star"]
	];

	const materialBlocksList = [
		["minecraft","coal"],
		["minecraft","iron"],
		["minecraft","gold"],
		["minecraft","redstone"],
		["minecraft","emerald"],
		["minecraft","lapis"],
		["minecraft","diamond"],
		["minecraft","netherite"],
		["minecraft","quartz"],
		["minecraft","copper"],
		["embers","lead"],
		["embers","silver"],
		["create","zinc"],
		["create","brass"],
		["vintageimprovements","vanadium"],
		["destroy","nickel"],
		["destroy","palladium"],
		["destroy","platinum"],
		["destroy","rhodium"],
		["alexscaves","uranium"]
	];

	const baulkMaterials = [
		[
			"arcane_wood",
			["","_log","",""],
			["stripped_","_log","stripped_",""],
			["","_planks","","_planks"]
		],
		[
			"innocent_wood",
			["","_log","",""],
			["stripped_","_log","stripped_",""],
			["","_planks","","_planks"]
		],
		[
			"cork_bamboo",
			["","_block","",""],
			["","_planks","","_planks"],
			["","_chiseled_planks","","_chiseled_planks"]
		],
	]

	const toolsList = [
		"pickaxe",
		"shovel",
		"axe",
		"sword",
		"hoe"
	];

	const terralithEmbersReplaceList = [
		"observer",
		"dropper",
		"dispenser",
		"piston",
		"lever",
		"sticky_piston",
		"lead"
	]

	const shelvesList = [
		["minecraft:oak_",""],
		["luphieclutteredmod:luphie_pink_","pink_"]
	]

	const adAstraStoneMaterials = [
		"mercury",
		"glacio",
		"moon",
		"venus",
		"mars",
		"permafrost"
	]

	let pillarTrimMaterials = [
		"minecraft:granite",
		"minecraft:andesite",
		"minecraft:diorite",
		"minecraft:"
	]

	///////////////////////////////////
	///////// RECIPE CHANGES //////////
	///////////////////////////////////

	//////// MODS CAUSING ISSUES /////////

	// remove Hexerei's witch armor
	event.remove({id:"hexerei:witch_hat"})
	event.remove({id:"hexerei:witch_chestplate"})
	event.remove({id:"hexerei:witch_boots"})

	/////// COBBLEMON UNIMPLEMENTED ///////

	event.shaped("unimplemented_items:repel",
			[
				'ABA',
				'BCB',
				'ABA'
			],
			{
				A: "minecraft:iron_ingot",
				B: "minecraft:obsidian",
				C: "cobblemon:poke_ball"
	  		}
		)

	//////// CREATE RECIPES /////////

	// With the Create extruder,
	// Make deepslate from water + lava with deepslate beneath
	// makes deepslate renewable
	event.recipes.
		createMechanicalExtruderExtruding(
			Item.of('minecraft:cobbled_deepslate'),
			[
				Fluid.of('minecraft:water'),
				Fluid.of('minecraft:lava')
			]
		).withCatalyst('minecraft:deepslate')

	// Splashing recipe to turn bone blocks into calcite
	// Purely for convenience
	event.recipes.create.splashing('calcite', 'bone_block')

	// self-conflicting recipe
	event.remove({id:"copycats:crafting/copycat_vertical_stairs_from_conversion"})
	event.shapeless("copycats:copycat_vertical_stairs","copycats:copycat_stairs")

	// conflict with alex's caves sulfur,vintage improvements sulfur
	event.remove({id:"alexscaves:sulfur_from_dust"})
	event.remove({id:"createloveandwar:sulphur_block"})

	//add radrock uranium ore to crushing
	event.recipes.create.crushing(
		[
			'2x create:crushed_raw_uranium',
			Item.of('create:crushed_raw_uranium').withChance(0.5),
			'create:experience_nugget',
			Item.of('minecraft:cobblestone').withChance(0.12)
		],
		'alexscaves:radrock_uranium_ore'
	)

	//add a wool complement to destroy's saddle recipe
	event.shaped("minecraft:saddle",
		[
			'AAA',
			'BBB',
			'C C'
		],
		{
			A: "#minecraft:wool",
			B: "#forge:leather",
			C: "minecraft:tripwire_hook"
		  }
	)

	// why is this in the game???
	event.remove({id:"jei:/create_cobblemon/haunt_iron_ingot"})

	///////// FORBIDDEN & ARCANUS /////////

	// incorrect recipe
	let fenceGateCorrection = ["aurum","edelwood","fungyss"]
	fenceGateCorrection.forEach(fenceGate =>{
		let recipeID = "forbidden_arcanus:" + fenceGate + "_fence_gate"
		let planks = "forbidden_arcanus:" + fenceGate + "_planks"
		event.remove({id:recipeID})
		event.shaped(recipeID,
			[
				'BAB',
				'BAB'
			],
			{
				A: planks,
				B: "#forge:rods/wooden"
	  		}
		)
	})

	// conflict with ice & fire jar
	event.replaceInput(
		{id:'forbidden_arcanus:utrem_jar'},
		'forbidden_arcanus:edelwood_planks',
		'everycomp:ib/forbidden_arcanus/edelwood_large_button'
	)

	// Remove Forbidden Arcanus Stella Arcanum from the Occultism miner
	// Makes it harder to obtain
	event.remove({id: "occultism:miner/master/stella_arcanum"})

	// Remove Forbidden Arcanus Stella Arcanum from the Occultism miner
	// Makes it harder to obtain
	event.remove({id: "occultism:miner/master/stella_arcanum"})

	///////// QUARK ADJUSTMENTS /////////
	
	// function to remove minecraft wool dyeing
	// avoids conflict with quark wool dyeing
	minecraftColors.forEach(color => {
		let recipeID = "minecraft:dye_" + color + "_wool"
		event.remove({id: recipeID})
	})

	// change the rats assorted veg recipe
	// avoids conflict with quark crates
	event.remove({
		output: "rats:assorted_vegetables"
	})
	event.shaped(
		Item.of("rats:assorted_vegetables", 1),
		[
			' A ',
			'AAA',
			' A '
		],
		{
			A: '#forge:vegetables'
		}
	)

	// conflict with quark blackstone furnace
	event.remove({output:"nethersdelight:blackstone_furnace"})

	// avoids conflict with blackstone and deepslate furnaces from quark
	event.remove({id: "quark:building/crafting/furnaces/mixed_furnace"})
	event.replaceInput(
		{
			id: "quark:building/crafting/furnaces/cobblestone_furnace"
		},
		"#forge:cobblestone",
		"minecraft:cobblestone"
	)

	// redundant from quark slab to plank
	event.remove(
		{id:"silentgear:netherwood_planks_from_slabs"}
	)

	// recipe conflict with other glass shards to glass
	event.remove({id:'quark:tweaks/crafting/dirty_glass'})
	event.shaped('quark:dirty_glass',
		[
			'AA',
			'AA'
		],
		{
			A: 'quark:dirty_shard'
  		}
  	)

	event.shapeless(
		Item.of('quark:dirty_shard', 1),
		[
			'#quark:shards',
			'minecraft:dirt'
		]
	)

	// self conflict with oak chests
	event.remove({id:"quark:tweaks/crafting/utility/chests/mixed_chest_wood"})
	event.remove({id:"quark:building/crafting/chests/mixed_chest"})
	
	// add framed block to wizard's reborn baulk recipes
	// prevents a conflict with quark vertical planks
	baulkMaterials.forEach(baulk => {
		let j = 1;
		while (j < baulk.length){
			let baulkInput =
				"wizards_reborn:" +
				baulk[j][0] +
				baulk[0] +
				baulk[j][1]
			let baulkOutput =
				"wizards_reborn:" +
				baulk[j][2] +
				baulk[0] +
				baulk[j][3] +
				"_baulk"

			event.remove({output: baulkOutput});
			event.shaped(
				Item.of(baulkOutput, 1),
				[
					' A ',
					' B ',
					' A '
				],
				{
					A: baulkInput,
					B: "#minecraft:logs"
				}
			)
			j++
		}
	})

	///////// WEAPON CONFLITCS /////////

	// recipe to reshape simply swords rapiers
	// avoids conflict with farmer's delight knives
	toolMaterials.forEach(toolMat => {
		let itemID = "simplyswords:" + toolMat[0] + "_rapier"
		let materialID = "minecraft:" + toolMat[1]
		event.remove({output: itemID})
		event.shaped(
			Item.of(itemID, 3),
			[
				'  B',
				' BB',
				'A  '
			],
			{
				A: '#forge:rods/wooden',
				B: materialID
			}
		)
	})

	// conflict with simplyswords spears
	constructionWandMaterials.forEach(material => {
		let itemID = "constructionwand:" + material[0] + "_wand"
		let materialID = "minecraft:" + material[1]
		event.remove({output: itemID})
		event.shaped(itemID,
			[
				' AB',
				' CA',
				'C  '
			],
			{
				A: "#forge:string",
				B: materialID,
				C: "#forge:rods/wooden"
			}
		)
	})

	// use the unstripped logs only for vinery's grapevine stem
	// avoid conflict with create casing oak shaft
	// avoid conflict with arcane wood branch
	// event.replaceInput(
	// 	{id:'vinery:grapevine_stem'},
	// 	'#minecraft:logs',
	// 	'#forge:unstripped_logs'
	// )
	// event.replaceInput(
	// 	{id:"vinery:dark_cherry_beam"},
	// 	"vinery:dark_cherry_log",
	// 	"vinery:stripped_dark_cherry_log"
	// )
	event.remove({id:"wizards_reborn:shaped/arcane_wood_branch"})
	event.remove({id:"wizards_reborn:shaped/innocent_wood_branch"})

	// replace planks with slabs in brewery sideboard recipe
	// avoids conflict with handcrafted nightstand

	// event.replaceInput(
	// 	{id:'brewery:sideboard'},
	// 	'#minecraft:planks',
	// 	'#minecraft:wooden_planks'
	// )

	///////// CLUTTERED MOD STUFF //////////

	// redundant recipe
	event.remove({id:"luphieclutteredmod:luphie_purple_plank_set_stick_recipe"})
	event.remove({id:"luphieclutteredmod:luphie_glow_wood_set_stick_recipe"})

	// incorrect recipe
	event.remove({id:'luphieclutteredmod:luphie_green_planks_recipe'})
	event.shapeless(
		Item.of('luphieclutteredmod:luphie_green_planks', 4),
		['luphieclutteredmod:luphie_green_log']
	)

	event.remove({id:'luphieclutteredmod:luphie_flowering_pink_planks_recipe'})
	event.shapeless(
		Item.of('luphieclutteredmod:luphie_flowering_pink_planks', 4),
		['luphieclutteredmod:luphie_flowering_pink_log']
	)

	event.remove({id:'luphieclutteredmod:luphie_flowering_yellow_planks_recipe_alt'})
	event.remove({id:'luphieclutteredmod:luphie_flowering_yellow_planks_recipe_alt_2'})
	event.shapeless(
		Item.of('luphieclutteredmod:luphie_flowering_yellow_planks', 4),
		['luphieclutteredmod:stripped_luphie_flowering_log']
	)
	event.shapeless(
		Item.of('luphieclutteredmod:luphie_flowering_yellow_planks', 4),
		['luphieclutteredmod:stripped_luphie_flowering_wood']
	)

	event.replaceInput(
		{id: "luphieclutteredmod:stripped_f_lowering_purple_wood_recipe"},
		"luphieclutteredmod:luphie_flowering_purple_log",
		"luphieclutteredmod:stripped_luphie_flowering_purple_log"
	)
	event.replaceOutput(
		{id: "luphieclutteredmod:stripped_f_lowering_purple_wood_recipe"},
		"luphieclutteredmod:luphie_flowering_purple_wood",
		"luphieclutteredmod:stripped_luphie_flowering_purple_wood"
	)

	event.remove({id:"luphieclutteredmod:luphie_glow_planks_recipe"})
	event.shapeless(
		Item.of('luphieclutteredmod:luphie_glow_planks', 4),
		['luphieclutteredmod:luphie_glow_log']
	)

	event.replaceInput(
		{id:"luphieclutteredmod:luphie_flowering_purple_plank_recipe"},
		"luphieclutteredmod:luphie_flowering_purple_log",
		"luphieclutteredmod:luphie_flowering_purple_wood"
	)

	// conflict with luphiecluttered:muffin
	event.replaceInput(
		{id: "luphieclutteredmod:luphie_pancake_stack_recipe"},
		"minecraft:sweet_berries",
		"minecraft:red_dye"
	)

	// conflict with luphie closed cardboard box
	event.remove({id:"supplementaries:present"})
	event.shaped(
		Item.of("supplementaries:present",1),
		[
			'AAA',
			'ABA',
			'AAA'
		],
		{
			A: "minecraft:paper",
			B: "#forge:string"
		}
	)

	// conflict with luphie heart armchair
	event.replaceInput(
		{id:"luphieclutteredmod:luphie_heart_armchair_recipe"},
		"minecraft:peony",
		"miencraft:pink_petals"
	)

	// conflict with magic vibe small stack of books
	// better recipe parity
	event.remove({id:"magic_vibe_decorations:smallbooksrecipe"})
	event.shapeless("luphieclutteredmod:luphie_stack_of_small_books",["magic_vibe_decorations:booksstacksmall"])
	event.shapeless("magic_vibe_decorations:booksstacksmall",["luphieclutteredmod:luphie_stack_of_small_books"])

	event.remove({id:"magic_vibe_decorations:bigbookstack"})
	event.shapeless("magic_vibe_decorations:bigbookstack",
		[
			"magic_vibe_decorations:booksstacksmall",
			"magic_vibe_decorations:booksstacksmall"
		]
	)
	event.shapeless("luphieclutteredmod:luphie_tall_stack_of_small_books",["magic_vibe_decorations:bigbookstack"])
	event.shapeless("magic_vibe_decorations:bigbookstack",["luphieclutteredmod:luphie_tall_stack_of_small_books"])

	// conflict with everycompat purple bookshelf	
	event.remove({id:"luphieclutteredmod:luphie_calico_purple_bookshelf_recipe"})
	event.shaped(
		Item.of("luphieclutteredmod:luphie_calico_cat_purple_bookshelf",1),
		[
			'AAA',
			'BCB',
			'AAA'
		],
		{
			A: "luphieclutteredmod:luphie_purple_planks",
			B: "minecraft:book",
			C: "plushies:cat_plushie"
		}
	)
	
	// fix conflict with handcrafted plate
	shelvesList.forEach(shelf =>{
		let materialBlockID = shelf[0] + "slab"
		let outputID = "luphieclutteredmod:small_" + shelf[1] + "shelf"
		let recipeID = outputID.concat("_recipe")
		let fenceBlockID = shelf[0] + "fence"

		event.remove({id:recipeID})
		event.shaped(
			Item.of(outputID,1),
			[
				'   ',
				'AAA',
				'B B'
			],
			{
				A: materialBlockID,
				B: fenceBlockID
			}
		)
	})

	///////// HANDCRAFTED CONFLICTS /////////

	// conflict with handcrafted wood cup
	// event.remove({id:"vinery:storage_pot"})
	// event.shaped(
	// 	Item.of("vinery:storage_pot",1),
	// 	[
	// 		'A A',
	// 		'BAB',
	// 		'   '
	// 	],
	// 	{
	// 		A: "minecraft:spruce_slab",
	// 		B: "minecraft:spruce_planks",
	// 	}
	// )

	// conflict with handcrafted sheet
	minecraftColors.forEach(color=> {
		let wool = "minecraft:" + color + "_wool"
		let carpet = "minecraft:" + color + "_carpet"
		let sheet = "handcrafted:" + color + "_sheet"
		event.replaceInput(
			{type:"minecraft:crafting_shapeless", output:sheet},
			wool,
			carpet
		)
	})

	Ingredient.of("#handcrafted:pillar_trims").itemIds.forEach(pillarTrim => {
		var inputPlank
		let outputID = String(pillarTrim)
		event.forEachRecipe(
			{type:"minecraft:crafting_shaped",output:outputID},
			trimRecipe => {
				let ingredient = trimRecipe.originalRecipeIngredients
				inputPlank = ingredient[0]
				inputPlank = inputPlank.itemIds[0]
				inputPlank = String(inputPlank)
			}
		)

		let nameSplit = outputID.split(":")
		let inputSlab = ""
		if (nameSplit[0]=="handcrafted"){
			inputSlab = inputSlab.concat(
				"minecraft:",
				nameSplit[1].replace("pillar_trim","slab")
			)
		} else {
			let nameSplit2 = nameSplit[1].split("/")
			inputSlab = inputSlab.concat(
				nameSplit2[1],
				":",
				nameSplit2[2].replace("pillar_trim","")
			)
			if (nameSplit2[1] == "quark"){
				inputSlab = inputSlab.concat("planks_slab")
			} else if (nameSplit2[2]=="luphie_glow_pillar_trim"){
				inputSlab = inputSlab.concat("wood_set_slab")
			} else if (nameSplit2[2]=="luphie_purple_pillar_trim"){
				inputSlab = inputSlab.concat("plank_set_slab")
			} else if (nameSplit2[2]=="dreadwood_pillar_trim"){
				inputSlab = "minecraft:oak_slab"
			} else {
				inputSlab = inputSlab.concat("slab")
			}
		}

		event.remove({type:"minecraft:crafting_shaped",output:outputID})
		event.shaped(Item.of(outputID,8),
			[
				"ABA",
				"ABA",
				"ABA"
			],
			{
				A: inputSlab,
				B: inputPlank
			}
		)
	})	

	///////// AD ASTRA STUFF //////////

	// handcrafter hammer conflict with ad astra hammar
	event.remove({id: "handcrafted:hammer"});
	event.shaped(
		Item.of("handcrafted:hammer", 1),
		[
			' AB',
			' CA',
			'C  '
		],
		{
			A: "minecraft:iron_ingot",
			B: "#forge:string",
			C: "#forge:rods/wooden"
		}
	)

	// conflicting recipes
	adAstraStoneMaterials.forEach(material => {
		var recipeID
		var oldInput
		var newInput
		if (material == "permafrost"){
			recipeID = "ad_astra:recipes/" + material + "_bricks"
			oldInput = "ad_astra:" + material
			newInput = "ad_astra:polished_" + material
		} else {
			recipeID = "ad_astra:recipes/" + material + "_stone_bricks"
			oldInput = "ad_astra:" + material + "_stone"
			newInput = "ad_astra:polished_" + material + "_stone"
		}
		event.replaceInput(
			{id:recipeID},
			oldInput,
			newInput
		)
	})

	event.replaceInput(
		{id:"ad_astra:recipes/cracked_venus_sandstone_bricks_from_smelting_venus_stone_bricks"},
		"ad_astra:venus_stone_bricks",
		"ad_astra:venus_sandstone_bricks"
	)
	
	// conflict with createloveandwar:steel
	event.remove({id:"ad_astra:recipes/steel_nugget"})

	// ad astra's steel is too easy
	event.remove(
		{output:'ad_astra:steel_ingot'}
	)

	///////// MISC /////////

	//make supplementaries flax & silent gear flax compatible
	event.shapeless("silentgear:flax_seeds",["supplementaries:flax_seeds"])
	event.shapeless("supplementaries:flax_seeds",["silentgear:flax_seeds"])

	event.shaped('2x supplementaries:flax', ['AA', 'AA'], {
		A: 'silentgear:flax_fiber'
  	})

	event.shaped('4x silentgear:flax_fiber', ['A', 'A'], {
		A: 'supplementaries:flax'
  	})

  	//make animal fat and tallow compatible
	event.replaceInput(
		{id:"supplementaries:soap_from_animal_fat"},
		"delightful:animal_fat",
		"#forge:tallow"
	)

	event.replaceInput(
		{id:"delightful:candle_from_animal_fat"},
		"delightful:animal_fat",
		"#forge:tallow"
	)

	event.replaceInput(
		{id:"jei:/delightful/cooking/animal_oil_bottle"},
		"delightful:animal_fat",
		"#forge:tallow"
	)

	event.replaceInput(
		{id:"jei:/farmersdelight/cooking/dog_food_from_animal_fat"},
		"delightful:animal_fat",
		"#forge:tallow"
	)

	event.replaceInput(
		{id:"occultism:crafting/candle"},
		"occultism:tallow",
		"#forge:tallow"
	)

	//explorers compass needs ender eyes
	event.replaceInput(
		{id:'explorerscompass:explorerscompass'},
		'minecraft:cobweb',
		'minecraft:ender_eye'
	)
	//and obsidian
	event.replaceInput(
		{id:'explorerscompass:explorerscompass'},
		'minecraft:cracked_stone_bricks',
		'minecraft:obsidian'
	)

	//permanent sponges require minecraft sponge
	event.replaceInput(
		{id:'permanentsponges:aqueous_sponge'},
		'#minecraft:wool',
		'minecraft:sponge'
	)
	event.replaceInput(
		{id:'permanentsponges:magmatic_sponge'},
		'#minecraft:wool',
		'minecraft:sponge'
	)

	// converter between existing silver/copper types
	event.shapeless("occultism:raw_silver",["#forge:raw_materials/silver"])
	event.shapeless("occultism:silver_nugget",["#forge:nuggets/silver"])
	event.shapeless("create:copper_nugget",["#forge:nuggets/copper"])

	// overlap with ice & fire tools
	toolsList.forEach(tool => {
		let itemID = "embers:silver_" + tool
		event.remove({output: itemID})
	})

	// more general recipe added by terralith & embers
	terralithEmbersReplaceList.forEach(item =>{
		let itemID = "minecraft:" + item
		event.remove({id:itemID})
	})

	// this recipe is more general
	// conflict b/t minecraft and farmer's delight
	event.remove({id:"minecraft:cake"})
	event.replaceInput(
		{id:"farmersdelight:cake_from_milk_bottle"},
		"#forge:eggs/bird",
		"#forge:eggs",
	)

	// unify conflicting dough recipes
	event.remove({output:"farmersdelight:wheat_dough"})
	// event.remove({output:"bakery:dough"})
	for(let i=1; i<5; i++){
		let recipeID = "create_central_kitchen:crafting/dough_" + i
		event.remove({id:recipeID})
	}

	// overlap with occultism smelting
	event.remove({id:"destroy:smelting/copper_from_powder"})
	event.remove({id:"destroy:blasting/copper_from_powder"})
	event.remove({id:"destroy:smelting/iron_from_powder"})
	event.remove({id:"destroy:blasting/iron_from_powder"})

	// overlap with create
	event.remove({id:"embers:copper_nugget_to_ingot"})
	event.remove({id:"iceandfire:copper_nuggets_to_ingot"})

	// conflict with handcrafted plate
	event.remove({id:"supplementaries:item_shelf"})
	event.shapeless("supplementaries:item_shelf",["quark:stripped_oak_post"])

	// redundant items
	let hexereiWoods = ["mahagony","willow","witch_hazel"]
	hexereiWoods.forEach(hexereiWood =>{
		let recipeID = "hexerei:" + hexereiWood + "_woodcutter"
		event.remove({id:recipeID})
	})

	event.remove({id:"farmingforblockheads:feeding_trough"})

	Ingredient.of("#comforts:hammocks").itemIds.forEach(hammock => {
		event.remove({output:hammock})
	})

	// KIYO GUIDEBOOK
	event.shapeless(
		Item.of('patchouli:guide_book','{"patchouli:book":"patchouli:kiyopack_guide"}'),
		["minecraft:book","minecraft:red_concrete"]
	)

	// event.shapeless('quark:dirty_shard', ['AA', 'AA'], {
	// 	A: 'minecraft:apple'
  	// })

	// event.remove([
	// 	{
	// 		mod:'farmersdelight',
	// 		id: 'minecraft:glowstone'
	// 	},

	// ]);
});

ServerEvents.compostableRecipes(event => {
	event.add("silentgear:flax_seeds", 0.3)
})


LootJS.modifiers(event => {
	event
		.addBlockLootModifier('#forge:ores')
		.modifyLoot('#forge:raw_materials',
		item => {
			const replacement = AlmostUnified.getReplacementForItem(item);
			if (replacement.isEmpty()) {
				return item;
			}
			replacement.setCount(item.getCount());
			return replacement;
		}
	);

    event
    	.addBlockLootModifier("iceandfire:silver_pile")
    	.replaceLoot("iceandfire:silver_nugget", "occultism:silver_nugget");
    event
    	.addBlockLootModifier("iceandfire:copper_pile")
    	.replaceLoot("iceandfire:copper_nugget", "create:copper_nugget");

    event.addEntityLootModifier("minecraft:elder_guardian")
		.addLoot("2x bettertridents:trident_fragment");

});