<template>

  <div>
    
    <Carousel :slides="slidesItem" >
    </Carousel>
    <!--
    <div class="parallax">
      <v-container>
        <v-row>
          <v-col lg="6">
            <GoogleMap></GoogleMap>
          </v-col>
          <v-col lg="6">
            <Card :color="'#385F73'" class="description_box">
              <v-card-title class="headline">Description de notre magasin</v-card-title>
              <v-card-subtitle >
                <span class="description_txt">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor.pharetra tempor Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.
                </span>
              </v-card-subtitle>
            </Card>
          </v-col>
        </v-row>
      </v-container>
    </div>
    -->
  </div>

</template>

<script>

   import Carousel from '@/components/common/Carousel';
   // import GoogleMap from '@/components/commun/GoogleMap';
   // import Card from '@/components/commun/Card';

  export default{
    name:"Home",
    components:{
       Carousel,
       // GoogleMap,
       // Card,
    },

    data() {
      return{
        slidesItem:[
          {
            src: '/images/bg0.jpg',
          },
          {
            src: '/images/bg1.jpg',
          },
          {
            src: '/images/bg2.jpg',
          },
          {
            src: '/images/bg3.jpg',
          },
          {
            src: '/images/bg4.jpg',
          },
        ],

      }
    },

    created() {

    },
  }
</script>

<style scoped>
.description_txt{
  -webkit-transition-duration: 1s;
  -moz-transition-duration: 1s;
  -o-transition-duration: 1s;
  transition-duration: 1s;
  font-size: 20px;
  //transform:rotate(0deg);
}

.description_box{
  -webkit-transition-duration: 1s;
  -moz-transition-duration: 1s;
  -o-transition-duration: 1s;
  transition-duration: 1s;
  opacity: 0.7;

}


.parallax {
  /* The image used */
  background-image: url("/images/bg4.jpg");

  /* Set a specific height */
  //height: 500px;

  /* Create the parallax scrolling effect */
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  //opacity: 0.1;
}

</style>
