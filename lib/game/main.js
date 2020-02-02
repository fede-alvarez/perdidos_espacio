/* Global Variables */
const SPLASH_MODE = 1;
const INTRO_MODE  = 2;
const GAME_MODE   = 3;

let gameMode = GAME_MODE;

ig.module(
	'game.main'
)
.requires(
	'impact.game',
	'impact.font',
	'game.levels.spacecraft',
	'game.levels.exterior',
	'plugins.scrollscreen'
)
.defines(function() {

SpaceLost = ig.Game.extend(
{
	clearColor: '#B34E1D',

	autoSort : true,
	sortBy : ig.Game.SORT_POS_Y,

	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),

	// Game dependent
	debugMode : true,

	uiInterface : new ig.Image('media/gui.png'),

	run : function()
	{
		switch( gameMode )
		{
			case SPLASH_MODE:
				ig.system.setGame(SplashState);
				break;
			case INTRO_MODE:
				ig.system.setGame(IntroState);
				break;
			case GAME_MODE:
				this.update();
				this.draw();
				break;
		}
	},

	init: function()
	{
		ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
		ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
		ig.input.bind(ig.KEY.UP_ARROW, 'up');
		ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
		ig.input.bind(ig.KEY.SPACE, 'space');
		ig.input.bind(ig.KEY.Z, 'release');

		ig.game.currentLevel = LevelSpacecraft;
		this.loadLevel(ig.game.currentLevel);

		ig.game.teleporter.once = false;


		console.log(ig.game.player.item);
	},

	update: function()
	{
		this.parent();

		if (ig.game.currentLevel == LevelSpacecraft)
			this.scrollScreen(true);
		else
			this.scrollScreen(false);

		this.sortGameEntities();
	},

	sortGameEntities : function ()
	{
		this.entities.sort(sortByPosY);
		for ( var i = 0; i < this.entities.length; i++)
		{
			this.entities[i].zIndex = i;
		}
	},

	draw: function()
	{
		this.parent();

		// GUI
		this.uiInterface.draw(5,5);
		this.font.draw('NO ITEM', 29,54);
		this.font.draw( ig.game.player.collectedPieces + ' / 3 COLLECTED PIECES', 115,32);

		ig.system.context.fillStyle = "rgba(55, 170, 231)";
		ig.system.context.beginPath();
		ig.system.context.rect(161,70, (190* ig.game.player.health)/10, 20);
		ig.system.context.closePath();
		ig.system.context.fill();
	},

	randomRange : function( min, max )
	{
		return Math.round(Math.random() * (max - min)) + min;
	}
});

function sortByPosY(a, b)
{
    var x = a.pos.y;
    var y = b.pos.y;
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}

ig.main( '#canvas', SpaceLost, 60, 960, 640, 1 );

});
