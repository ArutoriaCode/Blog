<template>
  <div class="pageLinks">
    <div class="title" style="margin-bottom: 6px">友邻</div>
    <div class="subtitle-2 red--text"></div>
    <v-card class="mx-auto mt-4" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-1 red--text">关于博客</div>
          <v-list-item-subtitle class="font-weight-medium">
            博客整体布局和样式都参考了<a href="https://www.yevpt.com" class="blue--text text--lighten-2"> YEVPT </a>，源站点更加漂亮！
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            项目前端仓库地址：<a href="https://github.com/Chenwangdexiwang/Blog" class="blue--text text--lighten-2">Github</a>
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            项目后端仓库地址：<a href="https://github.com/Chenwangdexiwang/Blog-egg" class="blue--text text--lighten-2">Github</a>
          </v-list-item-subtitle>
          <div class="overline mb-1 red--text">申请规则</div>
          开发阶段数据库会不定时清除，所以友邻页面等我开发完之后再使用，以下都为假数据。
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
