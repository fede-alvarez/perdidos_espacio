ig.module('game.entities.recharge')
.requires(
    'impact.entity',
    'game.entities.interactable'
)
.defines(function()
{
    EntityRecharge = EntityInteractable.extend(
    {
        collides: ig.Entity.COLLIDES.NEVER,

        size: {x:168, y:221},
        offset : {x:0, y:0},

        // Props
        animSheet : new ig.AnimationSheet('media/02_recharge.png', 168, 221),

        check : function ()
        {
            if (ig.game.player.health < 10)
            {
                ig.game.player.health += 0.02;

                if (ig.game.player.health > 10)
                    ig.game.player.health = 10;
            }
        }
    });
});
