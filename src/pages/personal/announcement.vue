<template>
  <div>
    <div class="per">
      <ul class="per_leftd">
        <li @click="$router.go(-1);"><a href="javascript: void(0);"></a></li>
        <li><p>公告列表</p></li>
      </ul>
    </div>
    <div class="per_top"></div>
    <div class="per_conter">
      <div class="Bank_conter">
        <ul class="Notice">
          <li>
            <a href="#">
              <p>恭喜在 重庆时时彩 第<span>123123</span>期获取<span>123133121</span>元</p>
              <p><span>2017-08-08 13:23:15</span></p>
            </a>
          </li>
          
          <li>
            <a href="#">
              <p>恭喜在 重庆时时彩 第<span>123123</span>期获取<span>123133121</span>元</p>
              <p><span>2017-08-08 13:23:15</span></p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  </div>
  </div>
</template>

<script>
  
  import '../../assets/scss/announcement.scss';
  
  export default {
    data() {
      return {}
    }
  }
</script>

<style lang='scss'>

</style>
