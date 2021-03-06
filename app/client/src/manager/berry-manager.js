import Berry from '../gameObject/berry';
import { TILESET_PIXEL } from '../../../shared/enum';

export default class BerryManager{
    constructor(scene, berries){
        this.scene = scene;
        this.group = this.scene.add.group();
        this.buildBerries(berries);
    }

    buildBerries(berries){
        berries.forEach(berry=>{
            this.addBerry(berry);
        })
    }

    addBerry(berry){
        if(this.group && this.group.children && !this.isBerry(berry.id)){
            let phaserBerry = new Berry(this.scene, berry);
            this.group.add(phaserBerry);
            this.scene.animationManager.animateBerry(phaserBerry);
        }
    }

    removeBerry(id){
        this.group.getChildren().forEach((berry) => {
            if (berry.id == id) {
                berry.destroy(true);
            }
        });
    }

    isBerry(id){
        let isBerry = false;
        this.group.getChildren().forEach((berry) => {
            if (berry.id == id) {
                isBerry = true;
            }
        });
        return isBerry;
    }

    handleBerryChange(berry, change){
        if(this.group && this.group.children){
            this.group.getChildren().forEach((p) =>{
                if(p.id == berry.id){
                    //console.log(change.field, change.value);
                    switch (change.field) {
                        case 'status':
                            p.status = change.value;
                            this.scene.animationManager.animateBerry(p);
                            break;
    
                        case 'x':
                            p.positionX = change.value;
                            p.setPosition(p.positionX * TILESET_PIXEL +TILESET_PIXEL/2, p.y);
                            break;
                        
                        case 'y':
                            p.positionY = change.value;
                            p.setPosition(p.x, p.positionY * TILESET_PIXEL - 6);
                            break;
    
                        default:
                            p[change.field] = change.value;
                            break;
                    }
                }
            });
        }
    }
}