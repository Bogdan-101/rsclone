import { CST } from '../const/CST';

export class PauseScene extends Phaser.Scene{
    private background!: Phaser.GameObjects.TileSprite;
    private quotes!: [string[], string[], string[], string[], string[], string[]];
    constructor(){
        super({
            key: CST.SCENES.PAUSESCENE
        })
    }

    preload() {
        this.quotes = [
            ['I heard an airplane passing overhead. I wished I was on it.',
            'Charles Bukowski'],
            ['And like no other sculpture in the history of art, the dead engine and dead airframe come to life at the touch of a human hand, and join their life with the pilot\'s own.',
            'Richard Bach, A Gift Of Wings'],
            ['We are in the process of finding out what filling the sky with hundreds of thousands of satellites does to all life on Earth.',
            'Steven Magee'],
            ['There\'s only one job in this world that gives you an office in the sky; and that is pilot.',
            'Mohith Agadi'],
            ['Planes will never have the final, perfect model because their idea is all about the infinity.',
            'Talismanist Giebra, Talismanist: Fragments of the Ancient Fire. Philosophy of Fragmentism Series.'],
            ['But remember this, Japanese boy... airplanes are not tools for war. They are not for making money. Airplanes are beautiful dreams. Engineers turn dreams into reality.',
            'Hayao Miyazaki, The Wind Rises'],
        ];
    }

    update() {
        this.background.tilePositionX += 0.15;
    }

    create() {
        this.add.rectangle(0, 0, this.renderer.width, this.renderer.height, 0x000000, 0.6)
            .setOrigin(0).setDepth(1).setScale(2);
        this.background = this.add.tileSprite(this.game.renderer.width / 2, this.game.renderer.height / 2 - 100, 0, 0, CST.IMAGES.PAUSEIMG)
            .setDepth(2).setScale(0.5);
        this.make.text({
            x: this.game.renderer.width / 2 + 120,
            y: this.game.renderer.height / 4 - 100,
            text: 'PAUSE',
            style: {
                fontFamily: 'arcadeFont',
                fontSize: '80px',
                color: '#ffffff'
            }
        }).setDepth(3);

        const randNum = Phaser.Math.Between(0, this.quotes.length - 1);

        const QuoteText = this.make.text({
            x: this.game.renderer.width / 10,
            y: this.game.renderer.height * 3 / 4 - 80,
            text: this.quotes[randNum][0],
            style: {
                fontFamily: 'Courier',
                fontSize: '20px',
                color: '#ffffff',
                wordWrap: { width: 600 }
            }
        }).setDepth(3);

        const QuoteAuthor = this.make.text({
            x: this.game.renderer.width / 10,
            y: this.game.renderer.height * 3 / 4 - 80,
            text: this.quotes[randNum][1],
            style: {
                fontFamily: 'Courier',
                fontSize: '20px',
                color: '#ffffff',
                wordWrap: { width: 600 }
            }
        }).setDepth(3).setVisible(false);

        QuoteText.setInteractive();
        QuoteAuthor.setInteractive();

        QuoteText.on('pointerover', () => {
            QuoteAuthor.setVisible(true);
            QuoteText.setVisible(false);
         })

        QuoteAuthor.on('pointerout', () => {
            QuoteText.setVisible(true);
            QuoteAuthor.setVisible(false);
        });

        const BackImg = this.add.image(this.game.renderer.width / 2, this.game.renderer.height - 50, CST.IMAGES.BUTTON)
            .setScale(3).setDepth(3);
        const BackText = this.make.text({
            x: this.game.renderer.width / 2 - 30,
            y: this.game.renderer.height - 57,
            text: 'Resume',
            style: {
                fontFamily: 'arcadeFont',
                fontSize: '20px',
                color: '#000000'
            }
        }).setDepth(3);
        BackImg.setInteractive();

        BackImg.on('pointerup', () => {
            BackImg.setScale(3.25);
            BackText.setScale(1.08333);
            BackText.setX(BackText.x + 5);
            this.time.addEvent({
                delay: 100,
                callback: () => {
                    BackImg.setScale(3);
                    BackText.setScale(1);
                    BackText.setX(BackText.x - 5);
                    //@ts-ignore
                    this.scene.get(CST.SCENES.MUSICSCENE).ContinueMusic();
                    //@ts-ignore
                    this.scene.get(CST.SCENES.GAME).ContinuePlay();
                },
                loop: false
            });
        });

        const restartButton = this.add.image(this.game.renderer.width / 4 - 50, this.game.renderer.height - 50, CST.IMAGES.RESTART)
            .setDepth(5).setScale(2.5);

        restartButton.setInteractive();

        restartButton.on('pointerup', () => {
            restartButton.setScale(2.75);
            this.time.addEvent({
                delay: 100,
                callback: () => {
                    restartButton.setScale(2.5);
                },
                loop: false
            });
            this.time.addEvent({
                delay: 200,
                callback: () => {
                    //@ts-ignore
                    this.scene.get(CST.SCENES.GAME).ContinuePlay();
                    //@ts-ignore
                    this.scene.get(CST.SCENES.GAME).RestartGame();
                },
                loop: false
            });
        });

        const homeButton = this.add.image(this.game.renderer.width * 3 / 4 + 50, this.game.renderer.height - 50, CST.IMAGES.HOME)
            .setDepth(6).setScale(2.5);

        homeButton.setInteractive();

        homeButton.on('pointerup', () => {
            homeButton.setScale(2.75);
            this.time.addEvent({
                delay: 100,
                callback: () => {
                    homeButton.setScale(2.5);
                },
                loop: false
            });
            this.time.addEvent({
                delay: 200,
                callback: () => {
                    this.scene.stop();
                    this.scene.stop(CST.SCENES.HUDSCENE);
                    //@ts-ignore
                    this.scene.get(CST.SCENES.GAME).GoHome();
                },
                loop: false
            });
        });

        this.input.keyboard.on('keydown-ESC', () => {
            //@ts-ignore
            this.scene.get(CST.SCENES.MUSICSCENE).ContinueMusic();
            //@ts-ignore
            this.scene.get(CST.SCENES.GAME).ContinuePlay();
        });
        //@ts-ignore
        this.scene.get(CST.SCENES.MUSICSCENE).PauseMusic();
    }
}