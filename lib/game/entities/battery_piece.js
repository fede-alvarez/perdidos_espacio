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

        size: {x:41, y:30},
        offset : {x:0, y:37},

        // Props
        animSheet : new ig.AnimationSheet('media/items/battery.png', 41, 67),

        init : function (x, y, settings)
        {
            this.parent(x,y,settings);
            savedInfo.itemsPosition[0].x = x;
            savedInfo.itemsPosition[0].y = y;

            this.active = savedInfo.itemsPosition[0].active;
        },

        check : function ()
        {
            this.collides = ig.Entity.COLLIDES.NEVER;
            this.active = false;
            savedInfo.itemsPosition[0].active = this.active;

            this.pos.x = -10;
            this.pos.y = -10;

            ig.game.player.pickupItem(this);
        }
    });
});
