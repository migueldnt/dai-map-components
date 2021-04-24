<template>
    <div class="dai-map-container">
        <div ref="mapa" class="mapa"></div>
        <div ref="tooltip" class="ol-tooltip"><div class="content"></div></div>
        <slot></slot>
    </div>
</template>

<script>

import 'ol/ol.css';
import "./tooltips.scss"
import Map from 'ol/Map';
//import OSM from 'ol/source/OSM';
//import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import {invoke_tooltips} from "./_invokeTooltips"
import Overlay from 'ol/Overlay';
import {Attribution, defaults as defaultControls} from 'ol/control';

export default {
    props:{
        center:{
            type:Array,
            default:function(){
                return [0,0]
            }
        },
        zoom:{
            type:Number,
            default:1
        },
        extent:{
            type:Array,
            default:function(){
                return [0,0,0,0]
            }
        }
    },
    data:function(){
        return{
            layers:{},
            map:null
        }
    },
    mounted:function(){
        var attribution = new Attribution({
            collapsible: false,
        });
        this.map = new Map({
            target: this.$refs.mapa,
            layers: [],
            view: new View({
                center: this.center,
                zoom: this.zoom,
                projection: 'EPSG:4326',
            }),
            controls:defaultControls({attribution: false}).extend([attribution])
        });
        //tooltip overlay
        let overlay_tooltip = new Overlay({
            id: "tooltip",
            element: this.$refs.tooltip,
            autoPan: false,
            stopEvent: false,
            position: "center-center",
            insertFirst: false
        });
        overlay_tooltip.setPosition(undefined);
        this.map.addOverlay(overlay_tooltip);
        //pointer move events
        this.map.on("pointermove",(evento)=>{
            if (evento.dragging) {
                return;
            }
            invoke_tooltips(this.map, evento)
        })
        this.map.on("click",(e)=>{
            var pixel = this.map.getEventPixel(e.originalEvent);
            var hit = this.map.hasFeatureAtPixel(pixel);
            if(hit){
                console.log("hay algo")
            }else{
                console.log("no hay nada")
            }
            let hijos=this.$children
            console.log(hijos)
        })

    },
    methods:{
        getMap: function (found) {
            var vm = this
            function checkForMap () {
                if (vm.map) {
                found(vm.map)
                } else {
                setTimeout(checkForMap, 50)
                }
            }
            checkForMap()
        },
        getLayers:function(){
            return this.map.getLayers().getArray()
        },
        _layer_register:function(id,component){
            console.log(id,component)
        }
    },
    provide: function(){
        return{
            layer_register:this._layer_register
        }
    }
}
</script>

<style lang="css" scoped>
.dai-map-container{
    min-height: 200px;
    min-width: 200px;
    position: relative;
}
.mapa{
    width: 100%;
    height: 100%;
    position: absolute;
}
</style>

<style>

.ol-control button{
    background-color: #0062FF;
    cursor: pointer;
    width: 30px;
    height: 30px;
    transition: background-color 0.2s ease-in-out 0s;
}

</style>