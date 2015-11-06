"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameUtilities = (function () {
  function GameUtilities() {
    _classCallCheck(this, GameUtilities);
  }

  _createClass(GameUtilities, [{
    key: "distance",

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

    value: function distance(s1, s2) {
      var vx = s2.x + s2.width / 2 - (s1.x + s1.width / 2),
          vy = s2.y + s2.height / 2 - (s1.y + s1.height / 2);
      return Math.sqrt(vx * vx + vy * vy);
    }
  }, {
    key: "followEase",

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

    value: function followEase(follower, leader, speed) {

      //Figure out the distance between the sprites
      var vx = leader.x + leader.width / 2 - (follower.x + follower.width / 2),
          vy = leader.x + leader.height / 2 - (follower.x + follower.height / 2),
          distance = Math.sqrt(vx * vx + vy * vy);

      //Move the follower if it's more than 1 pixel
      //away from the leader
      if (distance >= 1) {
        follower.x += vx * speed;
        follower.y += vy * speed;
      }
    }
  }, {
    key: "followConstant",

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

    value: function followConstant(follower, leader, speed) {

      //Figure out the distance between the sprites
      var vx = leader.x + leader.width / 2 - (follower.x + follower.width / 2),
          vy = leader.x + leader.width / 2 - (follower.x + follower.width / 2),
          distance = Math.sqrt(vx * vx + vy * vy);

      //Move the follower if it's more than 1 move
      //away from the leader
      if (distance >= speed) {
        follower.x += vx / distance * speed;
        follower.y += vy / distance * speed;
      }
    }
  }, {
    key: "angle",

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

    value: function angle(s1, s2) {
      return Math.atan2(s2.y + s2.height / 2 - (s1.y + s1.height / 2), s2.x + s2.width / 2 - (s1.x + s1.width / 2));
    }
  }, {
    key: "rotateAroundSprite",

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

    value: function rotateAroundSprite(rotatingSprite, centerSprite, distance, angle) {
      rotatingSprite.x = centerSprite.x + centerSprite.width / 2 - rotatingSprite.parent.x + distance * Math.cos(angle) - rotatingSprite.width / 2;

      rotatingSprite.y = centerSprite.y + centerSprite.height / 2 - rotatingSprite.parent.y + distance * Math.sin(angle) - rotatingSprite.width / 2;
    }
  }, {
    key: "rotateAroundPoint",

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

    value: function rotateAroundPoint(pointX, pointY, distanceX, distanceY, angle) {
      var point = {};
      point.x = pointX + Math.cos(angle) * distanceX;
      point.y = pointY + Math.sin(angle) * distanceY;
      return point;
    }
  }, {
    key: "randomInt",

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

    value: function randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }, {
    key: "randomFloat",

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

    value: function randomFloat(min, max) {
      return min + Math.random() * (max - min);
    }
  }, {
    key: "wait",

    /*
    Wait
    ----
     Lets you set up a timed sequence of events. Supply a number in milliseconds.
         wait(1000)
          .then(() => console.log("One"))
          .then(() => wait(1000))
          .then(() => console.log("Two"))
          .then(() => wait(1000))
          .then(() => console.log("Three"))
     */

    value: function wait() {
      var duration = arguments[0] === undefined ? 0 : arguments[0];

      return new Promise(function (resolve, reject) {
        setTimeout(resolve, duration);
      });
    }
  }, {
    key: "move",

    /*
    Move
    ----
     Move a sprite by adding it's velocity to it's position. The sprite 
    must have `vx` and `vy` values for this to work. You can supply a
    single sprite, or a list of sprites, separated by commas.
         move(sprite);
    */

    value: function move() {
      for (var _len = arguments.length, sprites = Array(_len), _key = 0; _key < _len; _key++) {
        sprites[_key] = arguments[_key];
      }

      if (sprites.length === 1) {
        var s = sprites[0];
        s.x += s.vx;
        s.y += s.vy;
      } else {
        for (var i = 0; i < sprites.length; i++) {
          var s = sprites[i];
          s.x += s.vx;
          s.y += s.vy;
        }
      }
    }
  }]);

  return GameUtilities;
})();
//# sourceMappingURL=gameUtilities.js.map