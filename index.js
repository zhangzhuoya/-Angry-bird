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
  maxTop: 581,
  startLeft: "80",
  startColor: "white",
  pipeLength: 7,
  pipeArr: [],
  score: 0,
  scoreArr: [],
  pipeLastIndex: 6,
  pipePosition: 300,
  init: function () {
    this.initData();
    this.animate();
    this.skyMove();
    this.handle();
  },
  initData: function () {
    this.ogame = document.getElementById("game");
    this.obird = document.getElementsByClassName("bird")[0];
    this.osgame = document.getElementsByClassName("start-game")[0];
    this.oscore = document.getElementsByClassName("score-times")[0];
    this.omask = document.getElementsByClassName("mask")[0];
    this.oRankList = document.getElementsByClassName("rank-score")[0];
   this.scoreArr = this.getScore()
  },
  animate: function () {
    const self = this;
    let conts = 0;
    this.timer = setInterval(function () {
      self.skyMove();
      if (self.startFlag) {
        self.birdDrop();
        self.MovePipe();
      }

      
      if (++conts % 10 === 0) {
        self.birdFly(conts);

        if (!self.startFlag) {
          self.birdJump();
          self.startBound();
        }
      }
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
    this.birdTop = this.birdTop === 220 ? 260 : 220;
    this.obird.style.top = this.birdTop + "px";
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
    // console.log(this.obird.style.top);
    this.addScore();
    this.judgeBoundary();
    this.judgePipe();
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
   * 柱子移动
   * offsetLeft是不带px的单位
   */

  MovePipe: function () {
    for (var i = 0; i < this.pipeLength; i++) {
      // console.log(this.pipeArr);
      var oPipeUp = this.pipeArr[i].up;
      var oPipeDown = this.pipeArr[i].down;
      var x = oPipeUp.offsetLeft - this.skyStep;
      if (x < -52) {
        var lastPipeLeft = this.pipeArr[this.pipeLastIndex].up.offsetLeft;
        oPipeUp.style.left = lastPipeLeft + 300 + "px";
        oPipeDown.style.left = lastPipeLeft + 300 + "px";
        this.pipeLastIndex = ++this.pipeLastIndex % this.pipeLength;
        continue;
      }
      oPipeUp.style.left = x + "px";
      oPipeDown.style.left = x + "px";
    }
  },
  /**
   * 碰撞检测
   */
  judgeBoundary: function () {
    if (this.birdTop < this.minTop || this.birdTop > this.maxTop) {
      this.failGame();
    }
  },
  /**
   * 小鸟和柱子碰撞检测
   */
  judgePipe: function () {
    // 相遇 pipex = 95 pipeX =13
    var index = this.score % this.pipeLength;
    var pipeX = this.pipeArr[index].up.offsetLeft;
    console.log(index);
    var pipeY = this.pipeArr[index].y;
    console.log(pipeX);
    console.log(pipeY);
    // console.log(pipeY[1]);

    var birdY = this.birdTop;
    //  149                 299
    if (
      pipeX <= 95 &&
      pipeX >= 13 &&
      (birdY <= pipeY[0] || birdY >= pipeY[1])
    ) {
      this.failGame();
    }
  },
  /***
   * 添加分数
   */
  addScore: function () {
    var index = this.score % this.pipeLength;
    var pipeX = this.pipeArr[index].up.offsetLeft;
    if (pipeX < 13) {
      this.oscore.innerText = ++this.score;
    }
  },
  /**
   * 处理点击事件
   */
  handle: function () {
    this.handleClick();
    this.handleStart();
  },
  /**
   * 小鸟点击上升
   */
  handleClick: function () {
    var self = this;
    this.ogame.onclick = function (e) {
      if (!e.target.classList.contains("start-game")) {
        self.birdStepY = -10;
      }
    };
  },
  /**
   *
   * @param {handleStart} 点击开始游戏
   */
  handleStart: function () {
    this.osgame.onclick = this.startGame.bind(this);
  },

  /**
   * 创建柱子
   */
  createPipe: function (x) {
    // var pipeHeight 0 - 1 600-150 = 450 / 2 = 225
    // (0 , 1) * 175 === 0, 175
    // 0 - 225 整数
    // 50 - 275
    var upHeight = 50 + Math.floor(Math.random() * 175);
    var downHeight = 600 - 150 - upHeight;
    var oUpPipe = createEle("div", ["pipe", "pipe-up"], {
      height: upHeight + "px",
      left: x + "px",
    });
    var oDownPipe = createEle("div", ["pipe", "pipe-bottom"], {
      height: downHeight + "px",
      left: x + "px",
    });
    this.ogame.appendChild(oUpPipe);
    // console.log(oUpPipe);
    this.ogame.appendChild(oDownPipe);
    this.pipeArr.push({
      up: oUpPipe,
      down: oDownPipe,
      y: [upHeight, upHeight + 150],
    });
  },
  getScore:function () {
    var scoreArr = getLocal("score");
    return scoreArr ? scoreArr:[];
  },
  setScore: function () {
    this.scoreArr.push({
      score: this.score,
      time: this.getDate(),
    });
    this.scoreArr.sort(function (a, b) {
      return b.score - a.score;
    });
    setLocal("score", this.scoreArr);
  },
  getDate: function () {
    var d = new Date();
    var year = d.getFullYear();
    var month = formatNum(d.getMonth() + 1);
    var day = formatNum(d.getDate());
    var hour = formatNum(d.getHours());
    var minute = formatNum(d.getMinutes());
    var second = formatNum(d.getSeconds());
    return `${year}.${month}.${day} ${hour}:${minute}:${second}`;
  },
  startGame: function () {
    const self = this;
    self.startFlag = true;
    self.osgame.style.display = "none";
    self.oscore.style.display = "block";
    self.skyStep = 5;
    self.obird.style.left = self.startLeft + "px";
    self.obird.style.transition = "none";
    for (let i = 0; i < self.pipeLength; i++) {
      self.createPipe(300 * (i + 1));
    }
  },
  renderRankList: function () {
    var template = "";
    for (var i = 0; i < 8; i++) {
      var degreeClass = "";
      switch (i) {
        case 0:
          degreeClass = "first";

          break;
        case 1:
          degreeClass = "second";

          break;
        case 3:
          degreeClass = "third";

          break;
      }
      template += `
    <li class="rank-item">
    <span class="rank-degree ${degreeClass}">${i + 1}</span>
    <span class="rank-scores">${this.scoreArr[i].score}</span>
    <span class="rank-time">${this.scoreArr[i].time}</span>
    </li>
    
    `;
    }
    this.oRankList.innerHTML = template;
  },
  failGame: function () {
    console.log(this.obird.style.top);
    clearInterval(this.timer);
    // console.log(this.birdTop);
    this.omask.style.display = "block";
    this.oscore.style.display = "none";
    this.obird.style.top = 570 + "px";
    this.renderRankList()
  },
};
bird.init();
