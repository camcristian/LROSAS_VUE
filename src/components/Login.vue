<template>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6 lg5 xl4>
            <v-card>
                <v-toolbar dark color="blue darken-3">
                    <v-toolbar-title>
                        Acceso
                    </v-toolbar-title>
                </v-toolbar>
                <v-card-text>

                   <v-text-field v-model.Lazy="$v.email.$model" autofocus color="accent" label="Email"  outline required :error="$v.email.$error ? true :false" 
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
                    <v-flex text-xs-right>
                        <v-btn @click="ingresar" color="primary" :disabled="$v.$invalid">Ingresar</v-btn>
                    </v-flex>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script>
import axios from 'axios';
import { required,email } from 'vuelidate/lib/validators';
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
    
    }  ,

    methods :{
        ingresar(){
            console.log(this.$v.$invalid)

if (this.$v.$invalid){
this.error="Email o password no son validos";

}
    else{
 axios.post('api/Usuarios/Login', {email: this.$v.email.$model , password: this.$v.password.$model})
            .then(respuesta => {
                return respuesta.data
            })
            .then(data => {        
                this.$store.dispatch("guardarToken", data.token)
                this.$router.push({ name: 'home' })
            })
            .catch(err => {
                //console.log(err.response);
               
                    if (err.response.status==400){
                    this.error="No es un email válido";
                } else if (err.response.status==404){
                    this.error="No existe el usuario o sus datos son incorrectos";
                }else{
                    this.error="Ocurrió un error";
                }

                
                //console.log(err)
            })

}

           
        }
    }
    
}
</script>


