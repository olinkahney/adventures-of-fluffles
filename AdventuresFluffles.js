var main = {
  
    preload: function() {
        game.load.image('cat', 'cat.png');                                     game.load.image('ground', 'ground.png');
        game.load.image('background', 'background.jpg');
        game.load.image('bullet', '')
    },

    create: function() { 
        GameState.prototype.create = function() {
   
    this.SHOT_DELAY = 100; 
    this.BULLET_SPEED = 500; 
    this.NUMBER_OF_BULLETS = 20;

    this.gun = this.game.add.sprite(50, this.game.height/2, 'bullet');

    this.gun.anchor.setTo(0.5, 0.5);

    this.bulletPool = this.game.add.group();
    for(var i = 0; i < this.NUMBER_OF_BULLETS; i++) {
       
        var bullet = this.game.add.sprite(0, 0, 'bullet');
        this.bulletPool.add(bullet);

        bullet.anchor.setTo(0.5, 0.5);

        this.game.physics.enable(bullet, Phaser.Physics.ARCADE);

        bullet.kill();
        
    }
    this.game.time.advancedTiming = true;
    this.fpsText = this.game.add.text(
        20, 20, '', { font: '16px Arial', fill: '#ffffff' }
    );
};

GameState.prototype.shootBullet = function() {

    if (this.lastBulletShotAt === undefined) this.lastBulletShotAt = 0;
    if (this.game.time.now - this.lastBulletShotAt < this.SHOT_DELAY) return;
    this.lastBulletShotAt = this.game.time.now;

    var bullet = this.bulletPool.getFirstDead();

    if (bullet === null || bullet === undefined) return;

    bullet.revive();

    bullet.checkWorldBounds = true;
    bullet.outOfBoundsKill = true;

    bullet.reset(this.gun.x, this.gun.y);

    bullet.body.velocity.x = this.BULLET_SPEED;
    bullet.body.velocity.y = 0;
};

GameState.prototype.update = function() {
    if (this.game.time.fps !== 0) {
        this.fpsText.setText(this.game.time.fps + ' FPS');
    }

    if (this.game.input.activePointer.isDown) {
        this.shootBullet();
    }
};

var game = new Phaser.Game(848, 450, Phaser.AUTO, 'game');
game.state.add('game', GameState, true);
    }

        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0,0, 'background') 
        this.player = game.add.sprite(100, 296, 'cat');
        game.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
        this.player.anchor.setTo(0.5, 0)
        
        this.player.body.gravity.y = 200;
        
        this.jumpcount = 0;
        
        this.ground = game.add.sprite(0,500, 'ground');
        game.physics.arcade.enable(this.ground);  
        this.ground.body.immovable = true;
    var up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        up.onDown.add(this.jump, this);
        
        
        var down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        down.onDown.add(this.falldown, this);
        
    var left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
       left.onDown.add(this.moveleft, this);
        left.onUp.add(this.stopmoving, this);
        
    var right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
       right.onDown.add(this.moveright, this);
        right.onUp.add(this.stopmoving, this);
    },
  
    jump: function() {
        if(this.jumpcount < 2) {
            this.player.body.velocity.y = -240;
            this.jumpcount += 1;
        }
    },
    
    moveleft: function() {
        this.player.body.velocity.x = -175;
        this.player.scale.x = -1
    },
    
     moveright: function() {
        this.player.body.velocity.x = 175;
         this.player.scale.x = 1
    },
    
    stopmoving: function() {
        this.player.body.velocity.x = 0;
    },
    
     resetjumpcount: function() {
        this.jumpcount = 0;
         
    },
    
    update: function() {
        game.physics.arcade.collide(this.player, this.ground, this.resetjumpcount, null, this);
    },
  falldown: function() {
        this.player.body.velocity.y = 250;
  },
};

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', main);
game.state.start("default")

//lol
