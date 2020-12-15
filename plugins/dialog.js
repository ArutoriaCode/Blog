import Dialog from '@/components/Dialog'
import '@mdi/font/css/materialdesignicons.min.css'
import { Vue, vuetify } from './vuetify'

const component = new Vue({
  vuetify,
  render: (h) => h(Dialog),
})

export default (ctx, inject) => {

  const Instance = component.$mount()
  document.body.appendChild(component.$el)

  inject('dialog', Instance.$children[0])
}
