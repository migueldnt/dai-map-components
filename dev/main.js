import Vue from 'vue'
import App from './App.vue'

let div = document.createElement("div")
div.setAttribute("id","app")
document.body.appendChild(div)


new Vue({
  render: h => h(App),
}).$mount('#app')