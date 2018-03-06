<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <!--
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
    -->
    <div>
      <span>Título</span> <input v-model="Titulo"></input>
    </div>
    <div>
      <span>Descripción</span> <input v-model="Descripcion"></input>
    </div>
    <div>
      <span>Estado</span> 
      <select v-model="Estado">
        <option v-for="(option, index) in opcionesestado" :value="option.value" :key="index">
          {{ option.label }}
        </option>
      </select>
    </div>
    <div>
      <button @click="addTask">Añadir Tarea</button>
      <button @click="getData">Llamada Rest</button>
      <span>Mensaje</span> <input v-model="response.msg"></input>
    </div>
      <div class="col-sm-4">
        <h2>Tareas Pendientes</h2>
        <task class="task pending rounded"
          v-for="item in listaTareas"
          :key="item.indice"
          :tarea="item">
        </task>
      </div>
      <div class="col-sm-4">
        <h2>Tareas Terminadas</h2>
        <task class="task ended rounded"
          v-for="item in listaTareasTerminadas"
          :key="item.indice"
          :tarea="item">
        </task>
        
      </div>
      <div class="col-sm-4">
        <h2>Tareas Archivadas</h2>
        <task class="task archived rounded"
          v-for="item in listaTareasArchivadas"
          :key="item.indice"
          :tarea="item">
        </task>
      </div>
  </div>
</template>

<script>
import task from './TTask.vue';

export default {
  name: 'app',
  components: {
    task
  },
  data () {
    return {
      msg: 'Proyecto ToDo List',
      Titulo: '',
      Descripcion: '',
      Estado: 'pending',
      listaTareas: [
        {
          indice: 1, nombretarea: { texto: 'Tarea 1', editable: false}, descripcion: { texto: 'Descripcion 1', editable: false}, estado: { texto: 'pending', editable: false}
        }
      ],
      listaTareasTerminadas: [
        {
          indice: 1, nombretarea: { texto: 'Tarea 1', editable: false}, descripcion: { texto: 'Descripcion 1', editable: false}, estado: { texto: 'ended', editable: false}
        }
      ],
      listaTareasArchivadas: [
        {
          indice: 1, nombretarea: { texto: 'Tarea 1', editable: false}, descripcion: { texto: 'Descripcion 1', editable: false}, estado: { texto: 'archieved', editable: false}
        }
      ],
      opcionesestado: [
      ],
      response: {}
    }
  },
  methods: {
    addTask () {
      if (this.Estado == 'pending' ) {
        this.listaTareas.push({nombretarea: {texto: this.Titulo, editable: false}, descripcion: {texto: this.Descripcion, editable: false}, estado: {texto: this.Estado, editable: false}});
      }
      else  if (this.Estado == 'ended') {
        this.listaTareasTerminadas.push({nombretarea: {texto: this.Titulo, editable: false}, descripcion: {texto: this.Descripcion, editable: false}, estado: {texto: this.Estado, editable: false}});
      }
      else  if (this.Estado == 'archived') {
        this.listaTareasArchivadas.push({nombretarea: {texto: this.Titulo, editable: false}, descripcion: {texto: this.Descripcion, editable: false}, estado: {texto: this.Estado, editable: false}});
      }
      this.Titulo = '';
      this.Descripcion = '';
      this.Estado = 'pending';
    },
    getData() {
        this.$http.post("http://demo8495528.mockable.io/trythis", null, { headers: { "content-type": "application/json" } }).then(result => {
            this.opcionesEstado = result.data.opcionesEstado;
        }, error => {
            console.error(error);
        });
    }

  }, 
  created() {
    this.$http.post("http://demo8495528.mockable.io/trythis", null, { headers: { "content-type": "application/json" } }).then(result => {
            this.opcionesestado = result.data.opcionesestado;
        }, error => {
            console.error(error);
        });
  },
  directives: {
    focus: {
      // directive definition
      inserted: function (el) {
        el.focus()
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

span {
  text-align: left;
}

.task {
  border: 1px solid black;
  
  padding: 1em;
  margin: 0.5em;
}
.pending {
  background-color: rgb(194, 217, 247);
}
.ended {
  background-color: rgb(255, 78, 101);
}
.archived {
  background-color: rgba(243, 204, 131, 0.579);
}
</style>


<!--
          <div>
            <span class="glyphicon glyphicon-time"></span>
            <span class="glyphicon glyphicon-floppy-disk"></span>
          </div>
          
          <div v-if="item.nombretarea.editable">
            <input v-model="item.nombretarea.texto" v-focus="true" @blur="doNotEditable(listaTareas[index].nombretarea)"/>
          </div>
          <div v-else @click="doEditable(listaTareas[index].nombretarea)">
            {{ item.nombretarea.texto }}
          </div>
          <div v-if="item.descripcion.editable">
            <input v-model="item.descripcion.texto" v-focus="true" @blur="doNotEditable(listaTareas[index].descripcion)"/>
          </div>
          <div v-else @click="doEditable(listaTareas[index].descripcion)">
            {{ item.descripcion.texto }}
          </div>
          <div v-if="item.estado.editable">
            <select v-model="item.estado.texto" @blur="doNotEditable(listaTareas[index].estado)">
              <option v-for="(option, index) in opcionesestado" :value="option.value" :key="index" v-focus="true">
                {{ option.label }}
              </option>
            </select>
          </div>
          <div v-else @click="doEditable(listaTareas[index].estado)">
            {{ item.estado.texto }}
          </div>
          -->

          <!--
        <div class="task ended rounded"
          v-for="(item, index) in listaTareasTerminadas"
          :key="item.indice">
          <div v-if="item.nombretarea.editable">
            <input v-model="item.nombretarea.texto" v-focus="true" @blur="doNotEditable(listaTareasTerminadas[index].nombretarea)"/>
          </div>
          <div v-else @click="doEditable(listaTareasTerminadas[index].nombretarea)">
            {{ item.nombretarea.texto }}
          </div>
          <div v-if="item.descripcion.editable">
            <input v-model="item.descripcion.texto" v-focus="true" @blur="doNotEditable(listaTareasTerminadas[index].descripcion)"/>
          </div>
          <div v-else @click="doEditable(listaTareasTerminadas[index].descripcion)">
            {{ item.descripcion.texto }}
          </div>
        </div>
        -->

        <!--
        <div class="task archived rounded"
          v-for="(item, index) in listaTareasArchivadas"
          :key="item.indice">
          <div v-if="item.nombretarea.editable">
            <input v-model="item.nombretarea.texto" v-focus="true" @blur="doNotEditable(listaTareasArchivadas[index].nombretarea)"/>
          </div>
          <div v-else @click="doEditable(listaTareasArchivadas[index].nombretarea)">
            {{ item.nombretarea.texto }}
          </div>
          <div v-if="item.descripcion.editable">
            <input v-model="item.descripcion.texto" v-focus="true" @blur="doNotEditable(listaTareasArchivadas[index].descripcion)"/>
          </div>
          <div v-else @click="doEditable(listaTareasArchivadas[index].descripcion)">
            {{ item.descripcion.texto }}
          </div>
        </div>
        -->
