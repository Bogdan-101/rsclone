/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/const/CST.ts":
/*!**************************!*\
  !*** ./src/const/CST.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CST = void 0;
exports.CST = {
    SCENES: {
        LOAD: "LOAD",
        MENU: "MENU",
        GAME: "GAME"
    },
    IMAGES: {
        LOGO: "logo.png",
        SKY1: "sky1.png",
        BIPLANE: "Biplane.png",
        BUTTON: "Button.png",
        STAGE: "stage.png",
        BULLET: "Bullet.png",
        ENEMYBULLET: "EnemyBullet.png",
        GAMEOVER: "game_over.png",
        RESTART: "Restart.png",
        HOME: "Home.png"
    },
    AUDIO: {
        MAINIMENU: "MainMenuMusic.mp3"
    },
    SPRITE: {
        PLANE: "PlaneSprites.png",
        ROCKET: "Rockets.png",
        ENEMY: "Enemy.png",
        ENEMYATLAS: "EnemyPlaneAtlas.png"
    }
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/// <reference path='../typings/phaser.d.ts' />
Object.defineProperty(exports, "__esModule", ({ value: true }));
var GameScene_1 = __webpack_require__(/*! ./scenes/GameScene */ "./src/scenes/GameScene.ts");
var LoadScene_1 = __webpack_require__(/*! ./scenes/LoadScene */ "./src/scenes/LoadScene.ts");
var MenuScene_1 = __webpack_require__(/*! ./scenes/MenuScene */ "./src/scenes/MenuScene.ts");
var game = new Phaser.Game({
    width: 800,
    height: 600,
    scene: [
        LoadScene_1.LoadScene, MenuScene_1.MenuScene, GameScene_1.GameScene
    ],
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
});


/***/ }),

/***/ "./src/planes/Enemy.ts":
/*!*****************************!*\
  !*** ./src/planes/Enemy.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
var CST_1 = __webpack_require__(/*! ../const/CST */ "./src/const/CST.ts");
var Enemy = /** @class */ (function (_super) {
    __extends(Enemy, _super);
    function Enemy(scene, x, y, texture) {
        var _this = _super.call(this, scene, x, y, texture) || this;
        _this.anims.play('enemyIdle');
        _this.rockets = scene.physics.add.group();
        _this.setDepth(-2);
        _this.isMoving = false;
        _this.isAlive = true;
        return _this;
    }
    Enemy.prototype.init = function (player, scene) {
        //@ts-ignore
        this.scene.physics.add.collider(player, this.rockets, function () { return scene.GameOver(); }, null, this);
        this.anims.create({
            key: 'die',
            frames: this.anims.generateFrameNumbers(CST_1.CST.SPRITE.ENEMY, { start: 3, end: 4 }),
            frameRate: 24,
            repeat: 1
        });
    };
    Enemy.prototype.CreateMovement = function () {
        var _this = this;
        var yMoving = Phaser.Math.FloatBetween(0, 100);
        var xMoving = Phaser.Math.FloatBetween(-100, 100);
        var chance = Phaser.Math.Between(0, 1);
        if (this.y + yMoving > 250)
            yMoving = -yMoving;
        if (chance === 1) {
            if (xMoving > 0)
                this.anims.play('moveRight');
            else
                this.anims.play('moveLeft');
            this.scene.tweens.add({
                targets: this,
                y: this.y + yMoving,
                x: this.x + xMoving,
                duration: 1000,
                ease: 'Quad.easeInOut'
            });
        }
        this.scene.time.addEvent({
            delay: 1250,
            callback: function () {
                _this.isMoving = false;
                if (_this.isAlive === true)
                    _this.anims.play('enemyIdle');
            },
            loop: false
        });
    };
    Enemy.prototype.Die = function () {
        this.anims.play('enemyDie');
        this.isAlive = false;
        var expl = this.scene.add.sprite(this.x + Phaser.Math.Between(-5, 5), this.y + Phaser.Math.Between(-5, 5), 'explosion1');
        expl.play('enemyExplode');
        this.scene.time.addEvent({
            delay: 250,
            callback: function () {
                expl.destroy();
            },
            loop: false
        });
        this.destroy();
    };
    Enemy.prototype.setTarget = function (target) {
        this.target = target;
    };
    Enemy.prototype.update = function (t, dt) {
        if (!this.target) {
            return;
        }
        var tx = this.target.x;
        var ty = this.target.y;
        var x = this.x;
        var y = this.y;
        var rotation = Phaser.Math.Angle.Between(x, y, tx, ty);
        this.setRotation(rotation - 1.575);
        if (t > this.lastFired || typeof (this.lastFired) === 'undefined') {
            this.lastFired = t + 1500;
            var rocket = this.rockets.create(x, y + 10, CST_1.CST.IMAGES.ENEMYBULLET).setRotation(rotation - 1.575);
            rocket.setVelocity(-Math.sin(rocket.rotation) * 200, Math.cos(rocket.rotation) * 200);
            rocket.setAcceleration(0, 10);
            // this.player.setRotation(this.player.rotation + 3.15);
        }
        if (!this.isMoving) {
            this.isMoving = true;
            this.CreateMovement();
        }
    };
    return Enemy;
}(Phaser.GameObjects.Sprite));
exports.default = Enemy;


/***/ }),

/***/ "./src/scenes/GameScene.ts":
/*!*********************************!*\
  !*** ./src/scenes/GameScene.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GameScene = void 0;
var CST_1 = __webpack_require__(/*! ../const/CST */ "./src/const/CST.ts");
var Enemy_1 = __importDefault(__webpack_require__(/*! ../planes/Enemy */ "./src/planes/Enemy.ts"));
var GameScene = /** @class */ (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        return _super.call(this, {
            key: CST_1.CST.SCENES.GAME
        }) || this;
    }
    GameScene.prototype.init = function () {
    };
    GameScene.prototype.preload = function () {
        var _this = this;
        this.lastFired = 0;
        this.anims.create({
            key: 'left',
            frames: [{ key: CST_1.CST.SPRITE.PLANE, frame: 0 }],
            frameRate: 24,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [{ key: CST_1.CST.SPRITE.PLANE, frame: 1 }],
            frameRate: 24
        });
        this.anims.create({
            key: 'right',
            frames: [{ key: CST_1.CST.SPRITE.PLANE, frame: 2 }],
            frameRate: 24,
            repeat: -1
        });
        this.anims.create({
            key: 'explode',
            frameRate: 10,
            frames: this.anims.generateFrameNames('explosion2', {
                prefix: 'tile00',
                suffix: '.png',
                start: 0,
                end: 6,
                zeroPad: 1
            })
        });
        this.anims.create({
            key: 'enemyExplode',
            frameRate: 10,
            frames: this.anims.generateFrameNames('explosion1', {
                prefix: 'tile00',
                suffix: '.png',
                start: 0,
                end: 5,
                zeroPad: 1
            })
        });
        this.anims.create({
            key: 'moveLeft',
            frameRate: 10,
            frames: this.anims.generateFrameNames('enemyPlane', {
                prefix: 'tile00',
                suffix: '.png',
                start: 0,
                end: 0,
                zeroPad: 1
            })
        });
        this.anims.create({
            key: 'moveRight',
            frameRate: 10,
            frames: this.anims.generateFrameNames('enemyPlane', {
                prefix: 'tile00',
                suffix: '.png',
                start: 2,
                end: 2,
                zeroPad: 1
            })
        });
        this.anims.create({
            key: 'enemyIdle',
            frameRate: 10,
            frames: this.anims.generateFrameNames('enemyPlane', {
                prefix: 'tile00',
                suffix: '.png',
                start: 1,
                end: 1,
                zeroPad: 1
            })
        });
        this.anims.create({
            key: 'enemyDie',
            frameRate: 5,
            frames: this.anims.generateFrameNames('enemyPlane', {
                prefix: 'tile00',
                suffix: '.png',
                start: 3,
                end: 4,
                zeroPad: 1
            })
        });
        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = this.physics.add.sprite(this.game.renderer.width / 2, this.game.renderer.height + 100, CST_1.CST.SPRITE.PLANE);
        this.tweens.add({
            targets: this.player,
            y: this.game.renderer.height - 100,
            duration: 1000,
            ease: 'Power1'
        });
        this.time.addEvent({
            delay: 1250,
            callback: function () {
                _this.player.setCollideWorldBounds(true);
            },
            loop: false
        });
    };
    GameScene.prototype.update = function (time, delta) {
        if (this.isDead === false) {
            if (this.cursors.left.isDown) {
                this.player.setVelocityX(-160);
                this.player.anims.play('left');
            }
            else if (this.cursors.right.isDown) {
                this.player.setVelocityX(160);
                this.player.anims.play('right', true);
            }
            else {
                this.player.setVelocityX(0);
                this.player.anims.play('turn');
            }
            if (this.cursors.up.isDown) {
                this.player.setVelocityY(-160);
                this.player.anims.play('turn');
            }
            else if (this.cursors.down.isDown) {
                this.player.setVelocityY(+160);
                this.player.anims.play('turn');
            }
            else if (!(this.cursors.right.isDown || this.cursors.left.isDown)) {
                this.player.setVelocityY(0);
                this.player.anims.play('turn');
            }
            if (!(this.cursors.up.isDown || this.cursors.down.isDown)) {
                this.player.setVelocityY(0);
            }
            if (!(this.cursors.down.isDown || this.cursors.up.isDown || this.cursors.right.isDown || this.cursors.left.isDown)) {
                this.player.setVelocityX(0);
                this.player.setVelocityY(0);
                this.player.anims.play('turn');
            }
            this.background.tilePositionY -= 0.5;
            if (this.cursors.space.isDown && time > this.lastFired) {
                if (typeof (this.lastSpawned) === 'undefined')
                    this.lastSpawned = time;
                this.lastFired = time + 200;
                var bullet = this.bullets.create(this.player.x, this.player.y - 10, CST_1.CST.IMAGES.BULLET).setDepth(-2).setScale(0.25);
                bullet.setVelocityY(-600);
                bullet.setAcceleration(0, -50);
            }
            if (time > this.lastSpawned) {
                this.lastSpawned = time + 1000;
                var enemy_1 = this.enemies.get(Phaser.Math.Between(100, 700), -50, CST_1.CST.SPRITE.ENEMYATLAS);
                enemy_1.init(this.player, this);
                this.tweens.add({
                    targets: enemy_1,
                    y: 50,
                    duration: 1000,
                    ease: 'Power1'
                });
                this.physics.add.collider(this.bullets, enemy_1, function () {
                    enemy_1.Die();
                    //@ts-ignore
                }, null, this);
                enemy_1.setTarget(this.player);
            }
        }
    };
    GameScene.prototype.GameOver = function () {
        var _this = this;
        this.isDead = true;
        this.physics.pause();
        this.player.setTint(0xff5555);
        this.add.rectangle(0, 0, this.renderer.width, this.renderer.height, 0x000000, 0.6).setOrigin(0).setDepth(1).setScale(2);
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, CST_1.CST.IMAGES.GAMEOVER).setDepth(5);
        var restartButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, CST_1.CST.IMAGES.RESTART).setDepth(5).setScale(2.5);
        restartButton.setInteractive();
        restartButton.on('pointerup', function () {
            restartButton.setScale(2.75);
            restartButton.setScale(1.08333);
            _this.time.addEvent({
                delay: 100,
                callback: function () {
                    restartButton.setScale(2.5);
                },
                loop: false
            });
            _this.time.addEvent({
                delay: 200,
                callback: function () {
                    _this.sound.stopAll();
                    _this.scene.stop();
                    _this.scene.start(CST_1.CST.SCENES.GAME);
                },
                loop: false
            });
        });
        var homeButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 200, CST_1.CST.IMAGES.HOME).setDepth(6).setScale(2.5);
        homeButton.setInteractive();
        homeButton.on('pointerup', function () {
            homeButton.setScale(2.75);
            homeButton.setScale(1.08333);
            _this.time.addEvent({
                delay: 100,
                callback: function () {
                    homeButton.setScale(2.5);
                },
                loop: false
            });
            _this.time.addEvent({
                delay: 200,
                callback: function () {
                    _this.sound.stopAll();
                    _this.scene.start(CST_1.CST.SCENES.MENU);
                },
                loop: false
            });
        });
        this.cameras.main.shake(300, 0.02);
        for (var i = 0; i < 20; i += 1) {
            this.time.addEvent({
                delay: 250 * i,
                callback: function () {
                    var expl = _this.add.sprite(_this.player.x + Phaser.Math.Between(-20, 20), _this.player.y + Phaser.Math.Between(-20, 20), 'explosion2');
                    expl.play('explode');
                    _this.time.addEvent({
                        delay: 450,
                        callback: function () {
                            expl.destroy();
                        },
                        loop: false
                    });
                    _this.player.setRotation(_this.player.rotation += 0.5);
                    _this.player.setScale(_this.player.scale - 0.05);
                },
                loop: false
            });
        }
        this.background.tilePositionY = 0;
    };
    GameScene.prototype.create = function () {
        var _this = this;
        this.isDead = false;
        this.bullets = this.physics.add.group();
        this.enemies = this.physics.add.group({
            classType: Enemy_1.default,
            runChildUpdate: true
        });
        var _loop_1 = function (i) {
            var enemy = this_1.enemies.get(Phaser.Math.Between(100, 800), -50, CST_1.CST.SPRITE.ENEMYATLAS);
            enemy.init(this_1.player, this_1);
            this_1.tweens.add({
                targets: enemy,
                y: 50,
                duration: 1000,
                ease: 'Power1'
            });
            this_1.physics.add.collider(this_1.bullets, enemy, function () {
                enemy.Die();
                //@ts-ignore
            }, null, this_1);
        };
        var this_1 = this;
        for (var i = 0; i < 5; i += 1) {
            _loop_1(i);
        }
        this.enemies.children.each(function (child) {
            var enemy = child;
            enemy.setTarget(_this.player);
        });
        this.background = this.add.tileSprite(0, 0, this.game.renderer.width, this.game.renderer.height, CST_1.CST.IMAGES.STAGE).setDepth(-3).setOrigin(0).setScale(3.125);
    };
    return GameScene;
}(Phaser.Scene));
exports.GameScene = GameScene;


/***/ }),

/***/ "./src/scenes/LoadScene.ts":
/*!*********************************!*\
  !*** ./src/scenes/LoadScene.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoadScene = void 0;
var CST_1 = __webpack_require__(/*! ../const/CST */ "./src/const/CST.ts");
var LoadScene = /** @class */ (function (_super) {
    __extends(LoadScene, _super);
    function LoadScene() {
        return _super.call(this, {
            key: CST_1.CST.SCENES.LOAD
        }) || this;
    }
    LoadScene.prototype.loadImages = function () {
        this.load.setPath('./assets/images/');
        for (var prop in CST_1.CST.IMAGES) {
            //@ts-ignore
            this.load.image(CST_1.CST.IMAGES[prop], CST_1.CST.IMAGES[prop]);
        }
    };
    LoadScene.prototype.loadSounds = function () {
        this.load.setPath('./assets/sounds');
        for (var prop in CST_1.CST.AUDIO) {
            //@ts-ignore
            this.load.audio(CST_1.CST.AUDIO[prop], CST_1.CST.AUDIO[prop]);
        }
    };
    LoadScene.prototype.loadSprites = function (frameConfig) {
        for (var prop in CST_1.CST.SPRITE) {
            //@ts-ignore
            this.load.spritesheet(CST_1.CST.SPRITE[prop], CST_1.CST.SPRITE[prop], frameConfig);
        }
    };
    LoadScene.prototype.preload = function () {
        var _this = this;
        this.loadImages();
        this.loadSounds();
        this.load.setPath('./assets/sprites');
        this.load.spritesheet(CST_1.CST.SPRITE.PLANE, CST_1.CST.SPRITE.PLANE, {
            frameHeight: 40,
            frameWidth: 28
        });
        this.load.spritesheet(CST_1.CST.SPRITE.ENEMY, CST_1.CST.SPRITE.ENEMY, {
            frameHeight: 24,
            frameWidth: 16
        });
        this.load.atlas('explosion2', '../../assets/sprites/explosion2.png', '../../assets/sprites/explosion2.json');
        this.load.atlas('explosion1', '../../assets/sprites/explosion1.png', '../../assets/sprites/explosion1.json');
        this.load.atlas('enemyPlane', '../../assets/sprites/EnemyPlaneAtlas.png', '../../assets/sprites/EnemyPlaneAtlas.json');
        var loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff,
                alpha: 1
            }
        });
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                fontFamily: 'arcadeFont',
                fontSize: '20px',
                color: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                fontFamily: 'arcadeFont',
                fontSize: '18px',
                color: '#ffffff'
            }
        }).setDepth(1);
        percentText.setOrigin(0.5, 0.5);
        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                fontFamily: 'arcadeFont',
                fontSize: '18px',
                color: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);
        var loadingBox = this.add.graphics({
            fillStyle: {
                color: 0x222222,
                alpha: 0.8
            }
        }).fillRect(this.game.renderer.width / 2 - 160, this.game.renderer.height / 2 - 30, 320, 50);
        this.load.on('progress', function (percent) {
            loadingBar.clear();
            loadingBar.fillRect(_this.game.renderer.width / 2 - 150, _this.game.renderer.height / 2 - 20, 300 * percent, 30);
            percentText.setText((percent * 100).toString() + '%');
        });
        this.load.on('fileprogress', function (file) {
            assetText.setText('Loading asset: ' + file.key);
        });
        this.load.on('complete', function () {
            loadingBar.destroy();
            loadingBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
            _this.cameras.main.backgroundColor.setTo(21, 21, 21);
            var logoLine = _this.add.graphics({
                fillStyle: {
                    color: 0xeaeaea
                }
            }).fillRect(325, -600, 66, 600);
            var logoLine1 = _this.add.graphics({
                fillStyle: {
                    color: 0xffffff
                }
            }).fillRect(205, 277, 6, 110);
            var shadowLine1 = _this.add.graphics({
                fillStyle: {
                    color: 0x151515
                }
            }).fillRect(205, 277, 6, 110);
            var logoLine2 = _this.add.graphics({
                fillStyle: {
                    color: 0xffffff
                }
            }).fillRect(211, 381, 384, 6);
            var shadowLine2 = _this.add.graphics({
                fillStyle: {
                    color: 0x151515
                }
            }).fillRect(211, 381, 384, 6);
            var logoLine3 = _this.add.graphics({
                fillStyle: {
                    color: 0xffffff
                }
            }).fillRect(595, 381, -5, -96);
            var shadowLine3 = _this.add.graphics({
                fillStyle: {
                    color: 0x151515
                }
            }).fillRect(595, 381, -5, -96);
            var logoLine4 = _this.add.graphics({
                fillStyle: {
                    color: 0xffffff
                }
            }).fillRect(590, 285, -95, 5);
            var shadowLine4 = _this.add.graphics({
                fillStyle: {
                    color: 0x151515
                }
            }).fillRect(590, 285, -95, 5);
            logoLine2.setDepth(-2);
            shadowLine2.setDepth(-1);
            logoLine4.setDepth(-2);
            shadowLine4.setDepth(-1);
            _this.tweens.timeline({
                tweens: [{
                        targets: logoLine,
                        y: 600,
                        ease: 'Power1',
                        duration: 1000
                    }, {
                        targets: shadowLine1,
                        y: 600,
                        ease: 'Linear',
                        duration: 500
                    }, {
                        targets: shadowLine2,
                        x: 600,
                        ease: 'Linear',
                        duration: 500
                    }, {
                        targets: shadowLine3,
                        y: -600,
                        ease: 'Linear',
                        duration: 500
                    }, {
                        targets: shadowLine4,
                        x: -600,
                        ease: 'Linear',
                        duration: 500
                    }]
            });
            _this.time.addEvent({
                delay: 3000,
                callback: function () {
                    var img = _this.add.image(75, 0, CST_1.CST.IMAGES.LOGO).setOrigin(0).setScale(0.65).setAlpha(0);
                    _this.tweens.timeline({
                        tweens: [{
                                targets: img,
                                alpha: 1,
                                ease: 'Power1',
                                duration: 1000
                            }]
                    });
                    _this.time.addEvent({
                        delay: 2000,
                        callback: function () {
                            _this.tweens.timeline({
                                tweens: [{
                                        targets: [img, logoLine1, logoLine2, logoLine3, logoLine4],
                                        alpha: 0,
                                        ease: 'Power1',
                                        duration: 2000
                                    }]
                            });
                            _this.time.addEvent({
                                delay: 2000,
                                callback: function () {
                                    _this.tweens.timeline({
                                        tweens: [{
                                                targets: logoLine,
                                                x: -6700,
                                                scale: 20,
                                                ease: 'Linear',
                                                duration: 3000
                                            }]
                                    });
                                },
                                loop: false
                            });
                        },
                        loop: false
                    });
                },
                loop: false
            });
        });
    };
    LoadScene.prototype.create = function () {
        var _this = this;
        this.time.addEvent({
            delay: 9500,
            callback: function () {
                _this.scene.start(CST_1.CST.SCENES.MENU);
            },
            loop: false
        });
    };
    return LoadScene;
}(Phaser.Scene));
exports.LoadScene = LoadScene;


/***/ }),

/***/ "./src/scenes/MenuScene.ts":
/*!*********************************!*\
  !*** ./src/scenes/MenuScene.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MenuScene = void 0;
var CST_1 = __webpack_require__(/*! ../const/CST */ "./src/const/CST.ts");
var MenuScene = /** @class */ (function (_super) {
    __extends(MenuScene, _super);
    function MenuScene() {
        return _super.call(this, {
            key: CST_1.CST.SCENES.MENU
        }) || this;
    }
    MenuScene.prototype.init = function () {
    };
    MenuScene.prototype.preload = function () {
    };
    MenuScene.prototype.create = function () {
        var _this = this;
        this.sound.pauseOnBlur = false;
        this.sound.play(CST_1.CST.AUDIO.MAINIMENU, {
            loop: true
        });
        var mainText = this.make.text({
            x: this.game.renderer.width / 2 - 200,
            y: this.game.renderer.height / 2 - 200,
            text: 'AIRBORNE',
            style: {
                fontFamily: 'arcadeFont',
                fontSize: '82px',
                color: '#000000'
            }
        }).setDepth(1);
        this.cameras.main.backgroundColor.setTo(234, 234, 234);
        var background = this.add.image(0, -100, CST_1.CST.IMAGES.SKY1).setOrigin(0).setScale(2.1621621621621623);
        var playImg = this.add.image(this.game.renderer.width / 2 + 100, this.game.renderer.height / 2, CST_1.CST.IMAGES.BUTTON).setOrigin(0).setScale(3);
        var playText = this.make.text({
            x: this.game.renderer.width / 2 + 175,
            y: this.game.renderer.height / 2 + 42,
            text: 'Play',
            style: {
                fontFamily: 'arcadeFont',
                fontSize: '20px',
                color: '#000000'
            }
        });
        playImg.setInteractive();
        playImg.on('pointerup', function () {
            playImg.setScale(3.25);
            playText.setScale(1.08333);
            playText.setX(playText.x + 5);
            _this.time.addEvent({
                delay: 100,
                callback: function () {
                    playImg.setScale(3);
                    playText.setScale(1);
                    playText.setX(playText.x - 5);
                },
                loop: false
            });
            _this.time.addEvent({
                delay: 200,
                callback: function () {
                    _this.sound.stopAll();
                    _this.scene.start(CST_1.CST.SCENES.GAME);
                },
                loop: false
            });
        });
        var optionsImg = this.add.image(this.game.renderer.width / 2 + 100, this.game.renderer.height / 2 + 100, CST_1.CST.IMAGES.BUTTON).setOrigin(0).setScale(3);
        var optionsText = this.make.text({
            x: this.game.renderer.width / 2 + 160,
            y: this.game.renderer.height / 2 + 142,
            text: 'Options',
            style: {
                fontFamily: 'arcadeFont',
                fontSize: '20px',
                color: '#000000'
            }
        });
        optionsImg.setInteractive();
        optionsImg.on('pointerup', function () {
            optionsImg.setScale(3.25);
            optionsText.setScale(1.08333);
            optionsText.setX(optionsText.x + 5);
            _this.time.addEvent({
                delay: 100,
                callback: function () {
                    optionsImg.setScale(3);
                    optionsText.setScale(1);
                    optionsText.setX(optionsText.x - 5);
                },
                loop: false
            });
        });
        var creditsImg = this.add.image(this.game.renderer.width / 2 + 100, this.game.renderer.height / 2 + 200, CST_1.CST.IMAGES.BUTTON).setOrigin(0).setScale(3);
        var creditsText = this.make.text({
            x: this.game.renderer.width / 2 + 160,
            y: this.game.renderer.height / 2 + 242,
            text: 'Credits',
            style: {
                fontFamily: 'arcadeFont',
                fontSize: '20px',
                color: '#000000'
            }
        });
        creditsImg.setInteractive();
        creditsImg.on('pointerup', function () {
            creditsImg.setScale(3.25);
            creditsText.setScale(1.08333);
            creditsText.setX(creditsText.x + 5);
            _this.time.addEvent({
                delay: 100,
                callback: function () {
                    creditsImg.setScale(3);
                    creditsText.setScale(1);
                    creditsText.setX(creditsText.x - 5);
                },
                loop: false
            });
        });
        this.tweens.timeline({
            tweens: [{
                    targets: [background, mainText, playImg, playText, optionsImg, optionsText, creditsImg, creditsText],
                    alpha: { from: 0, to: 1 },
                    ease: 'Linear',
                    duration: 2000
                }]
        });
    };
    return MenuScene;
}(Phaser.Scene));
exports.MenuScene = MenuScene;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/main.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=bundle.js.map