ig.module( 'game.levels.spacecraft' )
.requires( 'impact.image','game.entities.spacecraft','game.entities.teleporter','game.entities.recharge','game.entities.food','game.entities.partszone','game.entities.boxes','game.entities.chair','game.entities.player','game.entities.static_battery','game.entities.static_circuit','game.entities.static_antena','game.entities.partsfinal' )
.defines(function(){
LevelSpacecraft=/*JSON[*/{
	"entities": [
		{
			"type": "EntitySpacecraft",
			"x": 0,
			"y": 0
		},
		{
			"type": "EntityTeleporter",
			"x": 1280,
			"y": 604,
			"settings": {
				"size": {
					"x": 200,
					"y": 20
				}
			}
		},
		{
			"type": "EntityRecharge",
			"x": 1672,
			"y": 76
		},
		{
			"type": "EntityFood",
			"x": 2562,
			"y": 106
		},
		{
			"type": "EntityFood",
			"x": 1150,
			"y": 98
		},
		{
			"type": "EntityPartszone",
			"x": 1336,
			"y": 204
		},
		{
			"type": "EntityBoxes",
			"x": 2160,
			"y": 396
		},
		{
			"type": "EntityBoxes",
			"x": 2728,
			"y": 464
		},
		{
			"type": "EntityBoxes",
			"x": 2338,
			"y": 196
		},
		{
			"type": "EntityChair",
			"x": 792,
			"y": 306
		},
		{
			"type": "EntityChair",
			"x": 1004,
			"y": 470
		},
		{
			"type": "EntityChair",
			"x": 1004,
			"y": 306
		},
		{
			"type": "EntityChair",
			"x": 796,
			"y": 470
		},
		{
			"type": "EntityPlayer",
			"x": 1340,
			"y": 508
		},
		{
			"type": "EntityStatic_battery",
			"x": 1352,
			"y": 233
		},
		{
			"type": "EntityStatic_circuit",
			"x": 1432,
			"y": 242
		},
		{
			"type": "EntityStatic_antena",
			"x": 1536,
			"y": 220
		},
		{
			"type": "EntityPartsfinal",
			"x": 640,
			"y": 136
		}
	],
	"layer": [
		{
			"name": "collision",
			"width": 45,
			"height": 11,
			"linkWithCollision": false,
			"visible": 1,
			"tilesetName": "",
			"repeat": false,
			"preRender": false,
			"distance": 1,
			"tilesize": 64,
			"foreground": false,
			"data": [
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
			]
		}
	]
}/*]JSON*/;
});