import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ui from "@/components/UI";
import directives from "@/directives"

const app = createApp(App)

app.use(createPinia())
app.use(router)
ui.forEach(component=>{
    app.component(component.name,component)
})
directives.forEach((directive)=>{
    app.directive(directive.name,directive)
})
app.mount('#app')
