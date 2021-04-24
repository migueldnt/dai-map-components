import basicMap from "./basic-map.vue";
import xyzLayer from "./layers/xyz-layer.vue";
import geojsonLayer from "./layers/geojson-layer.vue";


function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component("dai-basic-map", basicMap);
  Vue.component("dai-xyz-layer", xyzLayer);
  Vue.component("dai-geojson-layer", geojsonLayer);
}

const plugin = {
  install
};

let GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

basicMap.install = install;

export default basicMap;

//export {xyzLayer,geojsonLayer}