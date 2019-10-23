<template>
  <v-layout align-start>
        <v-flex>
            <v-toolbar flat color="white">
                <v-toolbar-title>Prestamos</v-toolbar-title>
                    <v-divider
                    class="mx-2"
                    inset
                    vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
                    <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda Nrosocio" single-line hide-details></v-text-field>
                    
                    
                    
                    <v-spacer></v-spacer>
                  <v-btn color="primary" @click="listar">Resetear</v-btn>
                  
              
                    <v-dialog v-model="dialog" max-width="1500px">
                        <!-- <v-btn slot="activator" color="primary" dark class="mb-2">Nuevo</v-btn> -->
                        <!-- <v-card>
                            <v-card-title>
                            <span class="headline">Detalle Credito</span>
                            </v-card-title>
                
                            <v-card-text> -->
                            <!-- <v-container grid-list-md>
                                <v-layout wrap>

                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="id_solicitud" label="Id Solicitud" readonly="true">
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="estado" label="Estado" readonly="true">
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="fecha_solicitud" label="Fecha Solicitud" readonly="true">
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="producto" label="Producto" readonly="true">
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="estado" label="Estado" readonly="true">
                                    </v-text-field>
                                </v-flex>

                                </v-layout>
                            </v-container> -->
<!-- 
                            </v-card-text>
                    
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" flat @click.native="close">Cancelar</v-btn>
                                <v-btn color="blue darken-1" flat @click.native="guardar">Guardar</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog> -->

                    <!-- 
                    <v-dialog v-model="adModal" max-width="290">
                        <v-card>
                            <v-card-title class="headline" v-if="adAccion==1">¿Activar Item?</v-card-title>
                            <v-card-title class="headline" v-if="adAccion==2">¿Desactivar Item?</v-card-title>
                            <v-card-text>
                                Estás a punto de 
                                <span v-if="adAccion==1">Activar </span>
                                <span v-if="adAccion==2">Desactivar </span>
                                el ítem {{ adNombre }}
                            </v-card-text>
                            
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="green darken-1" flat="flat" @click="activarDesactivarCerrar">
                                    Cancelar
                                </v-btn>
                                <v-btn v-if="adAccion==1" color="orange darken-4" flat="flat" @click="activar">
                                    Activar
                                </v-btn>
                                <v-btn v-if="adAccion==2" color="orange darken-4" flat="flat" @click="desactivar">
                                    Desactivar
                                </v-btn>
                            </v-card-actions>

                        </v-card>
                        -->
 <v-card  v-for="(credito, id) in creditosdetalle" :key="id">
   
   <v-card-title>
   
    <v-layout  justify-center>

     <v-flex xs12 sm6 md2 mr-1>
          <v-text-field
            label="ID SOLICITUD"
            outline
            color='primary'

            :value="credito.id_solicitud"
            readonly
          ></v-text-field>
        </v-flex>


     <v-flex xs12 sm6 md2 mr-1>
          <v-text-field
            label="EJECUTIVO"
            outline
            :value="credito.ejecutiva"
         readonly
          ></v-text-field>
        </v-flex>

         <v-flex xs12 sm6 md2 mr-1>
          <v-text-field
            label="VENDEDOR"
            outline
            :value="credito.ejecutivo_convenio"
           readonly
          ></v-text-field>
        </v-flex>

           <v-flex xs12 sm6 md2 mr-1>
          <v-text-field
            label="FECHA SOLICITUD"
            outline
            :value="credito.fecha_solicitud"
        readonly
          ></v-text-field>
        </v-flex>

         <v-flex xs12 sm6 md2 mr-1>
          <v-text-field
            label="SEDE"
            outline
            :value="credito.sede"
          readonly
          ></v-text-field>
        </v-flex>

   </v-layout>
    </v-card-title>
   
   
   
    <v-tabs
      v-model="tab"
      color="#709D04"
      centered
      dark
      icons-and-text
     
    
    >

 



      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#tab-1">
     Socio
        <v-icon>person</v-icon>
      </v-tab>

      <v-tab href="#tab-2">
        Prestamo
        <v-icon>local_atm</v-icon>
      </v-tab>

      <v-tab href="#tab-3">
        Financiero
        <v-icon>business_center</v-icon>
      </v-tab>

    <v-tab href="#tab-4">
        Economica
        <v-icon>money</v-icon>
      </v-tab>
 
    <v-tab href="#tab-5">
        Renta
        <v-icon>work</v-icon>
      </v-tab>
    
    <v-tab href="#tab-6">
        Puntajes
        <v-icon>speaker_notes</v-icon>
      </v-tab>
    
    <v-tab href="#tab-7">
        Comentarios
        <v-icon>feedback</v-icon>
      </v-tab>
   

  
 </v-tabs>  

    <!-- <v-tabs-items v-model="tab">
     
      <v-tab-item>
        <v-card flat>
          <v-card-text>DSFSDFSSD</v-card-text>
        </v-card>
      </v-tab-item>

    </v-tabs-items> -->

    <v-tabs-items v-model="tab">
      <v-tab-item value="tab-1" >
        <v-card flat>
          <v-card-text>

<v-container grid-list-md>
 <v-layout wrap>
                                
                                
                                
                                <v-flex xs12 sm6 md3>
                                    <v-text-field  v-model="credito.nombre" label="Nombre" readonly >
                                </v-text-field>

                                </v-flex>
                                <v-flex xs12 sm6 md3>
                                    <v-text-field v-model="credito.rut" label="Rut" readonly>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md3>
                                    <v-text-field v-model="credito.nrosocio" label="Nrosocio" readonly>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md3>
                                    <v-text-field v-model="credito.anos_antiguedad" label="Antiguedad Socio" readonly>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md3>
                                    <v-text-field v-model="credito.anos_contrato" label="Antiguedad Laboral" readonly>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md3>
                                    <v-text-field v-model="credito.edad" label="Edad" readonly>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md3>
                                    <v-text-field v-model="credito.tiporenta" label="Tipo Renta" readonly>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md3>
                                    <v-text-field v-model="credito.region" label="Region" readonly>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md3>
                                    <v-text-field v-model="credito.tiporenta" label="Tipo de renta" readonly>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md3>
                                    <v-text-field v-model="credito.objetivo" label="Objetivo" readonly>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md3>
                                    <v-text-field v-model="credito.protestosmorocidades" label="Protestos y Morocidades" readonly >
                                    </v-text-field>
                                </v-flex>
                                
                                <v-flex xs12 sm6 md3>
                                    <v-text-field v-model="credito.comportamiento_baja_clasificacion" label="Clasificación mas Baja" readonly >
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md3>
                                    <v-text-field v-model="credito.comportamiento_abonocapital" label="Número de Clasificaciones Negativas en últimos 24 meses" readonly :error="credito.comportamiento_abonocapital>0 ? true : false" :append-icon="credito.comportamiento_abonocapital>0 ? 'error_outline' : ''">
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md3>
                                    <!-- <v-text-field v-model="credito.comportamiento_clasificacion" label="Número de Abonos de Capital en últimos 24 meses" readonly error :append-icon="show4 ? 'visibility' : 'visibility_off'"> -->
                                       <v-text-field v-model="credito.comportamiento_clasificacion" label="Número de Abonos de Capital en últimos 24 meses" readonly :error="credito.comportamiento_clasificacion>0 ? true : false" :append-icon="credito.comportamiento_clasificacion>0 ? 'error_outline' : ''">
                                    </v-text-field>
                                </v-flex>




                                

</v-layout>
</v-container>



          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item  value="tab-2" >
        <v-card flat>
           <v-card-text>

                                <v-container grid-list-md>
                                <v-layout wrap>
                                
                                
                                
                                <v-flex xs12 sm6 md3>
                                    <v-text-field  v-model="credito.monto_solicitado" label="Monto Solicitado" readonly prefix="$">
                                </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md3>
                                    <v-text-field v-model="credito.nrocuotas" label="Plazo" readonly>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md3>
                                    <v-text-field v-model="credito.primera_cuota" label="Cuota Inicial" readonly prefix="$">
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md3>
                                    <v-text-field v-model="credito.cuotA_ULTIMA" label="Cuota FInal" readonly prefix="$">
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md3>
                                    <v-text-field v-model="credito.tasa_real" label="Tasa Real" readonly>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md3>
                                    <v-text-field v-model="credito.tasa_solicitada" label="Tasa Solicitud" readonly>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md3>
                                    <v-text-field v-model="credito.tasa_castigada" label="Tasa Castigo" readonly>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md3>
                                    <v-text-field v-model="credito.tasa" label="Tasa Final" readonly>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md3>
                                    <v-text-field v-model="credito.producto" label="Producto" readonly>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md3>
                                    <v-text-field v-model="credito.forpago" label="Forma de Pago" readonly>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md3>
                                    <v-text-field v-model="credito.formadepago2" label="Tipo forma de Pago" readonly >
                                    </v-text-field>
                                </v-flex>
                                
                                <v-flex xs12 sm6 md3>
                                    <v-text-field v-model="credito.prepago" label="Monto Prepago" readonly prefix="$">
                                    </v-text-field>
                                </v-flex>

                                <v-flex xs12 sm6 md3>
                                    <v-text-field v-model="credito.disponible" label="Monto Disponible" readonly prefix="$">
                                    </v-text-field>
                                </v-flex>

                                <v-flex xs12 sm6 md3>
                                       <v-text-field v-model="credito.capital" label="Aporte Capital" readonly prefix="$">
                                    </v-text-field>
                                </v-flex>




                                <v-flex xs12 sm6 md3>
                                       <v-text-field v-model="credito.monto_capital" label="Monto Capital Acumulado" readonly prefix="$">
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md3>
                                       <v-text-field v-model="credito.cuotas_prepago" label="Monto Cuotas Prepagada" readonly prefix="$">
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md3>
                                       <v-text-field v-model="credito.fechaprimervencimiento" label="Fecha Primer Vencimiento" readonly >
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md3>
                                       <v-text-field v-model="credito.ncreditos" label="Nro Prestamos" readonly >
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md3>
                                       <v-text-field v-model="credito.renegocia_refinancia" label="Refinancia / Renegocia" readonly >
                                    </v-text-field>
                                </v-flex>




                                <v-flex xs12 sm6 md3>
                                       <v-text-field v-model="credito.plataforma" label="Plataforma" readonly >
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md3>
                                       <v-text-field v-model="credito.dias_gracia" label="Dias Gracia" readonly >
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md3>
                                       <v-text-field v-model="credito.nroPrepagos" label="Nro Prepagos" readonly >
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md3>
                                       <v-text-field v-model="credito.rutAval1" label="Aval 1" readonly >
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md3>
                                       <v-text-field v-model="credito.rutAval2" label="Aval 2" readonly >
                                    </v-text-field>
                                </v-flex>

                         

                                  </v-layout>
                                  </v-container>



          </v-card-text>
        </v-card>
      </v-tab-item>
      
      <v-tab-item  value="tab-3" >
        <v-card flat>
                                 <v-container grid-list-md>
                                <v-layout wrap>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field  v-model="credito.rlp" label="RLP" readonly prefix="$">
                                </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field v-model="credito.cargaFinanciera" label="Carga Financiera Externa" readonly prefix="$">
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field v-model="credito.rentaLiquidaDepurada" label="Renta Liquida Depurada" readonly prefix="$">
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field v-model="credito.activos" label="Activos" readonly prefix="$">
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field v-model="credito.propiedades" label="Propiedades" readonly prefix="$">
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field v-model="credito.vehiculos" label="Vehiculos" readonly prefix="$">
                                    </v-text-field>
                                </v-flex>                                
                                  </v-layout>
                                  </v-container>



        </v-card>
      </v-tab-item>

       <v-tab-item  value="tab-4" >
        <v-card flat>
                                 <v-container grid-list-md>
                                <v-layout wrap>
       <v-card-text>Datos Economicos</v-card-text>
                                  </v-layout>
                                  </v-container>
   
        </v-card>
      </v-tab-item>

       <v-tab-item  value="tab-5" >
        <v-card flat>
                                 <v-container grid-list-md>
                                <v-layout wrap>
          <v-card-text>Datos Rentas</v-card-text>
                                  </v-layout>
                                  </v-container>


        </v-card>
      </v-tab-item>

       <v-tab-item  value="tab-6" >
        <v-card flat>

                                 <v-container grid-list-md>
                                <v-layout wrap>
          <v-card-text>Datos Puntajes</v-card-text>
                                  </v-layout>
                                  </v-container>

        </v-card>
      </v-tab-item>

       <v-tab-item  value="tab-7" >
        <v-card flat>

                                 <v-container grid-list-md>
                                <v-layout wrap>
          <v-card-text>Datos Comentarios</v-card-text>
                                  </v-layout>
                                  </v-container>



        </v-card>
      </v-tab-item>

    </v-tabs-items>






  </v-card>

 </v-dialog> 

</v-toolbar>


            <v-data-table
                :headers="headers"
                :items="creditos"
                :search="search"
                class="elevation-1"
            >
                <template slot="items" slot-scope="props">
                    <td class="justify-center layout px-0">
                        <v-icon
                        @click="editItem(props.item)"
                        >
                        search
                        </v-icon>
                    </td>
                    <td>
                        <div v-if=" props.item.estado.trim() === 'DESCARTADO' ">
                            <v-chip color="grey lighten-1" >Descartado</v-chip>
                        </div>
                        <div v-else-if=" props.item.estado.trim() === 'Enviado a Riesgo' ">
                            <v-chip color="light-blue accent-2">Riesgo</v-chip>
                        </div>
                        <div v-else-if=" props.item.estado.trim() === 'ENVIADO A COMERCIAL' ">
                            <v-chip color="light-blue accent-2">Comercial</v-chip>
                        </div>
                        <div v-else-if=" props.item.estado.trim() === 'Enviado por Dep.riesgo como RECOMENDADO' ">
                            <v-chip color="lime accent-2">Recomendado Riesgo</v-chip>
                        </div>
                        <div v-else-if=" props.item.estado.trim() === 'Enviado por Dep.Comercial como RECOMENDADO' ">
                            <v-chip color="lime accent-2">Recomendado Comercial</v-chip>
                        </div>                         
                        <div v-else-if=" props.item.estado.trim() === 'Enviado por Dep.riesgo como RECOMENDADO CONDICIONAL' ">
                            <v-chip color="yellow accent-2">Recomendado Condicional</v-chip>
                        </div>
                        <div v-else-if=" props.item.estado.trim() === 'Enviado por Dep.riesgo como NO RECOMENDADO' ">
                            <v-chip color="orange accent-2">No Recomendado</v-chip>
                        </div>
                        <div v-else-if=" props.item.estado.trim() === 'Enviado a Agente para su Liberación' ">
                            <v-chip color="light-blue accent-2" >Agente</v-chip>
                        </div>
                        <div v-else-if=" props.item.estado.trim() === 'RECHAZADO, ENVIADO A APELACIÓN DEL COMITE CCI' ">
                            <v-chip color="light-blue accent-2" >En Apelación</v-chip>
                        </div>

                                      
                     
                        <div v-else-if=" props.item.estado.trim() === 'APROBADO' ">
                            <v-chip color="light-green accent-3">APROBADO</v-chip>
                        </div>
                        <div v-else-if=" props.item.estado.trim() === 'APROBADO CON CONDICIONAL' ">
                            <v-chip color="lime accent-3">APROBADO</v-chip>
                        </div>
                        <div v-else-if=" props.item.estado.trim() === 'APROBADO CONDICIONAL, POR APELACIÓN' ">
                            <v-chip color="lime accent-3">APROBADO C/A</v-chip>
                        </div>
                        <div v-else-if=" props.item.estado.trim() === 'RECHAZADO' ">
                            <v-chip color="red accent-2">RECHAZADO</v-chip>
                        </div>   
                        <div v-else-if=" props.item.estado.trim() === 'RECHAZADO, RECHAZADA APELACIÓN' ">
                            <v-chip color="red accent-2">RECHAZADO, C/A</v-chip>
                        </div>   

                                                   
                        <div v-else-if=" props.item.estado.trim() === 'RECHAZADO, SIN APELACIÓN' ">
                            <v-chip color="red accent-2">RECHAZADO, S/A</v-chip>
                        </div>   
                                    
                                                                                                      
                    </td>
                    <td>{{ props.item .id_solicitud }}</td>
                    <td>{{ props.item.nrosocio }}</td>
                    <td>{{ props.item.fecha_solicitud }}</td>
                    <td>{{ props.item.producto }}</td>
                    <td>{{ props.item.objetivo }}</td>
                    <td>{{ props.item.ejecutiva }}</td>

                    
                    <td>{{ props.item.tasa }}</td>
                    <td>{{ props.item.nrocuotas }}</td>
                    <td>{{ props.item.corcredito }}</td>
                
                </template>
                <template slot="no-data">
                <v-btn color="primary" @click="listar">Resetear</v-btn>
                </template>
            </v-data-table>
        </v-flex>
    </v-layout>
</template>


<script>
     import axios from 'axios'
    export default {
        data(){
            return {

                    tab: null,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
         search: '',
          dialog: false,
          leer: false,
creditos: [],
creditosdetalle: [],
        headers: [
            { text: 'Opciones', value: 'opciones', sortable: false },
                 { text: 'Estado', value: 'estado', sortable: false },
          { text: 'id solicitud', value: 'id solicitud'},
           { text: 'nrosocio', value: 'nrosocio' },
           { text: 'Fecha', value: 'fecha_solicitud' },
           { text: 'producto', value: 'producto' },
           { text: 'objetivo', value: 'objetivo' },
           { text: 'Ejecutivo', value: 'ejecutiva' },
           { text: 'tasa', value: 'tasa' },
           { text: 'nrocuotas', value: 'nrocuotas' },
           { text: 'corcredito', value: 'corcredito' }
        ],
    id_solicitud:'',
    nrosocio:'',
    fecha_solicitud:'',
    producto:'',
    objetivo:'',
    ejecutiva:'',
    estado:'',
    tasa:'',
    nrocuotas:'',
    corcredito:'',
    nombre:''
    }
    },
    created () {
            this.listar();
          
        },
        methods:{
           
            listar(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                 
                let configuracion= {headers : header};
                axios.get('api/Riesgo/Listar',configuracion).then(function(response){
                    me.creditos=response.data;
                
                }).catch(function(error){
                    console.log(error);
                });
            },   listarDetalle(){
              
                let me=this;
                console.log(me.id_solicitud)
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                 
                let configuracion= {headers : header};
                axios.get('api/Riesgo/ListarDetalle/'+me.id_solicitud,configuracion).then(function(response){
                  
            console.log(response.data)
                  me.creditosdetalle=response.data;
                
                }).catch(function(error){
                    console.log(error);
                });
            },
            editItem (item) {
                 this.id_solicitud=item.id_solicitud;
                 this.estado=item.estado;
                 this.fecha_solicitud=item.fecha_solicitud;
                 this.producto=item.producto;
                 this.objetivo=item.objetivo;
                // this.nombre=item.nombre;
                // this.tipo_documento=item.tipo_documento;
                // this.num_documento=item.num_documento;
                // this.direccion=item.direccion;
                // this.telefono=item.telefono;
                // this.email=item.email;
                // this.password=item.password_hash;
                // this.passwordAnt=item.password_hash;
                // this.editedIndex=1;
                this.dialog = true

                this.listarDetalle()
            }
        }
}

</script>
