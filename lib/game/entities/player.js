ig.module('game.entities.player')
.requires('impact.entity', 'game.entities.projectile')
.defines(function()
{
    EntityPlayer = ig.Entity.extend(
    {
        animSheet: new ig.AnimationSheet('media/player_sheet.png', 88, 120),
        sideSheet: new ig.AnimationSheet('media/player_side_anim.png', 122,125),
        downSheet: new ig.AnimationSheet('media/player_down_anim.png', 91, 116),
        upSheet: new ig.AnimationSheet('media/player_up_anim.png', 96, 113),
        damageSheet : new ig.AnimationSheet('media/player_hurt_anim.png',113,121),

        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.BOTH,
        collides: ig.Entity.COLLIDES.ACTIVE,

        size   : {x:88, y:60},
        offset : {x:0, y:60},
        vel    : {x:0, y:0},
        maxVel : {x:1000, y:1000},

        flip  : false,
        speed : 200,
        itemSpeed : 100,
        normalSpeed : 200,
        direction: null,
        healthDecreaseSpeed : 0.002,

        allowToShoot : false,

        isOutside : false,

        collectedPieces : 0,

        item : null,

        paused : false,

        recoil : false,
        recoilRange : 80,
        recoilSpeed : 4,
        targetPos : { pos: {x:0, y:0}, size: {x:55, y:80}},

        init: function (x, y, settings)
        {
            this.parent(x, y, settings);

            this.addAnim('idle_down' , 1, [0]);
            this.addAnim('idle_up'   , 1, [1]);
            this.addAnim('idle_side' , 1, [2]);


            this.sideAnim = new ig.Animation( this.sideSheet, 0.05, this.getAnimFrames(23));
            this.downAnim = new ig.Animation( this.downSheet, 0.05, this.getAnimFrames(15));
            this.upAnim   = new ig.Animation( this.upSheet,   0.05, this.getAnimFrames(32));
            this.damageAnim = new ig.Animation( this.damageSheet, 1, [0]);

            ig.game.player = this;

            if (ig.game.currentLevel == LevelExterior)
            {
                this.isOutside = true;
                this.allowToShoot = true;

                if (savedInfo.currentItem != null)
                    this.speed = this.itemSpeed;
            }else{
                this.allowToShoot = false;
                this.isOutside = false;
            }
        },

        getAnimFrames : function(final)
        {
            var arr = [];
            for(var i = 0; i < final; i++)
                arr.push(i);

            return arr;
        },

        update : function ()
        {
            this.parent();

            if (this.paused) return;

            if (!this.recoil)
            {
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
            }

            /**
             * SHOOT
             */
            if (this.allowToShoot && !this.recoil && ig.input.pressed('space'))
            {
                var angle = 0,
                    addDistanceX = 0,
                    addDistanceY = 0,
                    offset = 10;

                if (this.direction == "up") {
                    addDistanceX = this.pos.x;
                    addDistanceY = this.pos.y + offset;
                    this.targetPos.pos.x = this.pos.x;
                    this.targetPos.pos.y = this.pos.y + this.recoilRange;
                    //this.pos.y += 50;
                    angle = '180';
                } else if (this.direction == "down") {
                    addDistanceX = this.pos.x;
                    addDistanceY = this.pos.y - offset;
                    this.targetPos.pos.x = this.pos.x;
                    this.targetPos.pos.y = this.pos.y - this.recoilRange;
                    //this.pos.y -= 50;
                    angle = '0';
                }

                if (this.direction == "left") {
                    addDistanceY = this.pos.y;
                    addDistanceX = this.pos.x + offset;
                    this.targetPos.pos.x = this.pos.x + this.recoilRange;
                    this.targetPos.pos.y = this.pos.y;
                    //this.pos.x += 50;
                    angle = '90';
                } else if (this.direction == "right") {
                    addDistanceY = this.pos.y;
                    addDistanceX = this.pos.x - offset;
                    this.targetPos.pos.x = this.pos.x - this.recoilRange;
                    this.targetPos.pos.y = this.pos.y;
                    //this.pos.x -= 50;
                    angle = '270';
                }

                this.recoil = true;

                ig.game.spawnEntity(EntityProjectile, addDistanceX, addDistanceY, angle);
            }

            if (ig.input.pressed('release') && savedInfo.currentItem != null)
            {
                this.releaseItem();
            }

            if (this.recoil)
            {
                if (this.targetPos.pos.x != this.pos.x)
                {
                    if (this.targetPos.pos.x > this.pos.x)
                        this.pos.x += this.recoilSpeed;
                    else
                        this.pos.x -= this.recoilSpeed;
                }

                if (this.targetPos.pos.y != this.pos.y)
                {
                    if (this.targetPos.pos.y > this.pos.y)
                        this.pos.y += this.recoilSpeed;
                    else
                        this.pos.y -= this.recoilSpeed;
                }

                if (this.distanceTo(this.targetPos) < 30 )
                {
                    this.recoil = false;
                }
            }

            if (this.isOutside)
            {
                this.health -= this.healthDecreaseSpeed;

                if (this.health < 0)
                {
                    this.health = 0;
                    ig.game.gameOver = true;
                }

                savedInfo.currentOxygen = this.health;
            }
        },

        pickupItem : function( item )
        {
            if (savedInfo.currentItem != null) return;
            console.log("Recogiste item!");
            savedInfo.currentItem = item;
            this.speed = this.itemSpeed;
        },

        getDamaged : function ()
        {
            this.currentAnim = this.damageAnim;
            this.vel.x = this.vel.y = 0;
        },

        releaseItem : function ()
        {
            if (savedInfo.currentItem == null) return;

            console.log("Soltaste item!");

            if (this.direction == "up")
                savedInfo.currentItem.pos.y = Math.abs(ig.game.screen.y - this.pos.y) + 20;
            else if (this.direction == "down")
                savedInfo.currentItem.pos.y = Math.abs(ig.game.screen.y - this.pos.y) - 20;
            if (this.direction == "left")
                savedInfo.currentItem.pos.x = Math.abs(ig.game.screen.x - this.pos.x) - 20;
            else if (this.direction == "right")
                savedInfo.currentItem.pos.x = Math.abs(ig.game.screen.x - this.pos.x) - 20;

            console.log(this.pos.x, savedInfo.currentItem.pos);
            savedInfo.currentItem.active = true;
            this.speed = this.normalSpeed;
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
