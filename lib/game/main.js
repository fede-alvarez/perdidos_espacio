/* Global Variables */
const SPLASH_MODE = 1;
const INTRO_MODE  = 2;
const GAME_MODE   = 3;

let gameMode = SPLASH_MODE;

ig.module(
	'game.main'
)
.requires(
	'impact.game',
	'impact.font',
	'plugins.scrollscreen'
)
.defines(function(){

SpaceLost = ig.Game.extend(
{
	clearColor: '#091821',

	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),

	// Game dependent
	dialogManager : null,
	debugMode 	  : true,

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

		this.loadLevel(LevelMain);

		if (!this.debugMode)
		{
			this.dialogManager = new DialogSystem();
			this.dialogManager.startDialogFrom(33);
			this.dialogManager.callback = this.onDialogEnds.bind(this);

			ig.game.dialogManager = this.dialogManager;
		}
	},

	update: function()
	{
		this.parent();
		this.scrollScreen();
		if (!this.debugMode) this.dialogManager.updateDialog();
	},

	draw: function()
	{
		this.parent();
		if (!this.debugMode) this.dialogManager.drawDialog();
	}
});

/**
 * ========================
 * Generic Dialog System
 * ========================
 */

DialogSystem = ig.Class.extend(
{
	secFont: new ig.Font( 'media/04b04.font.png' ),
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

			ig.game.player.canMove = false;
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

		ig.system.context.fillStyle = "rgba(8,24,32,1)";
		ig.system.context.beginPath();
		ig.system.context.rect(5, (ig.system.height * 4) - 150, (ig.system.width * 4) - 10, 150);
		ig.system.context.closePath();
		ig.system.context.fill();

		// Draw choices with correspondant color (Selected/not)
		this.drawChoices();

		var parcialText = this.dialogOpts.currDialogStr;
		this.secFont.draw( parcialText.substr(0,this.dialogOpts.internalPointer), 5, 111, ig.Font.ALIGN.LEFT );
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


/**
 * ================
 * Splash Mode
 * ================
 */

SplashState = ig.Class.extend(
{
	titleScreen : new ig.Image('media/title_card.png'),

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
			gameMode = GAME_MODE;
			ig.system.setGame(SubtleGame);
		}
	},

	draw : function ()
	{
		this.titleScreen.draw(0,0);
	},

	run : function ()
	{
		this.update();
		this.draw();
	}
});


/**
 * ================
 * Intro State
 * ================
 */

IntroState = ig.Class.extend(
{
	playerIntroSheet : new ig.AnimationSheet('media/player_intro_sheet.png', 59, 92),
	victimIntroSheet : new ig.AnimationSheet('media/victim_intro_sheet.png', 59, 89),
	playerFaceSheet  : new ig.AnimationSheet('media/player_intro_face_sheet.png', 164, 100),

	clearColor: '#081820',

	animSheet : this.playerIntroSheet,

	currentSceneIndex : 0,

	dialogManager : null,
	isFirstTime : true,

	init: function ()
	{
		ig.system.clear(this.clearColor);

		this.playerAnim = new ig.Animation( this.playerIntroSheet, 1, [0,1,2]);
		this.victimAnim = new ig.Animation( this.victimIntroSheet, 1, [0,1,2]);
		this.playerFaceAnim = new ig.Animation( this.playerFaceSheet, 1, [0,1]);

		this.dialogManager = new DialogSystem();
		this.dialogManager.startDialogFrom(1);
		this.dialogManager.callback = this.onDialogEnds.bind(this);
	},

	update : function()
	{
		this.dialogManager.updateDialog();
	},

	draw : function ()
	{
		this.dialogManager.drawDialog();
	},

	run : function ()
	{
		this.update();
		this.draw();
	}
});

ig.main( '#canvas', SpaceLost, 60, 480, 320, 2 );

});
