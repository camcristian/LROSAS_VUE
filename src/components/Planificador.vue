<template>
  <v-layout wrap>

<!-- INICIO DIAGOLO  DE NUEVO EVENTO -->

    <v-dialog  v-model="dialog" max-width="500px">
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
                <v-date-picker v-model="picker"  locale="es-cl" full-width ></v-date-picker>
              </v-flex>


    <v-flex  xs12 >
            <p>Color Caja</p>
            <v-btn-toggle v-model="icon">
              <v-btn flat value="1">
                <span>BAJA</span>
                <v-icon style="color:#99CCCC">mode_comment</v-icon>
              </v-btn>
              <v-btn flat value="2">
                <span>MEDIA</span>
                <v-icon style="color:#99CCFF">mode_comment</v-icon>
              </v-btn>
              <v-btn flat value="3">
                <span>ALTA</span>
                <v-icon style="color:#3399FF">mode_comment</v-icon>
              </v-btn>
              <v-btn flat style="color:#003366" value="4">
                <span>PRIORITARIA</span>
                <v-icon style="color:yellow">mode_comment</v-icon>
              </v-btn>
            </v-btn-toggle>
          </v-flex>
              <!-- <v-flex xs12 sm12 md12 v-show="valida">
                <div class="red--text" v-for="v in validaMensaje" :key="v" v-text="v">
                </div>
              </v-flex> -->
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






  <!-- <v-flex sm2 xs12 class="text-sm-left  text-xs-center">
      <v-btn @click="$refs.calendar.prev()">
        <v-icon dark left>
          keyboard_arrow_left
        </v-icon>
        ANTERIOR MES
      </v-btn>
    </v-flex>

    <v-flex sm2 xs12 class="text-sm-left text-xs-center">
      <v-btn @click="$refs.calendar.next()">
        SIGUIENTE MES
        <v-icon right dark>
          keyboard_arrow_right
        </v-icon>
      </v-btn>
    </v-flex>
 -->


<!-- INICIO CALENDARIO -->
    <v-flex xs12 class="mb-3">
      <v-sheet height="500">
        <v-calendar ref="calendar" v-model="start" :type="type" :now="today" :value="today" color="primary"
          locale="es-cl">
          <template v-slot:day="{ date }">
            <template v-for="event in eventsMap[date]">
              <v-menu :key="event.title" v-model="event.open" full-width offset-x>
                <template v-slot:activator="{ on }">
                  <!-- <div v-if="!event.time" v-ripple v-bind:class="event.tipo===1 ? 'tipob' : 'tipoa'" v-on="on" v-html="event.title">
                  </div> -->
                    <div v-if="!event.time" v-ripple v-bind:class="{'tipo1': event.tipo===1, 'tipo2': event.tipo===2 , 'tipo3': event.tipo===3, 'tipo4': event.tipo===4 , 'tipoCancelado': event.estado===2, 'tipoatraso': event.estado===3, 'tipoRealizado': event.estado===4}" v-on="on" v-html="event.title">

                  </div>
               <!-- {{event.tipo}} -->
                 <!-- <div v-if="!event.time" v-ripple class="my-event" v-on="on" v-html="event.title">
                  </div> -->
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
                     <v-btn flat color="blue darken-2">
                      Volver
                    </v-btn>
                    <v-btn flat color="black" @click="descartar(event.id)"> 
                      Descartar
                    </v-btn>
                    <v-btn flat color="light-green darken-2" @click="realizado(event.id)"> 
                     Realizado
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
      tipo:'',
      formTitle:'Ingreso de Evento',
      picker: new Date().toISOString().substr(0, 10),
      dialog : false,
      editedIndex: -1,
      icon:'',
      id:''
    }),

    // SCRIPT PROPIEDADES COMPUTADAS
    computed: {
      eventsMap() {
        const map = {}
        this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e))
        return map
      },
       Tipos_Clases(traertipo) {

                return traertipo === 1 ? 'my-event' : 'tipoa'
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
                // if (this.validar()){
                //     return;
                // }
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
                    axios.post('api/Eventos/Crear',{
                        'ID_USUARIO':'3006',
                        'date': me.picker,
                        'tipo':me.icon,
                        'title':me.titulo,
                        'details': me.detalle
                    },configuracion).then(function(response){
                        me.close();
                        me.listar();
                        me.limpiar();                        
                    }).catch(function(error){
                        console.log(error);
                    });
                }
            },
            descartar(idx){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                axios.put('api/Eventos/Descartar/'+idx ,{},configuracion).then(function(response){
                    // me.adModal=0;
                    // me.adAccion=0;
                    // me.adNombre="";
                    // me.adId="";
                 me.dialog = false;
                me.limpiar();
                    me.listar();                       
                }).catch(function(error){
                    console.log(error);
                });
            },
            realizado(idx){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                axios.put('api/Eventos/Realizado/'+idx ,{},configuracion).then(function(response){
                    // me.adModal=0;
                    // me.adAccion=0;
                    // me.adNombre="";
                    // me.adId="";
                 me.dialog = false;
                me.limpiar();
                    me.listar();                       
                }).catch(function(error){
                    console.log(error);
                });
            }
            // ,
            // validar(){
            //     this.valida=0;
            //     this.validaMensaje=[];

            //     if (this.nombre.length<3 || this.nombre.length>100){
            //         this.validaMensaje.push("El nombre debe tener más de 3 caracteres y menos de 100 caracteres.");
            //     }
            //     if (!this.tipo_documento){
            //         this.validaMensaje.push("Seleccione un tipo documento.");
            //     }
            //     if (this.validaMensaje.length){
            //         this.valida=1;
            //     }
            //     return this.valida;
            // }



    }
  }
</script>


<style lang="stylus" scoped>
 
  .tipo1{  overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
     background-color: #99CCCC;
    color: #000;
    border: 1px solid #99CCCC;
   
    width: 100%;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
  }
  .tipo2{
   overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #99CCFF;
    color: #000;
    border: 1px solid #99CCFF;
    width: 100%;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
  }
  .tipo3{
   overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #3399FF;
    color: #ffffff;
    border: 1px solid #3399FF;
    width: 100%;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
  }
  .tipo4{
   overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #003366;
    color: #ffffff;
    border: 1px solid #003366;
    width: 100%;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
  }
  .tipoCancelado{
   overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #000;
    color: #ffffff;
    border: 1px solid #000;
    width: 100%;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
    text-decoration:line-through;
  }
  .tipoatraso{
   overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #DF0101;
    color: #ffffff;
    border: 1px solid #DF0101;
    width: 100%;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
  }
  .tipoRealizado{
   overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #33CC00;
    color: #ffffff;
    border: 1px solid #33CC00;
    width: 100%;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
    text-decoration:line-through;
  }
</style>