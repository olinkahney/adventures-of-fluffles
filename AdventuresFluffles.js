var main = {
  
    preload: function() {
        game.load.image('cat', 'cat.png');
        game.load.image('ground', 'ground.png');
        game.load.image('background', 'background.jpg');
    },

    create: function() { 
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0,0, 'background') 
        this.player = game.add.sprite(100, 296, 'cat');
        game.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
       
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
            this.player.body.velocity.y = -225;
            this.jumpcount += 1;
        }
    },
    
    moveleft: function() {
        this.player.body.velocity.x = -175;
    },
    
     moveright: function() {
        this.player.body.velocity.x = 175;
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
