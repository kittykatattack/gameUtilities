Game Utilities
=============

A library of helpful functions for making games and applications for
the [Pixi rendering engine](https://github.com/pixijs/pixi.js).

[Setting up](#settingup) <br>
[distance: The pixel distance between two sprites](#distance) <br>
[followEase: Ease a sprite to another sprite](#followease) <br>
[followConstant: Follow a sprite at a constant rate](#followconstant) <br>
[angle: Find the angle in radians between two sprites](#angle) <br>
[rotateAroundSprite: Make a sprite rotate around another sprite](#rotatearoundsprite) <br>
[rotateAroundPoint: Make a point rotate around another point](#rotatearoundpoint) <br>
[randomInt: Get a random integer](#randomint) <br>
[randomFloat: Get a random floating point (decimal) number](#randomfloat) <br>
[wait: Set a delay before running the next task](#wait) <br>
[move: Move a sprite by adding its velocity to its position](#move) <br>
[worldCamera: A camera for following objects around a large game world](#worldCamera) <br>

<a id="settingup"></a>
Setting up
----------

Link to the `gameUtilities.js` file in your HTML document with a
`<script>` tag, then create a new instance of the Game Utilities
library in your JavaScript file like this:

```js
let gu = new GameUtilities();
```
You can now access all the utility methods through the `gu` object.

Or, just copy and paster the function you need from the source file
into your own project code.

<a id="distance"></a>
distance
--------

Find the distance in pixels between two sprites.
Parameters: 
a. A sprite object. 
b. A sprite object. 
The function returns the number of pixels distance between the sprites.
```js
let distanceBetweenSprites = gu.distance(spriteA, spriteB);
```
If distance is calculated from the sprites' center points, assuming
that the x/y anchor point is the sprite's top left corner. However, if
a sprite's x/y anchor has been shifted, the distance will be
calculated from that anchor point. All the Game Utility methods that depend
on a distance calculation work in this same way (`followEase`,
`followConstant`, `rotateAroundSprite` and `angle`).

<a id="followease"></a>
followEase
-----------

Make a sprite ease to the position of another sprite.
Parameters: 
a. A sprite object. This is the `follower` sprite.
b. A sprite object. This is the `leader` sprite that the follower will chase.
c. The easing value, such as 0.3. A higher number makes the follower move faster.
```js
gu.followEase(follower, leader, speed);
```
Use it inside a game loop.

<a id="followconstant"></a>
followConstant
----------------

Make a sprite move towards another sprite at a constant speed.
Parameters: 
a. A sprite object. This is the `follower` sprite.
b. A sprite object. This is the `leader` sprite that the follower will chase.
c. The speed value, such as 3. The is the pixels per frame that the sprite will move. A higher number makes the follower move faster.
```js
gu.followConstant(follower, leader, speed);
```
<a id="angle"></a>
angle
-----

Return the angle in Radians between two sprites.
Parameters: 
a. A sprite object.
b. A sprite object.
You can use it to make a sprite rotate towards another sprite like this:
```js
box.rotation = gu.angle(box, pointer);
```
<a id="rotatearoundsprite"></a>
rotateAroundSprite
------------------
Make a sprite rotate around another sprite.
Parameters:
a. The sprite you want to rotate.
b. The sprite around which you want to rotate the first sprite.
c. The distance, in pixels, that the rotating sprite should be offset from the center.
d. The angle of rotations, in radians.
```js
gu.rotateAroundSprite(orbitingSprite, centerSprite, 50, angleInRadians);
```
Use it inside a game loop, and make sure you update the angle value (the 4th argument) each frame.

<a id="rotatearoundpoint"></a>
rotateAroundPoint
-----------------
Make a point rotate around another point.
Parameters:
a. The point you want to rotate.
b. The point around which you want to rotate the first point.
c. The distance, in pixels, that the rotating sprite should be offset from the center.
d. The angle of rotations, in radians.
```js
gu.rotateAroundPoint(orbitingPoint, centerPoint, 50, angleInRadians);
```
Use it inside a game loop, and make sure you update the angle value (the 4th argument) each frame.

<a id="randomint"></a>
randomInt
---------

Return a random integer between a minimum and maximum value.
Parameters: 
a. An integer.
b. An integer.
Here's how you can use it to get a random number between, 1 and 10:
```js
let number = gu.randomInt(1, 10);
```
<a id="randomfloat"></a>
randomFloat
-----------

Return a random floating point number between a minimum and maximum
value.
Parameters: 
a. Any number.
b. Any number.
Here's how you can use it to get a random floating point number between, 1 and 10:
```js
let number = gu.randomFloat(1, 10);
```
<a id="wait"></a>
wait
----

Lets you wait for a specific number of milliseconds before running the
next function. 
```js 
wait(1000, runThisFunctionNext());
```

<a id="move"></a>
move
----

Move a sprite by adding it's velocity to it's position. The sprite 
must have `vx` and `vy` values for this to work. You can supply a
single sprite, or a list of sprites, separated by commas.
```js
gu.move(anySprite);
```
You can supply a single sprite, an argument list of sprite, or even a
whole array containing sprites you want to move. But, make sure that
all those sprites have `vx` and `vy` values that have been initialized
to `0` somewhere in your code.

To make `move` work, update it each frame of your game loop, like
this:
```js
function gameLoop() {
  requestAnimationFrame(gameLoop);

  //Call `camera.follow` each frame to update the camera's position
  gu.move(anySprite);
}
```

<a id="worldCamera"></a>
worldCamera
-----------

A "camera" object that you can use to follow game objects around a
large scrolling game world. The camera implements all the scrolling
for you - you just need to give it a large game world to scroll. You
can use any Pixi `Container` or `Sprite` as your game world.

Here's how to create a scrolling camera. Use the `worldCamera` method
and supply these 4 things:

1. The Pixi `Container` or `Sprite` you want to control.
2. The width of the game world.
3. The height of the game world.
4. The HTML `canvas` object that represents your game screen. In Pixi,
   this is the `PIXI.renderer.view` object.
```js
let camera = gu.worldCamera(gameWorldContainer, worldWidth, worldHeight, canvas);
```
Be careful! The `width` and `height` values that the camera needs are probably
**different** from the `Container` width and height that represents your 
game world. That's because Pixi containers and sprites dynamically change their
size and width based on the positions of the child sprites they
contain. If any of your game world's child sprites move around to the 
edges of the game world, they'll cause the `width` or `height` of the world
to increase and make the camera scroll off the edges of the world. 
So, you'll probably need to supply some fixed values that
define your `worldWidth` and `worldHeight`.

Use the camera's `centerOver` method to center the camera over a sprite.
```js
camera.centerOver(anySprite);
```
You can use the camera's `follow` method to make the camera follow a
sprite around the world.
```js
camera.follow(anySprite);
```
Make sure call `follow` inside your game loop to see the effect!
```js
function gameLoop() {
  requestAnimationFrame(gameLoop);

  //Call `camera.follow` each frame to update the camera's position
  camera.follow(anySprite);
}
```
The camera will only start following the sprite when the sprite moves to
within 25% of the screen edges, which is a very natural looking
effect.

