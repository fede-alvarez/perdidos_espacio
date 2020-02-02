ig.module('game.entities.circuit_piece')
.requires(
    'impact.entity',
    'game.entities.interactable'
)
.defines(function()
{
    EntityCircuit_piece = EntityInteractable.extend(
    {
        collides: ig.Entity.COLLIDES.FIXED,

        size: {x:83, y:25},
        offset : {x:0, y:30},

        // Props
        animSheet : new ig.AnimationSheet('media/items/circuit.png', 83, 55),

        init : function (x, y, settings)
        {
            this.parent(x,y,settings);
            savedInfo.itemsPosition[1].x = x;
            savedInfo.itemsPosition[1].y = y;
        },

        check : function ()
        {
            this.collides = ig.Entity.COLLIDES.NEVER;
            this.active = false;

            ig.game.player.pickupItem(this);
        }
    });
});
