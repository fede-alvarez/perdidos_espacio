ig.module('game.entities.mountain')
.requires(
    'impact.entity',
    'game.entities.interactable'
)
.defines(function()
{
    EntityMountain = EntityInteractable.extend(
    {
        collides: ig.Entity.COLLIDES.FIXED,

        size: {x:418, y:50},
        offset : {x:0, y:368},

        // Props
        animSheet : new ig.AnimationSheet('media/mountains.png', 418, 418),

        mountainsCount : 11,

        init : function (x, y, settings)
        {
            var randomFrame = this.randomRange(0, this.mountainsCount - 1);
            this.addAnim('idle', 1, [randomFrame]);
            this.parent(x, y, settings);
        },

        randomRange : function( min, max )
        {
            return Math.round(Math.random() * (max - min)) + min;
        }
    });
});
