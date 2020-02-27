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
    this.washerState = "paused";
    this.dryerState = "open";
    this.curtainState = "closed";
    this.washerTime = 30.00;
    this.dryerTime = 60.00;
    this.difficulty = 3;
    this.holdinglaundry = false;
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
        this.bg = this.game.add.sprite(0, 0, 'bg');
        //this.music = this.add.audio('ghostBusters');
        //this.sfx = this.add.audio('fart');
        //this.music.play();
        //this.music.loop = true;
        this.text = this.game.add.text( 100, 15, "Privacy: " + parseFloat(this.privacy).toFixed(2) + "\nScore: " + this.score + "\nPrivacy: " + this.score + "\nWasher time: " + parseInt(this.washerTime) + ":" + parseInt((this.washerTime - parseInt(this.washerTime)) * 60), this.style );
        
        
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //this.game.stage.backgroundColor = '#0173bd';

        this.washer = this.game.add.sprite(315, 55, 'washer');
        this.dryer = this.game.add.sprite(495, 55, 'dryer');
        this.curtains = this.game.add.sprite(0, 0, 'curtains');
        this.john = this.game.add.sprite(300, 300, 'john');
        this.john.anchor.setTo(0.5, 1.0);

        //  Enable Arcade Physics for the sprite
        this.game.physics.enable(this.john, Phaser.Physics.ARCADE);

        //  Tell it we don't want physics to manage the rotation
        this.john.body.allowRotation = false;
        
        // Make sprite smaller
        this.john.scale.setTo(0.5, 0.5);
        
        //animations
        this.john.animations.add('left', [0, 1, 2, 3], 20, true);
        this.john.animations.add('turn', [4], 20, true);
        this.john.animations.add('right', [5,6, 7, 8], 20, true);
        this.john.animations.add('laundry', [9], 20, true);
        
        this.washer.animations.add('running', [0,1], 20, true);
        this.washer.animations.add('paused', [2], 20, true);
        this.washer.animations.add('off', [3], 20, true);
        this.washer.animations.add('open', [4], 20, true);
        
        this.dryer.animations.add('running', [0,1], 20, true);
        this.dryer.animations.add('paused', [2], 20, true);
        this.dryer.animations.add('off', [3], 20, true);
        this.dryer.animations.add('open', [4], 20, true);
        
        this.curtains.animations.add('closed', [0], 20, true);
        this.curtains.animations.add('open', [1], 20, true);
        
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.actButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },

    update: function () {
        
        this.john.body.velocity.x = 0;
        this.john.body.velocity.y = 0;
        if (this.privacy > 0){
            
            //washer
            if (this.washerTime == 0){
                this.washerState = "stopped";
                this.washer.animations.play('stopped');
                if (this.john.body.bottom <= 360 & this.john.body.left > this.washer.body.left - 5 & this.john.body.right < this.washer.body.right + 5 & this.actButton.isDown){
                    this.washerState = "open";
                    this.washer.animations.play('open');
                    this.holdinglaundry = true;
                    this.john.animations.play('laundry');
                }
            }else{
                if (this.game.rnd.integerInRange(0, 1000) < this.difficulty){
                    this.washerState = "paused"
                }
                if (this.washerState == "paused"){
                    this.washer.animations.play('paused');
                    if (this.john.body.bottom <= 360 & this.john.body.left > this.washer.left - 5 & this.john.body.right < this.washer.right + 5 & this.actButton.isDown){
                        this.washerState = "running";
                        this.washer.animations.play('running');
                    }
                }
                this.washerTime -= 1.0/6;
            }
            
            //dryer
            if (this.dryerTime == 0){
                this.dryerState = "stopped";
                this.dryer.animations.play('stopped');
                if (this.john.body.bottom <= 360 & this.john.body.left > this.dryer.left - 5 & this.john.body.right < this.dryer.right + 5 & this.actButton.isDown){
                    this.dryerState = "open";
                    this.dryer.animations.play('open');
                }
            }else if (this.dryerState == "open"){
                if (this.holdinglaundry == true & this.john.body.bottom <= 360 & this.john.body.left > this.dryer.left - 5 & this.john.body.right < this.dryer.right + 5 & this.actButton.isDown){
                    this.dryerState = "running";
                    this.dryer.animations.play('running');
                }
            }else{
                if (this.game.rnd.integerInRange(0, 1000) < this.difficulty){
                    this.dryerState = "paused"
                }
                if (this.dryerState == "paused"){
                    this.dryer.animations.play('paused');
                    if (this.john.body.bottom <= 360 & this.john.body.left > this.dryer.left - 5 & this.john.body.right < this.dryer.right + 5 & this.actButton.isDown){
                        this.dryerState = "running";
                        this.dryer.animations.play('running');
                    }
                }
                this.dryerTime -= 1.0/6;
            }
            
            //curtains
            if (this.game.rnd.integerInRange(0, 1000) < this.difficulty){
                this.curtainState = "open";
                this.curtains.animation.play('open')
            }
            if (this.john.body.left <= 90 & this.actButton.isDown){
                this.curtainState = "closed";
                this.curtains.animations.play('closed');
            }else if (this.curtainState == "open"){
                this.privacy -= 1
            }else{
                this.privacy += 0.1;
            }
            
            //comics
            if (this.john.body.left >= 700 & this.actButton.isDown){
                this.score += 1;
            }
            
            //horizontal movement
            if (this.cursors.left.isDown & this.john.body.left > 0)
            {
                this.john.body.velocity.x = -400;

                if (this.facing != 'left')
                {
                    this.john.animations.play('left');
                    this.facing = 'left';
                }
            }
            else if (this.cursors.right.isDown & this.john.body.right < 730)
            {
                this.john.body.velocity.x = 400;

                if (this.facing != 'right')
                {
                    this.john.animations.play('right');
                    this.facing = 'right';
                }
            }
            else
            {
                if (this.facing != 'idle')
                {
                    this.john.animations.play('turn');
                    this.facing = 'idle';
                }
            }
            if (this.holdinglaundry == true){
                this.john.animations.play('laundry');
            }
            //vertical movement
            if (this.cursors.down.isDown & this.john.body.bottom < 600)
            {
                this.john.body.velocity.y = 350;

            }
            else if (this.cursors.up.isDown & this.john.body.bottom > 350)
            {
                this.john.body.velocity.y = -350;

            }

            this.score += 1;
            if (this.score == 9001){
                this.game.stage.backgroundColor = '#fafa00';
                this.music.stop();
                this.music = this.add.audio('ghostNappa');
                this.music.play();
                this.music.loop = true;
            }
            this.privacy -= 0.05;
            this.text.text = "Privacy: " + parseFloat(this.privacy).toFixed(2) + "\nScore: " + this.score + "\nPrivacy: " + this.score + "\nWasher time: " + parseInt(this.washerTime) + ":" + parseInt((this.washerTime - parseInt(this.washerTime)) * 60);
        }else{
        
            //out of privacy
            this.privacy = 0;
            this.text.text =  "Privacy: " + parseFloat(this.privacy).toFixed(2) + "\nScore: " + this.score + "\nPrivacy: " + this.score + "\nWasher time: " + parseInt(this.washerTime) + ":" + parseInt((this.washerTime - parseInt(this.washerTime)) * 60) + "\n\n\nGAME OVER";
            this.john.animations.stop();
            this.music.loop = false;
            
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
