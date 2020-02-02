ig.module('game.entities.projectile')
.requires('impact.entity')
.defines(function()
{
    EntityProjectile = ig.Entity.extend(
    {
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.NEVER,

        size: {x:55, y:80},
        offset : {x:0, y:0},

        // Props
        animSheet : new ig.AnimationSheet('media/projectile.png',55,80),
        direction : null,
        active : true,

        speed : 8,

        init: function (x, y, settings)
        {
            this.parent(x, y, settings);
            this.addAnim('idle',0.2, [0,1,2]);

            if (settings == '180')
                this.direction = 'up';
            else if (settings == '0')
                this.direction = 'down';
            else if (settings == '90')
                this.direction = 'left';
            else if (settings == '270')
                this.direction = 'right';

            this.currentAnim.angle = settings * (Math.PI/180);
        },

        update : function ()
        {
            this.parent();

            if (this.direction == 'right')
                this.pos.x += this.speed;
            else if (this.direction == 'left')
                this.pos.x -= this.speed;

            if (this.direction == 'up')
                this.pos.y -= this.speed;
            else if (this.direction == 'down')
                this.pos.y += this.speed;

            if (this.distanceTo(ig.game.player) > 400)
                this.kill();
        },

        check : function ( obj )
        {
            if (obj.name && obj.name == 'enemy')
            {
                obj.kill();
            }
        }
    });
});
