var main = {
  
    preload: function() {
        game.load.image('cat', 'cat.png');
        game.load.image('ground', 'ground.png');
        game.load.image('background', 'background.jpg');
    },

    create: function() { 
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0,0, 'background') 
        this.player = game.add.sprite(100, 245, 'cat');
        game.physics.arcade.enable(this.player);

    this.player.body.gravity.y = 1000;
        
        this.ground = game.add.sprite(0,500, 'ground');
        
        game.physics.arcade.enable(this.ground);

    
    var space = 
    game.input.keyboard.addKey(Phaser.Keyboard.UP);
        space.onDown.add(this.jump, this);
        
    
        game.physics.arcade.overlap(this.player, this.ground, this.restartGame, null, this);
    },
  
    jump: function() {
        this.player.body.velocity.y = -250;
    },
    
    
    restartGame: function() {
        game.state.start('default');    
    },
};

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', main);
game.state.start("default")
//lol