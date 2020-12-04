import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import Vue from 'vue'
import Vuetify from 'vuetify/lib'
Vue.use(Vuetify)

const vuetify = new Vuetify({
  icons: {
    iconfont: 'md',
  }
})

export {
  Vue,
  vuetify
}
