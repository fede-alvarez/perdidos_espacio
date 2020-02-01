ig.module('game.entities.player')
.requires('impact.entity')
.defines(function()
{
    EntityPlayer = ig.Entity.extend(
    {
        animSheet: new ig.AnimationSheet('media/player_sheet.png', 88, 120),

        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.BOTH,
        collides: ig.Entity.COLLIDES.ACTIVE,

        size   : {x:88, y:60},
        offset : {x:0, y:60},
        vel    : {x:0, y:0},

        flip  : false,
        speed : 12000,
        itemSpeed : 60,
        normalSpeed : 80,
        direction: null,

        allowToShoot : true,

        item : null,

        init: function (x, y, settings)
        {
            this.parent(x, y, settings);

            this.addAnim('idle_down' , 1, [0]);
            this.addAnim('idle_up'   , 1, [1]);
            this.addAnim('idle_side' , 1, [2]);

            ig.game.player = this;
        },

        update : function ()
        {
            this.parent();

            if (ig.input.state('up')) {
                this.vel.x = 0;
                this.vel.y = -this.speed;
                this.direction = "up";
                this.currentAnim = this.anims.idle_up;
            }
            else if (ig.input.state('down')) {
                this.vel.x = 0;
                this.vel.y = this.speed;
                this.direction = "down";
                this.currentAnim = this.anims.idle_down;
            }

            else if (ig.input.state('left')) {
                this.vel.y = 0;
                this.vel.x = -this.speed;
                this.direction = "left";
                this.currentAnim = this.anims.idle_side;
                this.flip = true;
            }
            else if (ig.input.state('right')) {
                this.vel.y = 0;
                this.vel.x = this.speed;
                this.direction = "right";
                this.currentAnim = this.anims.idle_side;
                this.flip = false;
            }else
            {
                this.vel.x = 0;
                this.vel.y = 0;
            }

            this.currentAnim.flip.x = this.flip;

            if (this.allowToShoot && ig.input.pressed('space'))
            {
                if (this.direction == "up")
                    this.pos.y += 50;
                else if (this.direction == "down")
                    this.pos.y -= 50;
                if (this.direction == "left")
                    this.pos.x += 50;
                else if (this.direction == "right")
                    this.pos.x -= 50;
            }

            if (ig.input.pressed('release') && this.item != null)
            {
                console.log("Soltaste item!");
                if (this.direction == "up")
                    this.item.pos.y = this.pos.y + 50;
                else if (this.direction == "down")
                    this.item.pos.y = this.pos.y - 50 ;
                if (this.direction == "left")
                    this.item.pos.x = this.pos.x - 50;
                else if (this.direction == "right")
                    this.item.pos.x = this.pos.x - 50;

                this.speed = this.normalSpeed;
                this.item.active = true;
                this.item = null;
            }
        },

        pickupItem : function( item )
        {
            if (ig.game.player.item != null) return;

            console.log("Recogiste item!");
            this.item = item;
            this.speed = this.itemSpeed;
        },

        handleMovementTrace: function (res)
        {
            if (res.collision.x || res.collision.y)
            {
                this.vel.x = 0;
                this.vel.y = 0;

                if (this.direction == "up") {
                    this.currentAnim = this.anims.idle_up;
                }
                else if (this.direction == "down") {
                    this.currentAnim = this.anims.idle;
                }
                else if (this.direction == "left") {
                    this.currentAnim = this.anims.idle_side;
                }
                else if (this.direction == "right") {
                    this.currentAnim = this.anims.idle_side;
                }
            }
            this.parent(res);
        }
    });
});
