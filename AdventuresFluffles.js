var main = {
//    var Duck = function(game, x, y) {
//    Phaser.Sprite.call(this, game, x, y, 'duck');
//
//    // Set the pivot point for this sprite to the center
//    this.anchor.setTo(0.5, 0.5);
//
//    // Enable physics on the missile
//    game.physics.enable(this, Phaser.Physics.ARCADE);
//
//    // Define constants that affect motion
//    this.SPEED = 250; // missile speed pixels/second
//    this.TURN_RATE = 5; // turn rate in degrees/frame
//    };
//
//    Duck.prototype = Object.create(Phaser.Sprite.prototype);
//    Duck.prototype.constructor = Duck;
//
//    Duck.prototype.update = function() {
//    // Calculate the angle from the missile to the mouse cursor game.input.x
//    // and game.input.y are the mouse position; substitute with whatever
//    // target coordinates you need.
//    var targetAngle = this.game.math.angleBetween(
//        this.game.player.x, this.game.player.y
//    );
//
//    // Gradually (this.TURN_RATE) aim the missile towards the target angle
//    if (this.rotation !== targetAngle) {
//        // Calculate difference between the current angle and targetAngle
//        var delta = targetAngle - this.rotation;
//
//        // Keep it in range from -180 to 180 to make the most efficient turns.
//        if (delta > Math.PI) delta -= Math.PI * 2;
//        if (delta < -Math.PI) delta += Math.PI * 2;
//
//        if (delta > 0) {
//            // Turn clockwise
//            this.angle += this.TURN_RATE;
//        } else {
//            // Turn counter-clockwise
//            this.angle -= this.TURN_RATE;
//        }
//
//        // Just set angle to target angle if they are close
//        if (Math.abs(delta) < this.game.math.degToRad(this.TURN_RATE)) {
//            this.rotation = targetAngle;
   //     }
    //}
    // Calculate velocity vector based on this.rotation and this.SPEED
    //this.body.velocity.x = Math.cos(this.rotation) * this.SPEED;
    //this.body.velocity.y = Math.sin(this.rotation) * this.SPEED;
//    };


  
    preload: function() {
        game.load.image('cat', 'cat.png');                                     
        game.load.image('ground', 'ground.png');
        game.load.image('background', 'background.jpg');
        game.load.image('bullet', 'bullet.png') ;
        game.load.image('duck' , 'duck.png') ; 
<<<<<<< HEAD
        game.load.image('explosion','explosion.gif');
=======
        game.load.image('explosion', 'explosion.gif')
    },
    
    addDuck: function() {
        this.Duck.prototype.constructor = function(game, x, y) {
        Phaser.Sprite.call(this, game, x, y, 'duck');

        // Set the pivot point for this sprite to the center
        this.anchor.setTo(0.5, 0.5);

        // Enable physics on the missile
        game.physics.enable(this, Phaser.Physics.ARCADE);

        // Define constants that affect motion
        this.SPEED = 250; // missile speed pixels/second
        this.TURN_RATE = 5; // turn rate in degrees/frame
        };
        
        this.Duck.prototype.update = function () {
            //WRITE ME
        };
>>>>>>> FETCH_HEAD
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
        this.duck=game.add.sprite(500,300, 'duck')
                game.physics.arcade.enable(this.duck);  

        this.ground = game.add.sprite(0,500, 'ground');
        game.physics.arcade.enable(this.ground);  
        this.ground.body.immovable = true;
        
        
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
        this.fpsText = this.game.add.text(
            20, 20, '', { font: '16px Arial', fill: '#ffffff' }
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
        if (game.time.fps !== 0) {
            this.fpsText.setText(this.game.time.fps + ' FPS');
        }

        game.physics.arcade.collide(this.player, this.ground, this.resetjumpcount, null, this);
        
        if(game.physics.arcade.overlap(this.bulletPool,this.duck)){
            this.duck.destroy();}
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
<<<<<<< HEAD

=======
    
    addDuck: function() {  
		var duck = this.ducks.getFirstDead();
        
        duck.reset(800, 400);        
        duck.body.velocity.x = -200;
        duck.checkWorldBounds = true;
        duck.outOfBoundsKill = true;
    }
>>>>>>> FETCH_HEAD
};

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', main);

//lol
