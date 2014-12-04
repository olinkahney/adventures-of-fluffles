var startscreen = {

    preload: function() {
       
        game.stage.backgroundColor = '#000000';	  	
        game.load.image('pressstart1', 'PressStart1.png');
        game.load.image('pressstart2', 'PressStart2.png');
        game.load.spritesheet('banana', 'Banana-gif-bananas-30667445-140-140_sprite.png', 140, 140);
    },

    create: function() {   
        
        background = game.add.sprite(400 - 220,400, 'pressstart1')
        this.background2 = game.add.sprite(400 - 220,400, 'pressstart2')
        game.time.events.loop(200,this.blink, this);
        
        var banim = game.add.sprite(400 - 70, 140, 'banana');
        banim.animations.add('banana');
        banim.animations.play('banana', 10, true);
        
        var space =             game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space.onDown.add(this.startGame, this);
    
    },
    blink : function(){
        this.background2.visible = ! this.background2.visible
    },
    
    startGame : function(){
     game.state.start("main");

    },
};
var diescreen  = {

    preload: function() {
       
        game.stage.backgroundColor = '#000000';	  	
        game.load.image('doge', 'doge.png');
        game.load.image('yousuck', 'yousuck.png');
    },

    create: function() {   
        game.add.sprite(400 - 344/2, 350, 'doge');
        game.add.sprite(400 - 555/2, 50, 'yousuck');
        
        var space =             game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space.onDown.add(this.startGame, this);
    
    },
    
    startGame : function(){
     game.state.start("main");

    },
};

var main = {

    preload: function() {
        game.load.spritesheet('cat', 'cat_70x120.png', 70, 120);
        game.load.image('ground', 'ground.png');
        game.load.image('background', 'background.jpg');
        game.load.image('bullet', 'bullet.png') ;
        game.load.image('duck' , 'duck1.png') ; 
        game.load.image('explosion', 'explosion.gif')
        game.load.image('giraffe', 'giraffe1.png')
        game.load.image('platform', 'platform.png')
    },

    create: function() {   
        game.physics.startSystem(Phaser.Physics.ARCADE);
        background = game.add.sprite(0,0, 'background')
        background.fixedToCamera = true
        game.add.sprite(-300, -100, 'platform')
        this.player = game.add.sprite(100, 300, 'cat');
        this.player.animations.add('asdf');
        this.player.animations.play('asdf', 7, true);
        game.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
        this.player.anchor.setTo(0.5, 0)
        
        game.world.setBounds(0, 0, 1920, 600);
        game.camera.follow(this.player);

        this.player.body.gravity.y = 200;
        
        this.ducks= game.add.group();
        this.ducks.enableBody = true;
        this.ducks.createMultiple(20, 'duck'); 
        game.time.events.loop(5000,this.addDuck, this);
        this.jumpcount = 0;
        
        this.giraffes= game.add.group();
        this.giraffes.enableBody = true;
        this.giraffes.createMultiple(20, 'giraffe'); 
        game.time.events.loop(5000,this.addGiraffe, this);
        this.jumpcount = 0;

        this.ground = game.add.sprite(0,500, 'ground');
        this.ground.fixedToCamera = true
        game.physics.arcade.enable(this.ground);  
        this.ground.body.immovable = true;
        
        this.platforms = [];
        platform = game.add.sprite(1000, 200, 'platform');
        game.physics.arcade.enable(platform);  
        platform.body.immovable = true;
        this.platforms.push(platform);
        platform = game.add.sprite(800, 400, 'platform');
        game.physics.arcade.enable(platform);  
        platform.body.immovable = true;
        this.platforms.push(platform);
        platform = game.add.sprite(1500, 400, 'platform');
        game.physics.arcade.enable(platform);  
        platform.body.immovable = true;
        this.platforms.push(platform);
        
        
        this.kills = 0;
        this.health = 100;
        this.SHOT_DELAY = 100; 
        this.BULLET_SPEED = 500; 
        this.NUMBER_OF_BULLETS = 200;

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
     
        this.healthText = this.game.add.text(90, 20, '', { font: '20px Impact', fill: '#ffffff' }
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
        
        var P = game.input.keyboard.addKey(Phaser.Keyboard.P);
        P.onDown.add(this.pause, this);
    },
    
    pause:function() {
    game.paused=!game.paused;
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
            bullet.reset(this.player.x + 15, this.player.y + 20);

        bullet.body.velocity.x = this.BULLET_SPEED;
        } 
        else {
            bullet.reset(this.player.x + -25, this.player.y + 32);

        bullet.body.velocity.x = -this.BULLET_SPEED;
        }
        
    },
    
    
    update: function() {
        this.killText.setText(this.kills + ' kills ');
        this.killText.position.x = game.camera.position.x -375
        this.healthText.position.x = game.camera.position.x -310
        
        this.healthText.setText(this.health + ' HP')
        this.healthText.position.x = game.camera.position.x -310

        game.physics.arcade.collide(this.player, this.ground, this.resetjumpcount, null, this);
        
        var i = 0;
        for (i = 0; i < this.platforms.length; i ++){
            platform = this.platforms[i];
         game.physics.arcade.collide(this.player, platform, this.resetjumpcount, null, this);
        }
        
        game.physics.arcade.overlap(this.bulletPool,this.ducks, this.killDuck, null, this); 
        this.ducks.forEachAlive(this.followPlayer,this); 
        
        game.physics.arcade.overlap(this.bulletPool,this.giraffes, this.killGiraffe, null, this);
         this.giraffes.forEachAlive(this.followPlayer,this);
        game.physics.arcade.overlap(this.bulletPool,this.giraffes, this.killGiraffe, null, this);
        game.physics.arcade.overlap(this.player,this.giraffes, this.dodamage, null, this);
        game.physics.arcade.overlap(this.player,this.ducks, this.dodamage, null, this);
    },
    
    killDuck: function(bullet, duck){
        duck.kill();
        bullet.kill();
        this.kills = this.kills+1; 
    },
    
 restartGame: function() {game.state.start('diescreen'); },
dodamage: function(player, enemy){
        this.health= this.health -1 
        if(this.health === 0) {this.restartGame ()}
       },
    
    
    killGiraffe: function(bullet, giraffe){
        giraffe.kill();
        bullet.kill();
        this.kills = this.kills+1; 
    },
  
    jump: function() {
        if(this.jumpcount < 2) {
            this.player.body.velocity.y = -240;
            this.jumpcount += 1;
        }
    },
    
    followPlayer: function(animal){
        if(animal.position.x<this.player.position.x-25)
            animal.body.velocity.x=100;
        else if(animal.position.x>this.player.position.x+25)
            animal.body.velocity.x=-100;
         else
             animal.body.velocity.x=0;
        
        if(animal.position.y<this.player.position.y-25)
            animal.body.velocity.y=100;
        else if(animal.position.y>this.player.position.y+25)
            animal.body.velocity.y=-100;
        else
            animal.body.velocity.y=0;
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
        if (duck === null) return;
        
        duck.anchor.setTo(0.5, 0.5);
        duck.reset(game.camera.position.x+400, 300);
        duck.body.velocity.x = -100;
        duck.checkWorldBounds = true;
        duck.outOfBoundsKill = true;
    },
    
    addGiraffe: function() {  
		var giraffe = this.giraffes.getFirstDead();
        if (giraffe === null) return;
        
        giraffe.anchor.setTo(0.5, 0.5);
        giraffe.reset(-100, 300);        
        giraffe.body.velocity.x = 100;
        giraffe.checkWorldBounds = true;
        giraffe.outOfBoundsKill = true;
    }
};

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
game.state.add("main", main);
game.state.add("startscreen", startscreen);
game.state.add("diescreen", diescreen);
game.state.start("startscreen")

//lol
//lol
//lol
//lol
//lol
