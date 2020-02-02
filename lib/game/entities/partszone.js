ig.module('game.entities.partszone')
.requires(
    'impact.entity',
    'game.entities.interactable'
)
.defines(function()
{
    EntityPartszone = EntityInteractable.extend(
    {
        collides: ig.Entity.COLLIDES.NEVER,

        size: {x:292, y:91},
        offset : {x:0, y:0},

        // Props
        animSheet : new ig.AnimationSheet('media/drop_parts.png', 292, 91),

        check : function ()
        {
            if (ig.game.player.item == null)
            {
                console.log("No tienes piezas");
            }else{
                if (ig.input.pressed('release'))
                {
                    console.log("Hola Edmundo");
                }
            }
        }
    });
});
