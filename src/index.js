import basicMap from "./basic-map.vue";

function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component("dai-basic-map", basicMap);
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