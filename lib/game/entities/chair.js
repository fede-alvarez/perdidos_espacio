ig.module('game.entities.chair')
.requires(
    'impact.entity',
    'game.entities.interactable'
)
.defines(function()
{
    EntityChair = EntityInteractable.extend(
    {
        collides: ig.Entity.COLLIDES.FIXED,

        size: {x:100, y:80},
        offset : {x:20, y:50},

        // Props
        animSheet : new ig.AnimationSheet('media/chair_1.png', 132, 171)
    });
});
