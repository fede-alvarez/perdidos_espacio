ig.module('game.entities.sc_outside')
.requires('impact.entity')
.defines(function()
{
    EntitySc_outside = ig.Entity.extend(
    {
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.BOTH,
        collides: ig.Entity.COLLIDES.NEVER,

        size: {x:960, y:640},

        animSheet: new ig.AnimationSheet('media/spacecraft_outside.png', 960, 640),

        init: function (x, y, settings)
        {
            this.parent(x, y, settings);
            this.addAnim('idle' , 1, [0]);
        },
    });
});
