(function(){
    var BeiJing = document.getElementsByClassName('BeiJing')[0];
    var Grain = BeiJing.getElementsByClassName('grain')[0];
    var Lis = Grain.getElementsByTagName('ul')[0].getElementsByTagName('li');
    var grainSizes = BeiJing.getElementsByClassName('grain_size');
    for(var i = 0;i < Lis.length;i++){
        Lis[i].index = i;
        Lis[i].onclick = function(){
            for(var i = 0;i < Lis.length;i++){ 
                Lis[i].className = " ";
                grainSizes[i].className = "grain_size";
            }
            this.className = "active_grain";
            grainSizes[this.index].className = "grain_size active_main";
            var activeMain = BeiJing.getElementsByClassName('active_main')[0];
            var Axis = BeiJing.getElementsByClassName('axis')[0];
            var chartMain = activeMain.getElementsByClassName('chart_main');
            var lis = Axis.getElementsByTagName('ul')[0].getElementsByTagName('li');
            for(var j = 0;j < lis.length;j++){
                lis[j].className = " ";
                chartMain[j].className = "chart_main";
            }
            lis[0].className = "active_axis";
            console.log(lis[0]);
            chartMain[0].className = "chart_main active_line";
            activeLine();
        }
        activeLine();
    }
})();
function activeLine(){
    var BeiJing = document.getElementsByClassName('BeiJing')[0];
    var activeMain = BeiJing.getElementsByClassName('active_main')[0];
    var Axis = BeiJing.getElementsByClassName('axis')[0];
    var chartMain = activeMain.getElementsByClassName('chart_main');
    // console.log(activeMain);
    var lis = Axis.getElementsByTagName('ul')[0].getElementsByTagName('li');
    // console.log(lis);
    for(var j = 0;j < lis.length;j++){
        lis[j].index = j;
        lis[j].onclick = function(){
            for(var j = 0;j < lis.length;j++){
                lis[j].className = " ";
                chartMain[j].className = "chart_main";
            }
            this.className = "active_axis";
            chartMain[this.index].className = "chart_main active_line";
            console.log(this.index);
        }
    }
}