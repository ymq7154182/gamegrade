<template>
  <div style="width: 90%;margin: 100px auto">
    <el-divider content-position="center" class="dividers">
      <div style="color: white">
        小学组计分板
      </div>
    </el-divider>
    <div style="margin: 0 auto;width: 300px">
      <el-radio-group v-model="radio" style="margin-top: 20px" @change="changeradio">
        <el-radio :label="1" style="color: white">个人成绩查看</el-radio>
        <el-radio :label="2" style="color: white">最终成绩排名</el-radio>
      </el-radio-group>
    </div>
    <div v-show="radio === 1">
      <div style="width: 90%;margin: 20px auto">
        <el-row :gutter="20">
          <el-col :span="12">
            <div style="margin: 20px auto;width: 550px">
              <el-input style="width: 400px" placeholder="请输入小组名称" v-model="input1"></el-input>
              <el-button type="warning" @click="searchData">点击查询</el-button>
            </div>
            <div style="color: white;font-weight: bold;text-align: center;margin-top: 40px;font-size: 24px;margin-bottom: 20px">
              <span style="color: orange">{{input1 }}</span>
              小组前<span style="font-size: 26px;color: #13E8E9;margin-left: 10px;margin-right: 10px">{{nums}}</span>轮得分情况
            </div>
            <el-table :data="tableData2" border :cell-style="cellstyle" :header-cell-style="headerstyle" max-height="600px">
              <el-table-column
                label="轮次" align="center">
                <template slot-scope="scope">
                  <div>
                    第<span style="font-size: 18px;color: orange;margin-left: 10px;margin-right: 10px">{{scope.row.num}}</span>轮
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="foodcount"
                label="吃到的果子数" align="center">
              </el-table-column>
              <el-table-column
                prop="numcount"
                label="所用步数" align="center">
              </el-table-column>
              <el-table-column
                prop="datetime"
                label="更新时间" align="center">
                <template slot-scope="scope">
                  <div>
                    <span>{{scope.row.datetime | formatDate}}</span>
                  </div>
                  <div>
                    <span>{{scope.row.datetime | formatDate2}}</span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="12">
            <div id="main3" style="height: 600px;margin-top: 40px"></div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="content" v-show="radio === 2">
      <div class="fatherdiv">
        <div class="childdiev">
          <div class="word1">
            <span>小学组成绩综合排名</span>
          </div>
          <el-table :data="tableData" border :cell-style="cellstyle" :header-cell-style="headerstyle" max-height="600px">
            <el-table-column
              type="index"
              label="排名" align="center">
            </el-table-column>
            <el-table-column
              prop="id"
              label="ID" align="center">
            </el-table-column>
            <el-table-column
              prop="name"
              label="小组名" align="center">
            </el-table-column>
            <el-table-column
              prop="foodcount"
              label="吃到的果子数(平均)" align="center">
            </el-table-column>
            <el-table-column
              prop="numcount"
              label="所用步数(平均)" align="center">
            </el-table-column>
            <el-table-column
              prop="datetime"
              label="更新时间" align="center">
              <template slot-scope="scope">
                <div>
                  <span>{{scope.row.datetime | formatDate}}</span>
                </div>
                <div>
                  <span>{{scope.row.datetime | formatDate2}}</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="fatherdiv ll">
        <div id="main2" style="height: 600px"></div>
      </div>
    </div>
  </div>
</template>

<script>
import dateFormat from '../assets/js/Date'
export default {
  name: 'ChuzhongPage',
  data () {
    return {
      tableData: [],
      nameList: [],
      numcountList: [],
      foodcountList: [],
      radio: 1,
      input1: '',
      tableData2: [],
      nums: '',
      numList: [],
      numcountList1: [],
      foodcountList1: [],
      nametitle: '',
      count: 0
    }
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return dateFormat.formatDate(date, 'yyyy-MM-dd')
    },
    formatDate2 (time) {
      let date = new Date(time)
      return dateFormat.formatDate(date, 'hh:mm:ss')
    }
  },
  mounted () {
    // this.getData()
  },
  methods: {
    cellstyle ({row, column, rowIndex, columnIndex}) {
      return 'background-color: rgba(30,57,72,1);color:white'
    },
    headerstyle ({row, rowIndex}) {
      return 'background-color: #0E2A43;color:white;font-weight: bold'
    },
    getcharts () {
      var mychart = this.$echarts.init(document.getElementById('main2'))
      var colorArray = [
        {
          top: '#ffa800', // 黄
          bottom: 'rgba(11,42,84,.3)'
        }, {
          top: '#1ace4a', // 绿
          bottom: 'rgba(11,42,84, 0.3)'
        },
        {
          top: '#4bf3ff', // 蓝
          bottom: 'rgba(11,42,84,.3)'
        }, {
          top: '#4f9aff', // 深蓝
          bottom: 'rgba(11,42,84,.3)'
        },
        {
          top: '#b250ff', // 粉
          bottom: 'rgba(11,42,84,.3)'
        }
      ]
      var option = {
        backgroundColor: '#0E2A43',
        tooltip: {
          show: true,
          formatter: '{b}:{c}'
        },
        title: {
          text: '小学组成绩动态排名',
          textStyle: {
            align: 'center',
            color: '#fff',
            fontSize: 18
          },
          top: '10%',
          left: 'center'
        },
        grid: {
          left: '5%',
          top: '12%',
          right: '1%',
          bottom: '8%',
          containLabel: true
        },

        xAxis: {
          type: 'value',
          show: false,
          position: 'top',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#fff'
            }
          },
          splitLine: {
            show: false
          }
        },
        yAxis: [{
          type: 'category',
          axisTick: {
            show: false,
            alignWithLabel: false,
            length: 5

          },
          'splitLine': { // 网格线
            'show': false
          },
          inverse: 'true', // 排序
          axisLine: {
            show: false,
            lineStyle: {
              color: '#fff'
            }
          },
          data: this.nameList
          // data: this.nameList
        }

        ],
        legend: {
          data: ['吃果子数', '步数'],
          textStyle: {
            color: '#ccc'
          },
          selectedMode: 'single'
          // selected: {
          //   '吃果子数': false
          // }
        },
        series: [{
          name: '步数',
          type: 'bar',
          label: {
            normal: {
              show: true,
              position: 'right',
              formatter: '{c}',
              textStyle: {
                color: 'white' // color of value
              }
            }
          },
          itemStyle: {
            normal: {
              show: true,
              color: function (params) {
                let num = colorArray.length
                return {
                  type: 'linear',
                  colorStops: [{
                    offset: 0,
                    color: colorArray[params.dataIndex % num].bottom
                  }, {
                    offset: 1,
                    color: colorArray[params.dataIndex % num].top
                  }, {
                    offset: 0,
                    color: colorArray[params.dataIndex % num].bottom
                  }, {
                    offset: 1,
                    color: colorArray[params.dataIndex % num].top
                  }, {
                    offset: 0,
                    color: colorArray[params.dataIndex % num].bottom
                  }, {
                    offset: 1,
                    color: colorArray[params.dataIndex % num].top
                  }, {
                    offset: 0,
                    color: colorArray[params.dataIndex % num].bottom
                  }, {
                    offset: 1,
                    color: colorArray[params.dataIndex % num].top
                  }, {
                    offset: 0,
                    color: colorArray[params.dataIndex % num].bottom
                  }, {
                    offset: 1,
                    color: colorArray[params.dataIndex % num].top
                  }, {
                    offset: 0,
                    color: colorArray[params.dataIndex % num].bottom
                  }, {
                    offset: 1,
                    color: colorArray[params.dataIndex % num].top
                  }]
                  // globalCoord: false
                }
              },
              barBorderRadius: 70,
              borderWidth: 0,
              borderColor: '#333'
            }
          },
          barGap: '0%',
          barCategoryGap: '80%',
          data: this.numcountList
          // data: this.countList
        },
        {
          name: '吃果子数',
          type: 'bar',
          label: {
            normal: {
              show: true,
              position: 'right',
              formatter: '{c}',
              textStyle: {
                color: 'white' // color of value
              }
            }
          },
          itemStyle: {
            normal: {
              show: true,
              color: function (params) {
                let num = colorArray.length
                return {
                  type: 'linear',
                  colorStops: [{
                    offset: 0,
                    color: colorArray[params.dataIndex % num].bottom
                  }, {
                    offset: 1,
                    color: colorArray[params.dataIndex % num].top
                  }, {
                    offset: 0,
                    color: colorArray[params.dataIndex % num].bottom
                  }, {
                    offset: 1,
                    color: colorArray[params.dataIndex % num].top
                  }, {
                    offset: 0,
                    color: colorArray[params.dataIndex % num].bottom
                  }, {
                    offset: 1,
                    color: colorArray[params.dataIndex % num].top
                  }, {
                    offset: 0,
                    color: colorArray[params.dataIndex % num].bottom
                  }, {
                    offset: 1,
                    color: colorArray[params.dataIndex % num].top
                  }, {
                    offset: 0,
                    color: colorArray[params.dataIndex % num].bottom
                  }, {
                    offset: 1,
                    color: colorArray[params.dataIndex % num].top
                  }, {
                    offset: 0,
                    color: colorArray[params.dataIndex % num].bottom
                  }, {
                    offset: 1,
                    color: colorArray[params.dataIndex % num].top
                  }]
                  // globalCoord: false
                }
              },
              barBorderRadius: 70,
              borderWidth: 0,
              borderColor: '#333'
            }
          },
          barGap: '0%',
          barCategoryGap: '80%',
          data: this.foodcountList
          // data: this.countList
        }
        ]
      }
      mychart.setOption(option)
    },
    getcharts2 () {
      var mychart = this.$echarts.init(document.getElementById('main3'))
      var colorArray = [
        {
          top: '#ffa800', // 黄
          bottom: 'rgba(11,42,84,.3)'
        }, {
          top: '#1ace4a', // 绿
          bottom: 'rgba(11,42,84, 0.3)'
        },
        {
          top: '#4bf3ff', // 蓝
          bottom: 'rgba(11,42,84,.3)'
        }, {
          top: '#4f9aff', // 深蓝
          bottom: 'rgba(11,42,84,.3)'
        },
        {
          top: '#b250ff', // 粉
          bottom: 'rgba(11,42,84,.3)'
        }
      ]
      var option = {
        backgroundColor: '#0E2A43',
        tooltip: {
          show: true,
          formatter: '{b}:{c}'
        },
        title: {
          text: this.nametitle,
          textStyle: {
            align: 'center',
            color: '#fff',
            fontSize: 18
          },
          top: '10%',
          left: 'center'
        },
        grid: {
          left: '5%',
          top: '12%',
          right: '1%',
          bottom: '8%',
          containLabel: true
        },

        xAxis: {
          type: 'value',
          show: false,
          position: 'top',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#fff'
            }
          },
          splitLine: {
            show: false
          }
        },
        yAxis: [{
          type: 'category',
          axisTick: {
            show: false,
            alignWithLabel: false,
            length: 5

          },
          'splitLine': { // 网格线
            'show': false
          },
          inverse: 'true', // 排序
          axisLine: {
            show: false,
            lineStyle: {
              color: '#fff'
            }
          },
          data: this.numList
          // data: this.nameList
        }

        ],
        legend: {
          data: ['吃果子数', '步数'],
          textStyle: {
            color: '#ccc'
          },
          selectedMode: 'single'
          // selected: {
          //   '吃果子数': false
          // }
        },
        series: [{
          name: '步数',
          type: 'bar',
          label: {
            normal: {
              show: true,
              position: 'right',
              formatter: '{c}',
              textStyle: {
                color: 'white' // color of value
              }
            }
          },
          itemStyle: {
            normal: {
              show: true,
              color: function (params) {
                let num = colorArray.length
                return {
                  type: 'linear',
                  colorStops: [{
                    offset: 0,
                    color: colorArray[params.dataIndex % num].bottom
                  }, {
                    offset: 1,
                    color: colorArray[params.dataIndex % num].top
                  }, {
                    offset: 0,
                    color: colorArray[params.dataIndex % num].bottom
                  }, {
                    offset: 1,
                    color: colorArray[params.dataIndex % num].top
                  }, {
                    offset: 0,
                    color: colorArray[params.dataIndex % num].bottom
                  }, {
                    offset: 1,
                    color: colorArray[params.dataIndex % num].top
                  }, {
                    offset: 0,
                    color: colorArray[params.dataIndex % num].bottom
                  }, {
                    offset: 1,
                    color: colorArray[params.dataIndex % num].top
                  }, {
                    offset: 0,
                    color: colorArray[params.dataIndex % num].bottom
                  }, {
                    offset: 1,
                    color: colorArray[params.dataIndex % num].top
                  }, {
                    offset: 0,
                    color: colorArray[params.dataIndex % num].bottom
                  }, {
                    offset: 1,
                    color: colorArray[params.dataIndex % num].top
                  }]
                  // globalCoord: false
                }
              },
              barBorderRadius: 70,
              borderWidth: 0,
              borderColor: '#333'
            }
          },
          barGap: '0%',
          barCategoryGap: '80%',
          data: this.numcountList1
          // data: this.countList
        },
        {
          name: '吃果子数',
          type: 'bar',
          label: {
            normal: {
              show: true,
              position: 'right',
              formatter: '{c}',
              textStyle: {
                color: 'white' // color of value
              }
            }
          },
          itemStyle: {
            normal: {
              show: true,
              color: function (params) {
                let num = colorArray.length
                return {
                  type: 'linear',
                  colorStops: [{
                    offset: 0,
                    color: colorArray[params.dataIndex % num].bottom
                  }, {
                    offset: 1,
                    color: colorArray[params.dataIndex % num].top
                  }, {
                    offset: 0,
                    color: colorArray[params.dataIndex % num].bottom
                  }, {
                    offset: 1,
                    color: colorArray[params.dataIndex % num].top
                  }, {
                    offset: 0,
                    color: colorArray[params.dataIndex % num].bottom
                  }, {
                    offset: 1,
                    color: colorArray[params.dataIndex % num].top
                  }, {
                    offset: 0,
                    color: colorArray[params.dataIndex % num].bottom
                  }, {
                    offset: 1,
                    color: colorArray[params.dataIndex % num].top
                  }, {
                    offset: 0,
                    color: colorArray[params.dataIndex % num].bottom
                  }, {
                    offset: 1,
                    color: colorArray[params.dataIndex % num].top
                  }, {
                    offset: 0,
                    color: colorArray[params.dataIndex % num].bottom
                  }, {
                    offset: 1,
                    color: colorArray[params.dataIndex % num].top
                  }]
                  // globalCoord: false
                }
              },
              barBorderRadius: 70,
              borderWidth: 0,
              borderColor: '#333'
            }
          },
          barGap: '0%',
          barCategoryGap: '80%',
          data: this.foodcountList1
          // data: this.countList
        }
        ]
      }
      mychart.setOption(option)
    },
    getData () {
      var url = 'http://zhongkeruitong.top/show/snake_python/python/chuzhongzh'
      this.$axios.get(url).then((res) => {
        this.tableData = res.data.data.list
        for (var i = 0; i < res.data.data.list.length; i++) {
          this.nameList.push(res.data.data.list[i].name)
          this.numcountList.push(res.data.data.list[i].numcount)
          this.foodcountList.push(res.data.data.list[i].foodcount)
        }
        setTimeout(() => {
          this.getcharts()
        }, 500)
        setTimeout(() => {
          this.nameList = []
          this.numcountList = []
          this.foodcountList = []
          this.getData()
        }, 1000)
      })
    },
    searchData () {
      this.numList = []
      this.numcountList1 = []
      this.foodcountList1 = []
      var url = 'http://zhongkeruitong.top/show/snake_python/python/chuzhong?name=' + this.input1
      this.$axios.get(url).then((res) => {
        this.nums = res.data.data.total
        this.tableData2 = res.data.data.list
        for (var i = 0; i < res.data.data.list.length; i++) {
          this.numList.push('第' + res.data.data.list[i].num + '轮')
          this.numcountList1.push(res.data.data.list[i].numcount)
          this.foodcountList1.push(res.data.data.list[i].foodcount)
        }
        this.nametitle = this.input1 + '小组前' + res.data.data.total + '轮成绩动态展示'
        this.getcharts2()
        setTimeout(() => {
          this.numList = []
          this.numcountList1 = []
          this.foodcountList1 = []
          this.searchData()
        }, 1000)
      })
    },
    changeradio () {
      this.count += 1
      if (this.radio === 2 && this.count <= 2) {
        this.getData()
      }
    }
  }
}
</script>

<style scoped>
  .content {
    width: 100%;
    margin: 0 auto;
    display: flex;
  }
  .dividers >>> .el-divider__text {
    background-color: #0E2A43;
  }
  .content .fatherdiv {
    flex: 1;
    margin-left: 10px;
  }
  .fatherdiv {
    background-color: #0E2A43;padding: 30px;
    position: relative;
  }
  .childdiev {
    width: 90%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
 .word1 {
    text-align: center;
    font-size: 20px;
    color: white;
    margin-bottom: 20px;
  }
</style>
