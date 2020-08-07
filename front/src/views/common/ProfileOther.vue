<template id="">
  <div class="">
    <v-container>
    <v-row>
      <v-card style="width:100%;padding:10px;">
        <v-row>
          <v-col md="3">
            <v-img :src="''" class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200">
            </v-img>

          </v-col>
          <v-col md="6">
            <h2>Céline</h2> 18 ans de Neuilly-sur-seine <br>
            <v-card style="padding:8px;">
              sdkhjfghdsbvhjsdbivb hjdsvchj ebj gjh cjgqds chqe hgfc hqd c   cuqdvs chj qjghdc j qjgfd c
            </v-card>
          </v-col>
          <v-col md="2">
            <v-card class="btn">
              <strong><v-icon style="color:white;">mdi-heart</v-icon> aimer</strong>
            </v-card>
            <v-card class="btn">
              <strong><v-icon style="color:white;">mdi-chat</v-icon> Discuter</strong>
            </v-card>
            <v-card class="btn">
              <strong><v-icon style="color:white;">mdi-chat</v-icon> Reporter</strong>
            </v-card>
          </v-col>

        </v-row>
      </v-card>
    </v-row>

    <v-row style="margin-top:15px;">
      <v-card style="width:100%;padding:10px;">
        <h2>TAGS</h2> <br>
        <v-chip class="tag">
          Nourriture
        </v-chip>
        <v-chip class="tag">
          Sport
        </v-chip>
        <v-chip class="tag">
          Voyage
        </v-chip>
        <v-chip class="tag">
          film d'horreur
        </v-chip>
      </v-card>
    </v-row>

    </v-container>
  </div>
</template>

<script>


</script>

<style scoped>
.btn{
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

</style>
