<template>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6 lg5 xl4>
            <v-card>
                <v-toolbar dark color="blue darken-3">
                    <v-toolbar-title>
                        Acceso V1.11
                    </v-toolbar-title>
                </v-toolbar>
                <v-card-text>

                   <v-text-field v-model="$v.email.$model" autofocus color="accent" label="Email"  outline required :error="$v.email.$error ? true :false" 
                     :append-icon="!$v.email.$error && $v.email.$model!=='' ? 'done' : ''"
                      >

                        </v-text-field>
                    <v-text-field v-model.Lazy="$v.password.$model" type="password" color="accent" label="Password" outline @keyup.enter="ingresar" required>
                        
                    </v-text-field>

                    <v-flex class="red--text" v-if="error">
                        {{error}}
                    </v-flex>

                </v-card-text>


                <v-card-actions class="px-3 pb-3">

                    <v-flex text-xs-right v-if="!carga">
                        <v-btn @click="ingresar" color="primary" :disabled="$v.$invalid">Ingresar</v-btn>
                    </v-flex>
                     <v-flex text-xs-right v-if="carga">
                     <pulse-loader color="#00426A" ></pulse-loader> 
                    </v-flex>


                </v-card-actions>



            </v-card>
        </v-flex>
    </v-layout>
</template>
<script>
import axios from 'axios';
import { required,email } from 'vuelidate/lib/validators';
import {mapState,mapMutations, mapActions} from "vuex";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
export default {
    data(){
        return {
            email: '',
            password: '',
            error: null
        }
    },
    validations: {
    
      email:{required,email},
      password:{required}
    
    } 
     ,computed:{
...mapState(['carga'])

    }, components: {
    PulseLoader
  },

    methods:{
        
        ...mapMutations(['cargarLoad','mostrarExito']),
        ingresar(){
this.error=null;


this.$store.commit('cargarLoad',true)
        
          

            if (this.$v.$invalid){
            this.error="Email o password no son validos";
           this.$store.commit('cargarLoad',false)
            }
                else{
            axios.post('api/Usuarios/Login', {email: this.$v.email.$model , password: this.$v.password.$model})
                        .then(respuesta => {
                return respuesta.data
                
            })
            .then(data => {        
                this.$store.dispatch("guardarToken", data.token)
                this.$router.push({ name: 'home' })
                this.$store.commit('cargarLoad',false)

                let mensaje ='¡Bienvenido '+this.$store.state.usuario.nombre+' !'
        
        this.mostrarExito(mensaje)
       
       })
            .catch(err => {
       
               
                    if (err.response.status==400){
                    this.error="No es un email válido";
                } else if (err.response.status==404){
                    this.error="No existe el usuario o sus datos son incorrectos";
                }else{
                    this.error="Ocurrió un error";
                }
                    this.$store.commit('cargarLoad',false)
            })
// this.$store.commit('cargarLoad',false)
            }
                // this.$store.commit('cargarLoad',false)
    
        }
    }
 

}
</script>


