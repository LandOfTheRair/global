
const Vue = window.Vue
const VueResource = window['vue-resource'];
const VueBootstrap = window['bootstrap-vue'];

Vue.use(VueResource);
Vue.use(VueBootstrap);


new Vue({
  el: '#app',

  data: {
    leaderboard: []
  },

  methods: {
    loadData: async function() {

      const urls = {
        'https:': 'https://lotr-global.herokuapp.com',
        'http:': 'http://globalapi.rair.land'
      }

      const res = await Vue.http.get(urls[location.protocol] + '/leaderboard');
      this.leaderboard = res.body;
    }
  },

  beforeMount() {
    this.loadData();
  }
})