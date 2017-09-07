"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameUtilities = (function () {
  function GameUtilities() {
    _classCallCheck(this, GameUtilities);
  }

  /*
  distance
  ----------------
   Find the distance in pixels between two sprites.
  Parameters: 
  a. A sprite object. 
  b. A sprite object. 
  The function returns the number of pixels distance between the sprites.
      let distanceBetweenSprites = gu.distance(spriteA, spriteB);
   */

  _createClass(GameUtilities, [{
    key: "distance",
    value: function distance(s1, s2) {
      var vx = s2.x + this._getCenter(s2, s2.width, "x") - (s1.x + this._getCenter(s1, s1.width, "x")),
          vy = s2.y + this._getCenter(s2, s2.height, "y") - (s1.y + this._getCenter(s1, s1.height, "y"));
      return Math.sqrt(vx * vx + vy * vy);
    }

    /*
    followEase
    ----------------
     Make a sprite ease to the position of another sprite.
    Parameters: 
    a. A sprite object. This is the `follower` sprite.
    b. A sprite object. This is the `leader` sprite that the follower will chase.
    c. The easing value, such as 0.3. A higher number makes the follower move faster.
        gu.followEase(follower, leader, speed);
     Use it inside a game loop.
    */

  }, {
    key: "followEase",
    value: function followEase(follower, leader, speed) {

      //Figure out the distance between the sprites
      /*
      let vx = (leader.x + leader.width / 2) - (follower.x + follower.width / 2),
          vy = (leader.y + leader.height / 2) - (follower.y + follower.height / 2),
          distance = Math.sqrt(vx * vx + vy * vy);
      */

      var vx = leader.x + this._getCenter(leader, leader.width, "x") - (follower.x + this._getCenter(follower, follower.width, "x")),
          vy = leader.y + this._getCenter(leader, leader.height, "y") - (follower.y + this._getCenter(follower, follower.height, "y")),
          distance = Math.sqrt(vx * vx + vy * vy);

      //Move the follower if it's more than 1 pixel
      //away from the leader
      if (distance >= 1) {
        follower.x += vx * speed;
        follower.y += vy * speed;
      }
    }

    /*
    followConstant
    ----------------
     Make a sprite move towards another sprite at a constant speed.
    Parameters: 
    a. A sprite object. This is the `follower` sprite.
    b. A sprite object. This is the `leader` sprite that the follower will chase.
    c. The speed value, such as 3. The is the pixels per frame that the sprite will move. A higher number makes the follower move faster.
        gu.followConstant(follower, leader, speed);
     */

  }, {
    key: "followConstant",
    value: function followConstant(follower, leader, speed) {

      //Figure out the distance between the sprites
      var vx = leader.x + this._getCenter(leader, leader.width, "x") - (follower.x + this._getCenter(follower, follower.width, "x")),
          vy = leader.y + this._getCenter(leader, leader.height, "y") - (follower.y + this._getCenter(follower, follower.height, "y")),
          distance = Math.sqrt(vx * vx + vy * vy);

      //Move the follower if it's more than 1 move
      //away from the leader
      if (distance >= speed) {
        follower.x += vx / distance * speed;
        follower.y += vy / distance * speed;
      }
    }

    /*
    angle
    -----
     Return the angle in Radians between two sprites.
    Parameters: 
    a. A sprite object.
    b. A sprite object.
    You can use it to make a sprite rotate towards another sprite like this:
         box.rotation = gu.angle(box, pointer);
     */

  }, {
    key: "angle",
    value: function angle(s1, s2) {
      return Math.atan2(
      //This is the code you need if you don't want to compensate
      //for a possible shift in the sprites' x/y anchor points
      /*
      (s2.y + s2.height / 2) - (s1.y + s1.height / 2),
      (s2.x + s2.width / 2) - (s1.x + s1.width / 2)
      */
      //This code adapts to a shifted anchor point
      s2.y + this._getCenter(s2, s2.height, "y") - (s1.y + this._getCenter(s1, s1.height, "y")), s2.x + this._getCenter(s2, s2.width, "x") - (s1.x + this._getCenter(s1, s1.width, "x")));
    }

    /*
    _getCenter
    ----------
     A utility that finds the center point of the sprite. If it's anchor point is the
    sprite's top left corner, then the center is calculated from that point.
    If the anchor point has been shifted, then the anchor x/y point is used as the sprite's center
    */

  }, {
    key: "_getCenter",
    value: function _getCenter(o, dimension, axis) {
      if (o.anchor !== undefined) {
        if (o.anchor[axis] !== 0) {
          return 0;
        } else {
          //console.log(o.anchor[axis])
          return dimension / 2;
        }
      } else {
        return dimension;
      }
    }

    /*
    rotateAroundSprite
    ------------
    Make a sprite rotate around another sprite.
    Parameters:
    a. The sprite you want to rotate.
    b. The sprite around which you want to rotate the first sprite.
    c. The distance, in pixels, that the roating sprite should be offset from the center.
    d. The angle of rotations, in radians.
        gu.rotateAroundSprite(orbitingSprite, centerSprite, 50, angleInRadians);
     Use it inside a game loop, and make sure you update the angle value (the 4th argument) each frame.
    */

  }, {
    key: "rotateAroundSprite",
    value: function rotateAroundSprite(rotatingSprite, centerSprite, distance, angle) {
      rotatingSprite.x = centerSprite.x + this._getCenter(centerSprite, centerSprite.width, "x") - rotatingSprite.parent.x + distance * Math.cos(angle) - this._getCenter(rotatingSprite, rotatingSprite.width, "x");

      rotatingSprite.y = centerSprite.y + this._getCenter(centerSprite, centerSprite.height, "y") - rotatingSprite.parent.y + distance * Math.sin(angle) - this._getCenter(rotatingSprite, rotatingSprite.height, "y");
    }

    /*
    rotateAroundPoint
    -----------------
    Make a point rotate around another point.
    Parameters:
    a. The point you want to rotate.
    b. The point around which you want to rotate the first point.
    c. The distance, in pixels, that the roating sprite should be offset from the center.
    d. The angle of rotations, in radians.
        gu.rotateAroundPoint(orbitingPoint, centerPoint, 50, angleInRadians);
     Use it inside a game loop, and make sure you update the angle value (the 4th argument) each frame.
     */

  }, {
    key: "rotateAroundPoint",
    value: function rotateAroundPoint(pointX, pointY, distanceX, distanceY, angle) {
      var point = {};
      point.x = pointX + Math.cos(angle) * distanceX;
      point.y = pointY + Math.sin(angle) * distanceY;
      return point;
    }

    /*
    randomInt
    ---------
     Return a random integer between a minimum and maximum value
    Parameters: 
    a. An integer.
    b. An integer.
    Here's how you can use it to get a random number between, 1 and 10:
        let number = gu.randomInt(1, 10);
     */

  }, {
    key: "randomInt",
    value: function randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /*
    randomFloat
    -----------
     Return a random floating point number between a minimum and maximum value
    Parameters: 
    a. Any number.
    b. Any number.
    Here's how you can use it to get a random floating point number between, 1 and 10:
         let number = gu.randomFloat(1, 10);
     */

  }, {
    key: "randomFloat",
    value: function randomFloat(min, max) {
      return min + Math.random() * (max - min);
    }

    /*
    Wait
    ----
     Lets you wait for a specific number of milliseconds before running the
    next function. 
     
      gu.wait(1000, runThisFunctionNext());
    
    */

  }, {
    key: "wait",
    value: function wait(duration, callBack) {
      setTimeout(callBack, duration);
    }

    /*
    Move
    ----
     Move a sprite by adding it's velocity to it's position. The sprite 
    must have `vx` and `vy` values for this to work. You can supply a
    single sprite, or a list of sprites, separated by commas.
         gu.move(sprite);
    */

  }, {
    key: "move",
    value: function move() {
      for (var _len = arguments.length, sprites = Array(_len), _key = 0; _key < _len; _key++) {
        sprites[_key] = arguments[_key];
      }

      //Move sprites that's aren't in an array
      if (!(sprites[0] instanceof Array)) {
        if (sprites.length > 1) {
          sprites.forEach(function (sprite) {
            sprite.x += sprite.vx;
            sprite.y += sprite.vy;
          });
        } else {
          sprites[0].x += sprites[0].vx;
          sprites[0].y += sprites[0].vy;
        }
      }

      //Move sprites in an array of sprites
      else {
          var spritesArray = sprites[0];
          if (spritesArray.length > 0) {
            for (var i = spritesArray.length - 1; i >= 0; i--) {
              var sprite = spritesArray[i];
              sprite.x += sprite.vx;
              sprite.y += sprite.vy;
            }
          }
        }
    }

    /*
    World camera
    ------------
     The `worldCamera` method returns a `camera` object
    with `x` and `y` properties. It has
    two useful methods: `centerOver`, to center the camera over
    a sprite, and `follow` to make it follow a sprite.
    `worldCamera` arguments: worldObject, theCanvas
    The worldObject needs to have a `width` and `height` property.
    */

  }, {
    key: "worldCamera",
    value: function worldCamera(world, worldWidth, worldHeight, canvas) {

      //Define a `camera` object with helpful properties
      var camera = {
        width: canvas.width,
        height: canvas.height,
        _x: 0,
        _y: 0,

        //`x` and `y` getters/setters
        //When you change the camera's position,
        //they shift the position of the world in the opposite direction
        get x() {
          return this._x;
        },
        set x(value) {
          this._x = value;
          world.x = -this._x;
          //world._previousX = world.x;
        },
        get y() {
          return this._y;
        },
        set y(value) {
          this._y = value;
          world.y = -this._y;
          //world._previousY = world.y;
        },

        //The center x and y position of the camera
        get centerX() {
          return this.x + this.width / 2;
        },
        get centerY() {
          return this.y + this.height / 2;
        },

        //Boundary properties that define a rectangular area, half the size
        //of the game screen. If the sprite that the camera is following
        //is inide this area, the camera won't scroll. If the sprite
        //crosses this boundary, the `follow` function ahead will change
        //the camera's x and y position to scroll the game world
        get rightInnerBoundary() {
          return this.x + this.width / 2 + this.width / 4;
        },
        get leftInnerBoundary() {
          return this.x + this.width / 2 - this.width / 4;
        },
        get topInnerBoundary() {
          return this.y + this.height / 2 - this.height / 4;
        },
        get bottomInnerBoundary() {
          return this.y + this.height / 2 + this.height / 4;
        },

        //The code next defines two camera
        //methods: `follow` and `centerOver`

        //Use the `follow` method to make the camera follow a sprite
        follow: function follow(sprite) {

          //Check the sprites position in relation to the inner
          //boundary. Move the camera to follow the sprite if the sprite
          //strays outside the boundary
          if (sprite.x < this.leftInnerBoundary) {
            this.x = sprite.x - this.width / 4;
          }
          if (sprite.y < this.topInnerBoundary) {
            this.y = sprite.y - this.height / 4;
          }
          if (sprite.x + sprite.width > this.rightInnerBoundary) {
            this.x = sprite.x + sprite.width - this.width / 4 * 3;
          }
          if (sprite.y + sprite.height > this.bottomInnerBoundary) {
            this.y = sprite.y + sprite.height - this.height / 4 * 3;
          }

          //If the camera reaches the edge of the map, stop it from moving
          if (this.x < 0) {
            this.x = 0;
          }
          if (this.y < 0) {
            this.y = 0;
          }
          if (this.x + this.width > worldWidth) {
            this.x = worldWidth - this.width;
          }
          if (this.y + this.height > worldHeight) {
            this.y = worldHeight - this.height;
          }
        },

        //Use the `centerOver` method to center the camera over a sprite
        centerOver: function centerOver(sprite) {

          //Center the camera over a sprite
          this.x = sprite.x + sprite.halfWidth - this.width / 2;
          this.y = sprite.y + sprite.halfHeight - this.height / 2;
        }
      };

      //Return the `camera` object
      return camera;
    }
  }, {
    key: "lineOfSight",

    /*
    Line of sight
    ------------
     The `lineOfSight` method will return `true` if there’s clear line of sight 
    between two sprites, and `false` if there isn’t. Here’s how to use it in your game code:
         monster.lineOfSight = gu.lineOfSight(
            monster, //Sprite one
            alien,   //Sprite two
            boxes,   //An array of obstacle sprites
            16       //The distance between each collision point
        );
     The 4th argument determines the distance between collision points. 
    For better performance, make this a large number, up to the maximum 
    width of your smallest sprite (such as 64 or 32). For greater precision, 
    use a smaller number. You can use the lineOfSight value to decide how 
    to change certain things in your game. For example:
         if (monster.lineOfSight) {
          monster.show(monster.states.angry)
        } else {
          monster.show(monster.states.normal)
        }
     */

    value: function lineOfSight(s1, //The first sprite, with `centerX` and `centerY` properties
    s2, //The second sprite, with `centerX` and `centerY` properties
    obstacles) //The distance between collision points
    {
      var segment = arguments.length <= 3 || arguments[3] === undefined ? 32 : arguments[3];

      //Calculate the center points of each sprite
      spriteOneCenterX = s1.x + this._getCenter(s1, s1.width, "x");
      spriteOneCenterY = s1.y + this._getCenter(s1, s1.height, "y");
      spriteTwoCenterX = s2.x + this._getCenter(s2, s2.width, "x");
      spriteTwoCenterY = s2.y + this._getCenter(s2, s2.height, "y");

      //Plot a vector between spriteTwo and spriteOne
      var vx = spriteTwoCenterX - spriteOneCenterX,
          vy = spriteTwoCenterY - spriteOneCenterY;

      //Find the vector's magnitude (its length in pixels)
      var magnitude = Math.sqrt(vx * vx + vy * vy);

      //How many points will we need to test?
      var numberOfPoints = magnitude / segment;

      //Create an array of x/y points, separated by 64 pixels, that
      //extends from `spriteOne` to `spriteTwo` 
      var points = function points() {

        //Initialize an array that is going to store all our points
        //along the vector
        var arrayOfPoints = [];

        //Create a point object for each segment of the vector and
        //store its x/y position as well as its index number on
        //the map array
        for (var i = 1; i <= numberOfPoints; i++) {

          //Calculate the new magnitude for this iteration of the loop
          var newMagnitude = segment * i;

          //Find the unit vector. This is a small, scaled down version of
          //the vector between the sprites that's less than one pixel long.
          //It points in the same direction as the main vector, but because it's
          //the smallest size that the vector can be, we can use it to create
          //new vectors of varying length
          var dx = vx / magnitude,
              dy = vy / magnitude;

          //Use the unit vector and newMagnitude to figure out the x/y
          //position of the next point in this loop iteration
          var x = spriteOneCenterX + dx * newMagnitude,
              y = spriteOneCenterY + dy * newMagnitude;

          //Push a point object with x and y properties into the `arrayOfPoints`
          arrayOfPoints.push({
            x: x, y: y
          });
        }

        //Return the array of point objects
        return arrayOfPoints;
      };

      //Test for a collision between a point and a sprite
      var hitTestPoint = function hitTestPoint(point, sprite) {

        //Find out if the point's position is inside the area defined
        //by the sprite's left, right, top and bottom sides
        var left = point.x > sprite.x,
            right = point.x < sprite.x + sprite.width,
            top = point.y > sprite.y,
            bottom = point.y < sprite.y + sprite.height;

        //If all the collision conditions are met, you know the
        //point is intersecting the sprite
        return left && right && top && bottom;
      };

      //The `noObstacles` function will return `true` if all the tile
      //index numbers along the vector are `0`, which means they contain
      //no obstacles. If any of them aren't 0, then the function returns
      //`false` which means there's an obstacle in the way
      var noObstacles = points().every(function (point) {
        return obstacles.every(function (obstacle) {
          return !hitTestPoint(point, obstacle);
        });
      });

      //Return the true/false value of the collision test
      return noObstacles;
    }
  }]);

  return GameUtilities;
})();
//# sourceMappingURL=gameUtilities.js.map