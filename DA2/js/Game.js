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
    
    // For optional clarity, you can initialize
    // member variables here. Otherwise, you will do it in create().
    this.ghost = null;
    this.facing = 'turn';
    this.gas = 100;
    this.spawntimer = 0;
    this.bg = null;
    this.score = 0;
    // Add some text using a CSS style.
    // Center it in X, and position its top 15 pixels from the top of the world.
    var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
    this.text = null;
    this.bean10 = null;
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
        // Make it bounce off of the world bounds.
        this.ghost.body.collideWorldBounds = true;
        
        
        
        // When you click on the sprite, you go back to the MainMenu.
        this.ghost.inputEnabled = true;
        this.ghost.events.onInputDown.add( function() { this.quitGame(); }, this );
        */
        this.music = this.add.audio('ghostBusters');
        this.music.play();
        this.text = this.game.add.text( this.game.world.centerX, 15, "Gas: " + this.gas + "\nScore: " + this.score, this.style );
        this.text.anchor.setTo( 0.5, 0.0 );
        
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.game.stage.backgroundColor = '#0072bc';

        this.ghost = this.game.add.sprite(300, 300, 'ghost');
        this.ghost.anchor.setTo(0.5, 0.5);

        //  Enable Arcade Physics for the sprite
        this.game.physics.enable(this.ghost, Phaser.Physics.ARCADE);

        //  Tell it we don't want physics to manage the rotation
        this.ghost.body.allowRotation = false;
        
        // Make sprite smaller
        this.ghost.scale.setTo(0.3, 0.3);
        
        //animations
        this.ghost.animations.add('left', [0, 1], 20, true);
        this.ghost.animations.add('turn', [2, 5], 20, true);
        this.ghost.animations.add('right', [3,4], 20, true);
        
    },

    update: function () {
        if (this.gas > 0){
            //Move ghost towards the cursor
            this.game.physics.arcade.moveToPointer(this.ghost, 500, this.game.input.activePointer, 80);
            //update animation based on deltaX
            if (this.ghost.deltaX > 0.7){
                if (this.facing != 'right'){
                    this.ghost.animations.play('right');
                    this.facing = 'right';
                }
            }else if (this.ghost.deltaX < -0.7){
                if (this.facing != 'left'){
                    this.ghost.animations.play('left');
                    this.facing = 'left';
                }
            }else{
                if (this.facing != 'turn'){
                    this.ghost.animations.play('turn');
                    this.facing = 'turn'; 
                }
            }
            
            //beans
            if (this.bean10 == null){
                this.bean10 = this.game.add.sprite(this.game.rnd.integerInRange(0, 700), this.game.rnd.integerInRange(0, 500), 'bean10');
            }
            if (checkOverlap(this.bean10, this.ghost)){
                this.gas += 10;
                this.bean10.destroy();
                this.bean10 = null;
            }
            

            this.score += 1;
            this.gas -= 1;
            this.text.text = "Gas: " + this.gas + "\nScore: " + this.score;
        }else{
            //out of gas
            this.text.text =  "Gas: " + this.gas + "\nScore: " + this.score + "\n\n\nGAME OVER";
            this.ghost.animations.stop();
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

}
    
    

};
