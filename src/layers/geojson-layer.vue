<script>
import defaultProps from "./_defaultLayerProps"
import defaultData from "./_defaultLayerData";
import defaultWatchers from "./_defaultLayerWatchers";
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
export default {
    props:{
        ...defaultProps,
        source:{
            type:String,
            default:"",
            required:true
        },
        tooltipContent:{
            type:[Function,String],
            default:function(){
                return "none"
            }
        },
    },
    data:function(){
        return{
            ...defaultData
        }
    },
    created:function(){
        let vm = this;
        vm.$parent.getMap(function(map){
            let layer = new VectorLayer({
                source:new VectorSource({
                    url: vm.source,
                    format: new GeoJSON()
                }),
                visible:vm.visible
            })
            layer.set("id",vm.id)
            if(vm.tooltipContent!="none"){
                
                layer.set("_tooltip",vm.tooltipContent)
            }

            map.addLayer(layer)
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