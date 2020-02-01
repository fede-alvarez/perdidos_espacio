ig.module('game.entities.piece')
.requires(
    'impact.entity',
    'game.entities.interactable'
)
.defines(function()
{
    EntityPiece = EntityInteractable.extend(
    {
        collides: ig.Entity.COLLIDES.FIXED,

        size: {x:50, y:37},
        offset : {x:0, y:37},

        // Props
        animSheet : new ig.AnimationSheet('media/piece_1.png', 50, 75),

        check : function ()
        {
            this.collides = ig.Entity.COLLIDES.NEVER;
            this.active = false;

            ig.game.player.pickupItem(this);
        }
    });
});
