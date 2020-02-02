ig.module('game.entities.boxes')
.requires(
    'impact.entity',
    'game.entities.interactable'
)
.defines(function()
{
    EntityBoxes = EntityInteractable.extend(
    {
        collides: ig.Entity.COLLIDES.FIXED,

        size: {x:120, y:40},
        offset : {x:10, y:112},

        // Props
        animSheet : new ig.AnimationSheet('media/boxes.png', 135, 162)
    });
});
