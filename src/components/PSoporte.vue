<template>



  <v-layout wrap>




<!-- FIN DIAGOLO  DE NUEVO EVENTO -->



<!-- INICIO CARD CALENDARIO-->
    <v-flex xs12>
      <v-card
        class="mx-auto"
    max-width="100%"
  max-height="0"
>




         <v-toolbar flat color="white">


       
     
          <v-btn outlined class="mr-2" @click="crearPDF()">
            <v-icon>print</v-icon>
    
          </v-btn>


      

        
           <v-btn fab text small  @click="$refs.calendar.prev()">
            <v-icon small>arrow_back_ios</v-icon>
          </v-btn>
          <v-btn fab text small @click="$refs.calendar.next()">
            <v-icon small>arrow_forward_ios</v-icon>
          </v-btn>
    

<v-toolbar-title>{{Calculames}}</v-toolbar-title>
 
  </v-toolbar>

  

        <v-card-text>
          <!-- <div>
            <h3 class="headline mb-0">Calendario</h3>
            <div> {{ card_text }} </div>
          </div> -->
<!-- INICIO CALENDARIO -->
    <v-flex xs12 class="mb-3">
      <v-sheet height="500">
        <v-calendar ref="calendar"  :end="end"  :start="start" v-model="start" :type="type" :now="today" :value="today" color="primary"
          locale="es-cl"

          >
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
                     <div class="text-xs-center">
          <v-chip>{{event.encargado}}</v-chip>
        </div>
                    <span v-html="event.details"></span>

                  </v-card-title>
         

                </v-card>
              </v-menu>
            </template>
          </template>
        </v-calendar>
      </v-sheet>
      </v-flex>
<!-- FIN CALENDARIO -->

        </v-card-text>

       
      </v-card>






    </v-flex>




<!-- FIN CARD CALENDARIO-->














<!-- 

<v-flex sm2 xs12 class="text-sm-left  text-xs-center">
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
    </v-flex> -->

<!-- 
  <v-flex xs12 class="text-sm-left text-xs-center">

      </v-flex> -->


  </v-layout>

</template>








<!-- INICIO SCRIPT -->
<script >
  import axios from 'axios'
  import {mapMutations} from "vuex";
  import jsPDF from 'jspdf';
  import AutoTable from 'jspdf-autotable';

  export default {
    // SCRIPT DATOS
    data: () => ({
      id:'',
      mes: new Date().toISOString().substr(0, 7),
      today: new Date().toISOString().substr(0, 10),
      events: [],
      type: 'month',
      start: new Date().toISOString().substr(0, 10),
      end: '2018-01-01',
      titulo:'',
      detalle:'',
      fecha:'',
      tipo:'',
      formTitle:'Ingreso de Evento',
      picker: new Date().toISOString().substr(0, 10),
      dialog : false,
      dialog2 : false,
      editedIndex: -1,
      icon:'',
      evento:[ {
          date: "2019-09-25",
details: "Restructuracion Sistema Giro Capital",
encargado: "Sebastian Muñoz     ",
estado: 4,
iD_USUARIO: 3006,
id: 1,
open: false,
tipo: 3,
title: "173Normalizacion Tabla Giro Capital",
        }],
      picker2:'',
      motivo:'',
      valida: 0,
      posponer: false,
      validaMensaje:[],
         select: [''],
        items: [
          'Carlos Alfaro',
          'Cristian Campos',
          'Rossana Cerda',
          'Ivan Hernandez',
          'Sebastian Muñoz',
          'Charlie Lopez',
          'Alejandro Astorga'
        ]
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
      ,Calculames(){
// var fecha = new Date(this.start);
// var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var options = { year: 'numeric', month: 'long' };
var  fecha =  new Date(this.start);
fecha.setDate(fecha.getDate() + 1);

return  fecha.toLocaleDateString("es-ES", options)
// this.start.substr(5, 2)


      },
      
    },
    // SCRIPT EVENTO INICIALIZAR
    created() {
       this.listarUsuario(this.$store.state.usuario.idusuario);
    },
    // SCRIPT METODOS
    methods: {
      
      crearPDF() {

var columns = [
  {title:"Codigo", dataKey: "ID"},
  {title:"Fecha", dataKey: "date"},
  {title:"Titulo", dataKey: "title"},
];

//  var rows =[{ID:"1",date:"1",title:"1"}];
 var rows =[];
this.events.map(function(x){
  rows.push({ ID:x.id, date:x.date, title:x.title });
});

 var doc = new jsPDF('p', 'pt');

doc.autoTable(columns,rows,{
    // styles: {fillColor: [255, 0, 0]},
    // columnStyles: {0: {halign: 'center', fillColor: [0, 255, 0]}}, // Cells in first column centered and green
    margin: {top: 60},
    addPageContent: function(data){
   doc.text("Calendario",40,30)
   }

});

 
   doc.save('Calendario.pdf')





      },
      ...mapMutations(['mostrarLoading','ocultarLoading'])
      ,
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
                
                me.events = response.data;
              }).catch(function (error) {
                console.log(error);
              });
      },
      listarUsuario(xUsuario) {
        // this.mostrarLoading({titulo:'Cargando Calendario',color:'black'})
              let me = this;
              let header = {
                "Authorization": "Bearer " + this.$store.state.token
              };
              let configuracion = {
                headers: header
              };
              axios.get('api/Eventos/ListarUsuario/3009', configuracion).then(function (response) {


               // console.log(me.events.data);
                me.events = response.data;
                 //  console.log(me.events);
              }).catch(function (error) {
                console.log(error);
              });
      //  this.ocultarLoading()
      },  
      posponeractivar () {
                this.posponer = true;
  
      },  
      cargarid (eventox){
                this.evento = eventox;
  
      }
      ,
        posponerdesctivar() {
                this.dialog = false;
      },
      close () {
                this.dialog = false;
                this.limpiar();
      },
      limpiar(){
                this.titulo="";
                this.detalle="";
                this.fecha="";
                this.valida= 0;
                this.icon="";
                this.select=[''];
     },
            guardar () {
                if (this.validar()){
                    return;
                }
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                // if (this.editedIndex > -1) {
                //     //Código para editar
                //     let me=this;
                //     axios.put('api/Personas/Actualizar',{
                //         'idpersona':me.id,
                //         'tipo_persona':'Cliente',
                //         'nombre':me.nombre,
                //         'tipo_documento': me.tipo_documento,
                //         'num_documento':me.num_documento,
                //         'direccion':me.direccion,
                //         'telefono': me.telefono,
                //         'email':me.email                       
                //     },configuracion).then(function(response){
                //         me.close();
                //         me.listarUsuario(me.$store.state.usuario.idusuario);
                //         me.limpiar();                        
                //     }).catch(function(error){
                //         console.log(error);
                //     });
                // } else {
                    //Código para guardar
                    let me=this;
                    axios.post('api/Eventos/Crear',{
                        'ID_USUARIO':me.$store.state.usuario.idusuario,
                        'date': me.picker,
                        'tipo':me.icon,
                        'title':me.titulo,
                        'details': me.detalle,
                        'Encargado': me.select

                    },configuracion).then(function(response){
                        me.close();
                        me.listarUsuario(me.$store.state.usuario.idusuario);
                        me.limpiar();                        
                    }).catch(function(error){
                        console.log(error);
                    });
                    // }
               
            },
            // ActualizarPosponer () {
                  
            //          let header={"Authorization" : "Bearer " + this.$store.state.token};
            //     let configuracion= {headers : header};
            //       let me=this;
            //       console.log(me.evento.id)
            //       console.log(me.motivo)
            //         axios.put('api/Eventos/Posponer',{
            //           'ID':me.evento.ID,
            //          'details': me.motivo,
            //          'Estado':2
            //         },configuracion).then(function(response){
            //             // me.close();
            //             // me.listarUsuario(me.$store.state.usuario.idusuario);
            //             // me.limpiar();            
            //             console.log(response.status)            
            //         }).catch(function(error){
            //             console.log(error);
            //         });
               
            // },
            
            
            
            guardarPosponer () {
                // if (this.validar()){
                //     return;
                // }
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                    let me=this;
                    axios.post('api/Eventos/Crear',{
                        'ID_USUARIO':me.$store.state.usuario.idusuario,
                        'date': me.picker2,
                        'tipo':me.evento.tipo,
                        'title':me.evento.title,
                        'details': '(Pospuesto '+ me.evento.date+') '+me.evento.details,
                        'Encargado': me.evento.encargado

                    },configuracion).then(function(response){
                        // me.close();
                        me.listarUsuario(me.$store.state.usuario.idusuario);

                        // me.limpiar();                        
                    }).catch(function(error){
                        console.log(error);
                    });
               
            },
            descartarPosponer(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                axios.put('api/Eventos/DescartarPosponer/'+me.evento.id ,{},configuracion).then(function(response){
                    // me.adModal=0;
                    // me.adAccion=0;
                    // me.adNombre="";
                    // me.adId="";
                //  me.dialog = false;
                // me.limpiar();
                //  me.listarUsuario(me.$store.state.usuario.idusuario);                     
                }).catch(function(error){
                    console.log(error);
                });
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
                 me.listarUsuario(me.$store.state.usuario.idusuario);                     
                }).catch(function(error){
                    console.log(error);
                });
            },
            Posponer(idx,motivox){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                axios.put('api/Eventos/Descartar/'+idx ,{},configuracion).then(function(response){
                 me.motivo=motivox;
                    // me.adAccion=0;
                    // me.adNombre="";
                    // me.adId="";
                //  me.dialog = false;
                // me.limpiar();
                //  me.listarUsuario(me.$store.state.usuario.idusuario);                     
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
                  me.listarUsuario(me.$store.state.usuario.idusuario);                   
                }).catch(function(error){
                    console.log(error);
                });
            }
            ,
            validar(){
                this.valida=0;
                this.validaMensaje=[];

                if (this.titulo.length<3 || this.titulo.length>50){
                    this.validaMensaje.push("-El titulo debe tener más de 3 caracteres y menos de 20 caracteres.");
                }
                if (this.detalle.length<3 || this.detalle.length>250){
                    this.validaMensaje.push("-El detalle debe tener más de 3 caracteres y menos de 250 caracteres.");
                }

                if (!this.picker){
                    this.validaMensaje.push("-Seleccione una fecha");
                }
                
                
                if (!this.icon){
                    this.validaMensaje.push("-Seleccione una categoria de mensaje");
                }
                
                  if (!this.select){
                    this.validaMensaje.push("-Seleccione una categoria de mensaje");
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