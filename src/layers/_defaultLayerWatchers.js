export default {
    visible: function(newValue){
        console.log("se detecto que cambio el visible")
        this.layer.setVisible(newValue)
    }
}