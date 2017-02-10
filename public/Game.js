
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
    this.background;
    this.player;

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

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

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
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
        this.add.sprite(75, 400, 'tree');
        this.add.sprite(155, 410, 'tree');
        this.add.sprite(410, 390, 'tree');
        this.add.sprite(900, 400, 'tree');

        for(var i = 0; i < 30; i++) {
          clouds.push(this.add.sprite(i * 512, 0, 'cloud'));
        }

        // Intro text
        this.add.sprite(50, 50, 'introText');



        var cafe = this.add.sprite(1200, 0, 'cafeShop');
        cafe.scale.setTo(10);
        var elevator = this.add.sprite(3600, 0, 'elevator');
        elevator.scale.setTo(10);

        var tat8 = this.add.sprite(6000, 0, 'tat8');
        tat8.scale.setTo(10);
        var arch = this.add.sprite(8400, 0, 'arch');
        arch.scale.setTo(10);

        // People in the cafe
        var person1 = this.add.sprite(1935, 220, 'people');
        // Create a trigger box that is hidden as well as a message box
        var trigger1 = this.add.sprite(1825, 0, 'hitbox')
        triggers.push(trigger1);
        var message1 = this.add.sprite(1850, 400, 'message1');
        message1.visible = false;
        messages.push(message1);



        var person2 = this.add.sprite(1550, 600, 'people');
        person2.anchor.setTo(.5, .5);
        person2.scale.x = -1;

        var trigger2 = this.add.sprite(1340, 0, 'hitbox')
        triggers.push(trigger2);
        var message2 = this.add.sprite(1365, 400, 'message2');
        message2.visible = false;
        messages.push(message2);

        // People in the elevator
        var person3 =this.add.sprite(4200, 400, 'people');

        // People at tunes at 8
        var person4 =this.add.sprite(6025, 400, 'people');
        var person5 =this.add.sprite(6125, 500, 'people');
        var person6 = this.add.sprite(6725, 600, 'people');
        person6.anchor.setTo(.5, .5);
        person6.scale.x = -1;
        var person7 =this.add.sprite(6825, 700, 'people');
        person7.anchor.setTo(.5, .5);
        person7.scale.x = -1;

        var trigger3 = this.add.sprite(6400, 0, 'hitbox')
        triggers.push(trigger3);
        var message3 = this.add.sprite(6425, 400, 'message3');
        message3.visible = false;
        messages.push(message3);


        var mike = this.add.sprite(8915, 600, 'people');
        mike.anchor.setTo(0.5, 0.5);
        mike.scale.x = -1;

        this.player = this.add.sprite(512, 500, 'fabi');

    },

    update: function () {

      var playerRect = new Phaser.Rectangle(this.player.x, this.player.y, this.player._frame.right, this.player._frame.bottom);
      if( cursors.up.isDown)
      {
        console.log(playerRect);
      }

      if (cursors.left.isDown)
      {
          this.camera.x -= moveSpeed;
          this.player.x -= moveSpeed;

          if( this.player.x < 512 )
            this.player.x = 512;
      }
      else if (cursors.right.isDown)
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

      // Move the clouds
      for( var i = 0; i < clouds.length; i++ )
      {
        clouds[i].x -= 0.5;
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
