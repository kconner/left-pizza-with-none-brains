import { Room, EntityMap, Client, nosync } from 'colyseus'

import { Hero, GameState } from '../models'

export class GameRoom extends Room<GameState> {
    onInit(options) {
        console.log('GameRoom.onInit', options)

        this.setState(new GameState())
    }

    onJoin(client) {
        console.log('add client: ', client.sessionId)

        this.state.createHero(client.sessionId)
    }

    onLeave(client) {
        this.state.removeHero(client.sessionId)
    }

    onMessage(client, data: ClientAction) {
        switch (data.type) {
            case 'Movement':
                const movement = data as Movement
                this.state.moveHero(client.sessionId, movement)
                break

            default:
                console.log('GameRoom.onMessage', client.sessionId, data)
                break
        }
    }

    onDispose() {
        console.log('GameRoom.onDispose')
    }
}
