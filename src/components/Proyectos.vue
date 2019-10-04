<template>
  <v-layout align-start>
        <v-flex>
     



   <!-- INICIO TOOLBAR-->
            <v-toolbar flat color="white">
               <!--TOOLBAR- TITULO -->
                <v-toolbar-title>Proyectos TI</v-toolbar-title>
                   <!--TOOLBAR- DIVISOR -->
                    <v-divider
                    class="mx-2"
                    inset
                    vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
                    <!--TOOLBAR-BTN-BUSCAR -->
                    <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda Estado" single-line hide-details></v-text-field>
                    <v-spacer></v-spacer>
                     
                     <!--TOOLBAR-INICIO-DIALOG-NUEVO PROYECTO-->
                     <v-dialog v-model="dialog2"  max-width="700px" persistent >
                       
                        <v-btn slot="activator" color="primary" dark class="mb-2">Nuevo</v-btn>
                        <v-card>
                            <v-card-title>
                            <span class="headline">Crear Proyecto</span>
                            </v-card-title>
                            <v-card-text>
                             
                            <v-container grid-list-md>
                                <v-layout wrap>
                                <v-flex xs12 >
                                    <v-text-field v-model="$v.proyecto.xProyecto.$model" label="Nombre proyecto" :error="$v.proyecto.xProyecto.$error ? true :false" :counter="$v.proyecto.xProyecto.$params.maxLength.max">
                                    </v-text-field>
                               
                             
                                </v-flex>
                            
                             
                                <v-flex xs12 >
                                    <v-select v-model="$v.proyecto.xSistema.$model"
                                    :items="sistemas" label="Sistema"  :error="$v.proyecto.xSistema.$error ? true :false"  >
                                    </v-select>
                                </v-flex>
                                 
                                 
                                 


                                   <v-flex xs12 md6> 
                                       <div class="subheading">Fecha de Inicio</div>
                                  <v-date-picker v-model="picker" color="blue lighten-1" locale="es-cl"></v-date-picker>
                                  </v-flex> 
                               <v-flex xs12 md6> 
                                   <div class="subheading">Fecha de Termino</div>
                                  <v-date-picker v-model="picker2" color="blue lighten-1" locale="es-cl"></v-date-picker>
                                  </v-flex> 


                                <v-flex xs12 sm6 md6>
                                    <v-select v-model="$v.proyecto.xEspecialista.$model"  :error="$v.proyecto.xEspecialista.$error ? true :false" 
                                    :items="especialistas" label="Especialista">
                                    </v-select>
                                </v-flex>

                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="$v.proyecto.xSolicitado.$model" label="Solicitado"  :error="$v.proyecto.xSolicitado.$error ? true :false" :counter="$v.proyecto.xSolicitado.$params.maxLength.max">
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-select v-model="$v.proyecto.xTipo.$model" :error="$v.proyecto.xTipo.$error ? true :false" 
                                    :items="tipologias" label="Tipo de Proyecto">
                                    </v-select>
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
                              <v-btn color="blue darken-1" flat :disabled="$v.proyecto.$invalid" @click.native="guardar">Guardar</v-btn>
                                      <!-- <v-btn color="blue darken-1" flat :disabled="$v.$invalid" @click.native="submitProyecto()">Guardar</v-btn> -->
                                
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                        <!--TOOLBAR-FIN-DIALOG-NUEVO PROYECTO-->

                 <!--TOOLBAR-BTN-ACTUALIZAR-->
                  <v-btn color="primary" @click="listar">Actualizar</v-btn>


                   <!--TOOLBAR-INICIO-DIALOG-NUEVO EVENTO-->
                    <v-dialog v-model="dialog" max-width="1500px">
                    <v-card >
                    <v-card-title class="headline"> <v-chip label outline  dark color="blue">{{this.Proyecto}}</v-chip>

   
                      <!--TOOLBAR-INICIO-DIALOG-NUEVO EVENTO-->
                       <v-dialog v-model="dialog3"  max-width="500px">
                       <!-- persistent -->
                        <v-btn slot="activator" color="primary" dark class="mb-2"><v-icon dark>add</v-icon></v-btn>

                        <v-card>
                            <v-card-title>
                            <span class="headline">Crear Evento</span>
                            </v-card-title>
                            <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                  
                                <v-flex xs12 >
                                    <v-text-field v-model="xTitulo" label="Titulo">
                                    </v-text-field>
                                </v-flex>

                                <v-flex xs12 >
                                    <v-textarea v-model="xDetalle" label="Detalle">
                                    </v-textarea>
                                </v-flex>

                                <v-flex xs12 >
                                <v-slider
                                    v-model="xAvance.val"
                                    :label="xAvance.label"
                                    :thumb-color="xAvance.color"
                                    thumb-label="always"
                                  ></v-slider>
                                  </v-flex>

                                <v-flex xs6 >
                                    <v-select v-model="xTipoEvento"
                                    :items="TipoEvento" label="Tipo">
                                    </v-select>
                                </v-flex>


                                  <v-flex xs6>
                                    <v-dialog
                                      ref="dialog"
                                      v-model="modal"
                                      :return-value.sync="date3"
                                      persistent
                                      lazy
                                      full-width
                                      width="290px"
                                    >
                                      <template v-slot:activator="{ on }">
                                        <v-text-field
                                          v-model="date3"
                                          label="Fecha"
                                          prepend-icon="event"
                                          readonly
                                          v-on="on"
                                        ></v-text-field>
                                      </template>
                                      <v-date-picker v-model="date3" scrollable locale="es-cl" >
                                        <v-spacer></v-spacer>
                                        <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                                        <v-btn flat color="primary" @click="$refs.dialog.save(date3)">OK</v-btn>
                                      </v-date-picker>
                                    </v-dialog>
                                  </v-flex>
                                  
                                </v-layout>
                            </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" flat @click.native="close">Cancelar</v-btn>
                                <v-btn color="blue darken-1" flat @click.native="guardarEvento()">Guardar</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                     <!--TOOLBAR-FIN-DIALOG-NUEVO EVENTO-->
                      
                      
                     </v-card-title>
                    <v-container grid-list-md>
                       <v-layout wrap>
          <v-flex xs12 >
                   <v-timeline align-top>
                        <v-timeline-item
                        v-for="(evento, id) in eventos"
                        :key="id"
                        fill-dot
                        :color="evento.tipo.trim() === 'INICIO' ? 'cyan' : evento.tipo.trim() === 'CORREO' ? 'pink' :  evento.tipo.trim() === 'COLABORATIVO' ? 'blue' : evento.tipo.trim() === 'DESARROLLO' ? 'amber' : evento.tipo.trim() === 'TESTING' ? 'orange' :evento.tipo.trim() === 'FIN' ? 'green' :  '' "
                        :icon="evento.tipo.trim() === 'INICIO' ? 'vertical_align_top' : evento.tipo.trim() === 'CORREO' ? 'mail' :  evento.tipo.trim() === 'COLABORATIVO' ? 'perm_identity' : evento.tipo.trim() === 'DESARROLLO' ? 'developer_board' : evento.tipo.trim() === 'TESTING' ? 'devices_other' :evento.tipo.trim() === 'FIN' ? 'vertical_align_bottom' :  '' "
                        >
                        <v-card
                            :color="evento.tipo.trim() === 'INICIO' ? 'cyan' : evento.tipo.trim() === 'CORREO' ? 'pink' :  evento.tipo.trim() === 'COLABORATIVO' ? 'blue' : evento.tipo.trim() === 'DESARROLLO' ? 'amber' : evento.tipo.trim() === 'TESTING' ? 'orange' :evento.tipo.trim() === 'FIN' ? 'green' :  '' "
                            dark
                        >
                        <v-card-title class="title">{{evento.titulo}}</v-card-title>
                        <v-card-text class="white text--primary">
                        <p>{{evento.detalle}}</p>
                        </v-card-text>
                        <v-card-actions>
                        <v-icon class="mr-1">perm_data_setting</v-icon>
                        <span class="subheading mr-2">{{evento.avance}}%</span>
                        <v-layout
                        align-center
                        justify-end
                        >
                        <v-icon class="mr-1">date_range</v-icon>
                        <span class="subheading">{{fechacambiar(evento.fecha)}}</span>
                        </v-layout>
                        </v-card-actions>
                        </v-card>
                        </v-timeline-item>
                  </v-timeline>
                  </v-flex>

                      </v-layout>
                    </v-container>
                    </v-card>
                  </v-dialog> 
                  <!--TOOLBAR-FIN-DIALOG-NUEVO EVENTO-->
</v-toolbar>
  <!-- FIN TOOLBAR-->


   <!-- INICIO BODY-->
            <!-- INICIO TABLA-->
      
           

                     

   


            <v-data-table
                :headers="headers"
                :items="creditos"
                :search="search"
                class="elevation-1"
            >
                <template slot="items" slot-scope="props">
                    <td class="justify-center layout px-0">
                        <v-icon
                        @click="editItem(props.item) ,listarProyecto()"
                        >
                        search
                        </v-icon>
                    </td>
                     <td>
                        <div v-if=" props.item.estado.trim() === 'Inicio' ">
                            <v-chip color="grey lighten-1" >Inicio</v-chip>
                        </div>
                        <div v-else-if=" props.item.estado.trim() === 'Enviado a Riesgo' ">
                            <v-chip color="light-blue accent-2">Riesgo</v-chip>
                        </div>
                        <div v-else-if=" props.item.estado.trim() === 'Enviado por Dep.riesgo como RECOMENDADO' ">
                            <v-chip color="lime accent-2">Recomendado</v-chip>
                        </div>
                        <div v-else-if=" props.item.estado.trim() === 'EN DESARROLLO' ">
                            <v-chip color="yellow accent-2">En Desarrollo</v-chip>
                        </div>
                        <div v-else-if=" props.item.estado.trim() === 'Enviado por Dep.riesgo como NO RECOMENDADO' ">
                            <v-chip color="orange accent-2">No Recomendado</v-chip>
                        </div>
                        <div v-else-if=" props.item.estado.trim() === 'Enviado a Agente para su Liberación' ">
                            <v-chip color="light-blue accent-2" >Agente</v-chip>
                        </div>
                        <div v-else-if=" props.item.estado.trim() === 'FINALIZADO' ">
                            <v-chip color="light-green accent-3">Finalizado</v-chip>
                        </div>
                        <div v-else-if=" props.item.estado.trim() === 'APROBADO CON CONDICIONAL' ">
                            <v-chip color="lime accent-3">APROBADO</v-chip>
                        </div>
                        <div v-else-if=" props.item.estado.trim() === 'RECHAZADO' ">
                            <v-chip color="red accent-2">RECHAZADO</v-chip>
                        </div>                
                    </td>
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.proyecto }}</td>
                    <td>{{ fechacambiar(props.item.fecha_Entrega) }}</td>
                    <td>{{ fechacambiar(props.item.fecha_Solicitud) }}</td>
                    <td>{{ props.item.especialista  }}</td>
                    <td>{{ props.item.solicitado}}</td>
                    <td>{{ props.item.tipo }}</td>
                </template>
           
                <!-- <template slot="no-data">
                <v-btn color="primary" @click="listar">Actualizar</v-btn>
                </template> -->
            </v-data-table>
             <!-- FIN TABLA-->






<v-layout justify-center row fill-height pt-5>
<v-flex xs12 md6 >
  <div id="canvas-wrapper" ref="entrada">

<canvas  id="myChart"></canvas>
  </div>

</v-flex>
   
 </v-layout>




<!-- FIN BODY-->
<!-- FIN -->
</v-flex>        
 </v-layout>
</template>



 <!-- INICIO SCRIPT-->
<script>
import { required, minLength, maxLength  } from 'vuelidate/lib/validators';
     import axios from 'axios';
     import Chart from 'chart.js';
    export default {
      // INICIO DATA
        data(){
            return {

        tab: null,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        search: '',
        dialog: false,
        dialog2: false,
        dialog3: false,
        sistemas:['ARCHIVO','AUDITORIA','BSC','COBRANZA','GESTIONBD','LAUCOOP','PROVEEDORES','RIESGO','PREVENSIÓN DELITOS','OTRO','SIN SISTEMA'],
        especialistas:['Alejandro Astorga','Carlos Alfaro','Charlie Lopez','Cristián Campos','Ivan Hernandez','Sebastian Muñoz','Rossana Cerda'],
        tipologias:['Software','Hardware','Comunicaciones y Redes','Instalaciones de Hardware','Auditorías','Peritajes','Consultoría','Seguridad'],
        TipoEvento:['INICIO','CORREO','COLABORATIVO','DESARROLLO','TESTING','FIN'],
        creditos: [],
        headers: [
        { text: 'Opciones', value: 'opciones', sortable: false },
        { text: 'Estado', value: 'estado', sortable: false },
        { text: 'ID', value: 'ID'},
        { text: 'Proyecto', value: 'Proyecto' },
        { text: 'Fecha_Entrega', value: 'Fecha_Entrega' },
        { text: 'Fecha_Solicitud', value: 'Fecha_Solicitud' },
        { text: 'Especialista', value: 'Especialista' },
        { text: 'Solicitado', value: 'Solicitado' },
        { text: 'Tipo', value: 'Tipo' }
        ],

        ID :'',
        ID_USUARIO :'',
        Proyecto:'',
        Fecha_Entrega :'',
        Fecha_Solicitud :'',
        Especialista :'',
        Solicitado :'',
        Estado :'',
        Tipo :'',

        proyecto:{
        xProyecto :'',
        xSistema :'',
        xEspecialista :'',
        xSolicitado :'',
        xTipo :''
        },
        xTitulo:'',
        xDetalle:'',
        xTipoEvento:'',
        xAvance: { label: 'Avance', val: 0, color: 'blue' },
        picker: new Date().toISOString().substr(0, 10),
      picker2: new Date().toISOString().substr(0, 10),
        date3: new Date().toISOString().substr(0, 10),
        menu: false,
        modal: false,
        modal2: false,
        menu2: false,
        eventos: [],
        mesesValores:null,
        nombresMeses:[],
        totalMeses:[],
        xchar:null
    }
    },
    validations: {
    proyecto: {
    xProyecto:{required, maxLength: maxLength(40)},
    xSistema:{required},
    xEspecialista :{required},
    xSolicitado :{required, maxLength: maxLength(20)},
    xTipo:{required}
    }

    },
    // CREATE
    created () {
            this.listar(); 
    },
    // METODOS
        methods:{
    //   METODO LISTAR
            listar(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                 
                let configuracion= {headers : header};
                axios.get('api/Eventos/ListarProyectos',configuracion).then(function(response){
                    me.creditos=response.data;
                
                }).catch(function(error){
                    console.log(error);
                });
            },    
            //   METODO LISTAR PROYECTO
            listarProyecto(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                axios.get('api/Eventos/ListarProyectosDetalle/'+me.ID,configuracion).then(function(response){
                me.eventos=response.data;
                // console.log(response.data)
                }).catch(function(error){
                    console.log(error);
                });
            },
            //   METODO CAMBIAR FECHA
            fechacambiar(xfecha){
            var strA = xfecha
            var   strB = strA.slice(6,8) + '/' +strA.slice(4,6)  + '/' +strA.slice(0, 4)  ;
            return strB
            },
            //   METODO CAMBIAR FECHA2
            fechacambiar2(xfecha){
            var currentDate = xfecha;
            var dateArr     = currentDate.split('-');
            var val         =  dateArr[0] +dateArr[1]  +dateArr[2]
            return val
            }, submitProyecto() {
      this.$v.proyecto.$touch()
      if (this.$v.proyecto.$invalid) {
      console.log("SE GENERO UN EEROR")
      } else {
         console.log("DATOS CORRECTOS")
       
      }},
            //   METODO GUARDAR
            guardar () {
                // if (this.validar()){
                //     return;
                // }
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                    let me=this;
                    axios.post('api/Eventos/CrearProyecto',{
                        'ID_USUARIO':me.$store.state.usuario.idusuario,
                        'Proyecto': me.$v.proyecto.xProyecto.$model,
                        'Sistema': me.$v.proyecto.xSistema.$model,
                        'Fecha_Entrega':me.fechacambiar2(me.picker),
                        'Fecha_Solicitud':me.fechacambiar2(me.picker2),
                        'Especialista': me.$v.proyecto.xEspecialista.$model,
                        'Solicitado': me.$v.proyecto.xSolicitado.$model,
                        'Tipo': me.$v.proyecto.xTipo.$model,
                        'Estado':'Inicio'
                    },configuracion).then(function(response){
                         me.close();
                        me.listar();
                                          
                    }).catch(function(error){
                        console.log(error);
                    });
            },
            //   METODO GUARDAR EVENTO
            guardarEvento () {
                // if (this.validar()){
                //     return;
                // }
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                    let me=this;
                    axios.post('api/Eventos/CrearProyectoDetalle',{
                        'ID_PROYECTO':this.ID,
                        'titulo': this.xTitulo,
                        'detalle': this.xDetalle,
                        'avance':this.xAvance.val,
                        'fecha':me.fechacambiar2(me.date3),
                        'tipo': this.xTipoEvento,
                        'Estado':1
                    },configuracion).then(function(response){
                        me.closeE();
                        me.listarProyecto();               
                    }).catch(function(error){
                        console.log(error);
                    });
            },
            //   METODO EDITAR
            editItem (item) {
              // console.log(item.proyecto)
            this.ID =item.id ;
            this.Proyecto =item.proyecto ;
              //              this.ID_USUARIO=item.ID_USUARIO;
              //              this.Proyecto=item.Proyecto;
              //              this.Fecha_Entrega=item.Fecha_Entrega;
              //              this.Fecha_Solicitud =item.Fecha_Solicitud ;
              //              this.Especialista=item.Especialista ;
              //              this.Solicitado =item.Solicitado ;
              //              this.Estado=item.Estado ;
              //             this.Tipo =item.Tipo  ;
            this.dialog = true
            },
            //   METODO CERRAR PROYECTO
            close () {
                      this.dialog2 = false;
                      this.limpiar();      
                     this.ListarConsulta();
            },
            //   METODO CERRAR EVENTO
            closeE() {
                      this.dialog3 = false;
                      this.limpiarE();
            },
            //   METODO PROYECTO
            limpiar(){
                      this.$v.proyecto.xProyecto.$model="";
                      this.$v.proyecto.xSistema.$model="";
                      this.$v.proyecto.xEspecialista.$model="";
                      this.$v.proyecto.xSolicitado.$model= "";
                      this.$v.proyecto.xTipo.$model="";
                      this.picker= new Date().toISOString().substr(0, 10);
                      this.picker2= new Date().toISOString().substr(0, 10);
            },
            //   METODO EVENTO
            limpiarE(){

                    this.xTitulo="",
                    this.xDetalle  ="",
                    this.xAvance.val=0;
                    this.date3=new Date().toISOString().substr(0, 10)
                    this.xTipoEvento="";

            },
            //   METODO EVENTO
            limpiarGrafico(){
             this.mesesValores=null,
             this.nombresMeses=[],
             this.totalMeses=[]
            },
            loadProductosMasVendidos(){
              
              let me =this;
            
            me.mesesValores.map(function(x){
              me.nombresMeses.push(x.etiqueta);
              me.totalMeses.push(x.valor);
              });
            
            
            const textField = this.$refs.entrada
            textField.innerHTML = '<canvas  id="myChart"></canvas>'


              var ctx = document.getElementById('myChart');
       
		
            


               var mychart = new Chart(ctx, {
                  type: 'pie',
                  data: {
                      labels: me.nombresMeses,
                      datasets: [{
                          label: 'Sistema',
                          data: me.totalMeses,
                        
                          backgroundColor: [
                                   'rgba(255, 99, 132, 1)',
                              'rgba(54, 162, 235, 1)',
                              'rgba(255, 206, 86, 1)',
                              'rgba(75, 192, 192, 1)',
                              'rgba(153, 102, 255, 1)',
                              'rgba(255, 159, 64, 1)',
                              'rgba(255, 99, 132, 1)',
                              'rgba(54, 162, 235, 1)',
                              'rgba(255, 206, 86, 1)',
                              'rgba(75, 192, 192, 1)',
                              'rgba(153, 102, 255, 1)',
                              'rgba(255, 159, 64, 1)'
                          ],
                          borderColor: [
                              'rgba(255, 99, 132, 1)',
                              'rgba(54, 162, 235, 1)',
                              'rgba(255, 206, 86, 1)',
                              'rgba(75, 192, 192, 1)',
                              'rgba(153, 102, 255, 1)',
                              'rgba(255, 159, 64, 1)',
                              'rgba(255, 99, 132, 1)',
                              'rgba(54, 162, 235, 1)',
                              'rgba(255, 206, 86, 1)',
                              'rgba(75, 192, 192, 1)',
                              'rgba(153, 102, 255, 1)',
                              'rgba(255, 159, 64, 1)'
                          ],
                          borderWidth: 1
                      }]
                  },
                  options: {

                      scales: {
                          yAxes: [{
                              ticks: {
                                  beginAtZero: true
                              }
                          }]
                      },

   title: {
            display: true,
            text: 'Proyectos por Sistemas'
        },  tooltips: {
            // Disable the on-canvas tooltip
            enabled: false,

            custom: function(tooltipModel) {
                // Tooltip Element
                var tooltipEl = document.getElementById('chartjs-tooltip');

                // Create element on first render
                if (!tooltipEl) {
                    tooltipEl = document.createElement('div');
                    tooltipEl.id = 'chartjs-tooltip';
                    tooltipEl.innerHTML = '<table></table>';
                    document.body.appendChild(tooltipEl);
                }

                // Hide if no tooltip
                if (tooltipModel.opacity === 0) {
                    tooltipEl.style.opacity = 0;
                    return;
                }

                // Set caret Position
                tooltipEl.classList.remove('above', 'below', 'no-transform');
                if (tooltipModel.yAlign) {
                    tooltipEl.classList.add(tooltipModel.yAlign);
                } else {
                    tooltipEl.classList.add('no-transform');
                }

                function getBody(bodyItem) {
                    return bodyItem.lines;
                }

                // Set Text
                if (tooltipModel.body) {
                    var titleLines = tooltipModel.title || [];
                    var bodyLines = tooltipModel.body.map(getBody);

                    var innerHtml = '<thead>';

                    titleLines.forEach(function(title) {
                        innerHtml += '<tr><th>' + title + '</th></tr>';
                    });
                    innerHtml += '</thead><tbody>';

                    bodyLines.forEach(function(body, i) {
                        var colors = tooltipModel.labelColors[i];
                        var style = 'background:' + colors.backgroundColor;
                        style += '; border-color:' + colors.borderColor;
                        style += '; border-width: 2px';
                        var span = '<span style="' + style + '"></span>';
                        innerHtml += '<tr><td>' + span + body + '</td></tr>';
                    });
                    innerHtml += '</tbody>';

                    var tableRoot = tooltipEl.querySelector('table');
                    tableRoot.innerHTML = innerHtml;
                }

                // `this` will be the overall tooltip
                var position = this._chart.canvas.getBoundingClientRect();

                // Display, position, and set styles for font
                tooltipEl.style.opacity = 1;
                tooltipEl.style.position = 'absolute';
                tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
                tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
                tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
                tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
                tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
                tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
                tooltipEl.style.pointerEvents = 'none';
            }
        }
    
    
       
                  }
              });

                 function updateConfigByMutating() {
   mychart.options.title.text = 'new title';
    mychart.update();
};


            },
           
            
            ListarConsulta(){
                   
                let me=this;
               me.limpiarGrafico()
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                 
                let configuracion= {headers : header};
                axios.get('api/Eventos/ProyectosMes12',configuracion).then(function(response){
          
                 me.mesesValores=response.data;
    
                 me.loadProductosMasVendidos()
           


                }).catch(function(error){
                    console.log(error);
                });
            }
        }

        ,
         mounted() {
          this.ListarConsulta();
            }
}

</script>
 <!-- FIN SCRIPT-->




 <!-- INICIO STYLE-->
<style scoped>
  .bottom-gradient {
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
  }

  .repeating-gradient {
    background-image: repeating-linear-gradient(-45deg,
                        rgba(255,0,0,.25),
                        rgba(255,0,0,.25) 5px,
                        rgba(0,0,255,.25) 5px,
                        rgba(0,0,255,.25) 10px
                      );
  }
</style> 
<!-- FIN STYLE-->