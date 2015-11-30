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
         box.rotation = angle(box, pointer);
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
     
      wait(1000, runThisFunctionNext)
    
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
         move(sprite);
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
  }]);

  return GameUtilities;
})();
//# sourceMappingURL=gameUtilities.js.map