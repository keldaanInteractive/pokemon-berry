import {STATUS} from '../../../shared/enum';

export default class AnimationManager {
  constructor(scene) {
    this.scene = scene;
    this.orientationTable = {
      'DOWN': 0,
      'LEFT': 2,
      'UP': 4,
      'RIGHT': 2
    };

    this.flipxTable = {
      'LEFT': false,
      'UP': false,
      'RIGHT': true,
      'DOWN': false
    };
    this.createHeroAnimations();
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

  playAnimation(entity, spriteKey) {
    entity.sprite.flipX = this.flipxTable[entity.orientation];
    entity.sprite.play(spriteKey);
  }

  getSpriteKey(entity) {
      switch (entity.status) {
            case STATUS.IDLE:
                return `hero/0/${this.orientationTable[entity.orientation]}`;
        
            case STATUS.MOVING:
                return `hero/1/${this.orientationTable[entity.orientation]}`;
      
          default:
              return;
      }
  }
}