<template>
  <div class="card">
    <div class="card-body">
      <h2 class="card-title">Doughnut</h2>
         <v-btn @click="ListarConsulta()" color="primary" >Consultar</v-btn>
 <v-btn @click=" deleteText ()" color="primary" >Eliminar</v-btn>
 <v-btn @click=" crearid()" color="primary" >Crear</v-btn>

         
    </div>
<div id="entrada2"> 
    <div id="grafico" ref="entrada" class="card-img-bottom"> <chartjs-doughnut :bind="true" :datasets="datasets" :labels="labels" :option="option" /></div>

</div>
<div id="app">
	<h1>Accediendo a Elementos del DOM utilizando vm.$refs</h1>
	<h2>Añade texto a la página</h2>
	<input type="text" ref="text">
	<br>
	<br>
	<button type="button" @click="addText">Guardar</button>
	<button type="button" @click="deleteText">Borrar</button>
	<p ref="textField"></p>
</div>

  </div>
</template>

<script>
     import axios from 'axios';
     import Chart from 'chart.js';
export default {
  data() {
    return {
      datasets: [
        {
               data: [10, 20, 40],
          backgroundColor: ["#f36e60", "#ffdb3b", "#185190"],
          hoverBackgroundColor: ["#fbd2cd", "#fef5c9", "#d1e3f7"]
        }
      ],
      labels: ["Foo", "Bar", "Baz"],
      option: {},
        mesesValores:null,
        nombresMeses:[],
        totalMeses:[]
    };
  },methods:{

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


               console.log( "Antes")
               console.log( this.datasets[0].data )
             this.datasets[0].data.push([10, 20, 40])
                   console.log( "Despues")
             console.log( this.datasets[0].data )
             
           

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

               
            }  ,deleteTodo: function (id) {
    eventHub.$emit('delete-todo', id)
  }
            ,eliminarid(){
document.getElementById('grafico').remove();

            }

             ,crearid(){

document.getElementById('grafico2').append('    <div id="grafico" class="card-img-bottom"> <chartjs-doughnut :bind="true" :datasets="datasets" :labels="labels" :option="option" /></div>')

            },	addText () {
			const text = this.$refs.entrada
			const textField = this.$refs.entrada
			textField.innerHTML = '<chartjs-doughnut :bind="true" :datasets="datasets" :labels="labels" :option="option" />' + text
		},
		deleteText () {
			const textField = this.$refs.entrada
			textField.innerHTML = '<chartjs-doughnut :bind="true" :datasets="datasets" :labels="labels" :option="option" />'
		}
        }

      



 
};
</script>