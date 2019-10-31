<template>
  <div>
    <div style="width: 90%;margin: 50px auto">
      <el-divider content-position="center" class="dividers">
        <div style="color: white">
          中学组计分板
        </div>
      </el-divider>
      <div class="content">
        <div class="fatherdiv">
          <div class="childdiev">
            <div class="word1">
              <span>得分情况</span>
            </div>
            <el-table :data="tableData" border :cell-style="cellstyle" :header-cell-style="headerstyle">
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
                prop="count"
                label="积分数" align="center">
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="fatherdiv ll" style="background-color: #0E2A43">
          <div  v-if="show2">
            <el-row>
              <el-col :span="10">
                <el-input placeholder="请输入用户名1" v-model="name1" suffix-icon="el-icon-user"></el-input>
              </el-col>
              <el-col :span="4">
                <div class="word">
                  <span>V S</span>
                </div>
              </el-col>
              <el-col :span="10">
                <el-input placeholder="请输入用户名2" v-model="name2" suffix-icon="el-icon-user"></el-input>
              </el-col>
            </el-row>
            <el-button @click="getVS(name1, name2)" type="info"  size="mini" style="margin-top: 20px;margin-left: 80%">点击查询</el-button>
          </div>
          <!--<div style="width: 100px;position: absolute;top: 80%;left: 80%" v-if="show2">-->
            <!---->
          <!--</div>-->
          <div class="VS" v-if="show1">
            <div class="word">
              <span>
                {{player1}}:
              </span>
              <span style="margin-left: 20px;color: #EA9D07;font-size: 26px;">
                {{player1win}}
              </span>
            </div>
            <div class="word">
              <span>
                V S
              </span>
            </div>
            <div class="word">
              <span>
                {{player2}}:
              </span>
              <span style="margin-left: 20px;color: #EA9D07;font-size: 26px">
                {{player2win}}
              </span>
            </div>
          </div>
          <div style="width: 100px;margin-left: 80%;margin-top: 20px" v-if="show1">
            <el-button @click="returnVs" type="info"  size="mini">继续查询</el-button>
          </div>
          <div id="main" style="height: 500px;margin-top: 20px"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import particlesJs from './particles/Particles'
export default {
  name: 'HomePage',
  components: {
    Particles: particlesJs
  },
  data () {
    return {
      tableData: [],
      player1: '',
      player2: '',
      player1win: '',
      player2win: '',
      show1: false,
      show2: true,
      name1: '',
      name2: '',
      nameList: [],
      countList: [],
      is: 0
    }
  },
  mounted () {
    this.getData()
    // this.getVS()
  },
  methods: {
    cellstyle ({row, column, rowIndex, columnIndex}) {
      return 'background-color: rgba(30,57,72,1);color:white'
    },
    headerstyle ({row, rowIndex}) {
      return 'background-color: #0E2A43;color:white;font-weight: bold'
    },
    getData () {
      this.is = this.is + 1
      console.log(this.is)
      var url = 'http://114.242.223.253/snake_python/python/gaozhongzh'
      this.$axios.get(url).then((res) => {
        this.tableData = res.data.data.list
        for (var i = 0; i < res.data.data.list.length; i++) {
          this.nameList.push(res.data.data.list[i].name)
          this.countList.push(res.data.data.list[i].count)
        }
        this.getcharts()
        setTimeout(() => {
          this.nameList = []
          this.countList = []
          this.getData()
        }, 1000)
      })
    },
    getVS (n1, n2) {
      if (n1 === '' || n2 === '') {
        this.$message.warning('请填写需要PK的用户名')
      } else {
        var url = 'http://114.242.223.253/snake_python/python/gaozhongxz?name1=' + n1 + '&name2=' + n2
        this.$axios.get(url).then((res) => {
          if (res.data.code === 0) {
            this.player1 = res.data.data.player1
            this.player2 = res.data.data.player2
            this.player1win = res.data.data.player1win
            this.player2win = res.data.data.player2win
            this.show2 = false
            this.show1 = true
            setTimeout(() => {
              this.getVS(this.name1, this.name2)
            }, 1000)
          } else {
            this.$message.error('查询失败！')
          }
        })
      }
    },
    returnVs () {
      this.name1 = ''
      this.name2 = ''
      this.show1 = false
      this.show2 = true
    },
    getcharts () {
      var mychart = this.$echarts.init(document.getElementById('main'))
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
        title: {
          text: '中学组成绩动态排名',
          textStyle: {
            align: 'center',
            color: '#fff',
            fontSize: 18
          },
          top: '5%',
          left: 'center'
        },
        tooltip: {
          show: true,
          formatter: '{b}得分:{c}'
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
          // data: ['first', 'two', 'three', 'four', 'five', 'six', 'ss']
          data: this.nameList
        }

        ],
        series: [{
          name: '能耗值',
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
          // data: [4, 132, 89, 134, 60, 90, 50]
          data: this.countList
        }
        ]
      }
      mychart.setOption(option)
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
  .content .fatherdiv {
    flex: 1;
    margin-left: 10px;
  }
  .dividers >>> .el-divider__text {
    background-color: #0E2A43;
  }
  .fatherdiv {
    background-color: #0E2A43;padding: 40px;
    position: relative;
  }
  .childdiev {
    width: 90%;
    /*margin: 0 auto;*/
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .ll {
    position: relative;
  }
  .VS {
    display: flex;
    width: 80%;
    /*top: 50%;*/
    /*left: 50%;*/
    margin: 0 auto;
    /*transform: translate(-50%, -50%);*/
    /*position: absolute;*/
  }
  .VS div {
    flex: 1;
  }
  .word {
    text-align: center;
    font-size: 20px;
    color: white;
  }
  .word1 {
    text-align: center;
    font-size: 20px;
    color: white;
    margin-bottom: 20px;
  }
  .inputVS {
    width: 80%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
  }
</style>
