ig.module('game.entities.spacecraft')
.requires('impact.entity')
.defines(function()
{
    EntitySpacecraft = ig.Entity.extend(
    {
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.BOTH,
        collides: ig.Entity.COLLIDES.NEVER,

        size: {x:640, y:641},

        animSheet: new ig.AnimationSheet('media/spacecraft_bg.png', 2880, 641),

        init: function (x, y, settings)
        {
            this.parent(x, y, settings);

            this.addAnim('idle' , 1, [0]);
            this.pos.x = this.pos.y = 0;
        },
    });
});
