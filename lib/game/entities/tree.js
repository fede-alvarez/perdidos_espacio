ig.module('game.entities.tree')
.requires(
    'impact.entity',
    'game.entities.interactable'
)
.defines(function()
{
    EntityTree = EntityInteractable.extend(
    {
        collides: ig.Entity.COLLIDES.FIXED,

        size: {x:193, y:50},
        offset : {x:0, y:147},

        // Props
        animSheet : new ig.AnimationSheet('media/trees.png', 193, 197),

        treesCount : 4,

        init : function (x, y, settings)
        {
            var randomFrame = this.randomRange(0, this.treesCount - 1);
            this.addAnim('idle', 1, [randomFrame]);
            this.parent(x, y, settings);
        },

        randomRange : function( min, max )
        {
            return Math.round(Math.random() * (max - min)) + min;
        }
    });
});
