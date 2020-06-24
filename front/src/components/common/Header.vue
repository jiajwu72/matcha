<template>
  <div data-app>
    <!-- <v-container> -->

    <v-card class="overflow-hidden">
      <v-app-bar app dark id="header">
         <!-- style="background-color:rgba(0, 0, 82,0.2);"> -->
        <v-app-bar-nav-icon
          class="header_text"
          @click="drawer = !drawer ">
          <v-icon>mdi-heart</v-icon>
        </v-app-bar-nav-icon>

        <v-toolbar-title>
          <a href="/"><span class="header_text">Matcha</span></a>
        </v-toolbar-title>


        <!-- <v-toolbar-items v-if="isMobile==false">
            <v-btn v-for="item in menu" :key="item.icon" v-on:click="emitCategory(item._id)">
              <v-icon>{{ item.icon }}</v-icon>{{item.title}}
            </v-btn>
        </v-toolbar-items> -->

        <v-spacer></v-spacer>

        <v-toolbar-items>

            <v-btn  style="background-color:rgba(0, 0, 0,0);"
                    @click="dirige()"

            >
              <v-icon>mdi-account</v-icon>Profil
            </v-btn>
        </v-toolbar-items>


      </v-app-bar>

      <!-- left bar info -->
      <v-navigation-drawer
        app
        v-model="drawer"

        temporary>

        <v-list dense>
          <v-list-item>
            <v-form>
            <v-text-field
              solo
              label="Rechercher"
              append-icon="mdi-magnify"
              style="margin-top:5px;"
              v-model="searchItem"
            ></v-text-field>
            </v-form>
          </v-list-item>
          <v-list-item
            v-for="item in category"
            :key="item.title"
            link
          >
            <v-list-item-icon>
              <v-icon @click="emitCategory(item.category_id)">
                {{ item.icon }}
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon @click="emitCategory('jh')">
                mdi-card-account-phone-outline
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Contact</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

    </v-card>
    <v-alert v-model="connect">
      alert connect
    </v-alert>
    <Modal :display="alertAuth" @display="update">

      <Auth></Auth>
      <h3 slot="header">
        <span v-if="step==0">
          Connexion
        </span>
        <span v-else-if="step==1">
          Inscription rapise
        </span>
      </h3>
      <div slot="body">
        <div v-if="step==0">
          <v-row>
            <v-text-field label="Email*" required></v-text-field>
          </v-row>
          <v-row>
            <v-text-field label="Mot de passe*" required></v-text-field>
          </v-row>
          <v-row>
            <v-btn dark>
              Valider
            </v-btn>
          </v-row>
          <v-row>
            <v-col>
              <a style="color:green" @click="step=1">
                inscription
              </a>
            </v-col>
            <v-col>
              <a style="color:green">
                mot de passe oublié
              </a>
            </v-col>
          </v-row>
        </div>

        <div v-if="step==1">
          <v-row>
            <v-text-field label="Email*" required></v-text-field>
          </v-row>
          <v-row>
            <v-text-field label="Adresse(option)" required></v-text-field>
          </v-row>
          <v-row>
            <v-text-field label="Mot de passe*" required></v-text-field>
          </v-row>
          <v-row>
            <v-text-field label="Resaisir mot de passe*" required></v-text-field>
          </v-row>
          <v-row>
            <v-btn dark>
              Valider
            </v-btn>
          </v-row>
        </div>
      </div>

    </Modal>

  </div>
</template>

<script>
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("header").style.top = "0";
  } else if(prevScrollpos <= currentScrollPos && window.scrollY>80) {
    document.getElementById("header").style.top = "-70px";
  }
  prevScrollpos = currentScrollPos;
}


// import ShoppingCard from '@/components/commun/ShoppingCard';
import Modal from '@/components/common/Modal';
import Auth from '@/components/common/Auth';
export default{

  name:"Header",
  components: {
    // ShoppingCard,
    Modal,
    Auth,
  },
  data() {
    return {
      step:0,
      connect:false,
      dialog:false,
      drawer:true,
      drawer2:false,
      menuInitial:[],
      searchItem:"",
      alertAuth:false,
      menu: [
        { icon: "mdi-hanger", title: "Vetement" },
        { icon: "mdi-shoe-heel", title: "Chaussure" },
      ],
      category:[],
      toMatchDevice : [
          /Android/i,
          /webOS/i,
          /iPhone/i,
          /iPad/i,
          /iPod/i,
          /BlackBerry/i,
          /Windows Phone/i
      ],
      isMobile:false,
      action:"",
    };

  },

  props:[
    //'category'
  ],
  created() {
    this.isMobile=this.detectMob()

    this.category=[
      { icon: "mdi-hanger", title: "Vetement",category_name:"vetement" },
      { icon: "mdi-shoe-formal", title: "Chaussure",category_name:"chaussure" },
      { icon: "mdi-diamond-stone", title: "Bijoux",category_name:"bijoux" },
      // { icon: "mdi-diamond-stone", title: "Contact",category_name:"bijoux" },

    ]
    this.action=""
    console.log(this.isMobile)

  },

  methods: {
    detectMob() {
        const toMatch = [
            /Android/i,
            /webOS/i,
            /iPhone/i,
            /iPad/i,
            /iPod/i,
            /BlackBerry/i,
            /Windows Phone/i
        ];

        return toMatch.some((toMatchItem) => {
            return navigator.userAgent.match(toMatchItem);
        });
    },
    emitCategory(id){
      this.$emit('category_id', id)
    },

    valid(){
      console.log("submit")
    },
    dirige(){

      console.log("dirige")
      this.alertAuth=true;
    },
    update(val){
      this.alertAuth=val;
    },
    // hidePopUp(){
    //   console.log("hidePopUp")
    //   this.alertAuth=false
    // },
  }
}
</script>

<style scoped>

.header{
  background-color: rgba(0, 0, 67);
  opacity: 0;
}

.header_text{
  opacity: 1;
}
a{
  text-decoration: none;
  color: white;
}
</style>
