ig.module('game.entities.static_antena')
.requires(
    'impact.entity',
    'game.entities.interactable'
)
.defines(function()
{
    EntityStatic_antena = EntityInteractable.extend(
    {
        collides: ig.Entity.COLLIDES.FIXED,

        size: {x:81, y:43},
        offset : {x:0, y:20},

        active : false,

        // Props
        animSheet : new ig.AnimationSheet('media/items/antena.png', 81, 63),

        init : function (x, y, settings)
        {
            this.parent(x,y,settings);
            ig.game.antenaItem = this;
        },

        update : function()
        {
            this.parent();
            if (savedInfo.itemsPosition[2].active)
                this.active = true;
        }
    });
});
