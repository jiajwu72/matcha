<template id="">
  <div class="">
    <v-container>

      <v-row>
        <v-card style="width:100%;padding:10px;">
          <h2>
              <b-avatar button @click="profileOther" :src="profilImg"></b-avatar>
              Mes informations
          </h2>
          <b-row>
            <b-col md="4" v-for="(item, index) in images" :key="index">

              <v-card>
              <label for="image">
                  <b-img :src="item" thumbnail fluid alt="Fluid image" class="img">
                  </b-img>
               </label>
               <v-card-actions>
                 <!-- <div style="width:100%;display:flex;"> -->

                 <!-- <b-form id='test-form' @submit.stop.prevent="submitImg(index+1)" method="post" enctype="multipart/form-data"> -->
                  <b-form id='test-form' action="http://localhost:3001/upload" method="post" enctype="multipart/form-data">
                    <input type="hidden" name="userId" :value="userId">
                    <input type="hidden" name="imgIndex" :value="index+1">
                    <input type="hidden" name="alea" value="alea">
                    <input type="file" name="image" accept="image/*" class="form-control">
                    <b-button variant="primary" type="submit" style="margin-top:10px;">Upload</b-button>
                    <b-button variant="primary" @click="defineProfil(index)" style="margin-top:10px;margin-left:20px;">Définir comme profil</b-button>
                  </b-form>
                 <!-- </div> -->
                  <!-- <form action="http://localhost:3001/upload" method="post" enctype="multipart/form-data">
                    <input type="file" accept="image/*" name="image" />
                    <b-button variant="primary" type="submit">Upload</b-button>
                  </form> -->
               </v-card-actions>
              </v-card>
            </b-col>
          </b-row>
          <b-alert v-if="modifSuccess" variant="success" show>{{modifSuccess}}</b-alert>
          <b-form @submit.stop.prevent="modif">
            <b-row>
              <b-col md="6">
                <v-text-field
                  v-model="lastName"
                  :rules="nameRules"
                  :counter="15"
                  label="Prénom"
                  required
                ></v-text-field>
              </b-col>
              <b-col md="6">
                <v-text-field
                  v-model="firstName"
                  :rules="nameRules"
                  :counter="15"
                  label="Nom"
                  required
                ></v-text-field>
              </b-col>

              <b-col md="6">
                <v-select v-model="sex" :items="['masculin','féminin']" label="sex" required>
                </v-select>
              </b-col>
              <b-col md="12">
                <v-textarea
                  background-color="light-blue"
                  color="black"
                  label="BIOGRAPHE"
                  v-model="biographe"
                ></v-textarea>
              </b-col>
              <b-col md="12">
                <b-button size="lg" text="Button" variant="success" type="submit">Modifier</b-button>
              </b-col>
              <b-col md="12">
                <strong>score de popularité:</strong> <span style="float:right;">{{popScore}}</span>
              </b-col>
            </b-row>
          </b-form>
        </v-card>
      </v-row>

      <v-row style="margin-top:15px;">
        <v-card style="width:100%;padding:10px;">
          <h2>Address</h2>
          <vue-google-autocomplete id="map" :country="['fr']" class="form-control">
          </vue-google-autocomplete>
          <GoogleMap></GoogleMap>
        </v-card>
      </v-row>

      <v-row style="margin-top:15px;">
        <v-card style="width:100%;padding:10px;">
          <h2>TAGS</h2>
          <b-form-group label="choissisez les centres d'intéret.">
            <b-form-tags v-model="tagValue" no-outer-focus class="mb-2">
              <template v-slot="{ tags, disabled, addTag, removeTag }">
                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                  <li v-for="tag in tags" :key="tag" class="list-inline-item">
                    <b-form-tag
                      @remove="removeTag(tag)"
                      :title="tag"
                      :disabled="disabled"
                      variant="info"
                    >{{ tag }}</b-form-tag>
                  </li>
                </ul>

                <b-dropdown size="sm" variant="outline-secondary" block menu-class="w-100">
                  <template v-slot:button-content>
                    <b-icon icon="tag-fill"></b-icon> Ajoutez tags
                  </template>
                  <b-dropdown-form @submit.stop.prevent="() => {}">
                    <b-form-group
                      label-for="tag-search-input"
                      label="Search tags"
                      label-cols-md="auto"
                      class="mb-0"
                      label-size="sm"
                      :description="searchDesc"
                      :disabled="disabled"
                    >
                      <b-form-input
                        v-model="search"
                        id="tag-search-input"
                        type="search"
                        size="sm"
                        autocomplete="off"
                       ></b-form-input>
                    </b-form-group>
                  </b-dropdown-form>
                  <b-dropdown-divider></b-dropdown-divider>
                  <b-dropdown-item-button
                    v-for="option in availableOptions"
                    :key="option"
                    @click="onOptionClick({ option, addTag })"
                  >
                    {{ option }}
                  </b-dropdown-item-button>
                  <b-dropdown-text v-if="availableOptions.length === 0">
                    There are no tags available to select
                  </b-dropdown-text>
                </b-dropdown>
              </template>
            </b-form-tags>
          </b-form-group>
        </v-card>
      </v-row>
      <v-row style="margin-top:15px;">
        <v-card style="width:100%;padding:10px;">
          <h2>Confidentialité</h2>
          <!-- v-for ici -->
          <b-button variant="danger" style="margin-right:20px;" @click="logout">Log out</b-button>
          <b-button v-b-modal.modal-1 variant="primary">Changer Mot de passe</b-button>
        </v-card>
      </v-row>
      <v-row style="margin-top:15px;">
        <v-card style="width:100%;padding:10px;">
          <h2>Visiteurs</h2>
          <!-- v-for ici -->
          <b-avatar button @click="profileOther" src="https://placekitten.com/300/300"></b-avatar>
        </v-card>
      </v-row>
    </v-container>
    <b-modal id="modal-1" title="Changer votre mot de passe" hide-footer>
      <b-row>
        <b-alert v-if="mailSendSuccess" variant="success" show style="margin-left:15px;">{{mailSendSuccess}}</b-alert>
        <b-col md="12">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Saisissez votre email pour réinitialiser"
            required
          ></v-text-field>
        </b-col>
        <b-col md="3">
            <b-button variant="primary" @click="changepwd">envoyer</b-button>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
// import VueSuggestion from 'vue-suggestion'
import VueGoogleAutocomplete from 'vue-google-autocomplete'
import GoogleMap from '@/components/common/GoogleMap';
export default{
  name:"ProfileUser",
  components: {
    VueGoogleAutocomplete,
    GoogleMap,
  },
  props: [],
  data () {
    return {
      biographe:"",
      popScore:"",
      profilImg:"",
      userId:-1,
      selectedImgIndex:-1,
      selectedImg:null,
      modifSuccess:"",
      mailSendSuccess:"",
      options: ['Nourriture', 'Sport', 'Programmation', 'Voyage'],
      search: '',
      tagValue: [],
      isUpdating:false,
      sex:"",
      tagsSelected:[],
      lastName:"",
      firstName:"",
      address:"",
      addressRules: [
        v => !!v || 'Ce champ doit être remplis',
      ],
      nameRules: [
        v => !!v || 'Ce champ doit être remplis',
        v => v.length <= 15 || 'il doit comporter au maximun 15 caractères',
      ],
      email: '',
      emailRules: [
        v => !!v || 'Ce champ doit être remplis',
        v => /.+@.+/.test(v) || 'E-mail doit être requis',
      ],
      chips:{
        nourriture:true,
        sport:true,
        voyage:true,
      },
      tags:[
        "Nourriture",
        "Sport",
        "Voyage",
      ],
      images:[],
    }
  },
  created() {
    const id=localStorage.getItem("userId")
    this.userId=id;
    this.axios.get("http://localhost:3001/user/"+id+"/get")
    .then((result)=>{
      console.log(result.data.res)
      result=result.data.res
      this.firstName=result.first_name
      this.lastName=result.last_name
      this.sex=result.sex==0?"masculin":"féminin"
      this.images[0]=result.img1
      this.images[1]=result.img2
      this.images[2]=result.img3
      this.images[3]=result.img4
      this.images[4]=result.img5
      this.profilImg=this.images[result.selectImg-1]
      this.popScore=result.pop_score
      // this.email=result.email
      this.biographe=result.biographe
    })
  },
  computed: {
      criteria() {
        // Compute the search criteria
        return this.search.trim().toLowerCase()
      },
      availableOptions() {
        const criteria = this.criteria
        // Filter out already selected options
        const options = this.options.filter(opt => this.tagValue.indexOf(opt) === -1)
        if (criteria) {
          // Show only options that match criteria
          return options.filter(opt => opt.toLowerCase().indexOf(criteria) > -1);
        }
        // Show all options available
        return options
      },
      searchDesc() {
        if (this.criteria && this.availableOptions.length === 0) {
          return 'There are no tags matching your search criteria'
        }
        return ''
      }
    },
  methods: {
    logout(){
      const user={id:localStorage.getItem('userId')}
      this.axios.post("http://localhost:3001/user/logout",user)
      .then((result)=>{
        console.log(result.data.res)
        if (result.data.res) {
          localStorage.removeItem('jwt')
          localStorage.removeItem('userId')
          window.location="/"

        }
      })
    },

    modif(){
      // if(this.modifValid()){
        const id=localStorage.getItem('userId')
        const sex=this.sex=="masculin"?0:1;
        const user={
          id:id,sex:sex,last_name:this.lastName,first_name:this.firstName,biographe:this.biographe
        };
        console.log(user);
        this.axios.post("http://localhost:3001/user/"+id+"/update",user)
        .then((result)=>{
          console.log(result);
          this.modifSuccess=result.data
          // location.reload();
        })
        .catch((e)=>{
          console.log(e);
        })
      // }

    },
    changepwd(){
      console.log("changepwd");
      this.axios.post("http://localhost:3001/user/forgot",{email:this.email})
      .then((result)=>{
        console.log(result.data)
        this.mailSendSuccess=result.data.success
        window.location="/myProfile"
      })
      .catch((e)=>{
        console.log(e);
      })
    },
    profileOther(){},

    onOptionClick({ option, addTag }) {
      addTag(option)

      this.search = ''
    },
    defineProfil(index){
      const request={id:this.userId,selectImg:index+1}
      console.log(request);
      this.axios.post("http://localhost:3001/user/"+this.userId+"/defineProfil",request)
      .then((result)=>{
        console.log(result);
        window.location="/myProfile"
      })
    },

    // async onImgSelected(event){
    //
    //   this.selectedImg=event;
    //   // console.log(e);
    // },

    // async submitImg(index){
    //   this.selectedImgIndex=index;
    //   console.log(this.selectedImg);
    //   var formData=new FormData();
    //   // formData.append('image',this.selectedImg)
    //   formData.append('userId',this.userId)
    //   formData.append('imgIndex',this.selectedImgIndex)
    //   console.log(formData.image);
    //   console.log(formData.values());
    //
    //   const query={userId:localStorage.userId,imgIndex:index}
    //   console.log("query:",query);
    //   await this.axios.post("http://localhost:3001/upload",formData)
    //   .then((res)=>{
    //     console.log(res)
    //   })
    // }

  }
}

</script>

<style scoped>
.btnP{
  background-color: #e01f4d;
  color: white;
  text-align: center;
  padding:5px;
  margin-bottom: 15px;
  cursor: pointer;
  width: 100%;
}
.tag{
  margin-left: 15px;
}

.img{
  cursor: pointer;
  /* width: 100%; */
}


</style>
