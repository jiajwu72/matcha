<template>

  <v-row id="match">

    <v-col md="3">
      <v-card class="card">
      <div class="content">
        <div class="search"><strong>Recherche avancée</strong></div>
        <div class="">
          Je cherche
        </div>
        <v-row>
          <v-col>
          <v-card
          :class="['sex_bound','card',womanSelect?'colorNotSelect':'colorSelect']"
          @click="womanSelect= false"
          >
            <v-icon class="icon">mdi-human-male</v-icon>
          </v-card>
          </v-col>
          <v-col>
          <v-card
          :class="['sex_bound','card',womanSelect?'colorSelect':'colorNotSelect']"
          @click="womanSelect= true"
          >
            <v-icon class="icon">mdi-human-female</v-icon>
          </v-card>
          </v-col>
        </v-row>
        <div class="">
          Tranche d'âge
        </div><br>
        <div class="">
          <vue-slider v-model="ageValue" :min="18" :max="60"></vue-slider>
        </div><br>
        <div class="">
          Score de popularité
        </div><br>
        <div class="">
          <vue-slider v-model="scoreValue" :min="0" :max="200"></vue-slider>
        </div><br>

        <div class="">
          <vue-google-autocomplete id="map" :country="['au', 'nz']"></vue-google-autocomplete>
        </div>
        <br>
        <div class="">
          <v-combobox
            v-model="chips"
            :items="items"
            chips
            clearable
            label="Centre d'intérêt"
            multiple
            solo
          >
            <template v-slot:selection="{ attrs, item, select, selected }">
              <v-chip
                v-bind="attrs"
                :input-value="selected"
                close
                @click="select"
                @click:close="remove(item)"
              >
                <strong>{{ item }}</strong>&nbsp;
                <span>(interest)</span>
              </v-chip>
            </template>
          </v-combobox>
        </div>
        <div>
        <v-btn dark>
          Lancer la recherche
        </v-btn>`
        </div>`
      </div>
      </v-card>
    </v-col>
    <v-col md="9">
      <div class="content">
        <span class="product_title">
          match
        </span>
        <br>
        <v-card class="card">
          <v-row>
            <v-col>
              <v-select
                v-model="filterByValue"
                :items="filterByItems"
                attach
                chips
                label="Trier par"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col v-for="(item, index) in OnePageProducts" :key="index" lg="3" md="3" sm="6">
              <v-card>
                <a href="">
                <v-img
                  :src="item.detail[0].srcs[0]"
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="300"
                >
                </v-img>
                </a>

                <v-card-text style="background-color:#e4e4e4;">
                  <div style="text-align: right;">
                    <span class="dot"></span> Online
                  </div>
                  <div>
                    name age
                  </div><br>
                  <hr>
                  <v-spacer></v-spacer>
                  <v-btn icon><v-icon>mdi-heart</v-icon></v-btn>
                  Lagny sur seine 7km
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <div class="text-center pagination">
              <v-pagination
                v-model="currentPage"
                :length="size"
              >
            </v-pagination>
          </div>
        </v-card>
      </div>
    </v-col>

  </v-row>

</template>

<script>
// import 'vue-range-component/dist/vue-range-slider.css'
// import VueRangeSlider from 'vue-range-component'
import VueGoogleAutocomplete from 'vue-google-autocomplete'
// import postscribe from 'postscribe'
// import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
export default{
  name:"Match",
  components: {
    // VueRangeSlider,
    VueGoogleAutocomplete,
    // VuetifyGoogleAutocomplete,
    VueSlider,

  },
  props:[
    'list',
  ],
  data () {
    return {
      currentPage:1,
      exampleItems:[],
      filterByValue:"",
      filterByItems:["Age croissant","Age décroissant","Le plus proche","La plus popolaire","centre intéret"],
      filterOptions:[],
      allProducts:[],
      OnePageProducts:[],
      size:0,
      withPromo:false,
      womanSelect:true,
      ageValue: [18, 60],
      scoreValue:[0,200],
      chips: [],
      items: ['Streaming', 'Eating'],
      address: '',
    }
  },
  mounted() {
            // To demonstrate functionality of exposed component functions
            // Here we make focus on the user input
            // this.$refs.address.focus();
            // let externalScript = document.createElement('script')
            // externalScript.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAtlTaelt7D4Z0eF-zg7cv5BY__sdStoUA&libraries=places')
            // document.head.appendChild(externalScript)

        },
  created() {

    var item={

      detail:[
        {
          color:"jaune",
          srcs:[
            "/images/man-wearing-white-crew-neck-shirt-and-black-jeans-991509.jpg",
            "/images/man-wearing-white-crew-neck-shirt-and-black-jeans-991509.jpg",
          ],
          numberStock:10,
        }
      ],
      type:"T-shirt",
      description:"une description bref",
      category:"clothes",
      numberStock:10,
    };
    var i=0;
    while (i++<30){
      item._id=i;
      this.allProducts.push(item);
    }
    this.size=Math.ceil(this.allProducts.length/12);
    this.OnePageProducts=this.allProducts.slice(0,12)
    console.log(this.size);
    //console.log(this.allProducts)

    this.ageMin = 18
    this.ageMax = 60
    this.scoreMin=0
    this.scoreMax=200
    this.enableCross = false
    this.tooltipMerge = false
    //this.formatter = value => `￥${value}`
  },

  methods: {
    onChangePage(){
      console.log("onChangePage")
    },
    showModal(){
      console.log("show modal")
      this.$modal.show("hello", { foo: 'bar' })

    },
    getAddressData: function (addressData, placeResultData, id) {
                this.address = addressData;
                console.log(placeResultData,id)
    },
    remove (item) {
        this.chips.splice(this.chips.indexOf(item), 1)
        this.chips = [...this.chips]
    },
  },
  watch:{
    currentPage:function (val) {
      var fist=12*(val-1);
      var last=fist+12
      this.OnePageProducts=this.allProducts.slice(fist,last)
      //console.log(this.OnePageProducts)
    }
  }
}
</script>

<style scoped>
.content{
  //background-color: #f7f7f7;
  margin-top:60px;
}

.card{
  //min-height: 600px;
  padding-left: 15px;
  padding-right: 15px;
}

.product_title{
    margin: 0;
    font-size: 36px;
    line-height: 60px;
    font-weight:bold;
}
.dot {
  height: 10px;
  width: 10px;
  background-color: #0b0;
  border-radius: 50%;
  display: inline-block;
}

.search{
  text-align: center;
  font-size: 20px;

}

.sex_bound{
  //background-color: #aeaeae;
  text-align: center;
  cursor: pointer;
}

.icon{
  font-size: 30px;
}
.card{
  //padding: 10px 10px 10px 10px;
  padding-left: 10px;
  padding-right: 10px;
}
hr.style-one {

  border: 0;

  height: 1px;

  background: #333;

  background-image: linear-gradient(to right, #ccc, #333, #ccc);

}
.colorSelect{
  background-color: #e01f4d;
}
.colorNotSelect{
  background-color: #aeaeae;
}
</style>
