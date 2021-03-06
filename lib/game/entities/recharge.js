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

        playOnce : true,

        sfxRecarga : new ig.Sound('media/sfx/oxigeno.ogg'),

        // Props
        animSheet : new ig.AnimationSheet('media/02_recharge.png', 168, 221),

        check : function ()
        {
            if (this.playOnce)
            {
                this.playOnce = false;
                this.sfxRecarga.play();
            }

            if (savedInfo.currentOxygen < 10)
            {
                savedInfo.currentOxygen += 0.02;

                if (savedInfo.currentOxygen > 10)
                {
                    savedInfo.currentOxygen = 10;
                    this.playOnce = true;
                }

            }
        }
    });
});
