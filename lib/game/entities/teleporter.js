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

        once : false,

        // Weltmeister props
        _wmScalable : true,
        _wmDrawBox : true,
        _wmBoxColor : 'rgba(255,0,255,0.5)',

        init: function (x, y, settings)
        {
            this.parent(x, y, settings);
            ig.game.teleporter = this;
        },

        check : function ()
        {
            if (this.once) return;
            this.once = true;

            if (ig.game.currentLevel == LevelExterior)
            {
                ig.game.player.isOutside = false;
                ig.game.currentLevel = LevelSpacecraft;
            }else{
                ig.game.player.isOutside = true;
                ig.game.currentLevel = LevelExterior;
            }

            ig.game.loadLevel(ig.game.currentLevel);
        }
    });
});
