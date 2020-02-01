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
	clearColor: '#091821',

	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),

	// Game dependent
	debugMode : true,

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

		this.loadLevel(LevelSpacecraft);
	},

	update: function()
	{
		this.parent();
		//this.scrollScreen();
	},

	draw: function()
	{
		this.parent();
	}
});

ig.main( '#canvas', SpaceLost, 60, 960, 640, 1 );

});
