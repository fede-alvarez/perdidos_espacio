/* Global Variables */
const SPLASH_MODE = 1;
const INTRO_MODE  = 2;
const GAME_MODE   = 3;

let gameMode = GAME_MODE;

let savedInfo = {
	itemsPosition : [
		{ id : 1, name : "Battery", file: "battery.png", active: true, x:0, y:0, found : false},
		{ id : 2, name : "Circuit", file: "circuit.png", active: true, x:0, y:0, found : false},
		{ id : 3, name : "Antena",  file: "antena.png",  active: true, x:0, y:0, found : false},
	],
	currentItem : null,
	currentOxygen : 10
};

ig.module(
	'game.main'
)
.requires(
	'impact.game',
	'impact.font',
	'game.levels.spacecraft',
	'game.levels.exterior',
	'plugins.scrollscreen',
	'plugins.font-sugar'
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

	savedInfo : {
		itemsPosition : [
			{ id : 1, name : "Battery", file: "battery.png", x:0, y:0, found : false},
			{ id : 2, name : "Circuit", file: "circuit.png", x:0, y:0, found : false},
			{ id : 3, name : "Antena",  file: "antena.png",  x:0, y:0, found : false},
		],
		currentItem : null,
		currentOxygen : 10
	},

	gameOver : false,

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
		ig.input.bind(ig.KEY.X, 'space');
		ig.input.bind(ig.KEY.Z, 'release');

		ig.game.currentLevel = LevelSpacecraft;
		this.loadLevel(ig.game.currentLevel);

		if (!this.debugMode)
		{
			ig.game.player.paused = true;

			this.dialogManager = new DialogSystem();
			this.dialogManager.startDialogFrom(1);
			this.dialogManager.callback = this.onDialogEnds.bind(this);
		}
	},

	onDialogEnds : function ()
	{
		ig.game.player.paused = false;
	},

	update: function()
	{
		this.parent();

		if (this.gameOver)
		{
			console.log("Perdiste");
			this.player.paused = true;
			this.player.getDamaged();
		}else{
			if (!this.debugMode) this.dialogManager.updateDialog();

			if (ig.game.currentLevel == LevelSpacecraft)
				this.scrollScreen(true);
			else
				this.scrollScreen(false);

			this.sortGameEntities();
		}

	},

	draw: function()
	{
		this.parent();
		if (!this.debugMode) this.dialogManager.drawDialog();

		// GUI
		this.uiInterface.draw(5,5);

		this.font.draw( ig.game.player.collectedPieces + ' / 3 COLLECTED PIECES', 115,32);

		if (savedInfo.currentItem)
		{
			savedInfo.currentItem.anims.idle.draw(35,20);
		}else{
			this.font.draw('NO ITEM', 29,54);
		}

		// O2 Bar
		ig.system.context.fillStyle = "rgba(55, 170, 231)";
		ig.system.context.beginPath();
		ig.system.context.rect(161,70, (190 * savedInfo.currentOxygen)/10, 20);
		ig.system.context.closePath();
		ig.system.context.fill();
	},

	sortGameEntities : function ()
	{
		this.entities.sort(sortByPosY);
		for ( var i = 0; i < this.entities.length; i++)
			this.entities[i].zIndex = i;
	},

	randomRange : function( min, max )
	{
		return Math.round(Math.random() * (max - min)) + min;
	}
});

// Util sort function
function sortByPosY(a, b)
{
    var x = a.pos.y;
    var y = b.pos.y;
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}

/**
 * Splash State
 */
SplashState = ig.Class.extend(
{
	titleScreen : new ig.Image('media/menu/title_card.png'),
	playButton : new ig.Image('media/menu/play_button.png'),

	init: function ()
	{
		ig.input.bind(ig.KEY.SPACE, 'space');
		ig.input.bind(ig.KEY.X, 'pickup_item');
	},

	update : function()
	{
		if (ig.input.pressed('space')
			|| ig.input.pressed('pickup_item'))
		{
			gameMode = INTRO_MODE;
			ig.system.setGame(SpaceLost);
		}
	},

	draw : function ()
	{
		this.titleScreen.draw(0,0);

		var x = (ig.system.width * 0.5) - 116;
		var y = ig.system.height - 260;
		this.playButton.draw(x,y);
	},

	run : function ()
	{
		this.update();
		this.draw();
	}
});


/**
 * Intro State
 */
IntroState = ig.Class.extend(
{
	intro_1 : new ig.Image('media/intro/intro_1.png'),
	intro_2 : new ig.Image('media/intro/intro_2.png'),
	intro_3 : new ig.Image('media/intro/intro_3.png'),

	expectInput : false,

	init: function ()
	{
		ig.input.bind(ig.KEY.SPACE, 'space');
		ig.input.bind(ig.KEY.X, 'pickup_item');

		this.dialogManager = new DialogSystem();
		this.dialogManager.startDialogFrom(15);
		this.dialogManager.callback = this.onDialogEnds.bind(this);
	},

	onDialogEnds : function ()
	{
		this.expectInput = true;
	},

	update : function()
	{
		this.dialogManager.updateDialog();

		if (this.expectInput)
		{
			if (ig.input.pressed('space')
			|| ig.input.pressed('pickup_item'))
			{
				gameMode = GAME_MODE;
				ig.system.setGame(SpaceLost);
			}
		}
	},

	draw : function ()
	{
		var currentDialogId = this.dialogManager.getDialogIndex();

		switch (currentDialogId)
		{
			case 15:
			case 16:
				this.intro_1.draw(0,0);
				break;
			case 17:
			case 18:
				this.intro_2.draw(0,0);
				break;
			case 19:
				this.intro_3.draw(0,0);
				break;
		}

		this.dialogManager.drawDialog();
	},

	run : function ()
	{
		this.update();
		this.draw();
	}
});

/**
 * ========================
 * Generic Dialog System
 * ========================
 */

DialogSystem = ig.Class.extend(
{
	//final.font.png' ),
	secFont: new ig.Font( 'media/04b03.font.png', { borderColor: '#4A2559',
													borderSize:2,
													fontColor: '#FFF',
													letterSpacing : 2} ),
	whiteFont: new ig.Font ('media/04b05.font.png'),

	dialogOpts :
	{
		charSpeed 	  	   : 3,
		currDialogStr 	   : null,
		currentDialogIndex : 1,
		dialogCounter 	   : 0,
		internalPointer    : 0,
		stringFinalized    : false,
		currentSection 	   : null,

		choicesCount 	   : 0,
		currentChoice	   : 0,
		choicesActive	   : false,

		position 		   : {x:10, y:515, textOffset: 15},

		active 			   : false
	},

	callback : null,
	onChoiceSelected : null,

	init: function ()
	{
		ig.input.bind(ig.KEY.X, 'pickup_item');
	},

	update : function()
	{
		this.updateDialog();
	},

	draw : function ()
	{
		this.drawDialog();
	},

	run : function ()
	{
		this.update();
		this.draw();
	},

	startDialogFrom : function ( dialogIndex )
	{
		this.resetDialog();

		var dialog = this.getDialogObject(dialogIndex);
		if (dialog != null)
		{
			this.dialogOpts.currentDialogIndex = dialogIndex;
			this.dialogOpts.currentSection = dialog.section;
			this.dialogOpts.currDialogStr = (dialog.text).toUpperCase();
			this.dialogOpts.active = true;

			if (ig.game.player) ig.game.player.canMove = false;
		}else{
			console.error("Not dialog with ID:", dialogIndex, "founded");
		}
	},

	updateDialogString : function ()
	{
		this.dialogOpts.dialogCounter += 1;

		if (!this.dialogOpts.stringFinalized
			&& (this.dialogOpts.dialogCounter != 0
			&& this.dialogOpts.dialogCounter % this.dialogOpts.charSpeed == 0))
		{
			this.dialogOpts.dialogCounter = 0;
			this.dialogOpts.internalPointer += 1;

			if (this.dialogOpts.internalPointer >= this.dialogOpts.currDialogStr.length)
			{
				this.dialogOpts.internalPointer = this.dialogOpts.currDialogStr.length;
				this.dialogOpts.stringFinalized = true;

				var nextDialog = this.getDialogObject(this.dialogOpts.currentDialogIndex);

				if (nextDialog != null && nextDialog.choices.length > 0)
				{
					this.dialogOpts.choicesActive = true;
					this.dialogOpts.choicesCount = nextDialog.choices.length;
				}
			}
		}
	},

	updateDialog : function ()
	{
		if (!this.dialogOpts.active) return;

		this.updateDialogString();

		// Not a choice!
		if (!this.dialogOpts.choicesActive)
		{
			if (ig.input.pressed('pickup_item') && this.dialogOpts.dialogCounter > 1)
			{
				if (!this.dialogOpts.stringFinalized)
				{
					this.dialogOpts.dialogCounter = 0;
					this.dialogOpts.internalPointer = this.dialogOpts.currDialogStr.length;
					this.dialogOpts.stringFinalized = true;
				}else{
					this.dialogOpts.stringFinalized = false;
					this.dialogOpts.dialogCounter = 0;
					this.dialogOpts.internalPointer = 0;
					this.dialogOpts.currentDialogIndex += 1;

					var nextDialog = this.getDialogObject(this.dialogOpts.currentDialogIndex);

					if (nextDialog != null && !nextDialog.visible)
					{
						this.dialogOpts.currentDialogIndex += 1;
						nextDialog = this.getDialogObject(this.dialogOpts.currentDialogIndex);
					}

					if (nextDialog == null)
					{
						//console.log("is calling this one!");
						this.closeDialog();
					}else{
						if (nextDialog.section == this.dialogOpts.currentSection)
						{
							this.dialogOpts.currDialogStr = (nextDialog.text).toUpperCase();
						}else{
							//console.log("is calling this other one!");
							this.closeDialog();
						}
					}
				}
			}
		}else{
			// ===================
			// Choices selection
			// ===================
			var optDialog = this.getDialogObject(this.dialogOpts.currentDialogIndex);
			if (optDialog != null)
			{
				if (ig.input.pressed('up'))
				{
					this.dialogOpts.currentChoice -= 1;
					if (this.dialogOpts.currentChoice < 0)
						this.dialogOpts.currentChoice = optDialog.choices.length - 1;
				}else if (ig.input.pressed('down')) {
					this.dialogOpts.currentChoice += 1;
					if (this.dialogOpts.currentChoice > optDialog.choices.length - 1)
					{
						this.dialogOpts.currentChoice = 0;
					}
				}

				if (ig.input.pressed('pickup_item'))
				{
					//console.log("is calling this maybe!");
					var choice = this.dialogOpts.currentChoice;
					this.closeDialog();

					if (this.onChoiceSelected != null)
						this.onChoiceSelected(choice);
				}
			}
		}
	},

	closeDialog : function ()
	{
		if (ig.game.player)
			ig.game.player.canMove = true;

		this.dialogOpts.active = false;
		this.dialogOpts.stringFinalized = false;
		this.dialogOpts.dialogCounter = 0;
		this.dialogOpts.internalPointer = 0;
		this.dialogOpts.choicesActive = false;
		this.dialogOpts.choicesCount = 0;
		this.dialogOpts.currentChoice = 0;

		if (this.callback != null)
			this.callback.call(this);
	},

	resetDialog : function ()
	{
		//console.log("Reset dialog");
		this.dialogOpts.stringFinalized = false;
		this.dialogOpts.internalPointer = 0;
		this.dialogOpts.dialogCounter = 0;

		if (this.dialogOpts.choicesActive)
		{
			this.dialogOpts.choicesActive = false;
			this.dialogOpts.choicesCount = 0;
			this.dialogOpts.currentChoice = 0;
		}
	},

	getDialogIndex : function ()
	{
		return this.dialogOpts.currentDialogIndex;
	},

	getDialog : function (dialogId)
	{
		var sentCount = lang.eng.length;

		for (var i = 0; i < sentCount; i++)
		{
			if (dialogId == lang.eng[i].id)
				return lang.eng[i].text;
		}
	},

	getDialogObject : function (dialogId)
	{
		var sentCount = lang.eng.length;

		for (var i = 0; i < sentCount; i++)
		{
			if (dialogId == lang.eng[i].id)
				return lang.eng[i];
		}
	},

	drawDialog : function()
	{
		if (!this.dialogOpts.active) return;

		ig.system.context.fillStyle = "rgba(74,37,89,0.8)";
		ig.system.context.beginPath();

		ig.system.context.rect(this.dialogOpts.position.x, this.dialogOpts.position.y, 940, 110);
		ig.system.context.closePath();
		ig.system.context.fill();

		// Draw choices with correspondant color (Selected/not)
		this.drawChoices();

		var parcialText = this.dialogOpts.currDialogStr;
		this.secFont.draw( parcialText.substr(0,this.dialogOpts.internalPointer), 25, this.dialogOpts.position.y + this.dialogOpts.position.textOffset, ig.Font.ALIGN.LEFT, 'rgba(255,255,255,1)' );
	},

	drawChoices : function ()
	{
		if (!this.dialogOpts.choicesActive) return;
		var nextDialog = this.getDialogObject(this.dialogOpts.currentDialogIndex);
		var choicesCount = nextDialog.choices.length;

		if (choicesCount <= 0) return;

		var option1 = nextDialog.choices[0].option;
		var option2 = nextDialog.choices[1].option;

		// Selected color = "rgba(136,192,112,1)";
		// Normal color   = "rgba(8,24,32,1)";

		ig.system.context.fillStyle = (this.dialogOpts.currentChoice == 0) ? "rgba(136,192,112,1)" : "rgba(8,24,32,1)";
		ig.system.context.beginPath();
		ig.system.context.rect(5, (ig.system.height * 4) - 250, (ig.system.width * 4) - 100, 50);
		ig.system.context.closePath();
		ig.system.context.fill();
		this.whiteFont.draw( option1.toUpperCase(), 5, 86, ig.Font.ALIGN.LEFT );

		ig.system.context.fillStyle = (this.dialogOpts.currentChoice == 1) ? "rgba(136,192,112,1)" : "rgba(8,24,32,1)";
		ig.system.context.beginPath();
		ig.system.context.rect(5, (ig.system.height * 4) - 200, (ig.system.width * 4) - 100, 50);
		ig.system.context.closePath();
		ig.system.context.fill();
		this.whiteFont.draw( option2.toUpperCase(), 5, 98, ig.Font.ALIGN.LEFT );

		if (choicesCount > 2)
		{
			var option3 = nextDialog.choices[2].option;

			ig.system.context.fillStyle = (this.dialogOpts.currentChoice == 2) ? "rgba(136,192,112,1)" : "rgba(8,24,32,1)";
			ig.system.context.beginPath();
			ig.system.context.rect(5, (ig.system.height * 4) - 300, (ig.system.width * 4) - 100, 50);
			ig.system.context.closePath();
			ig.system.context.fill();
			this.whiteFont.draw( option3.toUpperCase(), 5, 73, ig.Font.ALIGN.LEFT );
		}
	}
});


ig.main( '#canvas', SpaceLost, 60, 960, 640, 1 );

});
