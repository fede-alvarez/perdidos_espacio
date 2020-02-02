ig.module('game.entities.teleporter')
.requires('impact.entity'
)
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
            if (ig.game.currentLevel == LevelExterior)
            {
                ig.game.currentLevel = LevelSpacecraft;
            }else{
                ig.game.currentLevel = LevelExterior;
            }

            ig.game.loadLevel(ig.game.currentLevel);
        }
    });
});
