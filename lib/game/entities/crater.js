ig.module('game.entities.crater')
.requires(
    'impact.entity',
    'game.entities.interactable'
)
.defines(function()
{
    EntityCrater = EntityInteractable.extend(
    {
        collides: ig.Entity.COLLIDES.FIXED,

        size: {x:272, y:40},
        offset : {x:0, y:63},

        // Props
        animSheet : new ig.AnimationSheet('media/crater.png', 272, 103),
    });
});
