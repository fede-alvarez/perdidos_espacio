ig.module('game.entities.player')
.requires('impact.entity')
.defines(function()
{
    EntityPlayer = ig.Entity.extend(
    {
        animSheet: new ig.AnimationSheet('media/player_sheet.png', 88, 120),
        sideSheet: new ig.AnimationSheet('media/player_side_anim.png', 122,125),
        downSheet: new ig.AnimationSheet('media/player_down_anim.png', 91, 116),
        upSheet: new ig.AnimationSheet('media/player_up_anim.png', 96, 113),

        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.BOTH,
        collides: ig.Entity.COLLIDES.ACTIVE,

        size   : {x:88, y:60},
        offset : {x:0, y:60},
        vel    : {x:0, y:0},
        maxVel : {x:500, y:500},

        flip  : false,
        speed : 200,
        itemSpeed : 100,
        normalSpeed : 200,
        direction: null,
        healthDecreaseSpeed : 0.002,

        allowToShoot : true,

        isOutside : false,

        collectedPieces : 0,

        item : null,

        init: function (x, y, settings)
        {
            this.parent(x, y, settings);

            this.addAnim('idle_down' , 1, [0]);
            this.addAnim('idle_up'   , 1, [1]);
            this.addAnim('idle_side' , 1, [2]);

            this.sideAnim = new ig.Animation( this.sideSheet, 0.05, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]);
            this.downAnim = new ig.Animation( this.downSheet, 0.05, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
            this.upAnim = new ig.Animation( this.upSheet, 0.05, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32]);

            ig.game.player = this;

            if (ig.game.currentLevel == LevelExterior)
                this.isOutside = true;
            else
                this.isOutside = false;
        },

        update : function ()
        {
            this.parent();

            if (ig.input.state('up')) {
                this.vel.x = 0;
                this.vel.y = -this.speed;
                this.direction = "up";
                this.currentAnim = this.upAnim;
            }
            else if (ig.input.state('down')) {
                this.vel.x = 0;
                this.vel.y = this.speed;
                this.direction = "down";
                this.currentAnim = this.downAnim; //this.anims.idle_down;
            }

            else if (ig.input.state('left')) {
                this.vel.y = 0;
                this.vel.x = -this.speed;
                this.direction = "left";
                this.currentAnim = this.sideAnim; //this.anims.idle_side;
                this.flip = true;
            }
            else if (ig.input.state('right')) {
                this.vel.y = 0;
                this.vel.x = this.speed;
                this.direction = "right";
                this.currentAnim = this.sideAnim; //this.anims.idle_side;
                this.flip = false;
            }else
            {
                this.vel.x = 0;
                this.vel.y = 0;

                if (this.direction == "left")
                    this.currentAnim = this.anims.idle_side;
                else if (this.direction == "right")
                    this.currentAnim = this.anims.idle_side;

                if (this.direction == "up")
                    this.currentAnim = this.anims.idle_up;
                else if (this.direction == 'down')
                    this.currentAnim = this.anims.idle_down;
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
                this.releaseItem();
            }

            if (this.isOutside)
            {
                this.health -= this.healthDecreaseSpeed;

                if (this.health < 0)
                {
                    this.health = 0;
                    console.log("Perdiste");
                }

                savedInfo.currentOxygen = this.health;
            }
        },

        pickupItem : function( item )
        {
            if (this.item != null) return;
            console.log("Recogiste item!");
            this.item = item;
            savedInfo.currentItem = this.item;
            this.speed = this.itemSpeed;
        },

        releaseItem : function ()
        {
            if (this.item == null) return;

            console.log("Soltaste item!");
            if (this.direction == "up")
                this.item.pos.y = this.pos.y + (this.item.size.y + 10);
            else if (this.direction == "down")
                this.item.pos.y = this.pos.y - (this.item.size.y + 10) ;
            if (this.direction == "left")
                this.item.pos.x = this.pos.x - (this.item.size.x + 10);
            else if (this.direction == "right")
                this.item.pos.x = this.pos.x - (this.item.size.x + 10);

            this.speed = this.normalSpeed;
            this.item.active = true;

            this.item = null;
            savedInfo.currentItem = null;
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
