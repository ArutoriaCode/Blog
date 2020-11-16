<template>
  <div class="pageLinks">
    <div class="title" style="margin-bottom: 6px">友邻</div>
    <div class="subtitle-2 red--text"></div>
    <v-card class="mx-auto mt-4" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-1 red--text">关于博客</div>
          <v-list-item-subtitle class="font-weight-medium">
            博客样式参考<a href="https://www.yevpt.com">YEVPT</a>，不定时更新。
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            目前仅仅是静态页面，暂无动态数据，后端接口待开发中
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            项目仓库地址：<a href="https://github.com/Chenwangdexiwang/Blog" class="blue--text text--lighten-2">Github</a>
          </v-list-item-subtitle>
          <div class="overline mb-1 red--text">申请规则</div>
          <v-list-item-subtitle class="mb-3 font-weight-medium"
            >如果要和本站交换友链，请按照以下格式发送到
            <a href="mailto:vpt940417@gmail.com" class="text-decoration-none"
              >vpt940417@gmail.com</a
            ></v-list-item-subtitle
          >
          <v-list-item-subtitle class="font-weight-medium">
            博客名字: YEVPT
          </v-list-item-subtitle>
          <v-list-item-subtitle class="font-weight-medium">
            博客地址: https://www.yevpt.com
          </v-list-item-subtitle>
          <v-list-item-subtitle class="font-weight-medium">
            博客简介: 我喜欢要么极度悲伤要么淡淡温暖。
          </v-list-item-subtitle>
          <v-list-item-subtitle class="font-weight-medium">
            博客头像:
            https://tc.yevpt.com/images/2020/06/15/vpt-avatar-img-7.md.png
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <div class="pa-4 pt-2 pb-2">
        <div class="caption font-weight-light">
          注① : 希望你的网站非采集以及纯技术站点，且每三个月至少有一次更新。
        </div>
        <div class="caption font-weight-light">
          注② :
          为了更快的效率，请提前加上我的友链，我会在一天内尽快给出答复，谢谢！
        </div>
      </div>
    </v-card>
    <v-subheader class="subinfo mt-2 mb-2"
      >朋友们 (默认按添加时间排序)</v-subheader
    >
    <v-row>
      <v-col cols="12" sm="6">
        <v-card height="100%" flat>
          <a href="http://arutoria.com" target="_blank">
            <div class="flex-middle" style="height: 100%">
              <div style="height: 100%">
                <v-img
                  :src="require('~/static/images/Elaina.jpg')"
                  width="60"
                  height="60"
                  class="ma-3 rounded-lg"
                ></v-img>
              </div>
              <div style="height: 100%">
                <v-card-title>灰之魔女</v-card-title>
                <v-card-subtitle>屑女人</v-card-subtitle>
              </div>
            </div>
          </a>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card height="100%" flat>
          <a href="http://arutoria.com" target="_blank">
            <div class="flex-middle" style="height: 100%">
              <div style="height: 100%">
                <v-img
                  :src="require('~/static/images/Elaina.jpg')"
                  width="60"
                  height="60"
                  class="ma-3 rounded-lg"
                ></v-img>
              </div>
              <div style="height: 100%">
                <v-card-title>灰之魔女</v-card-title>
                <v-card-subtitle>人间之屑</v-card-subtitle>
              </div>
            </div>
          </a>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card height="100%" flat>
          <a href="http://arutoria.com" target="_blank">
            <div class="flex-middle" style="height: 100%">
              <div style="height: 100%">
                <v-img
                  :src="require('~/static/images/Elaina.jpg')"
                  width="60"
                  height="60"
                  class="ma-3 rounded-lg"
                ></v-img>
              </div>
              <div style="height: 100%">
                <v-card-title>灰之魔女</v-card-title>
                <v-card-subtitle>人间之屑</v-card-subtitle>
              </div>
            </div>
          </a>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<style lang="scss">
.pageLinks {
  padding: 12px;
  .subinfo {
    padding-left: 0;
    height: 32px;
  }
}
</style>
