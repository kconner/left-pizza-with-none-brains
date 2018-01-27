
import AppState from './appState'

const titleSong =
    '5n31s0kbl00e09t6m0a7g0fj7i0r1w1110f0000d1111c0000h0000v0000o3210b018id38h4h4h4h4h4h4h4h4h8Ocz4h4h4i8ycP0h4h4p22Lzj7A2pr1B6u5ce0p63V09kPNINYU5K0JUPMIMVA6jekgVcwL83e01pzwyFxOocwwOj1OaOiGC7f2uPuOoehuiikMYe5dCZAM0zpylN5c22mj9785E11wOGOwkwF1ji6A58cGIE58agkQwEQwF1BlBll0G1jiC9mk2E6Rmllk2E5deQ0'

export default class Title extends AppState {
    private thing: Phaser.Sprite

    public preload(): void {
        console.log('preloading title')

        this.game.stage.backgroundColor = '#404040'

        this.app().disconnect()
    }

    public create(): void {
        console.log('creating title')

        this.thing = this.game.add.sprite(100, 200, 'thing')

        this.app().connect('ws://127.0.0.1:2657')

        this.app().setSongAndPlay(titleSong)

        this.app()
            .connection()
            .listen('heroes/:id/:axis', (change: any) => {
                console.log(change)

                if (change.path.axis === 'x') {
                    this.thing.position.x = change.value
                } else {
                    this.thing.position.y = change.value
                }
            })
    }

    public update(): void {
        const arrowMotion = this.app()
            .controls()
            .arrowMotion()

        if (arrowMotion != null) {
            this.app()
                .connection()
                .send(arrowMotion)
        }
    }
}
