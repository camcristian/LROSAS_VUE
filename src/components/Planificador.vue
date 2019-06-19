<template>
  <v-layout wrap>

<!-- INICIO DIAGOLO  DE NUEVO EVENTO -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn slot="activator" color="primary" dark class="mb-2">Nuevo Evento</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="titulo" label="Titulo">
                </v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="detalle" label="Detalle">
                </v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-date-picker v-model="picker" :landscape="landscape" :reactive="reactive" locale="es-cl" full-width ></v-date-picker>
              </v-flex>
              <v-flex xs12 sm12 md12 v-show="valida">
                <div class="red--text" v-for="v in validaMensaje" :key="v" v-text="v">
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Cancelar</v-btn>
          <v-btn color="blue darken-1" flat @click.native="guardar">Enviar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
<!-- FIN DIAGOLO  DE NUEVO EVENTO -->


<!-- INICIO CALENDARIO -->
    <v-flex xs12 class="mb-3">
      <v-sheet height="500">
        <v-calendar ref="calendar" v-model="start" :type="type" :now="today" :value="today" color="primary"
          locale="es-cl">
          <template v-slot:day="{ date }">
            <template v-for="event in eventsMap[date]">
              <v-menu :key="event.title" v-model="event.open" full-width offset-x>
                <template v-slot:activator="{ on }">
                  <div v-if="!event.time" v-ripple class="my-event" v-on="on" v-html="event.title"></div>
                </template>
                <v-card color="grey lighten-4" min-width="350px" flat>
                  <v-toolbar color="primary" dark>
                    <v-toolbar-title v-html="event.title"></v-toolbar-title>
                    <v-spacer></v-spacer>
                  </v-toolbar>
                  <v-card-title primary-title>
                    <span v-html="event.details"></span>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn flat color="secondary">
                      Cancel
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </template>
          </template>
        </v-calendar>
      </v-sheet>
    </v-flex>
<!-- FIN CALENDARIO -->

<!-- ANTERTIOR MES CALENDARIO -->
    <v-flex sm4 xs12 class="text-sm-left text-xs-center">
      <v-btn @click="$refs.calendar.prev()">
        <v-icon dark left>
          keyboard_arrow_left
        </v-icon>
        ANTERIOR
      </v-btn>
    </v-flex>
    <v-flex sm4 xs12 class="text-xs-center">

<!-- SIGUIENTE MES CALENDARIO -->
    </v-flex>
    <v-flex sm4 xs12 class="text-sm-right text-xs-center">
      <v-btn @click="$refs.calendar.next()">
        SIGUIENTE
        <v-icon right dark>
          keyboard_arrow_right
        </v-icon>
      </v-btn>
    </v-flex>

  </v-layout>
</template>








<!-- INICIO SCRIPT -->
<script>
  import axios from 'axios'
  export default {
    // SCRIPT DATOS
    data: () => ({
      mes: new Date().toISOString().substr(0, 7),
      today: new Date().toISOString().substr(0, 10),
      events: [],
      type: 'month',
      start: new Date().toISOString().substr(0, 10),
      end: '2020-01-01',
      titulo:'',
      detalle:'',
      fecha:'',
      formTitle:'Ingreso de Evento',
      picker: new Date().toISOString().substr(0, 10),
      dialog : false,
      editedIndex: -1
    }),

    // SCRIPT PROPIEDADES COMPUTADAS
    computed: {
      eventsMap() {
        const map = {}
        this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e))
        return map
      }
    },
    // SCRIPT EVENTO INICIALIZAR
    created() {
      this.listar();
    },
    // SCRIPT METODOS
    methods: {
      open(event) {
        alert(event.title)
      },
      listar() {
              let me = this;
              let header = {
                "Authorization": "Bearer " + this.$store.state.token
              };
              let configuracion = {
                headers: header
              };
              axios.get('api/Eventos/Listar', configuracion).then(function (response) {
                console.log(response.data);
                me.events = response.data;
              }).catch(function (error) {
                console.log(error);
              });
      },
      close () {
                this.dialog = false;
                this.limpiar();
      },
      limpiar(){
                this.titulo="";
                this.detalle="";
                this.fecha="";
     },
            guardar () {
                if (this.validar()){
                    return;
                }
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                if (this.editedIndex > -1) {
                    //Código para editar
                    let me=this;
                    axios.put('api/Personas/Actualizar',{
                        'idpersona':me.id,
                        'tipo_persona':'Cliente',
                        'nombre':me.nombre,
                        'tipo_documento': me.tipo_documento,
                        'num_documento':me.num_documento,
                        'direccion':me.direccion,
                        'telefono': me.telefono,
                        'email':me.email                       
                    },configuracion).then(function(response){
                        me.close();
                        me.listar();
                        me.limpiar();                        
                    }).catch(function(error){
                        console.log(error);
                    });
                } else {
                    //Código para guardar
                    let me=this;
                    axios.post('api/Personas/Crear',{
                        'tipo_persona':'Cliente',
                        'nombre':me.nombre,
                        'tipo_documento': me.tipo_documento,
                        'num_documento':me.num_documento,
                        'direccion':me.direccion,
                        'telefono': me.telefono,
                        'email':me.email
                    },configuracion).then(function(response){
                        me.close();
                        me.listar();
                        me.limpiar();                        
                    }).catch(function(error){
                        console.log(error);
                    });
                }
            },
            validar(){
                this.valida=0;
                this.validaMensaje=[];

                if (this.nombre.length<3 || this.nombre.length>100){
                    this.validaMensaje.push("El nombre debe tener más de 3 caracteres y menos de 100 caracteres.");
                }
                if (!this.tipo_documento){
                    this.validaMensaje.push("Seleccione un tipo documento.");
                }
                if (this.validaMensaje.length){
                    this.valida=1;
                }
                return this.valida;
            }



    }
  }
</script>


<style lang="stylus" scoped>
  .my-event {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #1867c0;
    color: #ffffff;
    border: 1px solid #1867c0;
    width: 100%;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
  }
</style>