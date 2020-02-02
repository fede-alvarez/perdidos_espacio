ig.module('game.entities.battery_piece')
.requires(
    'impact.entity',
    'game.entities.interactable'
)
.defines(function()
{
    EntityBattery_piece = EntityInteractable.extend(
    {
        collides: ig.Entity.COLLIDES.FIXED,

        size: {x:100, y:100},
        offset : {x:50, y:0},

        // Props
        animSheet : new ig.AnimationSheet('media/item_battery.png', 201, 201),

        check : function ()
        {
            this.collides = ig.Entity.COLLIDES.NEVER;
            this.active = false;

            ig.game.player.pickupItem(this);
        }
    });
});
