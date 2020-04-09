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
    
    //Tilemaps: https://github.com/photonstorm/phaser-examples/blob/master/examples/tilemaps/paint%20tiles.js
    
    // For optional clarity, you can initialize
    // member variables here. Otherwise, you will do it in create().

    this.bg = null;
    this.score = 0;
    // Add some text using a CSS style.
    // Center it in X, and position its top 15 pixels from the top of the world.
    var style = { font: "25px Ethnocentric", fill: "#ffffff", align: "center" };
    this.text = null;
    this.difficulty = 5;
    this.holdinglaundry = false;
    this.gameOver = false;
    
    var map;
    var layer;
    
    var marker;
    var currentTile;
    var cursors;
};

BasicGame.Game.prototype = {
    
    create: function () {
        this.load.tilemap('play_grid', 'assets/grid.json', null, Phaser.Tilemap.TILED_JSON);

        map = this.add.tilemap('play_grid');

        map.addTilesetImage('Grid', 'minoes');

        currentTile = map.getTile(2, 3);

        layer = map.createLayer('Ground');

        layer.resizeWorld();

        marker = this.add.graphics();
        marker.lineStyle(2, 0x000000, 1);
        marker.drawRect(0, 0, 32, 32);

        cursors = this.input.keyboard.createCursorKeys();
    },

    update: function () {

        marker.x = layer.getTileX(this.input.activePointer.worldX) * 32;
        marker.y = layer.getTileY(this.input.activePointer.worldY) * 32;

        if (this.input.mousePointer.isDown)
        {
            if (this.input.keyboard.isDown(Phaser.Keyboard.SHIFT))
            {
                currentTile = map.getTile(layer.getTileX(marker.x), layer.getTileY(marker.y));
            }
            else
            {
                if (map.getTile(layer.getTileX(marker.x), layer.getTileY(marker.y)).index != currentTile.index)
                {
                    map.putTile(currentTile, layer.getTileX(marker.x), layer.getTileY(marker.y));
                }
            }
        }

        if (cursors.left.isDown)
        {
            this.camera.x -= 4;
        }
        else if (cursors.right.isDown)
        {
            this.camera.x += 4;
        }

        if (cursors.up.isDown)
        {
            this.camera.y -= 4;
        }
        else if (cursors.down.isDown)
        {
            this.camera.y += 4;
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
