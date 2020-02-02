ig.module('game.entities.food')
.requires(
    'impact.entity',
    'game.entities.interactable'
)
.defines(function()
{
    EntityFood = EntityInteractable.extend(
    {
        collides: ig.Entity.COLLIDES.NEVER,

        size: {x:140, y:150},
        offset : {x:14, y:50},

        // Props
        animSheet : new ig.AnimationSheet('media/food_boxes.png', 168, 221)
    });
});
