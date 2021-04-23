export default {
    id:{
        type: String,
        default: Math.random().toString(36).substring(7)
    },
    visible:{
        type:Boolean,
        default:true
    },
    zIndex:{
        type:Number,
        default:0
    },
    basemap:{
        type:Boolean,
        default:false
    }
}