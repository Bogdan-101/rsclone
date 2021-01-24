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
        GAME: "GAME",
        CHOOSELEVEL: "CHOOSELEVEL",
        HUDSCENE: "HUDSCENE",
        OPTIONSSCENE: "OPTIONSSCENE"
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
        HOME: "Home.png",
        HPBACK: "HPBack.png",
        ARROWBUTTON: "ArrowButton.png",
        SCORE: "Score.png"
    },
    AUDIO: {
        BLASTER: "blaster.mp3",
        MAINIMENU: "MainMenuMusic.mp3",
        MUSIC1: "Суперюность - Ночь.mp3",
        MUSIC2: "Суперюность - Погоня.mp3",
        ENEMYBLASTER: "EnemyBlaster.mp3"
    },
    SPRITE: {
        PLANE: "PlaneSprites.png",
        PLANE2: "PlaneSprites2.png",
        PLANE3: "PlaneSprites3.png",
        PLANE4: "PlaneSprites4.png",
        PLANE5: "PlaneSprites5.png",
        ROCKET: "Rockets.png",
        ENEMY: "Enemy.png",
        ENEMYATLAS: "EnemyPlaneAtlas.png",
        LEVELBUTTON: "LevelButton.png",
        HEART: "HealthHearts.png"
    },
    STATE: {
        AUDIO: "0.5",
        PLANE: "PlaneSprites.png"
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
var ChooseScene_1 = __webpack_require__(/*! ./scenes/ChooseScene */ "./src/scenes/ChooseScene.ts");
var HUDScene_1 = __webpack_require__(/*! ./scenes/HUDScene */ "./src/scenes/HUDScene.ts");
var OptionsScene_1 = __webpack_require__(/*! ./scenes/OptionsScene */ "./src/scenes/OptionsScene.ts");
var game = new Phaser.Game({
    width: 800,
    height: 600,
    scene: [
        LoadScene_1.LoadScene, MenuScene_1.MenuScene, GameScene_1.GameScene, ChooseScene_1.ChooseScene, HUDScene_1.HUDScene, OptionsScene_1.OptionsScene
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
        // @ts-ignore
        this.scene.physics.add.collider(player, this.rockets, function (f, s) { return scene.Hit(s); }, null, this);
        // @ts-ignore
        this.scene.physics.add.collider(player, this, function () { return scene.Hit(); }, null, this);
        this.anims.create({
            key: 'die',
            frames: this.anims.generateFrameNumbers(CST_1.CST.SPRITE.ENEMY, { start: 3, end: 4 }),
            frameRate: 24,
            repeat: 1
        });
    };
    Enemy.prototype.CreateMovement = function () {
        var _this = this;
        if (this.scene.registry.get('health') === 0)
            return;
        var yMoving = Phaser.Math.FloatBetween(0, 100);
        var xMoving = Phaser.Math.FloatBetween(-100, 100);
        var chance = Phaser.Math.Between(0, 1);
        if (this.y + yMoving > 250 || this.y + yMoving < 0)
            yMoving = 50 - this.y;
        if (this.x + xMoving > 700)
            xMoving = 600 - this.x;
        else if (this.x + xMoving < 100)
            xMoving = 125 - this.x;
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
    Enemy.prototype.update = function (t) {
        if (!this.target) {
            return;
        }
        var tx = this.target.x;
        var ty = this.target.y;
        var x = this.x;
        var y = this.y;
        var rotation = Phaser.Math.Angle.Between(x, y, tx, ty);
        this.setRotation(rotation - 1.575);
        if ((t > this.lastFired && this.scene.registry.get('health') !== 0) || typeof (this.lastFired) === 'undefined') {
            this.lastFired = t + 1500;
            var rocket_1 = this.rockets.create(x, y + 10, CST_1.CST.IMAGES.ENEMYBULLET).setRotation(rotation - 1.575);
            rocket_1.setVelocity(-Math.sin(rocket_1.rotation) * 200, Math.cos(rocket_1.rotation) * 200);
            rocket_1.setAcceleration(0, 10);
            this.scene.time.addEvent({
                loop: false,
                callback: function () {
                    rocket_1.destroy();
                },
                delay: 3000
            });
            if (!this.scene.sound.get(CST_1.CST.AUDIO.ENEMYBLASTER))
                this.scene.sound.play(CST_1.CST.AUDIO.ENEMYBLASTER, { volume: +CST_1.CST.STATE.AUDIO * 0.05 });
        }
        if (!this.isMoving && this.scene.registry.get('health') !== 0) {
            this.isMoving = true;
            this.CreateMovement();
        }
    };
    return Enemy;
}(Phaser.GameObjects.Sprite));
exports.default = Enemy;


/***/ }),

/***/ "./src/planes/HeroPlane.ts":
/*!*********************************!*\
  !*** ./src/planes/HeroPlane.ts ***!
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
var CST_1 = __webpack_require__(/*! ../const/CST */ "./src/const/CST.ts");
var Hero = /** @class */ (function (_super) {
    __extends(Hero, _super);
    function Hero(scene, x, y, texture) {
        var _this = _super.call(this, scene, x, y, texture) || this;
        scene.sys.updateList.add(_this);
        scene.sys.displayList.add(_this);
        _this.health = 0;
        _this.lastFired = 0;
        _this.bullets = _this.scene.physics.add.group();
        _this.anims.play('turn');
        _this.setDepth(-10);
        _this.cursors = _this.scene.input.keyboard.createCursorKeys();
        _this.isDestroyable = true;
        _this.player = _this.scene.physics.add.sprite(_this.x, _this.scene.game.renderer.height + 100, texture);
        _this.player.setImmovable(true);
        _this.scene.tweens.add({
            targets: _this.player,
            y: y,
            duration: 1000,
            ease: 'Power1'
        });
        _this.scene.time.addEvent({
            delay: 1250,
            callback: function () {
                _this.player.setCollideWorldBounds(true);
            },
            loop: false
        });
        _this.health = 6;
        scene.registry.set('health', _this.health);
        return _this;
    }
    Hero.prototype.Hit = function () {
        var _this = this;
        if (this.isDestroyable) {
            this.health--;
            this.isDestroyable = false;
            this.scene.time.addEvent({
                delay: 2000,
                callback: function () {
                    _this.isDestroyable = true;
                    _this.player.setAlpha(1);
                },
                loop: false
            });
            this.scene.tweens.add({
                targets: this.player,
                alpha: { from: 0, to: 1 },
                ease: 'Cubic.easeOut',
                duration: 400,
                repeat: 5
            });
        }
        // console.log(this.health);
        return this.health;
    };
    Hero.prototype.update = function (time) {
        if (this.health !== 0) {
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
            if (this.cursors.space.isDown && time > this.lastFired) {
                this.lastFired = time + 200;
                var bullet_1 = this.bullets.create(this.player.x, this.player.y - 10, CST_1.CST.IMAGES.BULLET).setDepth(-2).setScale(0.25);
                bullet_1.setVelocityY(-600);
                bullet_1.setAcceleration(0, -50);
                this.scene.time.addEvent({
                    loop: false,
                    callback: function () {
                        bullet_1.destroy();
                    },
                    delay: 3000
                });
                this.scene.sound.add(CST_1.CST.AUDIO.BLASTER, { volume: +CST_1.CST.STATE.AUDIO * 0.3 }).play();
            }
        }
    };
    return Hero;
}(Phaser.GameObjects.Sprite));
exports.default = Hero;


/***/ }),

/***/ "./src/scenes/ChooseScene.ts":
/*!***********************************!*\
  !*** ./src/scenes/ChooseScene.ts ***!
  \***********************************/
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
exports.ChooseScene = void 0;
var CST_1 = __webpack_require__(/*! ../const/CST */ "./src/const/CST.ts");
var ChooseScene = /** @class */ (function (_super) {
    __extends(ChooseScene, _super);
    function ChooseScene() {
        return _super.call(this, {
            key: CST_1.CST.SCENES.CHOOSELEVEL
        }) || this;
    }
    ChooseScene.prototype.preload = function () {
        var _this = this;
        this.anims.create({
            key: 'ButtonHighlighted',
            frameRate: 10,
            frames: this.anims.generateFrameNames('levelButtons', {
                prefix: 'Button',
                suffix: '.png',
                start: 0,
                end: 0,
                zeroPad: 1
            })
        });
        this.anims.create({
            key: 'ButtonSteady',
            frameRate: 10,
            frames: this.anims.generateFrameNames('levelButtons', {
                prefix: 'Button',
                suffix: '.png',
                start: 1,
                end: 1,
                zeroPad: 1
            })
        });
        var level1 = this.physics.add.sprite(this.game.renderer.width / 3, this.game.renderer.height / 2 - 100, CST_1.CST.SPRITE.LEVELBUTTON).setOrigin(0);
        level1.anims.play('ButtonSteady');
        level1.setInteractive();
        level1.on('pointerover', function () {
            level1.anims.play('ButtonHighlighted');
        });
        level1.on('pointerout', function () {
            level1.anims.play('ButtonSteady');
        });
        level1.on('pointerup', function () {
            _this.time.addEvent({
                delay: 100,
                callback: function () {
                    _this.scene.start(CST_1.CST.SCENES.GAME);
                },
                loop: false
            });
        });
        this.make.text({
            x: this.game.renderer.width / 3 + 75,
            y: this.game.renderer.height / 2 - 88,
            text: 'Jungle',
            style: {
                fontFamily: 'arcadeFont',
                fontSize: '26px',
                color: '#fff'
            }
        });
        var level2 = this.physics.add.sprite(this.game.renderer.width / 3, this.game.renderer.height / 2, CST_1.CST.SPRITE.LEVELBUTTON).setOrigin(0);
        level2.anims.play('ButtonSteady');
        level2.setInteractive();
        level2.on('pointerover', function () {
            level2.anims.play('ButtonHighlighted');
        });
        level2.on('pointerout', function () {
            level2.anims.play('ButtonSteady');
        });
        this.make.text({
            x: this.game.renderer.width / 3 + 78,
            y: this.game.renderer.height / 2 + 12,
            text: 'Snow',
            style: {
                fontFamily: 'arcadeFont',
                fontSize: '26px',
                color: '#fff'
            }
        });
        var level3 = this.physics.add.sprite(this.game.renderer.width / 3, this.game.renderer.height / 2 + 100, CST_1.CST.SPRITE.LEVELBUTTON).setOrigin(0);
        level3.anims.play('ButtonSteady');
        level3.setInteractive();
        level3.on('pointerover', function () {
            level3.anims.play('ButtonHighlighted');
        });
        level3.on('pointerout', function () {
            level3.anims.play('ButtonSteady');
        });
        this.make.text({
            x: this.game.renderer.width / 3 + 75,
            y: this.game.renderer.height / 2 + 112,
            text: 'Space',
            style: {
                fontFamily: 'arcadeFont',
                fontSize: '26px',
                color: '#fff'
            }
        });
        var BackImg = this.add.image(this.game.renderer.width / 3, this.game.renderer.height / 2 + 200, CST_1.CST.IMAGES.BUTTON)
            .setOrigin(0).setScale(3);
        var BackText = this.make.text({
            x: this.game.renderer.width / 3 + 73,
            y: this.game.renderer.height / 2 + 242,
            text: 'Back',
            style: {
                fontFamily: 'arcadeFont',
                fontSize: '20px',
                color: '#000000'
            }
        });
        BackImg.setInteractive();
        BackImg.on('pointerup', function () {
            BackImg.setScale(3.25);
            BackText.setScale(1.08333);
            BackText.setX(BackText.x + 5);
            _this.time.addEvent({
                delay: 100,
                callback: function () {
                    BackImg.setScale(3);
                    BackText.setScale(1);
                    BackText.setX(BackText.x - 5);
                    _this.scene.start(CST_1.CST.SCENES.MENU);
                },
                loop: false
            });
        });
    };
    return ChooseScene;
}(Phaser.Scene));
exports.ChooseScene = ChooseScene;


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
var HeroPlane_1 = __importDefault(__webpack_require__(/*! ../planes/HeroPlane */ "./src/planes/HeroPlane.ts"));
var GameScene = /** @class */ (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        return _super.call(this, {
            key: CST_1.CST.SCENES.GAME
        }) || this;
    }
    GameScene.prototype.preload = function () {
        this.registry.set('score', 0);
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
        this.tweens.add({
            targets: this.player,
            y: this.game.renderer.height - 100,
            duration: 1000,
            ease: 'Power1'
        });
    };
    GameScene.prototype.update = function (time) {
        var _this = this;
        if (+CST_1.CST.STATE.AUDIO !== 0 && !this.music.isPlaying) {
            var rand = Phaser.Math.Between(1, 2);
            while (rand === this.musicIndex)
                rand = Phaser.Math.Between(1, 2);
            switch (rand) {
                case 1: {
                    this.music = this.sound.add(CST_1.CST.AUDIO.MUSIC1, { volume: +CST_1.CST.STATE.AUDIO });
                    this.music.play();
                    break;
                }
                case 2: {
                    this.music = this.sound.add(CST_1.CST.AUDIO.MUSIC2, { volume: +CST_1.CST.STATE.AUDIO });
                    this.music.play();
                    break;
                }
                default: {
                    this.music = this.sound.add(CST_1.CST.AUDIO.MUSIC1, { volume: +CST_1.CST.STATE.AUDIO });
                    this.music.play();
                    break;
                }
            }
            var musicText_1 = this.make.text({
                x: this.game.renderer.width - 200,
                y: this.game.renderer.height - 50,
                text: "Now playing:\n" + this.music.key.slice(0, this.music.key.length - 4),
                style: {
                    fontFamily: 'arcadeFont',
                    fontSize: '16px',
                    color: '#000000'
                }
            });
            this.time.addEvent({
                delay: 5000,
                callback: function () {
                    musicText_1.destroy();
                },
                loop: false
            });
        }
        this.player.update(time);
        if (typeof (this.lastSpawned) === 'undefined')
            this.lastSpawned = time + 5000;
        if (this.player.health !== 0) {
            this.background.tilePositionY -= 0.5;
            if (time > this.lastSpawned && this.registry.get('health') !== 0) {
                this.lastSpawned = time + 1000;
                var enemy_1 = this.enemies.get(Phaser.Math.Between(100, 700), -50, CST_1.CST.SPRITE.ENEMYATLAS);
                enemy_1.init(this.player.player, this);
                this.tweens.add({
                    targets: enemy_1,
                    y: 50,
                    duration: 1000,
                    ease: 'Power1'
                });
                this.physics.add.collider(this.player.bullets, enemy_1, function () {
                    _this.registry.set('score', _this.registry.get('score') + 10);
                    enemy_1.Die();
                    // @ts-ignore
                }, null, this);
                enemy_1.setTarget(this.player.player);
            }
        }
    };
    GameScene.prototype.Hit = function (s) {
        var _this = this;
        this.registry.set('health', this.player.health);
        if (s)
            s.destroy();
        if (this.player.Hit() !== 0) {
            return;
        }
        this.sound.stopByKey(CST_1.CST.AUDIO.ENEMYBLASTER);
        this.scene.pause(CST_1.CST.SCENES.HUDSCENE);
        this.scene.setVisible(false, CST_1.CST.SCENES.HUDSCENE);
        this.physics.pause();
        this.player.player.setTint(0xff5555);
        this.add.rectangle(0, 0, this.renderer.width, this.renderer.height, 0x000000, 0.6)
            .setOrigin(0).setDepth(1).setScale(2);
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, CST_1.CST.IMAGES.GAMEOVER)
            .setDepth(5);
        var restartButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, CST_1.CST.IMAGES.RESTART)
            .setDepth(5).setScale(2.5);
        restartButton.setInteractive();
        restartButton.on('pointerup', function () {
            restartButton.setScale(2.75);
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
                    _this.music.stop();
                    _this.scene.start(CST_1.CST.SCENES.GAME);
                    _this.scene.resume(CST_1.CST.SCENES.HUDSCENE);
                    _this.scene.setVisible(true, CST_1.CST.SCENES.HUDSCENE);
                },
                loop: false
            });
        });
        var homeButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 200, CST_1.CST.IMAGES.HOME)
            .setDepth(6).setScale(2.5);
        homeButton.setInteractive();
        homeButton.on('pointerup', function () {
            homeButton.setScale(2.75);
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
                    _this.music.stop();
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
                    var expl = _this.add.sprite(_this.player.player.x + Phaser.Math.Between(-20, 20), _this.player.player.y + Phaser.Math.Between(-20, 20), 'explosion2');
                    expl.play('explode');
                    _this.time.addEvent({
                        delay: 450,
                        callback: function () {
                            expl.destroy();
                        },
                        loop: false
                    });
                    _this.player.player.setRotation(_this.player.player.rotation += 0.5);
                    _this.player.player.setScale(_this.player.player.scale - 0.05);
                },
                loop: false
            });
        }
        this.background.tilePositionY = 0;
    };
    GameScene.prototype.create = function () {
        var _this = this;
        if (+CST_1.CST.STATE.AUDIO >= 0.1) {
            var rand = Phaser.Math.Between(1, 2);
            switch (rand) {
                case 1: {
                    this.music = this.sound.add(CST_1.CST.AUDIO.MUSIC1, { volume: +CST_1.CST.STATE.AUDIO });
                    this.music.play();
                    break;
                }
                case 2: {
                    this.music = this.sound.add(CST_1.CST.AUDIO.MUSIC2, { volume: +CST_1.CST.STATE.AUDIO });
                    this.music.play();
                    break;
                }
                default: {
                    this.music = this.sound.add(CST_1.CST.AUDIO.MUSIC1, { volume: +CST_1.CST.STATE.AUDIO });
                    this.music.play();
                    break;
                }
            }
            var musicText_2 = this.make.text({
                x: this.game.renderer.width - 200,
                y: this.game.renderer.height - 50,
                text: "Now playing:\n" + this.music.key.slice(0, this.music.key.length - 4),
                style: {
                    fontFamily: 'arcadeFont',
                    fontSize: '16px',
                    color: '#000000'
                }
            });
            this.time.addEvent({
                delay: 5000,
                callback: function () {
                    musicText_2.destroy();
                },
                loop: false
            });
        }
        this.scene.launch(CST_1.CST.SCENES.HUDSCENE);
        this.player = new HeroPlane_1.default(this, this.game.renderer.width / 2, this.game.renderer.height - 200, CST_1.CST.STATE.PLANE);
        this.enemies = this.physics.add.group({
            classType: Enemy_1.default,
            runChildUpdate: true
        });
        var _loop_1 = function (i) {
            var enemy = this_1.enemies.get(Phaser.Math.Between(100, 800), -50, CST_1.CST.SPRITE.ENEMYATLAS);
            enemy.init(this_1.player.player, this_1);
            this_1.tweens.add({
                targets: enemy,
                y: 50,
                duration: 1000,
                ease: 'Power1'
            });
            this_1.physics.add.collider(this_1.player.bullets, enemy, function (f) {
                _this.registry.set('score', _this.registry.get('score') + 10);
                enemy.Die();
                f.destroy();
                // @ts-ignore
            }, null, this_1);
        };
        var this_1 = this;
        for (var i = 0; i < 5; i += 1) {
            _loop_1(i);
        }
        this.enemies.children.each(function (child) {
            var enemy = child;
            enemy.setTarget(_this.player.player);
        });
        this.background = this.add.tileSprite(0, 0, this.game.renderer.width, this.game.renderer.height, CST_1.CST.IMAGES.STAGE)
            .setDepth(-3).setOrigin(0).setScale(3.125);
    };
    return GameScene;
}(Phaser.Scene));
exports.GameScene = GameScene;


/***/ }),

/***/ "./src/scenes/HUDScene.ts":
/*!********************************!*\
  !*** ./src/scenes/HUDScene.ts ***!
  \********************************/
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
exports.HUDScene = void 0;
var CST_1 = __webpack_require__(/*! ../const/CST */ "./src/const/CST.ts");
var HUDScene = /** @class */ (function (_super) {
    __extends(HUDScene, _super);
    function HUDScene() {
        return _super.call(this, {
            key: CST_1.CST.SCENES.HUDSCENE
        }) || this;
    }
    HUDScene.prototype.preload = function () {
        this.anims.create({
            key: 'HeartFull',
            frameRate: 10,
            frames: this.anims.generateFrameNames('HealthHearts', {
                prefix: 'tile00',
                suffix: '.png',
                start: 0,
                end: 0,
                zeroPad: 1
            })
        });
        this.anims.create({
            key: 'HeartHalf',
            frameRate: 10,
            frames: this.anims.generateFrameNames('HealthHearts', {
                prefix: 'tile00',
                suffix: '.png',
                start: 1,
                end: 1,
                zeroPad: 1
            })
        });
        this.anims.create({
            key: 'HeartEmpty',
            frameRate: 10,
            frames: this.anims.generateFrameNames('HealthHearts', {
                prefix: 'tile00',
                suffix: '.png',
                start: 2,
                end: 2,
                zeroPad: 1
            })
        });
    };
    HUDScene.prototype.create = function () {
        this.add.image(25, this.game.renderer.height, CST_1.CST.IMAGES.HPBACK).setOrigin(0, 1);
        this.add.image(this.game.renderer.width / 2 - 50, this.game.renderer.height, CST_1.CST.IMAGES.SCORE).setOrigin(0, 1);
        this.heart1 = this.physics.add.sprite(100, this.game.renderer.height - 10, CST_1.CST.SPRITE.HEART).setOrigin(0, 1);
        this.heart1.anims.play('HeartFull');
        this.heart2 = this.physics.add.sprite(155, this.game.renderer.height - 10, CST_1.CST.SPRITE.HEART).setOrigin(0, 1);
        this.heart2.anims.play('HeartFull');
        this.heart3 = this.physics.add.sprite(210, this.game.renderer.height - 10, CST_1.CST.SPRITE.HEART).setOrigin(0, 1);
        this.heart3.anims.play('HeartFull');
        this.scoreText = this.make.text({
            x: this.game.renderer.width / 2 + 15,
            y: this.game.renderer.height - 50,
            text: 'Score:\n' + this.registry.get('score'),
            style: {
                fontFamily: 'arcadeFont',
                fontSize: '20px',
                color: '#ffffff'
            }
        }).setDepth(11);
    };
    HUDScene.prototype.update = function () {
        this.scoreText.setText('Score: \n' + this.registry.get('score'));
        if (this.registry.get('health') === 6)
            this.heart3.anims.play('HeartFull');
        if (this.registry.get('health') === 5)
            this.heart3.anims.play('HeartHalf');
        if (this.registry.get('health') === 4)
            this.heart3.anims.play('HeartEmpty');
        if (this.registry.get('health') === 3)
            this.heart2.anims.play('HeartHalf');
        if (this.registry.get('health') === 2)
            this.heart2.anims.play('HeartEmpty');
        if (this.registry.get('health') === 1)
            this.heart1.anims.play('HeartHalf');
        if (this.registry.get('health') === 0)
            this.heart1.anims.play('HeartEmpty');
    };
    return HUDScene;
}(Phaser.Scene));
exports.HUDScene = HUDScene;


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
            // @ts-ignore
            this.load.image(CST_1.CST.IMAGES[prop], CST_1.CST.IMAGES[prop]);
        }
    };
    LoadScene.prototype.loadSounds = function () {
        this.load.setPath('./assets/sounds');
        for (var prop in CST_1.CST.AUDIO) {
            // @ts-ignore
            this.load.audio(CST_1.CST.AUDIO[prop], CST_1.CST.AUDIO[prop]);
        }
    };
    LoadScene.prototype.loadSprites = function (frameConfig) {
        for (var prop in CST_1.CST.SPRITE) {
            // @ts-ignore
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
        this.load.spritesheet(CST_1.CST.SPRITE.PLANE2, CST_1.CST.SPRITE.PLANE2, {
            frameHeight: 40,
            frameWidth: 28
        });
        this.load.spritesheet(CST_1.CST.SPRITE.PLANE3, CST_1.CST.SPRITE.PLANE3, {
            frameHeight: 40,
            frameWidth: 28
        });
        this.load.spritesheet(CST_1.CST.SPRITE.PLANE4, CST_1.CST.SPRITE.PLANE4, {
            frameHeight: 40,
            frameWidth: 28
        });
        this.load.spritesheet(CST_1.CST.SPRITE.PLANE5, CST_1.CST.SPRITE.PLANE5, {
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
        this.load.atlas('levelButtons', '../../assets/sprites/LevelButton.png', '../../assets/sprites/LevelButton.json');
        this.load.atlas('HealthHearts', '../../assets/sprites/HealthHearts.png', '../../assets/sprites/HealthHearts.json');
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
        this.scene.start(CST_1.CST.SCENES.MENU);
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
    MenuScene.prototype.preload = function () {
        this.lastFired = 0;
        this.isPlayable = false;
    };
    MenuScene.prototype.update = function (time) {
        if (this.isPlayable) {
            if (this.cursors.left.isDown) {
                if (this.player.x > this.game.renderer.width / 4)
                    this.player.setVelocityX(-160);
                else
                    this.player.setVelocityX(-((160 + this.player.x - this.game.renderer.width / 4) % 161));
                this.player.anims.play('left');
            }
            else if (this.cursors.right.isDown) {
                if (this.player.x < this.game.renderer.width / 4)
                    this.player.setVelocityX(160);
                else
                    this.player.setVelocityX(((160 + this.game.renderer.width / 4 - this.player.x) % 161));
                this.player.anims.play('right', true);
            }
            else {
                this.player.setVelocityX(0);
                this.player.anims.play('turn');
            }
            if (this.cursors.up.isDown) {
                if (this.player.y > this.game.renderer.height * 3 / 4)
                    this.player.setVelocityY(-160);
                else
                    this.player.setVelocityY(-((160 + this.player.y - this.game.renderer.height * 3 / 4) % 161));
                this.player.anims.play('turn');
            }
            else if (this.cursors.down.isDown) {
                if (this.player.y < this.game.renderer.height * 3 / 4)
                    this.player.setVelocityY(160);
                else
                    this.player.setVelocityY(((160 + this.game.renderer.height * 3 / 4 - this.player.y) % 80));
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
            if (this.cursors.space.isDown && time > this.lastFired) {
                this.lastFired = time + 200;
                var bullet = this.bullets.create(this.player.x, this.player.y - 10, CST_1.CST.IMAGES.BULLET)
                    .setDepth(9).setScale(0.25);
                bullet.setVelocityY(-600);
                bullet.setAcceleration(0, -50);
            }
        }
    };
    MenuScene.prototype.create = function () {
        var _this = this;
        this.sound.stopAll();
        if (this.anims.get('turn')) {
            this.anims.get('left').destroy();
            this.anims.get('turn').destroy();
            this.anims.get('right').destroy();
        }
        this.anims.create({
            key: 'left',
            frames: [{ key: CST_1.CST.STATE.PLANE, frame: 0 }],
            frameRate: 24,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [{ key: CST_1.CST.STATE.PLANE, frame: 1 }],
            frameRate: 24
        });
        this.anims.create({
            key: 'right',
            frames: [{ key: CST_1.CST.STATE.PLANE, frame: 2 }],
            frameRate: 24,
            repeat: -1
        });
        this.bullets = this.physics.add.group();
        this.cursors = this.input.keyboard.createCursorKeys();
        this.sound.pauseOnBlur = false;
        this.sound.volume = 1;
        this.sound.play(CST_1.CST.AUDIO.MAINIMENU, {
            loop: true,
            volume: +CST_1.CST.STATE.AUDIO
        });
        this.player = this.physics.add.sprite(this.game.renderer.width / 4, this.game.renderer.height + 200, CST_1.CST.SPRITE.PLANE)
            .setScale(1.5).setDepth(10);
        this.player.anims.play('turn');
        this.tweens.add({
            targets: this.player,
            y: this.game.renderer.height * 3 / 4,
            duration: 1000,
            ease: 'Power1'
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
        var helpText = this.make.text({
            x: this.game.renderer.width - 220,
            y: 50,
            text: 'Press \'H\' to show control keys and to toggle learning mode',
            style: {
                fontFamily: 'arcadeFont',
                fontSize: '18px',
                color: '#000000',
                wordWrap: { width: 200 }
            }
        }).setDepth(1);
        var hintsText = this.make.text({
            x: this.game.renderer.width - 220,
            y: 150,
            text: 'Use arrows to navigate your ship, space to shoot',
            style: {
                fontFamily: 'arcadeFont',
                fontSize: '18px',
                color: '#000000',
                wordWrap: { width: 200 }
            }
        }).setDepth(1).setVisible(false);
        this.input.keyboard.on('keydown-H', function () {
            hintsText.setVisible(!hintsText.visible);
            _this.isPlayable = !_this.isPlayable;
            if (_this.isPlayable === false) {
                _this.player.anims.play('turn');
                _this.player.setVelocity(0);
                _this.tweens.add({
                    targets: _this.player,
                    y: _this.game.renderer.height * 3 / 4,
                    x: _this.game.renderer.width / 4,
                    duration: 1500,
                    ease: 'Power1'
                });
            }
        });
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
            [playImg, playText, optionsImg, optionsText, creditsImg, creditsText, mainText, hintsText, helpText].map(function (elem) {
                _this.tweens.add({
                    targets: elem,
                    y: elem.y + 150,
                    alpha: { from: 1, to: 0 },
                    duration: 1500,
                    ease: 'Power1'
                });
            });
            _this.tweens.add({
                targets: _this.player,
                y: 0,
                duration: 2000,
                ease: 'Power1'
            });
            _this.time.addEvent({
                delay: 1500,
                callback: function () {
                    _this.sound.stopAll();
                    _this.scene.start(CST_1.CST.SCENES.CHOOSELEVEL);
                },
                loop: false
            });
        });
        var optionsImg = this.add.image(this.game.renderer.width / 2 + 100, this.game.renderer.height / 2 + 100, CST_1.CST.IMAGES.BUTTON)
            .setOrigin(0).setScale(3);
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
            optionsText.setX(optionsText.x + 5);
            _this.time.addEvent({
                delay: 100,
                callback: function () {
                    optionsImg.setScale(3);
                    optionsText.setX(optionsText.x - 5);
                    _this.time.addEvent({
                        delay: 300,
                        callback: function () {
                            _this.sound.stopAll();
                            _this.scene.start(CST_1.CST.SCENES.OPTIONSSCENE);
                        },
                        loop: false
                    });
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


/***/ }),

/***/ "./src/scenes/OptionsScene.ts":
/*!************************************!*\
  !*** ./src/scenes/OptionsScene.ts ***!
  \************************************/
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
exports.OptionsScene = void 0;
var CST_1 = __webpack_require__(/*! ../const/CST */ "./src/const/CST.ts");
var OptionsScene = /** @class */ (function (_super) {
    __extends(OptionsScene, _super);
    function OptionsScene() {
        return _super.call(this, {
            key: CST_1.CST.SCENES.OPTIONSSCENE
        }) || this;
    }
    OptionsScene.prototype.preload = function () {
        this.text = this.make.text({
            x: 100,
            y: this.game.renderer.height - 125,
            text: '',
            style: {
                fontFamily: 'arcadeFont',
                fontSize: '26px',
                color: '#fff'
            }
        });
        this.audioText = this.make.text({
            x: this.game.renderer.width / 2 - 10,
            y: this.game.renderer.height / 2 - 120,
            text: '',
            style: {
                fontFamily: 'arcadeFont',
                fontSize: '26px',
                color: '#fff'
            }
        });
        this.make.text({
            x: this.game.renderer.width / 2 - 70,
            y: this.game.renderer.height / 2 - 170,
            text: 'Volume:',
            style: {
                fontFamily: 'arcadeFont',
                fontSize: '26px',
                color: '#fff'
            }
        });
    };
    OptionsScene.prototype.update = function () {
        this.audioText.setText(CST_1.CST.STATE.AUDIO.slice(0, 3));
    };
    OptionsScene.prototype.create = function () {
        var _this = this;
        var upButton = this.add.image(this.game.renderer.width / 2 + 50, this.game.renderer.height / 2 - 150, CST_1.CST.IMAGES.ARROWBUTTON)
            .setScale(0.25).setOrigin(0);
        var downButton = this.add.image(this.game.renderer.width / 2 + 50 + 19, this.game.renderer.height / 2 - 115 + 23, CST_1.CST.IMAGES.ARROWBUTTON)
            .setScale(0.25).setRotation(3.1415926538);
        upButton.setInteractive();
        upButton.on('pointerup', function () {
            if (+CST_1.CST.STATE.AUDIO + 0.1 <= 0.9)
                CST_1.CST.STATE.AUDIO = (+CST_1.CST.STATE.AUDIO + 0.1).toString();
            else
                CST_1.CST.STATE.AUDIO = '1';
        });
        downButton.setInteractive();
        downButton.on('pointerup', function () {
            if (+CST_1.CST.STATE.AUDIO - 0.1 >= 0.1)
                CST_1.CST.STATE.AUDIO = (+CST_1.CST.STATE.AUDIO - 0.1).toString();
            else
                CST_1.CST.STATE.AUDIO = '0';
        });
        var plane1Img = this.physics.add.sprite(50, this.game.renderer.height * 3 / 5, CST_1.CST.SPRITE.PLANE)
            .setFrame(1).setOrigin(0).setScale(2).setDepth(2);
        var plane2Img = this.physics.add.sprite(this.game.renderer.width / 5 + 50, this.game.renderer.height * 3 / 5, CST_1.CST.SPRITE.PLANE2)
            .setFrame(1).setOrigin(0).setScale(2).setDepth(2);
        var plane3Img = this.physics.add.sprite(this.game.renderer.width * 2 / 5 + 50, this.game.renderer.height * 3 / 5, CST_1.CST.SPRITE.PLANE3)
            .setFrame(1).setOrigin(0).setScale(2).setDepth(2);
        var plane4Img = this.physics.add.sprite(this.game.renderer.width * 3 / 5 + 50, this.game.renderer.height * 3 / 5, CST_1.CST.SPRITE.PLANE4)
            .setFrame(1).setOrigin(0).setScale(2).setDepth(2);
        var plane5Img = this.physics.add.sprite(this.game.renderer.width * 4 / 5 + 50, this.game.renderer.height * 3 / 5, CST_1.CST.SPRITE.PLANE5)
            .setFrame(1).setOrigin(0).setScale(2).setDepth(2);
        var back1 = this.add.rectangle(40, this.game.renderer.height * 3 / 5 - 10, 78, 103, 0xffffff)
            .setVisible(false).setOrigin(0).setDepth(1).setAlpha(0.4);
        plane1Img.setInteractive();
        plane1Img.on('pointerover', function () {
            back1.setVisible(true);
        });
        plane1Img.on('pointerout', function () {
            back1.setVisible(false);
        });
        plane1Img.on('pointerup', function () {
            _this.text.setText('Red  eagle  will  fight  for  your  life  from  now  on!');
            CST_1.CST.STATE.PLANE = plane1Img.texture.key;
            console.log(CST_1.CST.STATE.PLANE);
        });
        var back2 = this.add.rectangle(this.game.renderer.width / 5 + 40, this.game.renderer.height * 3 / 5 - 10, 78, 103, 0xffffff)
            .setVisible(false).setOrigin(0).setDepth(1).setAlpha(0.4);
        plane2Img.setInteractive();
        plane2Img.on('pointerover', function () {
            back2.setVisible(true);
        });
        plane2Img.on('pointerout', function () {
            back2.setVisible(false);
        });
        plane2Img.on('pointerup', function () {
            _this.text.setText('The  best  of  the  best  -  King\'s  aviation  is  yours!');
            CST_1.CST.STATE.PLANE = plane2Img.texture.key;
            console.log(CST_1.CST.STATE.PLANE);
        });
        var back3 = this.add.rectangle(this.game.renderer.width * 2 / 5 + 40, this.game.renderer.height * 3 / 5 - 10, 78, 103, 0xffffff)
            .setVisible(false).setOrigin(0).setDepth(1).setAlpha(0.4);
        plane3Img.setInteractive();
        plane3Img.on('pointerover', function () {
            back3.setVisible(true);
        });
        plane3Img.on('pointerout', function () {
            back3.setVisible(false);
        });
        plane3Img.on('pointerup', function () {
            _this.text.setText('The  mercenaries  lent  you  a  plane,  but  not  for  long');
            CST_1.CST.STATE.PLANE = plane3Img.texture.key;
            console.log(CST_1.CST.STATE.PLANE);
        });
        var back4 = this.add.rectangle(this.game.renderer.width * 3 / 5 + 40, this.game.renderer.height * 3 / 5 - 10, 78, 103, 0xffffff)
            .setVisible(false).setOrigin(0).setDepth(1).setAlpha(0.4);
        plane4Img.setInteractive();
        plane4Img.on('pointerover', function () {
            back4.setVisible(true);
        });
        plane4Img.on('pointerout', function () {
            back4.setVisible(false);
        });
        plane4Img.on('pointerup', function () {
            _this.text.setText('The  child  of  the  powerful  Uranus  is  ready!');
            CST_1.CST.STATE.PLANE = plane4Img.texture.key;
            console.log(CST_1.CST.STATE.PLANE);
        });
        var back5 = this.add.rectangle(this.game.renderer.width * 4 / 5 + 40, this.game.renderer.height * 3 / 5 - 10, 78, 103, 0xffffff)
            .setVisible(false).setOrigin(0).setDepth(1).setAlpha(0.4);
        plane5Img.setInteractive();
        plane5Img.on('pointerover', function () {
            back5.setVisible(true);
        });
        plane5Img.on('pointerout', function () {
            back5.setVisible(false);
        });
        plane5Img.on('pointerup', function () {
            _this.text.setText('Surf-green  serpent  takes  off  from  the  runway!');
            CST_1.CST.STATE.PLANE = plane5Img.texture.key;
            console.log(CST_1.CST.STATE.PLANE);
        });
        var BackImg = this.add.image(this.game.renderer.width / 2, this.game.renderer.height - 50, CST_1.CST.IMAGES.BUTTON)
            .setScale(3);
        var BackText = this.make.text({
            x: this.game.renderer.width / 2 - 23,
            y: this.game.renderer.height - 57,
            text: 'Back',
            style: {
                fontFamily: 'arcadeFont',
                fontSize: '20px',
                color: '#000000'
            }
        });
        BackImg.setInteractive();
        BackImg.on('pointerup', function () {
            BackImg.setScale(3.25);
            BackText.setScale(1.08333);
            BackText.setX(BackText.x + 5);
            _this.time.addEvent({
                delay: 100,
                callback: function () {
                    BackImg.setScale(3);
                    BackText.setScale(1);
                    BackText.setX(BackText.x - 5);
                    _this.scene.start(CST_1.CST.SCENES.MENU);
                },
                loop: false
            });
        });
    };
    return OptionsScene;
}(Phaser.Scene));
exports.OptionsScene = OptionsScene;


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