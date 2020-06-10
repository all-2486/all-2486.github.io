(function () {

  function setRem() {
    //获取屏幕宽度(页面宽度)
    let pageWidth = innerWidth;
    // console.log('pageWidth ==> ', pageWidth);

    //以iphone6为标准屏进行设置rem，设置html的font-size: 100px; 换句话说：在iphone6: 1rem = 100px
    let baseWidth = 375;

    let fontSize = pageWidth / baseWidth * 100;

    // console.log('fontSize ==> ', fontSize);

    document.getElementsByTagName('html')[0].style.fontSize = fontSize + 'px';
  }


  setRem();

  window.onresize = function () {
    setRem();
  }


})()