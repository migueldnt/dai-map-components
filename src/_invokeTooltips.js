
/**
 * Invocar el mostrar/ocultar los tooltips dentro del mapa
 * @param {Map} map objeto mapa de Open Layers
 * @param {*} e evento
 */
 export const invoke_tooltips = (map, e) => {
    var pixel = map.getEventPixel(e.originalEvent);
    var hit = map.hasFeatureAtPixel(pixel);

    let capas_con_tooltip = map.getLayers().getArray().filter(item=>item.get("_tooltip")!=undefined).map(item2=>item2.get("id"))
    //console.log(capas_con_tooltip)
    //let tooltip_overlay = map.getOverlayById("tooltip")
    //let tooltipelement = document.getElementById("fixed-tooltip-content");
    if (hit) {
        var f_l = map.forEachFeatureAtPixel(pixel, function (feature, layer) {
            return [feature, layer];
        });

        if (f_l) {
            var layer = f_l[1];
            var feature = f_l[0];
            if (capas_con_tooltip.includes(layer.get("id")) ) {
                //hightlight_on_hover(f_l[0]);
                //if (layers[layer.get("name")].highlight_accessor != undefined) {
                //    layers[layer.get("name")].highlight_accessor(f_l[0])
                //}

                let contenido = layer.get("_tooltip")
                if(typeof contenido == "function"){
                    contenido = contenido(feature.getProperties())
                }

                console.log(contenido,"es lo que acaba de pasar, este es el contenido a mandar en el tooltip")

                //componente.toltipcontent = componente._fn_tooltip(f_l[0].getProperties());
            } else {
                //tooltip_overlay.setPosition(undefined)
                //tooltipelement.classList.remove("show")
            }
        } else {

            //tooltip_overlay.setPosition(undefined)
            //tooltipelement.classList.remove("show")
        }
    } else {
        //tooltip_overlay.setPosition(undefined)
        //tooltipelement.classList.remove("show")
    }
}