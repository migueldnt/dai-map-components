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
import "./styles.scss"
import Map from 'ol/Map';
import View from 'ol/View';
import {invoke_tooltips} from "./_invokeTooltips";
import {invoke_clicks} from "./_invokeClicks";
import Overlay from 'ol/Overlay';
import {Attribution, defaults as defaultControls} from 'ol/control';
import createZoomExtentControl from "./_zoomAll.js"

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
            map:null,
            hasInitialExtent:false,
            highlight_feature:undefined
        }
    },
    mounted:function(){
        var attribution = new Attribution({
            collapsible: false,
        });
        if(this.extent[0]!=0 && this.extent[3]!=0){
            this.hasInitialExtent = true;
        }
        this.map = new Map({
            target: this.$refs.mapa,
            layers: [],
            view: new View({
                center: this.center,
                zoom: this.zoom,
                projection: 'EPSG:4326',
                maxZoom: 20
            }),
            controls:defaultControls({attribution: false}).extend([attribution])
        });
        if(this.hasInitialExtent){
            this.map.getView().fit(this.extent,{duration:500,padding: [10, 10, 10, 10]})
        }
        let controlZoomAll = createZoomExtentControl( ()=>{
            if (this.highlight_feature) {
                this.highlight_feature.set("_hightlight", false);
            }
            if(this.hasInitialExtent){
                this.map.getView().fit(this.extent,{duration:500,padding: [10, 10, 10, 10]})
            }else{
                this.map.getView().animate({zoom:this.zoom,center:this.center})
            }
            this.$emit("resetView",this.map)
        } )
        this.map.addControl(controlZoomAll)
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
            invoke_clicks(this.map,e,this)
            
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
            this.layers[id]=component
        }
    },
    provide: function(){
        return{
            layer_register:this._layer_register
        }
    },
    model:{
        event:"resetView",
        prop: "extent"
    },
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