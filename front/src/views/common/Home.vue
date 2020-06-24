<template>

  <div>

    <!-- <Carousel :slides="slidesItem" >
    </Carousel> -->
    <!-- <v-parallax src="/images/bg1.jpg" height=900></v-parallax> -->
    <v-img src="/images/bg1.jpg">
      <v-dialog v-model="connect">
        lqlq
      </v-dialog>
      <div class="bg">
        <strong style="font-size:50px;color:white;">
          Match your love partner
        </strong><br><br><br><br>
        <v-btn icon>
          <v-icon style="font-size:80px;cursor:pointer;color:#EA1713;">mdi-hand-heart</v-icon>
        </v-btn>
      </div>

    </v-img>

  </div>

</template>

<script>

   // import Carousel from '@/components/common/Carousel';
   // import GoogleMap from '@/components/commun/GoogleMap';
   // import Card from '@/components/commun/Card';

  export default{
    name:"Home",
    components:{
       // Carousel,
       // GoogleMap,
       // Card,
    },

    data() {
      return{
        connect:false,
        // slidesItem:[
        //   {
        //     src: '/images/bg0.jpg',
        //   },
        //   {
        //     src: '/images/bg1.jpg',
        //   },
        //   {
        //     src: '/images/bg2.jpg',
        //   },
        //   {
        //     src: '/images/bg3.jpg',
        //   },
        //   {
        //     src: '/images/bg4.jpg',
        //   },
        // ],

      }
    },

    created() {

    },
  }
</script>

<style scoped>
.bg{
  /* background-color: green; */
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}


</style>
