ig.module('game.entities.static_battery')
.requires(
    'impact.entity',
    'game.entities.interactable'
)
.defines(function()
{
    EntityStatic_battery= EntityInteractable.extend(
    {
        collides: ig.Entity.COLLIDES.FIXED,

        size: {x:41, y:30},
        offset : {x:0, y:37},

        active : false,

        // Props
        animSheet : new ig.AnimationSheet('media/items/battery.png', 41, 67),

        init : function (x, y, settings)
        {
            this.parent(x,y,settings);
            ig.game.batteryItem = this;
        },
        update : function()
        {
            this.parent();
            if (savedInfo.itemsPosition[0].active)
                this.active = true;
        }
    });
});
