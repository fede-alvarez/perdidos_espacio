ig.module('game.entities.antena_piece')
.requires(
    'impact.entity',
    'game.entities.interactable'
)
.defines(function()
{
    EntityAntena_piece = EntityInteractable.extend(
    {
        collides: ig.Entity.COLLIDES.FIXED,

        size: {x:81, y:43},
        offset : {x:0, y:20},

        // Props
        animSheet : new ig.AnimationSheet('media/items/antena.png', 81, 63),

        init : function (x, y, settings)
        {
            this.parent(x,y,settings);

            if (savedInfo.itemsPosition[2].active)
                this.active = false;
        },

        check : function ()
        {
            this.collides = ig.Entity.COLLIDES.NEVER;
            this.active = false;

            ig.game.player.pickupItem(this);
            savedInfo.itemsPosition[2].active = true;
        }
    });
});
