<template>
  <el-card class="card">
    <el-row class="autocomplete">
      <el-col :span="24">
        <div class="sub-title">Tell me about your location</div>
        <el-autocomplete class="inline-input" v-model="state" :fetch-suggestions="querySearch" placeholder="Please enter the content" :trigger-on-focus="false" @select="handleSelect">
          <template slot-scope="{ item }">
            <div class="name">{{ item.name }}</div>
          </template>
        </el-autocomplete>
      </el-col>
    </el-row>

    <GmapMap ref="mapRef" :center="randomInitialLatLng" :zoom="12" style="width:100%;  height: 800px;">
      <gmap-marker :position="randomInitialLatLng" :clickable="true" @click="openInfoWindowTemplate(randomInitialLatLng)" ref="markers"></gmap-marker>

      <gmap-info-window :options="{maxWidth: 300}" :position="infoWindow.position" :opened="infoWindow.open" @closeclick="infoWindow.open = false">
        <div id="thediv">hello</div>
      </gmap-info-window>
    </GmapMap>

  </el-card>
</template>
<script>
export default {
  data () {
    return {
      randomInitialLatLng: { lat: 47.6062095, lng: -122.3320708 },
      restaurants: [],
      state: '',
      infoWindow: {
        position: {
          lat: 47.6062095,
          lng: -122.3320708
        },
        open: false,
        template: ''
      },
      clicked: false
    };
  },
  async created () {
    this.getList()
  },
  mounted () {
  },
  computed: {

  },
  methods: {
    openInfoWindowTemplate (pos) {
      this.infoWindow.position = pos
      this.infoWindow.open = true
      this.clicked = true
    },

    async getList () {
      const data = await this.axios.post('/api/graphql', {
        query: `{
            city{
              all{
                id,name,code
              }
            }
          }`
      })
      this.restaurants = data.data.data.city.all
    },

    querySearch (queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter((item) => {
        return item.name.indexOf(queryString) != -1 ? item.name : ''
      }) : restaurants;
      cb(results);
    },

    async handleSelect (item) {
      this.state = item.name
      let mapCode = item.code.split(',')
      console.log(mapCode);
      this.$refs.mapRef.$mapPromise.then((map) => {
        map.panTo({ lat: +mapCode[0], lng: +mapCode[1] })
        this.randomInitialLatLng = { lat: +mapCode[0], lng: +mapCode[1] }
      })
    }
  },
  components: {
  }
}
</script>
<style scoped>
.autocomplete {
  text-align: center;
}
.card {
  width: 80%;
  margin: 100px auto;
}
</style>