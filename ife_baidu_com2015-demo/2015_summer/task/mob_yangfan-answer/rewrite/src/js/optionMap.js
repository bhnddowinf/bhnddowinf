define(function(){
    return {
        mypie: {
                color: ["#f39f61", "#6fb2de", "#fe8988", "#da5a4c", "#c6b29c", "#fdc403"],
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}{c}<br/>({d}%)",
                    backgroundColor: "#e5e5e5",
                    padding: 5,
                    textStyle: {
                        color: "#8c8c8c",
                    },
                },
                series : [
                    {
                        type:'pie',
                        radius : ['40%', '80%'],
                        itemStyle : {
                            normal : {
                                label : {
                                    show : false
                                },
                                labelLine : {
                                    show : false
                                }
                            },
                            emphasis : {
                                label : {
                                    show : true,
                                    position : 'center',
                                    formatter: "{d}%",
                                    textStyle : {
                                        fontWeight : 'bold'
                                    }
                                }
                            }
                        },
                    }
                ],
            },

            myline: {
                tooltip : {
                    trigger: 'item',
                    formatter: "{c}",
                    backgroundColor: "#e5e5e5",
                    padding: 5,
                    textStyle: {
                        color: "#8c8c8c",
                    },
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : [],
                        axisLine: {
                            lineStyle: {
                                color: "#999",
                                width: 1
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                type: "dashed"
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: "#999",
                                fontFamily: "Microsoft YaHei"
                            }
                        }
                    }
                ],
                yAxis : [
                    {
                        show: false,
                        type : 'value',
                        axisLabel : {
                            formatter: '{value}'
                        },
                        splitLine: {
                            show: false
                        }
                    }
                ],
                series : [
                    {
                        itemStyle: {
                            normal: {
                                color: "#7fd2a9"
                                
                            }
                        },
                        name:'收入',
                        type:'line',
                        data:[],
                        symbol: "circle",

                    },
                    {
                        itemStyle: {
                            normal: {
                                color: "#db6c63"
                            }
                        },
                        name:'支出',
                        type:'line',
                        data:[],
                        symbol: "circle",
                    }
                ],
                grid: {
                    x: "5%",
                    y: "5%",
                    width: "90%",
                    height: "80%",
                    borderWidth: 0
                }
            }    
    }
});