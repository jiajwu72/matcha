<template>
  <div>
    lalal
    <Connexion v-if="step==0">
    </Connexion>
  </div>

</template>

<script>
import Connexion from '@/components/common/Connexion';
export default{

  name:"Auth",
  components:{
      Connexion,
  },
  props:[

  ],
  data () {
    return {
      step:0,
    }
  },
  created() {

  },

  methods: {

  }

}
</script>

<style scoped>

</style>
