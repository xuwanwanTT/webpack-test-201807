
class Slider {
  constructor(option) {
    this.dom = document.createElement('div');
    this.domCtx = document.createElement('canvas');
    this.domControler = document.createElement('div');
    this.slider = document.createElement('div');
    this.dom.appendChild(this.domCtx);
    this.dom.appendChild(this.domControler);
    this.domControler.appendChild(this.slider);

    this.domCtx.width = option.width;
    this.domCtx.height = option.height;
    this.ctx = this.domCtx.getContext('2d');

    this.width = option.width;
    this.height = option.height;
    this.sliderH = option.sliderH || 50;
    this.sliderW = option.sliderW || 50;

    this.start();
  }

  start() {
    const me = this;
    me.controler();
  }

  controler() {
    const me = this;
    const slider = me.slider;

    const style = me.domControler.style;
    style.width = me.width + 'px';
    style.height = me.sliderH + 'px';
    style.background = 'rgba(255,0,0,.3)';

    const styleS = slider.style;
    styleS.width = me.sliderW + 'px';
    styleS.height = me.sliderH + 'px';
    styleS.background = 'yellow';

    slider.onmousedown = e => {
      me.isDown = true;
      me.downState = {
        x: e.offsetX
      };
    };

    document.onmouseup = () => {
      me.isDown = false;
    };

    document.onmousemove = e => {
      const me = this;
      if (!me.isDown) { return }
      let moveX = e.clientX - me.downState.x;
      if (moveX > 550) moveX = 550;
      if (moveX < 0) moveX = 0;
      me.slider.style.transform = `translateX(${moveX}px)`;
      me.canvas(moveX);
    };
  }

  canvas(x) {
    const me = this;
    const ctx = me.ctx;
    ctx.clearRect(0, 0, me.width, me.height);
    me.drawImg(x, 150, 20);
  }

  drawImg(x, y, r) {
    const me = this;
    const ctx = me.ctx;

    ctx.beginPath();
    ctx.fillRect(0, 0, me.width, me.height);
    ctx.fillStyle = 'rgba(0,255,0,1)';
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(300, 150, r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,.5)';
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,255,0,.5)';
    ctx.fill();
    ctx.closePath();
  }
};

export default Slider;
