<template>
  <div class="dialog-left">
    <h3 class="theme-font-style">系统图谱</h3>
    <div class="show-box">
      <SvgBox :data="systemList" :index="6666" />
    </div>
  </div>
</template>

<script setup>
import SvgBox from './SvgBox';
import { reactive } from 'vue';
const systemList = reactive({
  name: '系统名称3',
  check: false,
  same: false,
  children: [
    {
      name: '节点名称1',
      same: false,
      children: [
        {
          name: '节点名称21',
          same: false,
        },
        {
          name: '节点名称22',
          same: false,
        },
        {
          name: '节点名称23',
          same: false,
          children: [
            {
              name: '节点名称31',
              same: false,
              children: [
                {
                  name: '节点名称42',
                  same: false,
                  children: [
                    {
                      name: '节点名称52',
                      same: false,
                      children: [
                        {
                          name: '节点名称52',
                          // children: [
                          //   // {
                          //   //   name: '节点名称52',
                          //   //   children: [
                          //   //     {
                          //   //       name: '节点名称52',
                          //   //       children: [
                          //   //         {
                          //   //           name: '节点名称52',
                          //   //           children: [
                          //   //             {
                          //   //               name: '节点名称52',
                          //   //             },
                          //   //           ],
                          //   //         },
                          //   //       ],
                          //   //     },
                          //   //   ],
                          //   // },
                          // ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: '节点名称24',
          same: false,
        },
      ],
    },
  ],
});
</script>

<style lang="scss" scoped>
.dialog-left {
  h3 {
    font-size: 50px;
    margin: 0;
    padding: 0;
    margin-bottom: 46px;
  }
  .show-box {
    cursor: pointer;
    width: 979px;
    height: 749px;
    border-radius: 20px;
    border: 1px solid #547eff;
    box-shadow: 0px 0px 40px 0px #1d4d8d;
    background: #222f4e;
  }
}
</style>
