<template>
    <div v-if="visible">
        <audio id="myAudio" v-show="false" controls="controls">
            <source :src="require('../../../assets/lotteryAudio/' + fileName)" type="audio/mpeg">
        </audio>
    </div>

</template>
<script type="text/babel">
  export default {
    data() {
      return {
        visible: false,
        fileName: '',
        audioPlay: false,
        audioDom: ''
      }
    },

    mounted() {
      let that = this;
    },

    methods: {
      init() {
        this.visible = true;
      },

      play() {
        if (this.audioDom) {
          this.audioDom.currentTime = 0;
          this.audioDom.play();
        }
      },

      open() {
        this.visible = true;
        this.$nextTick(() => {
          this.audioDom = document.getElementById('myAudio');
//          this.audioDom.currentTime = 0;
          if (this.audioPlay) {
//            this.audioDom.pause();
            this.audioDom.currentTime = 0;
            this.audioDom.play();
          }
        });
      },

      close() {
        this.audioDom.pause();
        this.visible = false;
      }
    },

    watch: {

    },


    components: {}
  }
</script>