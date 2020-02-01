ig.module('game.entities.interactable')
.requires('impact.entity')
.defines(function()
{
    EntityInteractable = ig.Entity.extend(
    {
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.ACTIVE,

        size: {x:0, y:0},
        offset : {x:0, y:0},

        // Props
        player : null,
        animSheet : null,

        active : true,

        // Weltmeister props
        _wmDrawBox : true,
        _wmBoxColor : 'rgba(255,255,0,0.2)',

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
        },

        check : function ()
        {
            if (!this.active) return;
            this.parent();
        }
    });
});
