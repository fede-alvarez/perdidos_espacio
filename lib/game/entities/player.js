ig.module('game.entities.player')
.requires('impact.entity')
.defines(function()
{
    EntityPlayer = ig.Entity.extend(
    {
        animSheet: new ig.AnimationSheet('media/player_sheet.png', 88, 120),

        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.BOTH,
        collides: ig.Entity.COLLIDES.ACTIVE,

        size   : {x:88, y:60},
        offset : {x:0, y:60},
        vel    : {x:0, y:0},

        flip  : false,
        speed : 50,
        direction: null,

        item : null,

        init: function (x, y, settings)
        {
            this.parent(x, y, settings);

            this.addAnim('idle_down' , 1, [0]);
            this.addAnim('idle_up'   , 1, [1]);
            this.addAnim('idle_side' , 1, [2]);

            ig.game.player = this;
        },

        update : function ()
        {
            this.parent();
        }
    });
});
