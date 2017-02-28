function initView(){

    var inputSource = document.getElementById("input-source");
    var markdownDisplay = document.getElementById("markdown-display");

    markdownDisplay.innerHTML = m2h(inputSource.value);

    inputSource.oninput = function(e){
        markdownDisplay.innerHTML = m2h(e.target.value);
    }
}

function init(){

    initView();

}

init();