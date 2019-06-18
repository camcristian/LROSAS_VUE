<template>
 <v-layout wrap>
    <v-flex
      xs12
      class="mb-3"
    >
      <v-sheet height="500">
        <v-calendar
        ref="calendar"
            v-model="start"
            :type="type"
          :now="today"
          :value="today"
          color="primary"
          locale="es-cl"
        >
          <template v-slot:day="{ date }">
            <template v-for="event in eventsMap[date]">
              <v-menu
                :key="event.title"
                v-model="event.open"
                full-width
                offset-x
              >
                <template v-slot:activator="{ on }">
                  <div
                    v-if="!event.time"
                    v-ripple
                    class="my-event"
                    v-on="on"
                    v-html="event.title"
                  ></div>
                </template>
                <v-card
                  color="grey lighten-4"
                  min-width="350px"
                  flat
                >
                  <v-toolbar
                    color="primary"
                    dark
                  >
                    <!-- <v-btn icon>
                      <v-icon>edit</v-icon>
                    </v-btn> -->
                    <v-toolbar-title v-html="event.title"></v-toolbar-title>
                    <v-spacer></v-spacer>
                    
                      {{date}}
              
                    <!-- <v-btn icon>
                      <v-icon>more_vert</v-icon>
                    </v-btn> -->
                  </v-toolbar>
                  <v-card-title primary-title>
                    <span v-html="event.details"></span>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn
                      flat
                      color="secondary"
                    >
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



 <v-flex
      sm4
      xs12
      class="text-sm-left text-xs-center"
    >
      <v-btn @click="$refs.calendar.prev()">
        <v-icon
          dark
          left
        >
          keyboard_arrow_left
        </v-icon>
        ANTERIOR
      </v-btn>
    </v-flex>
    <v-flex
      sm4
      xs12
      class="text-xs-center"
    >
    

<!-- 
 <v-date-picker
            v-model="fecha"
          
          ></v-date-picker>

   {{fecha}} -->

    </v-flex>
    <v-flex
      sm4
      xs12
      class="text-sm-right text-xs-center"
    >
      <v-btn @click="$refs.calendar.next()">
        SIGUIENTE
        <v-icon
          right
          dark
        >
          keyboard_arrow_right
        </v-icon>
      </v-btn>
    </v-flex>


    
  </v-layout>

  
</template>



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




<script>
  export default {
    data: () => ({
      mes:new Date().toISOString().substr(0, 7),
      today: new Date().toISOString().substr(0, 10),
      events: [
        {
          title: 'ENVIO D16',
          details: 'Primer envio de SBIF',
          date: '2019-06-30',
          open: false
        },
        {
          title: 'REUNIÓN GERENCIAL',
          details: 'Reunión tema web intranet',
          date: '2019-06-31',
          open: false
        },
        {
          title: 'ENVIO D17',
          details: 'Going to the beach!',
          date: '2019-06-01',
          open: false
        },
        {
          title: 'REUNIÓN ASIVA',
          details: 'Spending time on how we do not have enough time',
          date: '2019-06-07',
          open: false
        },
        {
          title: 'INSTALACIONES',
          details: 'Celebrate responsibly',
          date: '2019-06-03',
          open: false
        },
        {
          title: 'COMITE PARITARIO',
          details: 'Eat chocolate until you pass out',
          date: '2019-06-01',
          open: false
        },
        {
          title: 'VIAJE ANTOFAGASTA',
          details: 'Mute myself the whole time and wonder why I am on this call',
          date: '2019-06-21',
          open: false
        },
        {
          title: 'MODULO DE RIESGO',
          details: 'Code like there is no tommorrow',
          date: '2019-06-01',
          open: false
        }
      ],
        type: 'month',
      start: new Date().toISOString().substr(0, 10),
      end: '2020-01-01'
    }),
    computed: {
      // convert the list of events into a map of lists keyed by date
      eventsMap () {
        const map = {}
        this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e))
        return map
      }
    },
    methods: {
      open (event) {
        alert(event.title)
      }
    }
  }
</script>