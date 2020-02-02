ig.module('game.entities.partsfinal')
.requires(
    'impact.entity',
    'game.entities.interactable'
)
.defines(function()
{
    EntityPartsfinal = EntityInteractable.extend(
    {
        collides: ig.Entity.COLLIDES.FIXED,

        size: {x:272, y:77},
        offset : {x:0, y:0},

        // Props
        animSheet : new ig.AnimationSheet('media/parts_final.png', 272, 77),

        check : function ()
        {
            console.log("Finallllll");
        }
    });
});
