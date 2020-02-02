ig.module('game.entities.basic_enemy')
.requires(
    'impact.entity',
    'game.entities.enemies'
)
.defines(function()
{
    EntityBasic_enemy = EntityEnemies.extend
    ({
        name : 'enemy',
        animSheet : new ig.AnimationSheet('media/enemy_sheet.png', 120, 79),

        chasePlayer : true,

        size : {x:120, y:40},
        offset : {x:0, y:39}
    });
});
