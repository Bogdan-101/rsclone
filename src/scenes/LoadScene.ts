import { CST } from '../const/CST';
export class LoadScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.LOAD
        })
    }
    loadImages(){
        this.load.setPath('./assets/images/');

        for(let prop in CST.IMAGES){
            //@ts-ignore
            this.load.image(CST.IMAGES[prop], CST.IMAGES[prop]);
        }
    }
    loadSounds(){
        this.load.setPath('./assets/sounds');

        for(let prop in CST.AUDIO){
            //@ts-ignore
            this.load.audio(CST.AUDIO[prop], CST.AUDIO[prop]);
        }
    }
    loadSprites(frameConfig?: Phaser.Types.Loader.FileTypes.ImageFrameConfig){
        
        for(let prop in CST.SPRITE){
            //@ts-ignore
            this.load.spritesheet(CST.SPRITE[prop], CST.SPRITE[prop], frameConfig);
        }
    }
    preload(){
        this.loadImages();
        this.loadSounds();
        this.load.setPath('./assets/sprites');
        this.load.spritesheet(CST.SPRITE.PLANE, CST.SPRITE.PLANE, {
            frameHeight: 40,
            frameWidth: 28
        })
        this.load.spritesheet(CST.SPRITE.ENEMY, CST.SPRITE.ENEMY, {
            frameHeight: 24,
            frameWidth: 16
        })
        
        this.load.atlas('explosion2', '../../assets/sprites/explosion2.png', '../../assets/sprites/explosion2.json');
        this.load.atlas('explosion1', '../../assets/sprites/explosion1.png', '../../assets/sprites/explosion1.json');
        this.load.atlas('enemyPlane', '../../assets/sprites/EnemyPlaneAtlas.png', '../../assets/sprites/EnemyPlaneAtlas.json');
        const loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff,
                alpha: 1
            }
        })

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const loadingText = this.make.text({
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

        const percentText = this.make.text({
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

        const assetText = this.make.text({
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

        const loadingBox = this.add.graphics({
            fillStyle: {
                color: 0x222222,
                alpha: 0.8
            }
        }).fillRect(
            this.game.renderer.width / 2 - 160,
            this.game.renderer.height / 2 - 30,
            320,
            50
        );

        this.load.on('progress', (percent :number) => {
            loadingBar.clear();
            loadingBar.fillRect(
                this.game.renderer.width / 2 - 150,
                this.game.renderer.height / 2 - 20,
                300 * percent,
                30
            );
            percentText.setText((percent * 100).toString() + '%');
        })

        this.load.on('fileprogress', (file :Phaser.Loader.File) => {
            assetText.setText('Loading asset: ' + file.key);
        })

        this.load.on('complete', () => {
            loadingBar.destroy();
            loadingBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
            this.cameras.main.backgroundColor.setTo(21, 21, 21);

            const logoLine = this.add.graphics({
                fillStyle: {
                    color: 0xeaeaea
                }
            }).fillRect(325, -600, 66, 600);

            const logoLine1 = this.add.graphics({
                fillStyle: {
                    color: 0xffffff
                }
            }).fillRect(205, 277, 6, 110);

            const shadowLine1 = this.add.graphics({
                fillStyle: {
                    color: 0x151515
                }
            }).fillRect(205, 277, 6, 110);

            const logoLine2 = this.add.graphics({
                fillStyle: {
                    color: 0xffffff
                }
            }).fillRect(211, 381, 384, 6);

            const shadowLine2 = this.add.graphics({
                fillStyle: {
                    color: 0x151515
                }
            }).fillRect(211, 381, 384, 6);

            const logoLine3 = this.add.graphics({
                fillStyle: {
                    color: 0xffffff
                }
            }).fillRect(595, 381, -5, -96);

            const shadowLine3 = this.add.graphics({
                fillStyle: {
                    color: 0x151515
                }
            }).fillRect(595, 381, -5, -96);

            const logoLine4 = this.add.graphics({
                fillStyle: {
                    color: 0xffffff
                }
            }).fillRect(590, 285, -95, 5);

            const shadowLine4 = this.add.graphics({
                fillStyle: {
                    color: 0x151515
                }
            }).fillRect(590, 285, -95, 5);

            logoLine2.setDepth(-2);
            shadowLine2.setDepth(-1);
            logoLine4.setDepth(-2);
            shadowLine4.setDepth(-1);

            this.tweens.timeline({
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
            
            this.time.addEvent({
                delay: 3000,
                callback: ()=>{
                    const img = this.add.image(75, 0, CST.IMAGES.LOGO).setOrigin(0).setScale(0.65).setAlpha(0);
                    this.tweens.timeline({
                        tweens: [{
                            targets: img,
                            alpha: 1,
                            ease: 'Power1',
                            duration: 1000
                        }]
                    });
                    this.time.addEvent({
                        delay: 2000,
                        callback: ()=> {
                            this.tweens.timeline({
                                tweens: [{
                                    targets: [img, logoLine1, logoLine2, logoLine3, logoLine4],
                                    alpha: 0,
                                    ease: 'Power1',
                                    duration: 2000
                                }]
                            });
                            this.time.addEvent({
                                delay: 2000,
                                callback: ()=> {
                                    this.tweens.timeline({
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
                            })
                        },
                        loop: false
                    })
                },
                loop: false
            })
        })
    }
    create(){
        this.time.addEvent({
            delay: 9500,
            callback: ()=>{
                this.scene.start(CST.SCENES.MENU)
            },
            loop: false
        })
    }
}