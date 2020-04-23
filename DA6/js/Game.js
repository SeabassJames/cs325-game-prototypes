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
    //debugging: https://phaser.io/examples/v2/debug/debug-display
    //call all animations: https://phaser.io/examples/v2/groups/call-all-animations
    
    // For optional clarity, you can initialize
    // member variables here. Otherwise, you will do it in create().
    //this.spawntimer = 0;
    this.bg = null;
    this.score = 0;
    // Add some text using a CSS style.
    // Center it in X, and position its top 15 pixels from the top of the world.
    this.style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
    this.text = null;
    this.falltimer = 30;
    this.gameOver = false;
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
        //this.physics.startSystem(Phaser.Physics.ARCADE);
        
        //load background image
        this.bg = this.game.add.sprite(0, 0, 'bg');
        
        //make a group to hold minoes in grid
        this.gridgroup = this.add.group();
        
        //create sprites
        this.gridgroup.createMultiple(230, 'minoes', [0], true);
        
        //align sprites into rows of 10
        this.gridgroup.align(10, -1, 40, 40);
        this.gridgroup.x = 600;
        this.gridgroup.y = -70;
        //gridgroup.filled = false;
        
        //this.music = this.add.audio('ghostBusters');
        //this.sfx = this.add.audio('fart');
        this.music.play();
        this.music.loop = true;
        //this.text = this.game.add.text( 100, 15, "Score: " + this.score + "\nWasher time: " + parseInt(this.washerTime) + ":" + parseInt((this.washerTime - parseInt(this.washerTime)) * 60), this.style );
        
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
        this.startsquare = [4,2];
        //representing up to 5 active minoes
        this.activegroup = this.add.group();
        // allocate active minoes
        //create sprites
        this.activegroup.createMultiple(1, 'minoes', [5], true);
        this.activegroup.align(5, -1, 40, 40);
        //this.activegroup.x = 760;
        //this.activegroup.y = 10;
        this.activegroup.x = 600;
        this.activegroup.y = -70;
        this.spawnMino();
        
        //  Now using the power of callAll we can add the same animation to all coins in the group:
        this.gridgroup.callAll('animations.add', 'animations', 'clear', [1, 2, 3, 4], 10, true);
        this.activegroup.callAll('animations.add', 'animations', 'clear', [1, 2, 3, 4], 10, true);

        //  And play them
        //this.gridgroup.callAll('animations.play', 'animations', 'clear');
        //this.activegroup.callAll('animations.play', 'animations', 'clear');
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.actButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },

    update: function () {
        if (!this.gameOver){
            if (this.cursors.left.isDown){ //move left
                this.moveLeft();
            }
            if (this.cursors.right.isDown){ //move right
                this.moveRight();
            }
            if (this.cursors.down.isDown){ //drop faster
                this.falltimer -=2;
            }
            if (this.cursors.up.isDown){ //instant drop
                this.falltimer = 0;
            }
            this.falltimer -= 1;
            if (this.falltimer <=0){
                this.fall();
                this.falltimer = 10;
            }
        }else{
            this.gameoversprite = this.game.add.sprite(318, 350, 'gameover');
        }
        this.world.bringToTop(this.activegroup);
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
        var xs = [];
        var ys = [];
        var color;
        var gocheck = false;
        this.activegroup.forEach(function(mino){
            xs.push(mino.x);
            ys.push(mino.y);
            color = mino.frame;
        });
        this.gridgroup.forEach(function(space){ //for each space on the grid
            for (var i = 0; i<xs.length; i++){  //for each active mino
                if (xs[i] == space.x && ys[i] == space.y){ //if mino is overlapping space
                    //fill in space
                    space.frame = color;
                    //remove active mino
                    //mino.kill();
                    if (space.y <= 40){ //if stopped at top of screen
                        gocheck = true;
                    }
                }
            }
        });
        this.gameOver = gocheck;
        this.spawnMino();
        
        //this.activegroup.callAll('animations.play', 'animations', 'clear');
    },
    
    
    spawnMino: function (){
        
        //spawns a mino
        //var minosize = Math.floor(Math.random() * (max - min + 1)) + min;
        //this.activegroup.kill();
        //var mino = this.activegroup.getFirstExists(true);
        this.activegroup.forEach(function(mino){
            //if (mino){  //spawn mino at starting point
                mino.revive();
                mino.x = 160;
                mino.y = 40;
                mino.visible = true;
                mino.frame = 5;
                
            //}
        });
        this.activegroup.visible = true;
        
        //this.activegroup.callAll('animations.play', 'animations', 'clear');
    },
    
    fall: function(){
        var cleartofall = true;
        var exists = false;
        this.activegroup.forEach(function(mino){
                if (mino.exists){
                    exists = true;
                    //break;
                }
        });
        if (!exists){
            this.spawnMino();
        }
        
        
        this.activegroup.forEach(function(mino){
            //check if mino is at bottom of grid
            if (mino.bottom >= 920){
                cleartofall = false;
            }
        });
        
        if (cleartofall){
            //check if filled space is below 
            var bottoms = [];
            var lefts = [];
            this.activegroup.forEach(function(mino){
                bottoms.push(mino.bottom);
                lefts.push(mino.left);
            });
            this.gridgroup.forEach(function(space){ //checks every space on grid
                if (space.frame > 3){ //if space is not empty
                    for (var i = 0; i<bottoms.length; i++){//checks every active mino
                        if (bottoms[i] == space.top && lefts[i] == space.left){
                            cleartofall = false;
                        }
                    }
                }
            });
        }
        if (!cleartofall){
            this.stopMino();
        }else{
            this.activegroup.forEach(function(mino){
                mino.y += 40; //fall by 1 space
            });
        }
        
        //this.activegroup.callAll('animations.play', 'animations', 'clear');
    },
    
    //moves active minoes left
    moveLeft: function(){
        var cleartomove = true;
        
        this.activegroup.forEach(function(mino){
            //check if mino is at left of grid
            if (mino.left <= 0){
                cleartomove = false;
            }
        });
        
        if (cleartomove){
            //check if filled space is to the left 
            var bottoms = [];
            var lefts = [];
            this.activegroup.forEach(function(mino){
                bottoms.push(mino.bottom);
                lefts.push(mino.left);
            });
            this.gridgroup.forEach(function(space){ //checks every space on grid
                if (space.frame > 3){ //if space is not empty
                    for (var i = 0; i<bottoms.length; i++){//checks every active mino
                        if (bottoms[i] == space.bottom && lefts[i] == space.right){
                            cleartomove = false;
                        }
                    }
                }
            });
        }
        if (!cleartomove){
            //this.stopMino();
        }else{
            this.falltimer += 0.4;
            this.activegroup.forEach(function(mino){
                mino.x -= 40; //move by 1 space
            });
        }
        
        //this.activegroup.callAll('animations.play', 'animations', 'clear');
    },
    
    //moves active minoes right
    moveRight: function(){
        var cleartomove = true;
        
        this.activegroup.forEach(function(mino){
            //check if mino is at left of grid
            if (mino.right >= 400){
                cleartomove = false;
            }
        });
        
        if (cleartomove){
            //check if filled space is to the left 
            var bottoms = [];
            var rights = [];
            this.activegroup.forEach(function(mino){
                bottoms.push(mino.bottom);
                rights.push(mino.right);
            });
            this.gridgroup.forEach(function(space){ //checks every space on grid
                if (space.frame > 3){ //if space is not empty
                    for (var i = 0; i<bottoms.length; i++){//checks every active mino
                        if (bottoms[i] == space.bottom && rights[i] == space.left){
                            cleartomove = false;
                        }
                    }
                }
            });
        }
        if (!cleartomove){
            //this.stopMino();
        }else{
            this.falltimer += 0.4;
            this.activegroup.forEach(function(mino){
                mino.x += 40; //move by 1 space
            });
        }
    },
    
    render: function(){
    /*    this.activegroup.forEach(function(mino){
            this.game.debug.spriteBounds(mino);
            this.game.debug.spriteCorners(mino, true, true);
        });
        */
    }
    
    

};
