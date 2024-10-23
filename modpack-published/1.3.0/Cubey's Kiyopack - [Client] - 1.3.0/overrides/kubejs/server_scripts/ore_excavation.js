ServerEvents.tags('worldgen/biome', event => {
	event.add('forge:has_uranum', 'alexscaves:toxic_caves')
})

ServerEvents.recipes(event => {
	
	//Adding_veins
	//.placement(spacing, separation, salt)
	//If all three values match the_veins overwrite each other
	//Use .priority(<value>) to set the_vein generation priority

	// uranium, sulphur, tungsten, thorium, fluorite,_ice_shard,_cheese
	// nickel,_ostrum,_calorite, silver, lead,

	// list entries are:
	// [vein name, material ID, biome whitelist, min dist b/t veins, max dist b/t veins, priority, drilling time]
	// min distance must be strictly less than double the max distance
	// min + max should be a multiple of 2
	// distance is measured in chunks
	// higher priority overrides lower priority
	// drilling time is in ticks at 32 rpm

	const oreVeinList = [
		["uranum","alexscaves","uranium","forge:has_uranum",[0,2],5,100],
		["Sulphur","alexscaves","sulfur_dust","forge:has_uranum",[0,2],5,100],
		["Venus Coal","ad_astra","venus_coal","ad_astra:venus_wastelands","default",1,100],
		["Glacio Coal","ad_astra","glacio_coal","ad_astra:glacio_snowy_barrens","default",1,100],
		["Moon Iron","minecraft","raw_iron","ad_astra:lunar_wastelands","default",1,100],
		["Mars Iron","minecraft","raw_iron","ad_astra:martian_wastelands","default",1,100],
		["Mercury Iron","minecraft","raw_iron","ad_astra:mercury_deltas","default",1,100],
		["Glacio Iron","minecraft","raw_iron","ad_astra:glacio_snowy_barrens","default",1,100],
		["Glacio Copper","minecraft","raw_copper","ad_astra:glacio_snowy_barrens","default",1,100],
		["Glacio Lapis","minecraft","lapis_lazuli","ad_astra:glacio_snowy_barrens","default",1,100],
		["Mars Diamond","minecraft","diamond","ad_astra:martian_canyon_creek","default",1,100],
		["Venus Diamond","minecraft","diamond","ad_astra:venus_wastelands","default",1,100],
		["Moon Cheese","ad_astra","cheese","ad_astra:lunar_wastelands","default",1,100],
		["Moon Ice Shard","ad_astra","ice_shard","ad_astra:lunar_wastelands","default",1,100],
		["Mars Ice Shard","ad_astra","ice_shard","ad_astra:martian_polar_caps","default",1,100],
		["Glacio Ice Shard","ad_astra","ice_shard","ad_astra:glacio_ice_peaks","default",1,100],
		["Moon Desh","ad_astra","raw_desh","ad_astra:lunar_wastelands","default",1,100],
		["Mars Ostrum","ad_astra","raw_ostrum","ad_astra:martian_canyon_creek","default",1,100],
		["Venus Calorite","ad_astra","raw_calorite","ad_astra:infernal_venus_barrens","default",1,100],
		["Tungsten","createloveandwar","raw_tungsten","forge:is_overworld","default",1,100],
		["Lead","embers","raw_lead","forge:is_overworld","default",1,100],
		["Silver","embers","raw_silver","forge:is_overworld","default",1,100]
	]

	function generateOreVeins(veinProperties){

		let veinName = veinProperties[0]
		let veinMod = veinProperties[1]
		let veinMaterial = veinProperties[2]
		let allowedBiomes = veinProperties[3]
		let minDistance = 2048
		let maxDistance = 3968
		if (veinProperties[4] == "default"){
			// do nothing
		} else {
			let minDistance = veinProperties[4][0]
			let maxDistance = veinProperties[4][1]
		}
		let veinPriority = veinProperties[5]
		let drillingTime = veinProperties[6]

		veinOutput = veinMod.concat(":",veinMaterial)
		let separation = minDistance;
		let spacing = (maxDistance + minDistance)/2;
		let veinText = '{"text": "'
		veinText = veinText.concat(veinName,'"}')
		let prefix = "kubejs:"
		veinID = prefix.concat(veinMaterial,"_vein")
		drillingID = prefix.concat(veinMaterial,"_drilling")

		let salt = Math.round(100000000*Math.random());

		event.recipes.createoreexcavation
			.vein(
				veinText,
				veinOutput
			)
			.placement(spacing, separation, salt)
			.biomeWhitelist(allowedBiomes)
			.priority(veinPriority)
			.id(veinID);

		event.recipes.createoreexcavation
			.drilling(
				veinOutput,
				veinID,
				drillingTime
			)
			.id(drillingID);
	}
});

//Add any new drill items to #createoreexcavation:drills item tag
//Place a drill texture under assets/<item mod id>/textures/entity/drill/<item name>.png
//See assets/createoreexcavation/textures/entity/drill/drill.png