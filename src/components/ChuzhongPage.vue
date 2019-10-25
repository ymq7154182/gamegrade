<template>
  <div style="width: 90%;margin: 100px auto">
    <el-divider content-position="center" class="dividers">
      <div style="color: white">
        计分板
      </div>
    </el-divider>
    <div class="content">
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
              label="用户名" align="center">
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
      foodcountList: []
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
    this.getData()
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
    getData () {
      var url = 'http://114.242.223.253/snake_python/python/chuzhong'
      this.$axios.get(url).then((res) => {
        this.tableData = res.data.data.list
        for (var i = 0; i < res.data.data.list.length; i++) {
          this.nameList.push(res.data.data.list[i].name)
          this.numcountList.push(res.data.data.list[i].numcount)
          this.foodcountList.push(res.data.data.list[i].foodcount)
        }
        this.getcharts()
        setTimeout(() => {
          this.nameList = []
          this.numcountList = []
          this.foodcountList = []
          this.getData()
        }, 1000)
      })
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
