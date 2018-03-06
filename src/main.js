import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';

Vue.use(VueResource);

new Vue({
  el: '#app',
  render: h => h(App)
})
/*

Vue.component('componentetarea',
{
  props: ['tarea'],
  template: TTask,
})

new Vue({
  el: '#app',
  data: {
    msg: 'Proyecto Tareas',
    msgBind: 'mensaje bind',
    msgOculto: 'este mensaje está oculto',
    Titulo: '',
    Descripcion: '',
    listaTareas: [
      {
        indice: 1, NombreTarea: 'Tarea 1', Descripcion: 'Descripcion 1', finalizada: false
      }
    ],
    style1: {
      border: '1px solid black'
    },
    style2: {
      border: '1px solid black'
    }
  },
  methods: {
    addTask () {
      this.listaTareas.push({NombreTarea: this.Titulo, Descripcion: this.Descripcion, finalizada: false});
    },
    endTask(index) {
      this.listaTareas[index].finalizada = true
    },
    cambiarTexto (index) {
      this.listaTareas[index].NombreTarea = this.mensajeCambiante
    }
  }
})

{ label: 'Pendiente', value: 'pending'},
        { label: 'Terminada', value: 'ended'},
        { label: 'Archivada', value: 'archived'}
*/

