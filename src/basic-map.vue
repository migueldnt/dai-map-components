<template>
    <div class="dai-map-container">
        <div ref="mapa" class="mapa"></div>
        <slot></slot>
    </div>
</template>

<script>

import 'ol/ol.css';
import Map from 'ol/Map';
//import OSM from 'ol/source/OSM';
//import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import {invoke_tooltips} from "./_invokeTooltips"

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
            titulo:"nombre",
            map:null
        }
    },
    mounted:function(){
        this.map = new Map({
            target: this.$refs.mapa,
            layers: [],
            view: new View({
                center: this.center,
                zoom: this.zoom,
                projection: 'EPSG:4326',
            }),
        });
        this.map.on("pointermove",(evento)=>{
            if (evento.dragging) {
                return;
            }
            invoke_tooltips(this.map, evento)
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