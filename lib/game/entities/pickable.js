ig.module('game.entities.pickable')
.requires('impact.entity')
.defines(function()
{
    EntityPickable = ig.Entity.extend(
    {
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.ACTIVE,

        size: {x:0, y:0},
        offset : {x:0, y:0},

        // Props
        animSheet : null,

        active : true,

        // Weltmeister props
        _wmDrawBox : true,
        _wmBoxColor : 'rgba(255,255,255,0.2)',

        init: function (x, y, settings)
        {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
        },

        update : function ()
        {
            this.parent();
        },

        draw : function ()
        {
            if (!this.active) return;
            this.parent();
        }
    });
});
