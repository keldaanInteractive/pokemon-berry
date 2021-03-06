import {BERRY_STATUS, BERRY_TYPE, STATUS, ORIENTATION_TABLE} from '../../../shared/enum';

export default class AnimationManager {
  constructor(scene) {
    this.scene = scene;

    this.flipxTable = {
      'LEFT': false,
      'UP': false,
      'RIGHT': true,
      'DOWN': false
    };
    this.createHeroAnimations();
    this.createBerryAnimations();
  }

  createBerryAnimations(){
    Object.keys(BERRY_TYPE).forEach(type =>{
      Object.keys(BERRY_STATUS).forEach(status =>{
        this.scene.anims.create({
          key: `${type}/${status}`,
          frames: this.scene.anims.generateFrameNames('berries', {
              frames: status === BERRY_STATUS.SEED ? [0] : [0,1],
              prefix: `${type}/${status}/`
          }),
          duration: 2000,
          repeat: -1
        });
      });
    });
  }

  createHeroAnimations(){
    ['0', '2', '4'].forEach((orientation) => {
        this.scene.anims.create({
            key: `hero/0/${orientation}`,
            frames: this.scene.anims.generateFrameNames('hero', {frames:[1], prefix: `0/${orientation}/`}),
        });
    });
    ['0', '2', '4'].forEach((orientation) => {
        this.scene.anims.create({
            key: `hero/1/${orientation}`,
            frames: this.scene.anims.generateFrameNames('hero', {frames:[0,1,2], prefix: `0/${orientation}/`}),
            frameRate: 6,
            yoyo: true,
            repeat:-1
        });
    });
  }

  animate(entity) {
    const key = this.getSpriteKey(entity);
    this.playAnimation(entity, key);
  }

  animateBerry(berry){
    //console.log(`${berry.type}/${berry.status}`);
    //console.log(berry.sprite);
    berry.sprite.play(`${berry.type}/${berry.status}`);
  }

  playAnimation(entity, spriteKey) {
    entity.sprite.flipX = this.flipxTable[entity.orientation];
    entity.sprite.play(spriteKey);
  }

  getSpriteKey(entity) {
      switch (entity.status) {
            case STATUS.IDLE:
                return `hero/0/${ORIENTATION_TABLE[entity.orientation]}`;
        
            case STATUS.MOVING:
                return `hero/1/${ORIENTATION_TABLE[entity.orientation]}`;
      
          default:
              return;
      }
  }
}
