<script>

import { Tile as TileLayer} from 'ol/layer';
import { XYZ } from 'ol/source';
import defaultProps from "./_defaultLayerProps";
import defaultData from "./_defaultLayerData";
import defaultWatchers from "./_defaultLayerWatchers";
//import OSM from 'ol/source/OSM';
export default {
    props:{
        ...defaultProps,
        xyzUrl:{
            type:String,
            default:"https://a.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}.png"
        },
        attributions:{
            type:String,
            default:'© <a href="https://carto.com/">Carto</a>'
        }
    },
    data:function(){
        return{
            ...defaultData
        }
    },
    created:function(){
        let vm = this;
        vm.$parent.getMap(function(map){
            let layer = new TileLayer({
                source: new XYZ({
                    url: vm.xyzUrl,
                    attributions:vm.attributions
                }),
                visible: vm.visible
            })
            layer.set("id",vm.id)
            map.addLayer(layer)
            vm.layer=layer
        })
        
    },
    watch:{
        ...defaultWatchers
    },
    render:function(){
        return null
    }
    
}
</script>
