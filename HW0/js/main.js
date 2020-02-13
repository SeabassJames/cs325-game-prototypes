"use strict";

window.onload = function() {
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    //https://phaser.io/examples/v2/arcade-physics/platformer-basics
    //https://www.html5gamedevs.com/topic/13932-problem-with-arcade-bodysetsize/
    //https://phaser.io/examples/v2/ninja-physics/ninja-platforms
    //https://www.joshmorony.com/phaser-fundamentals-handling-collisions/
    //https://phaser.io/sandbox/edit/yzWSswza
  
var game = new Phaser.Game(1500, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });

function preload() {
    //load assets
    game.load.image('background', 'assets/Background.png');
    game.load.spritesheet('dude', 'assets/MagnetPantsManSpritesSmall.png', 100,163);
    game.load.image('ground', 'assets/Grass.png');
    game.load.image('plaform', 'assets/Platform.png');
    game.load.image('wall', 'assets/Wall.png');
    game.load.image('goal', 'assets/Goal.png');
    game.load.image('win', 'assets/WinScreen.png');
}
    
var player;
var facing = 'right';
var jumpTimer = 0;
var cursors;
var jumpButton;
var bg;
var ground;
var leftWall;
var platforms;
var onLeftWall = false;

function create() {
    //
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 250;
    game.time.desiredFps = 30;
    
    //generate background
    bg = game.add.tileSprite(0, 0, 1500, 600, 'background');
    
    platforms = game.add.physicsGroup();
    
    //create ground
    var ground = platforms.create(0, 500, 'ground');
    game.physics.arcade.enable(ground);
    //ground.enableBody = true;
    ground.body.immovable = true;
    ground.body.gravityScale = 0;
    
    //create wall
    var leftWall = platforms.create(0, 0, 'wall');
    leftWall.scale.setTo(0.7, 0.8);
    game.physics.arcade.enable(leftWall);
    //leftWall.enableBody = true;
    leftWall.body.immovable = true;
    leftWall.body.gravityScale = 0;
    
    //platforms.setAll('body.immovable', true);
    
    //create player
    console.log("player");
    player = game.add.sprite(100, 200, 'dude');
    game.physics.enable(player, Phaser.Physics.ARCADE);

    
    player.body.collideWorldBounds = true;
    //leftWall.body.collideWorldBounds = true;
    ground.body.collideWorldBounds = true;
    player.body.setSize(player.width / player.scale.x,player.height / player.scale.y);
    //platforms.body.setSize(player.width / player.scale.x,player.height / player.scale.y);
    //ground.body.setSize(player.width / player.scale.x,player.height / player.scale.y);

    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('turn', [4], 20, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
}

function update() {

    game.physics.arcade.collide(player, ground);
    game.physics.arcade.collide(player, leftWall, onLeftWall = true);
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(leftWall, platforms);
    //game.physics.arcade.collide(leftWall, ground);
    
    player.body.velocity.x = 0;
    //clinging to left wall
    if (onLeftWall == true){
        player.body.velocity.y = 0;
        if (cursors.up.isDown){
            player.body.velocity.y = -100;
            player.animations.play('left');
        }
        else if (cursors.down.isDown){
            player.body.velocity.y = 100;
            player.animations.play('left');
        }
        else{
            player.animations.stop();
            player.frame = 0;
        }
        if (jumpButton.isDown){
            player.body.velocity.y = -200;
            player.body.velocity.x = 250;
            onLeftWall = false;
        }
    }
    else if (cursors.left.isDown)
    {
        player.body.velocity.x = -150;

        if (facing != 'left')
        {
            player.animations.play('left');
            facing = 'left';
        }
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 150;

        if (facing != 'right')
        {
            player.animations.play('right');
            facing = 'right';
        }
    }
    else
    {
        if (facing != 'idle')
        {
            player.animations.stop();

            if (facing == 'left')
            {
                player.frame = 0;
            }
            else
            {
                player.frame = 5;
            }

            facing = 'idle';
        }
    }
    
    if (jumpButton.isDown && player.body.velocity.y == 0 && game.time.now > jumpTimer)
    {
        player.body.velocity.y = -250;
        jumpTimer = game.time.now + 750;
    }

}

function render () {

    game.debug.text(game.time.suggestedFps, 32, 32);

    // game.debug.text(game.time.physicsElapsed, 32, 32);
    // game.debug.body(player);
    // game.debug.bodyInfo(player, 16, 24);

}

    
};
