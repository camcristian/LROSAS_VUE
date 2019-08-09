<template>
  <v-layout wrap>
  <v-card>
    <v-card-title>
      Prestamos
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Buscar"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
    ></v-data-table>
  </v-card>
   </v-layout>
</template>


<script>
 import axios from 'axios';

  export default {


    data(){
            return {

        search: '',
        headers: [
          {
            text: 'id solicitud',
            align: 'left',
            sortable: false,
            value: 'id_solicitud',
          },
          { text: 'Nrosocio', value: 'Nrosocio' },
          { text: 'fecha', value: 'fecha_solicitud' },
          { text: 'producto', value: 'producto' },
          { text: 'objetivo', value: 'objetivo' },
          { text: 'monto_solicitado', value: 'monto_solicitado' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          }
        ]
    }
    }

        }

</script>
