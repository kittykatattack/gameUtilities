Game Utilties
=============

A library of helpful functions for making games and applications for
the [Pixi rendering engine](https://github.com/pixijs/pixi.js).

Link to the `gameUtilities.js` file in your HTML document with a
`<script>` tag, then xreate a new instance of the Game Utilities
library in your JavaScript file like this:

```
let gu = new GameUtilities();
```
You can now access all the ultility methods through the `gu` object.

Or, just copy and paster the function you need from the source file
into your own project code.

distance
--------

Find the distance in pixels between two sprites.
Parameters: 
a. A sprite object. 
b. A sprite object. 
The function returns the number of pixels distance between the sprites.

    let distanceBetweenSprites = gu.distance(spriteA, spriteB);

followEase
-----------

Make a sprite ease to the position of another sprite.
Parameters: 
a. A sprite object. This is the `follower` sprite.
b. A sprite object. This is the `leader` sprite that the follower will chase.
c. The easing value, such as 0.3. A higher number makes the follower move faster.

    gu.followEase(follower, leader, speed);

Use it inside a game loop.

followConstant
----------------

Make a sprite move towards another sprite at a constant speed.
Parameters: 
a. A sprite object. This is the `follower` sprite.
b. A sprite object. This is the `leader` sprite that the follower will chase.
c. The speed value, such as 3. The is the pixels per frame that the sprite will move. A higher number makes the follower move faster.

    gu.followConstant(follower, leader, speed);

angle
-----

Return the angle in Radians between two sprites.
Parameters: 
a. A sprite object.
b. A sprite object.
You can use it to make a sprite rotate towards another sprite like this:

    box.rotation = gu.angle(box, pointer);

rotateAroundSprite
------------------
Make a sprite rotate around another sprite.
Parameters:
a. The sprite you want to rotate.
b. The sprite around which you want to rotate the first sprite.
c. The distance, in pixels, that the roating sprite should be offset from the center.
d. The angle of rotations, in radians.

    gu.rotateAroundSprite(orbitingSprite, centerSprite, 50, angleInRadians);

Use it inside a game loop, and make sure you update the angle value (the 4th argument) each frame.

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

randomInt
---------

Return a random integer between a minimum and maximum value.
Parameters: 
a. An integer.
b. An integer.
Here's how you can use it to get a random number between, 1 and 10:

    let number = gu.randomInt(1, 10);

randomFloat
-----------

Return a random floating point number between a minimum and maximum
value.
Parameters: 
a. Any number.
b. Any number.
Here's how you can use it to get a random floating point number between, 1 and 10:

    let number = gu.randomFloat(1, 10);

Wait
----

Lets you set up a timed sequence of events. Supply a number in milliseconds.

    gu.wait(1000)
      .then(() => console.log("One"))
      .then(() => wait(1000))
      .then(() => console.log("Two"))
      .then(() => wait(1000))
      .then(() => console.log("Three"))

Move
----

Move a sprite by adding it's velocity to it's position. The sprite 
must have `vx` and `vy` values for this to work. You can supply a
single sprite, or a list of sprites, separated by commas.

    gu.move(sprite);

To work, this needs to be updated each frame of your game loop.

