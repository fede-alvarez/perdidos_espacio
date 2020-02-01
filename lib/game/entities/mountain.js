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
            this.addAnim('idle', 1, [ig.game.randomRange(0, this.mountainsCount - 1)]);
            this.parent(x, y, settings);
        }
    });
});
