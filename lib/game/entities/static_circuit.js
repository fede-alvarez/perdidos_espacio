ig.module('game.entities.static_circuit')
.requires(
    'impact.entity',
    'game.entities.interactable'
)
.defines(function()
{
    EntityStatic_circuit = EntityInteractable.extend(
    {
        collides: ig.Entity.COLLIDES.FIXED,

        size: {x:83, y:25},
        offset : {x:0, y:30},

        active : false,

        // Props
        animSheet : new ig.AnimationSheet('media/items/circuit.png', 83, 55),

        init : function (x, y, settings)
        {
            this.parent(x,y,settings);
            ig.game.circuitItem = this;
        },
        update : function()
        {
            this.parent();
            if (savedInfo.itemsPosition[1].active)
                this.active = true;
        }
    });
});
