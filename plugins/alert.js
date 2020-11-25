import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import Alert from '@/components/Alert'
Vue.use(Vuetify)

const vuetify = new Vuetify({
  icons: {
    iconfont: 'md',
  }
})

const component = new Vue({
  vuetify,
  render: (h) => h(Alert),
})

export default (ctx, inject) => {

  const Instance = component.$mount()
  document.body.appendChild(component.$el)

  inject('alert', Instance.$children[0])
}
