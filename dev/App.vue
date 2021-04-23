<template>
  <div>
    <dai-basic-map
      class="hola-mapa"
      ref="daiBasicMap"
      :center="[-102.579, 23.944]"
      :zoom="6"
    >
      <dai-xyz-layer :visible="xyz_visible" />
      <dai-geojson-layer
        id="estados"
        source="https://dadsigvisgeo.conacyt.mx/geoserver/vacunacion/wms?service=WMS&version=1.1.0&request=GetMap&layers=vacunacion:estados&bbox=-118.365119934082%2C14.5320978164673%2C-86.7104034423828%2C32.7186546325684&width=768&height=441&srs=EPSG%3A404000&format=geojson"
        :tooltipContent="(row) => `${row.cvegeo} eb sdsd`"
        :olstyle="style_estados"
      />

    </dai-basic-map>

    <hr />
    <button @click="apagar1">apagar layer</button>
  </div>
</template>

<script>
import DaiBasicMap from "../src/basic-map";
import DaiXyzLayer from "../src/layers/xyz-layer";
import DaiGeojsonLayer from "../src/layers/geojson-layer";

export default {
  name: "App",
  components: {
    DaiBasicMap,
    DaiXyzLayer,
    DaiGeojsonLayer,
  },
  mounted: function () {
    let mapa = this.$refs.daiBasicMap;
    console.log(mapa.getLayers());

  },
  data: function () {
    return {
      xyz_visible: true,
      style_estados: {
        style:  {
          fill: {
            color: "green",
          },
          stroke: {
            width: 1,
            color: "red",
          },
        },
      },
    };
  },
  methods: {
    apagar1: function () {
      this.xyz_visible = !this.xyz_visible;
    },
  },
};
</script>


<style>
.hola-mapa {
  height: 500px;
  width: 800px;
}
</style>