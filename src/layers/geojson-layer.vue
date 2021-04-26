<script>
import defaultProps from "./_defaultLayerProps"
import defaultData from "./_defaultLayerData";
import defaultWatchers from "./_defaultLayerWatchers";
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import generateOlStyle from "./_json2olstyle"
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
            default:"none"
        },
        olstyle:{
            type:[Function,Object],
            default: function(){
                return {} //deefinir un estilo global por default
            }
        },
        _clicks:{
            type:Number,
            default:0
        }
    },
    data:function(){
        return{
            ...defaultData,
        }
    },
    created:function(){
        let vm = this;
        this.layer_register(this.id,this)
        vm.$parent.getMap(function(map){
            let style;
            if(typeof vm.olstyle == "function"){
                style= function(feature){
                    let serializes= vm.olstyle(feature)
                    return generateOlStyle(serializes)["style"]
                }
            }else{
                style=generateOlStyle(vm.olstyle)["style"]
            }
            
            let layer = new VectorLayer({
                source:new VectorSource({
                    url: vm.source,
                    format: new GeoJSON()
                }),
                visible:vm.visible,
                style:style
            })
            
            layer.set("id",vm.id)
            if(vm.tooltipContent!="none"){
                
                layer.set("_tooltip",vm.tooltipContent)
            }

            map.addLayer(layer)
            vm.olLayer = layer;
        })
    },
    watch:{
        ...defaultWatchers
    },
    methods:{
    },
    render:function(){
        return null
    },
    model:{
        event:"click-feature",
        prop: "_clicks"
    },
    inject:["layer_register"]
}
</script>