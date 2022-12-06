<template>
  <div>
    <md-card class="md-with-hover">
      <md-card-header>
        <div class="md-title">
          사랑받는 음료수들...
        </div>
      </md-card-header>
      <md-card-content>
        <p v-for="(like, idx) in likes.slice(0,7)" :key="idx">
          {{ items[idx].name }}  {{ like }} 명
          <md-avatar>
            <img :src="items[idx].link" alt="Avatar">
          </md-avatar>
        </p>
      </md-card-content>
    </md-card>

    <md-card class="md-with-hover" v-for="(item, idx) in items" :key="idx">
      <md-card-header>
        <div class="md-title">
          {{item.name}}
        </div>
        <img :src="item.link">
      </md-card-header>
      <md-card-content>
        <md-button @click="sendResults(idx)" class="md-icon-button md-raised md-accent">
          <md-icon >thumb_up</md-icon>        
        </md-button>
      </md-card-content>
      <md-card-content>
        <div>
          이 음료를 좋아하는 사람들은?
        </div>
          
        <div>
          {{likes[idx]}} 
          명
        </div>
        <div v-show="false">
          {{counts}}
        </div>

      </md-card-content>
    </md-card>
</template>

<script>
export default {
    props: {
        items: { type: Array, default: () => [] },
        likes: { type: Array, default: () => [] }
    },
    data() {
      return {
        counts: 0
      }
    },
    methods : {
      sendResults: async function(key){
        await this.$emit('update', key);
        await this.counts++;
      }
    }
};

</script>

<style>
  .md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
</style>