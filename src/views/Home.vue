<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <img src="@/assets/logo.png" alt="Vuetify.js" class="mb-5">
        <blockquote>
          &#8220;Tu trabajo va a ocupar una gran parte de tu vida, y la única forma de estar verdaderamente satisfecho es hacer lo que crees que es un gran trabajo. Y la única forma de hacer un gran trabajo es amar lo que haces.&#8221;
          <footer>
            <small>
              <em>&mdash;Steve Jobs</em>
            </small>
          </footer>
        </blockquote>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
