var main = {

    preload: function() {
        game.load.image('cat', 'cat1.png');                                     
        game.load.image('ground', 'ground.png');
        game.load.image('background', 'background.jpg');
        game.load.image('bullet', 'bullet.png') ;
        game.load.image('duck' , 'duck1.png') ; 
        game.load.image('explosion', 'explosion.gif')
        game.load.image('giraffe', 'giraffe1.png')
    },

    create: function() {   
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0,0, 'background') 
        this.player = game.add.sprite(100, 300, 'cat');
        game.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
        this.player.anchor.setTo(0.5, 0)
        
        this.player.body.gravity.y = 200;
        
        this.ducks= game.add.group();
        this.ducks.enableBody = true;
        this.ducks.createMultiple(20, 'duck'); 
        game.time.events.loop(1000,this.addDuck, this);
        this.jumpcount = 0;
        
        this.giraffes= game.add.group();
        this.giraffes.enableBody = true;
        this.giraffes.createMultiple(20, 'giraffe'); 
        game.time.events.loop(1000,this.addGiraffe, this);
        this.jumpcount = 0;
 
 

        this.ground = game.add.sprite(0,500, 'ground');
        game.physics.arcade.enable(this.ground);  
        this.ground.body.immovable = true;
        
        this.kills = 0;
        this.killsNeeded = 20;
        this.SHOT_DELAY = 100; 
        this.BULLET_SPEED = 500; 
        this.NUMBER_OF_BULLETS = 20;

        this.bulletPool = this.game.add.group();
        for(var i = 0; i < this.NUMBER_OF_BULLETS; i++) {

            var bullet = this.game.add.sprite(0, 0, 'bullet');
            this.bulletPool.add(bullet);

            bullet.anchor.setTo(0.5, 0.5);

            this.game.physics.arcade.enable(bullet);

            bullet.kill();
            
        }
        
        this.game.time.advancedTiming = true;
        this.killText = this.game.add.text(
            20, 20, '', { font: '20px Impact', fill: '#ffffff' }
        );

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
        
        var space =             game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space.onDown.add(this.shootBullet, this);
    
    },
    
    shootBullet: function() {
        if (this.lastBulletShotAt === undefined) this.lastBulletShotAt = 0;
        if (this.game.time.now - this.lastBulletShotAt < this.SHOT_DELAY) return;
        this.lastBulletShotAt = this.game.time.now;

        var bullet = this.bulletPool.getFirstDead();

        if (bullet === null || bullet === undefined) return;

        bullet.revive();

        bullet.checkWorldBounds = true;
        bullet.outOfBoundsKill = true;

        bullet.body.velocity.y = 0;
        
        if (this.player.scale.x === 1){
            bullet.reset(this.player.x + 25, this.player.y + 32);

        bullet.body.velocity.x = this.BULLET_SPEED;
        } 
        else {
            bullet.reset(this.player.x + -25, this.player.y + 32);

        bullet.body.velocity.x = -this.BULLET_SPEED;
        }
        
    },
    
    
    update: function() {
        this.killText.setText(this.kills + ' kills ' + this.killsNeeded + ' kills Needed');

        game.physics.arcade.collide(this.player, this.ground, this.resetjumpcount, null, this);
        
        game.physics.arcade.overlap(this.bulletPool,this.ducks, this.killDuck, null, this);
        
        game.physics.arcade.overlap(this.bulletPool,this.giraffes, this.killGiraffe, null, this);
    },
    
    killDuck: function(bullet, duck){
        duck.reset(-6646446666666666, - 12345678910);
        bullet.reset(-1111112211331142, -6364454577757677677477);
        this.kills = this.kills+1; 
    },
    
    
    killGiraffe: function(bullet, giraffe){
        giraffe.reset(-6646446666666666, - 12345678910);
        bullet.reset(-1111112211331142, -6364454577757677677477);
        this.kills = this.kills+1; 
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
    
    falldown: function() {
        this.player.body.velocity.y = 250;
    },
    
    addDuck: function() {  
		var duck = this.ducks.getFirstDead();
        
        duck.anchor.setTo(0.5, 0.5);
        duck.reset(800, 300);        
        duck.body.velocity.x = -200;
        duck.checkWorldBounds = true;
        duck.outOfBoundsKill = true;
    },
    
    addGiraffe: function() {  
		var giraffe = this.giraffes.getFirstDead();
        
        giraffe.anchor.setTo(0.5, 0.5);
        giraffe.reset(-100, 300);        
        giraffe.body.velocity.x = 100;
        giraffe.checkWorldBounds = true;
        giraffe.outOfBoundsKill = true;
    }
};

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', main);

//lol
