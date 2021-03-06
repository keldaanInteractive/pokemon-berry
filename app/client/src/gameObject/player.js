import {GameObjects} from 'phaser';
import { TILESET_PIXEL, ORIENTATION_TABLE } from '../../../shared/enum';

export default class Player extends GameObjects.Container {
  constructor(scene, player) {
    super(scene, player.x * TILESET_PIXEL +TILESET_PIXEL/2, player.y * TILESET_PIXEL + TILESET_PIXEL/2 -2);
    this.id = player.id;
    this.positionX = player.x;
    this.positionY = player.y;
    this.status = player.status;
    this.name = player.name;
    this.orientation = player.orientation;
    this.moveManager = scene.plugins.get('rexMoveTo').add(this, {
      speed: 58,
      rotateToTarget: false
    });
    
    this.sprite = new GameObjects.Sprite(scene,0,0,'hero',`0/${ORIENTATION_TABLE[this.orientation]}/1`);
    let phaserName = new GameObjects.BitmapText(scene, 0,-17, 'atari', this.name, 7);
    phaserName.setX(phaserName.x - phaserName.width/2);
    this.add(phaserName);
    this.scene.add.existing(this.sprite);
    this.add(this.sprite);
    scene.add.existing(this);
  }
}
