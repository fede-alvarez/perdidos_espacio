ig.module('game.entities.teleporter')
.requires('impact.entity','game.levels.exterior')
.defines(function()
{
    EntityTeleporter = ig.Entity.extend(
    {
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.FIXED,

        size: {x:64, y:64},

        animSheet: null,

        // Weltmeister props
        _wmScalable : true,
        _wmDrawBox : true,
        _wmBoxColor : 'rgba(255,0,255,0.5)',

        init: function (x, y, settings)
        {
            this.parent(x, y, settings);
        },

        check : function ()
        {
            console.log("Choca contra estoooo");
            ig.game.currentLevel = LevelExterior;
            ig.game.loadLevel(LevelExterior);
        }
    });
});
