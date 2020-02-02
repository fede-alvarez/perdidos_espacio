ig.module('game.entities.stone')
.requires(
    'impact.entity',
    'game.entities.interactable'
)
.defines(function()
{
    EntityStone = EntityInteractable.extend(
    {
        collides: ig.Entity.COLLIDES.FIXED,

        size: {x:43, y:15},
        offset : {x:0, y:15},

        // Props
        animSheet : new ig.AnimationSheet('media/stones.png', 43, 30),

        stonesCount : 6,

        init : function (x, y, settings)
        {
            var randomFrame = this.randomRange(0, this.stonesCount - 1);
            this.addAnim('idle', 1, [randomFrame]);
            this.parent(x, y, settings);
        },

        randomRange : function( min, max )
        {
            return Math.round(Math.random() * (max - min)) + min;
        }
    });
});
