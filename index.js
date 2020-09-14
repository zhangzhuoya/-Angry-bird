/**
 * 变量写在函数里
 */
var bird = {
  skyPosition: 0,
  // 天空移动的速度
  skyStep: 2,
  birdPosition: 0,
  birdStepY: 0,
  birdTop: 220,
  minTop: 0,
  startFlag: false,
  maxTop: 570,
  startLeft: "80",
  startColor: "white",
  pipeLength: 7,
  init: function () {
    this.initData();
    this.animate();
    this.skyMove();
    this.startGame();
    this.createPipe(300)
    // this.handleClick();
  },
  initData: function () {
    this.ogame = document.getElementById("game");
    this.obird = document.getElementsByClassName("bird")[0];
    this.osgame = document.getElementsByClassName("start-game")[0];
    this.oscore = document.getElementsByClassName("score-times")[0];
    this.omask = document.getElementsByClassName("mask")[0];
    // this.oclor = document.getElementsByClassName("")
    //   this.skyMove()
  },
  animate: function () {
    const self = this;
    let conts = 0;
    this.timer = setInterval(function () {
    
      conts++;
      if (self.startFlag) {
        self.birdDrop();
      }
      if (conts % 10 === 0) {
        self.birdFly(conts);

        if (!self.startFlag) {
          self.birdJump();
          self.startBound();
        }
      }
      self.skyMove();
    }, 30);
  },
  /**
   * 天空移动
   */
  skyMove: function () {
    this.skyPosition -= this.skyStep;
    this.ogame.style.backgroundPositionX = this.skyPosition + "px";
  },
  /**
   * 初始时上下蹦
   */
  birdJump: function () {
    this.birdTop = this.birdTop === 230 ? 280 : 230;
    this.obird.style.top = this.birdTop + "px";
    // //.log(this.obird.style.top);
  },
  /**
   *
   * @param {birdFly} 小鸟飞行
   */
  birdFly: function (conts) {
    this.birdPosition = (conts % 3) * -30 + "px";
    this.obird.style.backgroundPositionX = this.birdPosition;
  },
  /**
   * 小鸟垂直降落
   */
  birdDrop: function () {
    this.birdTop += ++this.birdStepY;
    this.obird.style.top = this.birdTop + "px";
    this.judgeBoundary();

  },

  /**
   *开始游戏颜色切换
   */
  startBound: function () {
    let prevColor = this.startColor;
    //.log(prevColor);
    this.startColor = prevColor === "white" ? "blue" : "white";
    this.osgame.classList.remove(prevColor);
    this.osgame.classList.add(this.startColor);
  },
  /**
   * 碰撞检测
   */
  judgeBoundary: function () {
    if (this.birdTop < this.minTop || this.birdTop > this.maxTop) {
      // this.ogame.style.top = this.maxTop;

      //.log(this.birdTop);
      this.failGame();
    }
  },
  /**
   * 小鸟点击上升
   */
  // handleClick: function () {
  //   const self = this;
  //   this.ogame.onclick = function () {
  //     console.log(self.birdStepY);
  //    self.birdStepY += -10;
  //   };
  // },
  /**
   * 创建柱子
   */
  createPipe: function (x) {
    //var upHeihgt = 50 + Math.floor(Math.random() * 175);
    //var downHeight = 600 - 150 - upHeihgt;
   // var oupPige = createEle("div", ["pipe", "pipe-up"], {
   //   height: upHeihgt +"px",
    //  left: x + "px"
   // })
    var odownPige = createEle("div"
    //, ["pipe", "pipe-down"], {
     // height: downHeight + "px",
    //  left: x + "px"
   //}
   )
    //this.ogame.appendChild(oupPige);
    this.ogame.appendChild(odownPige);
  },

  startGame: function () {
    const self = this;
    self.ogame.onclick = function (e) {
      // console.log(this);
      self.startFlag = true;
      self.osgame.style.display = "none";
      self.oscore.style.display = "block";
      self.skyStep = 5;
      self.obird.style.left = self.startLeft + "px";
      // self.birdStepY = 50;
      if (!e.target.classList.contains("start-game")) {
        //  console.log(e.target.classList);
        self.birdStepY = -10;
      }
      //console.log(self.birdStepY);
      // //.log(self.obird.style.left);
     // for (let i = 0; i < self.pipeLength; i++) {
   //     self.createPipe(300 * (i + 1));
 //     }
    };
  },

  failGame: function () {
    // this.ogame.style.top = this.maxTop;
    clearInterval(this.timer);
    // this.ogame.style.top = this.maxTop;
    ////.log(this.maxTop);
    this.omask.style.display = "block";
    this.oscore.style.display = "none";
  },
};
bird.init();
