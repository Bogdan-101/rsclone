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
        BUTTON: "Button.png"
    },
    AUDIO: {
        MAINIMENU: "MainMenuMusic.mp3"
    },
    SPRITE: {}
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/// <reference path='../typings/phaser.d.ts' />
Object.defineProperty(exports, "__esModule", ({ value: true }));
var LoadScene_1 = __webpack_require__(/*! ./scenes/LoadScene */ "./src/scenes/LoadScene.ts");
var MenuScene_1 = __webpack_require__(/*! ./scenes/MenuScene */ "./src/scenes/MenuScene.ts");
var game = new Phaser.Game({
    width: 800,
    height: 600,
    scene: [
        LoadScene_1.LoadScene, MenuScene_1.MenuScene
    ],
    render: {
        pixelArt: true
    }
});


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
    LoadScene.prototype.init = function () {
    };
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
        this.load.setPath('./assets/sprites');
        for (var prop in CST_1.CST.SPRITE) {
            //@ts-ignore
            this.load.spritesheet(CST_1.CST.SPRITE[prop], CST_1.CST.SPRITE[prop], frameConfig);
        }
    };
    LoadScene.prototype.preload = function () {
        var _this = this;
        this.loadImages();
        this.loadSounds();
        this.loadSprites({
            frameHeight: 32,
            frameWidth: 32
        });
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
        var background = this.add.image(-100, 0, CST_1.CST.IMAGES.SKY1).setOrigin(0).setScale(0.5);
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