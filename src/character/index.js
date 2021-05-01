
const Vue = window.Vue;
const VueResource = window.VueResource;
const VueBootstrap = window.bootstrapVue;

Vue.use(VueResource);
Vue.use(VueBootstrap);


new Vue({
  el: '#app',

  data: {
    stats: ['str', 'dex', 'agi', 'int', 'wis', 'wil', 'con', 'cha', 'luk'],
    gear: [
      '', 'ear', 'head', 'neck', '',
      'waist', '', '', '', 'wrists',
      'ring1', 'rightHand', '', 'leftHand', 'ring2',
      'hands', '', '', '', 'feet',
      '', 'armor', 'robe1', 'robe2', ''
    ],
    character: null,
    items: null
  },

  methods: {
    loadData: async function() {

      const urls = {
        'https:': 'https://global.server.rair.land',
        'http:': 'http://localhost:3000'
      }

      const items = await Vue.http.get('https://play.rair.land/assets/content/_output/items.json');
      this.items = items.body.reduce((prev, cur) => {
        prev[cur.name] = cur;
        return prev;
      }, {});

      const res = await Vue.http.get(urls[location.protocol] + '/character' + window.location.search);
      this.character = res.body;
    },

    objectPosition(item) {
      console.log(item.name, this.items[item.name]);
      const realItem = this.items[item.name];
      const divisor = 32;
      const sprite = item.mods.sprite || realItem.sprite;
      const y = Math.floor(sprite / divisor);
      const x = sprite % divisor;

      return `-${x * 64}px -${y * 64}px`;
    },

    skillLevel(skillXP) {
      const skillValue = skillXP || 0;
      if (skillValue < 100) return 0;

      const value = Math.log((skillValue - 1) / 100) / Math.log(1.55);
      return 1 + Math.floor(value);
    }
  },

  beforeMount() {
    this.loadData();
  }
})
