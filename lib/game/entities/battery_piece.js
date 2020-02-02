ig.module('game.entities.battery_piece')
.requires(
    'impact.entity',
    'game.entities.interactable'
)
.defines(function()
{
    EntityBattery_piece = EntityInteractable.extend(
    {
        name : 'bateria',

        collides: ig.Entity.COLLIDES.FIXED,

        size: {x:41, y:30},
        offset : {x:0, y:37},

        // Props
        animSheet : new ig.AnimationSheet('media/items/battery.png', 41, 67),

        init : function (x, y, settings)
        {
            this.parent(x,y,settings);

            if (savedInfo.itemsPosition[0].active)
                this.active = false;
        },

        check : function ()
        {
            this.collides = ig.Entity.COLLIDES.NEVER;
            this.active = false;
            ig.game.player.pickupItem(this);

            ig.game.batteryItem.active = true;
            savedInfo.itemsPosition[0].active = true;
        }
    });
});
