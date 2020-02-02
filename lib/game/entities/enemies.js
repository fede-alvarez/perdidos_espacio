ig.module('game.entities.enemies')
.requires('impact.entity')
.defines(function()
{
    EntityEnemies = ig.Entity.extend(
    {
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.ACTIVE,

        size: {x:120, y:79},
        offset : {x:0, y:0},

        // Props
        player : null,
        animSheet : null,

        chasePlayer : false,
        speed : 1,
        range : 200,
        health : 10,
        distanceOffset: 100,
        active : true,

        // Weltmeister props
        _wmDrawBox : true,
        _wmBoxColor : 'rgba(255,0,0,0.5)',

        init: function (x, y, settings)
        {
            this.parent(x, y, settings);
            this.addAnim('idle_up',   1, [0]);
            this.addAnim('idle_down', 1, [1]);
            this.addAnim('idle_side', 1, [2]);
        },

        ready : function ()
        {
            this.player = ig.game.player;
        },

        update : function ()
        {
            this.parent();

            if (this.chasePlayer && this.distanceTo(this.player) < this.range)
                this.followPlayer();
            else
                this.randomWalk();
        },

        draw : function ()
        {
            if (!this.active) return;
            this.parent();
        },

        followPlayer : function( )
        {
            var dx = this.pos.x - this.player.pos.x,
                dy = this.pos.y - this.player.pos.y;

            if (dy > 0)
                this.currentAnim = this.anims.idle_down;
            else
                this.currentAnim = this.anims.idle_up;

            this.pos.x -= dx / this.distanceOffset;
            this.pos.y -= dy / this.distanceOffset;
        },

        setNewPosition : function()
        {
            this.targetX = ig.game.randomRange(20, ig.game.collisionMap.width  - 20);
            this.targetY = ig.game.randomRange(30, ig.game.collisionMap.height - 35);

            this.totalDistance = this.getDistance();

            var time = this.totalDistance / this.speed;

            this.speedX = (this.targetX - this.pos.x) / time;
            this.speedY = (this.targetY - this.pos.y) / time;
        },

        getDistance : function()
        {
            return Math.sqrt(Math.pow(this.pos.x - this.targetX,2) + Math.pow(this.pos.y - this.targetY,2));
        },

        randomWalk : function()
        {
            this.previousDistance = this.currentDistance;
            this.currentDistance = this.getDistance();

            var dy = this.pos.y - this.targetY;

            if (this.currentDistance < this.previousDistance)
            {
                this.pos.x += this.speedX;
                this.pos.y += this.speedY;
            }else{
                this.setNewPosition();
            }
        },
    });
});
