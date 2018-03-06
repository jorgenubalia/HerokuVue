<template>
    <div id="task">
        <div v-if="tarea.nombretarea.editable">
            <input v-model="tarea.nombretarea.texto" v-focus="true" @blur="doNotEditable(tarea.nombretarea)"/>
        </div>
        <div v-else @click="doEditable(tarea.nombretarea)">
            {{ tarea.nombretarea.texto }}
        </div>
        <div v-if="tarea.descripcion.editable">
            <input v-model="tarea.descripcion.texto" v-focus="true" @blur="doNotEditable(tarea.descripcion)"/>
        </div>
        <div v-else @click="doEditable(tarea.descripcion)">
            {{ tarea.descripcion.texto }}
        </div>
        <div v-if="tarea.estado.editable">
            <select v-model="tarea.estado.texto" @blur="doNotEditable(tarea.estado)">
                <option v-for="(option, index) in opcionesestado" :value="option.value" :key="index" v-focus="true">
                    {{ option.label }}
                </option>
            </select>
            <!--<input v-model="estado.texto" v-focus="true" @blur="doNotEditable(estado)"/>-->
        </div>
        <div v-else @click="doEditable(tarea.estado)">
            {{ tarea.estado.texto }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'task',
    props: ['tarea'],
    /*
    nombretarea: { texto: 'Tarea 1', editable: false}, 
    descripcion: { texto: 'Descripcion 1', editable: false}, 
    estado: { texto: 'pending', editable: false},
    */
    methods: {
        doEditable (elemento) {
            elemento.editable = true;
        },
        doNotEditable (elemento) {
            elemento.editable = false;
        }
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