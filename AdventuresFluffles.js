var main = {
  
    preload: function() {
        game.load.image('cat', 'cat.jpg');
        game.load.image('ground', 'ground.png');
        game.load.image('background', 'background.jpg');
    },

    create: function() { 
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0,0, 'background') 
        this.player = game.add.sprite(100, 245, 'cat');
        game.physics.arcade.enable(this.player);

    this.player.body.gravity.y = 1000;
        
        this.ground = game.add.group();
        this.ground.enableBody = true;
        this.ground.createMultiple(20, 'ground');

    
    var space = 
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space.onDown.add(this.jump, this);
        
            game.time.events.loop(1500, this.addGround, this);
    
        game.physics.arcade.overlap(this.player, this.ground, this.restartGame, null, this);
    },
  
    jump: function() {
        this.player.body.velocity.y = -250;
    },
    
    addGround: function() {  
        var ground = this.ground.getFirstDead();
        ground.reset(800,400);
        ground.body.velocity.x = -200;
        ground.checkWorldBounds = true
        ground.outofBoundKill = true

    },

    restartGame: function() {
        game.state.start('default');    
    },
};

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', main);
game.state.start("default")