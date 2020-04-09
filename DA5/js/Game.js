"use strict";

BasicGame.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:
    /*
    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)
    
    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
    */
    
    //follow cursor: http://phaser.io/examples/v2/arcade-physics/accelerate-to-pointer
    //animations: https://github.com/SeabassJames/cs325-game-prototypes/blob/master/HW0/js/main.js
    //text: https://phaser.io/examples/v2/text/text-events
    //overlap: https://www.phaser.io/examples/v2/sprites/overlap-without-physics
    //groups: https://phaser.io/examples/v2/groups/align-sprites-to-grid
    //for each in groups: https://phaser.io/examples/v2/groups/for-each
    //recycling in groups: https://phaser.io/examples/v2/groups/recycling
    //random int: https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
    //move to another group: https://phaser.io/examples/v2/groups/move-to-another-group
    
    // For optional clarity, you can initialize
    // member variables here. Otherwise, you will do it in create().
    this.john = null;
    this.facing = 'idle';
    this.privacy = 100.0;
    //this.spawntimer = 0;
    this.bg = null;
    this.score = 0;
    // Add some text using a CSS style.
    // Center it in X, and position its top 15 pixels from the top of the world.
    var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
    this.text = null;
    var falltimer = 100;
    var gameOver = false;
};

BasicGame.Game.prototype = {
    
    create: function () {
        /*
        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        
        // Create a sprite at the center of the screen using the 'logo' image.
        this.ghost = this.game.add.sprite( this.game.world.centerX, this.game.world.centerY, 'logo' );
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        this.ghost.anchor.setTo( 0.5, 0.5 );
        
        // Turn on the arcade physics engine for this sprite.
        this.game.physics.enable( this.ghost, Phaser.Physics.ARCADE );
        
        
        
        
        // When you click on the sprite, you go back to the MainMenu.
        this.ghost.inputEnabled = true;
        this.ghost.events.onInputDown.add( function() { this.quitGame(); }, this );
        */
        
        
        //load background image
        this.bg = this.game.add.sprite(0, 0, 'bg');
        
        //make a group to hold minoes in grid
        var gridgroup = this.add.group();
        
        //create sprites
        gridgroup.createMultiple(230, 'minoes', [0], true);
        
        //align sprites into rows of 10
        gridgroup.align(10, -1, 40, 40);
        gridgroup.x = 600;
        gridgroup.y = -70;
        //gridgroup.filled = false;
        
        //this.music = this.add.audio('ghostBusters');
        //this.sfx = this.add.audio('fart');
        //this.music.play();
        //this.music.loop = true;
        //this.text = this.game.add.text( 100, 15, "Privacy: " + parseInt(this.privacy) + "\nScore: " + this.score + "\nWasher time: " + parseInt(this.washerTime) + ":" + parseInt((this.washerTime - parseInt(this.washerTime)) * 60), this.style );
        
        //10x23 empty grid for minoes. 
       /* playgrid =     [[0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0], //spawning row
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0]];
                        */
        //var gridlocation = [600, -70]
        //starting square for minoes to spawn
        var startsquare = [4,2];
        //representing up to 5 active minoes
        var activegroup = this.add.group();
        // allocate active minoes
        //create sprites
        activegroup.createMultiple(230, 'minoes', [0], false);
        
        //a lot of sprites
        //var grid00 = this.game.add.sprite(gridlocation[0], gridlocation[1], 'minoes');
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.actButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },

    update: function () {
        if (!gameOver){
            falltimer -= 1;
            if (falltimer <=0){
                this.fall();
                falltimer = 100;
            }
        }
        
    },


    quitGame: function () {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    },
    
    
    checkOverlap: function (spriteA, spriteB) {
    
        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();
        
        return Phaser.Rectangle.intersects(boundsA, boundsB);
        
    },
    
    stopMino: function(){
        gridgroup.forEach(function(space){ //for each space on the grid
            activegroup.forEach(function(mino){
                if (mino.x == space.x & mino.y == space.y){ //if mino is overlapping space
                    //fill in space
                    space.frame = mino.frame;
                    //remove active mino
                    mino.kill();
                }
            });
        });
        
        this.spawnMino();
    },
    
    
    spawnMino: function (){
        
        //spawns a mino
        //var minosize = Math.floor(Math.random() * (max - min + 1)) + min;
        activegroup.kill();
        var mino = activegroup.getFirstExists(false);

        if (mino){  //spawn mino at starting point
            mino.revive();
            mino.x = 760;
            mino.y = 10;
        }
        
    },
    
    fall: function(){
        var cleartofall = true;
        gridgroup.forEach(function(space){
            if (space.frame > 3){ //if space is not empty
                activegroup.forEach(function(mino){
                    if (space.top == mino.bottom){  //if filled space is below active mino
                        cleartofall = false;
                    }
                });
            }
        });
        if (!cleartofall){
            this.stopMino();
        }else{
            activegroup.forEach(function(mino){
                mino.y -= 40; //fall by 1 space
            });
        }
        
    }
    
    

};
