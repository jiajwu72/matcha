<template>
  <div>

    <div class="modal-mask" v-if="display">
          <div class="modal-wrapper">
            <div class="modal-container">
              <!-- <span class="modal-close" @click> -->
                <v-icon class="modal-close" @click="closeModal">
                mdi-close
                </v-icon>
              <!-- </span> -->
              <div class="modal-header">
                <slot name="header">

                </slot>
              </div>

              <div class="modal-body">
                <slot name="body">

                </slot>
              </div>

              <div class="modal-footer">
                <slot name="footer">
                  <!-- default footer
                  <button class="modal-default-button" @click="$emit('close')">
                    OK
                  </button> -->
                </slot>
              </div>
            </div>
          </div>
        </div>
  </div>

</template>

<script>

export default{
  //import Carousel from '@/components/commun/Carousel';
  name:"Modal",
  components:{

  },
  props:[
    "display",
  ],
  data () {
    return {
      //showModal: false
      show:true,
      //display:true,
    }
  },
  created() {
    //this.show=this.showModal
    //this.display=true
  },

  methods: {
    closeModal(){
      console.log("close modal")
      this.$emit("display",false);
      //this.display=false
      // var x = document.getElementByClass("modal-mask");
      // x.style.display="none"
    }
  }

}
</script>

<style scoped>

.modal-close{
  float: right;
  position: relative;
  top:-15px;
  right:-20px;
  cursor: pointer;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  max-width: 400px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>
