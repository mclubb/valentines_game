
BasicGame.Game = function (game) {
    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:
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

    // I added these. These should probably be just a global variable or something
    this.background;
    this.player;
    this.mike;
    this.gameover = false;
    this.fHearts;
};

// Global Variables for Game
var map;
var layer;
var cursors;
var moveSpeed = 10;
var triggers = [];
var messages = [];
var clouds = [];

BasicGame.Game.prototype = {

    create: function () {

        this.background = this.add.tileSprite(0, 0, window.innerWidth, 2000, 'background');
        this.background.tileScale.y = 2;

        map = this.add.tilemap('map', 64, 64);

        //  Now add in the tileset
        map.addTilesetImage('tiles');

        //  Create our layer
        layer = map.createLayer(0);

        //  Resize the world
        layer.resizeWorld();

        //  Allow cursors to scroll around the map
        cursors = this.input.keyboard.createCursorKeys();

        // Trees
        /*this.add.sprite(75, 400, 'tree');
        this.add.sprite(155, 410, 'tree');
        this.add.sprite(410, 390, 'tree');
        this.add.sprite(900, 400, 'tree');
        */

        for(var i = 0; i < 30; i++) {
          var cloud = this.add.sprite(i * 512, 0, 'cloud');
          var r = Math.random() %2 * 10;
          cloud.scale.setTo(r);
          clouds.push(cloud);
        }

        // Intro text
        this.add.sprite(50, 50, 'introText');

        // *********************************************
        // Cafe Setup
        // *********************************************
        var cafe = this.add.sprite(1200, 0, 'cafeShop');
        cafe.scale.setTo(10);

        // People in the cafe
        var person1 = this.add.sprite(1350, 380, 'woman1');
        person1.scale.setTo(10);
        
        // Create a trigger box that is hidden as well as a message box
        var trigger1 = this.add.sprite(1102, 0, 'hitbox')
        triggers.push(trigger1);
        var message1 = this.add.sprite(1275, 320, 'message1');
        message1.visible = false;
        message1.scale.setTo(4);
        messages.push(message1);

        var person2 = this.add.sprite(1835, 400, 'man2');
        person2.scale.setTo(10);

        var trigger2 = this.add.sprite(1552, 0, 'hitbox')
        triggers.push(trigger2);
        var message2 = this.add.sprite(1750, 320, 'message2');
        message2.visible = false;
        message2.scale.setTo(4);
        messages.push(message2);

        // **********************************************
        // Elevator Setup
        // **********************************************
        var elevator = this.add.sprite(3600, 0, 'elevator');
        elevator.scale.setTo(10);

        // People in/at the elevator
        var person8 =this.add.sprite(2775, 400, 'man2');
        person8.scale.setTo(10);
        var trigger8 = this.add.sprite(2422, 0, 'hitbox');
        triggers.push(trigger8);
        var message8 = this.add.sprite(2595, 320, 'message1');
        message8.visible = false;
        message8.scale.setTo(4);
        messages.push(message8);

        var person3 =this.add.sprite(4100, 400, 'man1');
        person3.scale.setTo(10);
        var trigger3 = this.add.sprite(3802, 0, 'hitbox');
        triggers.push(trigger3);
        var message3 = this.add.sprite(3975, 320, 'message3');
        message3.visible = false;
        message3.scale.setTo(4);
        messages.push(message3);


        // **********************************************
        // Tunes @ 8 Setup
        // **********************************************
        var tat8 = this.add.sprite(6000, 0, 'tat8');
        tat8.scale.setTo(10);

        // People at tunes at 8
        var person4 =this.add.sprite(5875, 400, 'woman2');
        person4.scale.setTo(10);
        var person5 =this.add.sprite(5910, 500, 'woman1');
        person5.scale.setTo(10);
        var person6 = this.add.sprite(6525, 400, 'man1');
        person6.scale.setTo(10);
        var person7 =this.add.sprite(6625, 500, 'man2');
        person7.scale.setTo(10);

        var trigger3 = this.add.sprite(6182, 0, 'hitbox')
        triggers.push(trigger3);
        var message4 = this.add.sprite(6355, 320, 'message3');
        message4.visible = false;
        message4.scale.setTo(4);
        messages.push(message4);


        var arch = this.add.sprite(8400, 0, 'arch');
        arch.scale.setTo(10);
        this.mike = this.add.sprite(8915, 370, 'mike');

        this.mike.scale.setTo(10);

        // Fabi
        this.player = this.add.sprite(312, 400, 'fabi');
        this.player.scale.setTo(10);

        this.fHearts = this.add.emitter(9075, 250, 150);
        this.fHearts.width = 300;
        this.fHearts.makeParticles('heart');
        this.fHearts.minParticleSpeed.set(0, 300);
        this.fHearts.maxParticleSpeed.set(0, 400);
        this.fHearts.setRotation(0, 360);
        this.fHearts.setAlpha(1, 0.01, 1000);
        this.fHearts.setScale(0.5, 0.5, 4, 4);
        //this.fHearts.start(false, 2000, 100)

    },

    update: function () {

      // Move the clouds
      for( var i = 0; i < clouds.length; i++ )
      {
        clouds[i].x -= 0.5;
      }

      if(this.gameover)
      {
        return;
      }

      var playerRect = new Phaser.Rectangle(this.player.x, this.player.y, this.player._frame.right, this.player._frame.bottom);
      var mikeRect = new Phaser.Rectangle(this.mike.x - 50, this.mike.y, this.mike._frame.right, this.mike._frame.bottom);
      if( cursors.up.isDown)
      {
        console.log(playerRect);
      }

      if (cursors.left.isDown)
      {
          this.camera.x -= moveSpeed;
          this.player.x -= moveSpeed;

          if( this.player.x < 312 )
            this.player.x = 312;
      }
      else if (cursors.right.isDown || this.input.pointer1.isDown)
      {
          this.camera.x += moveSpeed;
          this.player.x += moveSpeed;

          if( this.player.x > this.world.width - 512 )
          {
            this.player.x  = this.world.width - 512;
          }
      }

      // Check to see if player is intersecting a trigger box
      for(var i = 0; i < triggers.length; i++)
      {
        var t = triggers[i];
        var triggerRect = new Phaser.Rectangle(t.x, t.y, t._frame.right, t._frame.bottom);
        if( Phaser.Rectangle.intersects(playerRect, triggerRect) )
        {
          console.log("collided");
           messages[i].visible = true;
        }
        else
        {
          messages[i].visible = false;
        }
      }

      // Check to see if Fabi intersects with mike
      if(Phaser.Rectangle.intersects(playerRect, mikeRect))
      {
        this.gameover = true;
        this.fHearts.start(false, 2000, 100);
      }


      this.background.x = this.camera.x;
    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};
