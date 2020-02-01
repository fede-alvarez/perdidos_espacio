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
	},

	update: function()
	{
		this.parent();

		if (ig.game.currentLevel == LevelSpacecraft)
			this.scrollScreen(true);
		else
			this.scrollScreen(false);
		//this.sortEntities();
	},

	draw: function()
	{
		this.parent();

	},

	randomRange : function( min, max )
	{
		return Math.round(Math.random() * (max - min)) + min;
	}
});

ig.main( '#canvas', SpaceLost, 60, 960, 640, 1 );

});
