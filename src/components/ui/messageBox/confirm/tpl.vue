<template>
    <!--v-if="show"-->
    <div v-if="show" class="emptyBack" >
        <div class="emptyMun indexJust">
            <div class="emptyData">
                <section class="warm_prompt_box">
                    <p>{{title || '温馨提示'}}</p>
                    <p>{{content}}</p>
                    <p v-if="showText">
                      <input v-model="inputText" type="text" :placeholder="placeholder" oninput="value=value.replace(/[\W]/g,'') " onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))">
                    </p>
                </section>
                <!--<ul class="emptyMun_save">-->
                    <!--<li v-if="!cancelButton" @click="cancel()"><div class="indexcancel indexcancel_qx">取消</div></li>-->
                    <!--<li @click="save()"><div class="indexcancel">确定</div></li>-->
                <!--</ul>-->
                <div class="emptyMunDiv">
                    <p v-if="!cancelButton" @click="cancel()"><span>取消</span></p>
                    <p @click="save()"><span>确定</span></p>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/babel">
  export default {
	data() {
	  return {
	    show: false,
        title: '',
        cancelButton: false,
        content: '',
        callback: '',
		placeholder: '',
		showText: false,
		inputText: ''
	  }
	},

	mounted() {
	  let that = this;
	  that.init();
	},

	methods: {
	  init() {

	  },

      save() {
	    if (this.showText && !this.inputText) {
	      this._Util.showAlert(this, {content: this.placeholder});
	      return;
        }

        if (this.showText) {
		  this.callback && this.callback(this.inputText || '', () => {
			this.show = false;
          });
        } else {
		  this.callback && this.callback(true);
		  this.show = false;
        }
      },

      cancel() {
		this.callback && this.callback(false);
	    this.show = false;
      }
	},

    watch: {
//	  show (v) {
//	    let that = this;
//	    if (v) {
//	      setTimeout(function() {
//			that.show = false;
//			that.callback && that.callback();
//          }, 1000 * 2);
//        }
//      }
    },


	components: {}
  }
</script>

<style lang="scss">
  @function rem($px,$designWidth:375){
  @return $px*450/$designWidth/29 + rem;
  }
  .emptyMun .emptyData{
  .warm_prompt_box{
    padding: rem(18) 0 rem(12) !important;
  p{
    display:flex;
    padding:0 rem(12) !important;
    font-size:rem(18);
  input{
    flex: 1;
    height: rem(42);
    font-size:rem(14);
    background-color: rgba(0,0,0,0.24) ;
    border: rem(1) solid #BEB284;
    border-radius: rem(2);
    color: #FFFFFF;
    letter-spacing: 0;
    padding-left: rem(14);
    font-family: Arial;
  }
  &:nth-child(2){
     margin: rem(6) 0;
     font-size:rem(14);
   }
  }
  }
  }

  .emptyMun .emptyData .emptyMunDiv {
    display: flex;
    -webkit-display: flex;
    padding: 0 rem(13) rem(25);
  p {
    flex: 1;
    text-align: center;
  span {
    width: 100%;
    height: rem(42);
    line-height: rem(42);
    font-size: rem(14);
    color: #F0DDAE;
    border: rem(1) solid #F0DDAE;
    border-radius: rem(4);
    display: inline-block;
  }
  &:last-child{
     margin-left: rem(15);
  span {
    background: -webkit-linear-gradient(left, #F0DDAE, #DCB976);                color: #2F2122;
  }
  }
  }
  }
</style>