<template>
    <div class="brandIndex">
        <div class="brandBanner"><img :src="banner" alt=""></div>
        <div class="brandActivity">
            <ul>
                <li v-for="b in brand" class="brandElem">
                    <p><img :src="b.img" alt=""></p>
                </li>
            </ul>
        </div>
        <div class="brandRuled">
            <article class="brandRule">
                <aside><p>游戏规则</p></aside>
                <section>
                    <p>新会员注册，即可获得一次抽奖机会;</p>
                    <p>新会员注册首次充值，次日可参与抽奖;</p>
                    <p>老会员每日总充值达到100元以上，可获得一次抽奖机会;</p>
                    <p>抽中金额系统直接返到账户，一倍流水即可出款。</p>
                </section>
            </article>
        </div>
    </div>
</template>
<script type="text/babel">
  import "../../../../assets/scss/activity/brand/brand.scss";
  export default {
    data() {
      return {
        banner: require('../../../../assets/images/activity/brand/banner.jpg'),
        brand: [
          {
            title: '第一张',
            img: require('../../../../assets/images/activity/brand/poker.png'),
            marry: ''
          },
          {
            title: '第一张',
            img: require('../../../../assets/images/activity/brand/poker.png'),
            marry: ''
          },
          {
            title: '第一张',
            img: require('../../../../assets/images/activity/brand/poker.png'),
            marry: ''
          },
          {
            title: '第一张',
            img: require('../../../../assets/images/activity/brand/poker.png'),
            marry: ''
          },
          {
            title: '第一张',
            img: require('../../../../assets/images/activity/brand/poker.png'),
            marry: ''
          },
          {
            title: '第一张',
            img: require('../../../../assets/images/activity/brand/poker.png'),
            marry: ''
          },
          {
            title: '第一张',
            img: require('../../../../assets/images/activity/brand/poker.png'),
            marry: ''
          },
          {
            title: '第一张',
            img: require('../../../../assets/images/activity/brand/poker.png'),
            marry: ''
          },
          {
            title: '第一张',
            img: require('../../../../assets/images/activity/brand/poker.png'),
            marry: ''
          }
        ]
      }
    }
  }
</script>