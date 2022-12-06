<template>
  <div id="app">
    <h1 class="md-title">Choose Your Favorite Drink!!!!</h1>
    <FavoriteDrink :items="drinks2" @update="plus" :likes="likes"/>
  </div>
</template>

<script>
import FavoriteDrink from './components/FavoriteDrink.vue'

export default {
  name: 'App',
  components : {
    FavoriteDrink
  },
  created() {
      this.$http.get('/getdrinks').then((response)=> {
        this.drinks2 = response.data; // get drinks data
        this.$http.get('/drink').then((response) => {
          this.likes = response.data; // get likes data whenever '/' is requested
          this.like  = 0;
        })
        
      });  
  },
  data() {
    return {
      likes: [],
      drinks2: [],
      sortedLikes: [],
      like: 0
    }
  },
  methods:{
    plus : async function(params){
      await this.likes[params]++;
      await this.$http.post('/drink',this.likes); // when like button pressed -> post user data to server
    }
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
