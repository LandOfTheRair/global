
const Vue = window.Vue
const VueResource = window.VueResource
const VueBootstrap = window.bootstrapVue;

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
        'https:': 'https://global.server.rair.land',
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
