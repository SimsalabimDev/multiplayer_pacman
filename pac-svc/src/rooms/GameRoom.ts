import { Room, Delayed, Client } from "colyseus";
import Player from "../schema/entities/Player";
import GameState from "../schema/GameState";

class GameRoom extends Room<GameState> {
	maxClients = 6;

	onCreate(options) {
		this.setState(new GameState());

		/* event listeners */
		this.onMessage('PLAYER_READY', (client, message) => {
			const player = this.state.players.get(client.id);
			player.ready = message?.ready ?? !player.ready;
		});

		this.onMessage('initMap', (client, message) => {
			if(!this.state.pellets.length){
			// console.log("YO RECEIVED");
			//this.state.pellets = message.pellets;
				message.pellets.forEach(ele =>{
					this.state.pellets.push(ele);
				});
			}
		});

		this.onMessage('moving', (client, message) => {
			const player = this.state.players.get(client.id);
			player.direction = message?.direction;
			player.x = message?.x;
			player.y = message?.y;
		});
		this.onMessage('pelletEaten', (client, message) => {
			this.state.pellets[message.pellet] = 0;
		});
	}
	
	onJoin(client: Client) {
		this.state.players.set(client.id, new Player());
	}
	
	async onLeave(client: Client) {
		const player = this.state.players.get(client.id);
		this.state.players.delete(client.id);
		
		try {
			// allow disconnected client to reconnect into this room until 20 seconds
			await this.allowReconnection(client, 20);
			this.state.players.set(client.id, player);

		} catch(err) {}
	}

	onDispose() {

	}
}

export default GameRoom;