const schema = require('@colyseus/schema');
const {BERRY_NAME, BERRY_STATUS} = require('../../shared/enum');
const Schema = schema.Schema;

class Berry extends Schema {
  constructor(id, type, x, y, ownerId, status, step) {
    super();
    this.descriptions = {
        SEED: `A ${BERRY_NAME[type]} was planted here.`,
        SPROUT: `A ${BERRY_NAME[type]} has sprouted.`,
        TALLER: `The ${BERRY_NAME[type]} plant is growing bigger.`,
        BLOOM: `This ${BERRY_NAME[type]} plant is in bloom! `,
        BERRY: `There are ${BERRY_NAME[type]}! `
    }

    this.assign({
      id: id,
      ownerId: ownerId,
      type: type,
      name: BERRY_NAME[type],
      status: status,
      description: this.descriptions[status],
      x: x,
      y: y,
      step: step
    });
  }

  grow(){
    //console.log(this.step, this.status);
    this.step = Math.max(0, this.step -1);
    if(this.step <= 0){
      this.step = 10;
      switch (this.status) {
        case BERRY_STATUS.SEED:
          this.status = BERRY_STATUS.SPROUT;
          break;
        
        case BERRY_STATUS.SPROUT:
          this.status = BERRY_STATUS.TALLER;
          break;
        
        case BERRY_STATUS.TALLER:
          this.status = BERRY_STATUS.BLOOM;
          break;

        case BERRY_STATUS.BLOOM:
          this.status = BERRY_STATUS.BERRY;
          break;

        case BERRY_STATUS.BERRY:
          this.status = BERRY_STATUS.SEED;
          break;
      
        default:
          break;
      }
      this.changeDialog();
    }
  }

  changeDialog(){
    this.description = this.descriptions[this.status];
  }
}

schema.defineTypes(Berry, {
  id: 'string',
  name: 'string',
  type: 'string',
  status: 'string',
  description: 'string',
  x: 'uint8',
  y: 'uint8',
  step: 'int8',
  ownerId: 'string'
});

module.exports = Berry;
