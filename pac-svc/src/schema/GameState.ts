import { type, Schema, MapSchema, ArraySchema } from '@colyseus/schema';
import Player from './Player';
import Ghost from './Ghost';
import Message from './Message';
import PowerUp from './PowerUp';

class GameState extends Schema {
  @type({ map: Player }) players = new MapSchema<Player>();
  @type({ map: 'string' }) chatMessages = new MapSchema<string>();
  @type({ map: Ghost }) ghosts = new MapSchema<Ghost>();

  @type('boolean') gameCanStart = false;
  @type('boolean') gameStarted = false;
  @type('string') adminId = null;

  @type(['number']) pellets = new ArraySchema<number>();
  @type([PowerUp]) powerUps = new ArraySchema<PowerUp>();
  @type(['number']) walls = new ArraySchema<number>();
  @type('number') width = undefined;
  @type('number') height = undefined;
  @type('number') counter = 0;
}

export default GameState;
