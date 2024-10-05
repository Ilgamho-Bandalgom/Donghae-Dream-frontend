export class Point {
  constructor(index, x, y, stageWidth) {
    this.x = x;
    this.y = y;
    this.fieldY = y; // 기본 Y 중심
    this.speed = 0.1;
    this.cur = index; // 각 점이 최대한 평행하지 않도록 각각 다른 시작점을 가지게 합니다.
    // Adjust max height based on stageWidth, limiting it to a range
    this.max = Math.random() * (stageWidth / 10) + 20; // Adjust max height range
  }

  update() {
    this.cur += this.speed;
    this.y = this.fieldY + Math.sin(this.cur) * this.max;
  }
}

export class Wave {
  constructor(color, startX = 0) {
    this.color = color;
    this.points = [];
    this.numberOfPoints = 6;
    this.startX = startX;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.centerX = stageWidth / 1.3;
    this.centerY = stageHeight / 1.3;
    this.pointGap = this.stageWidth / (this.numberOfPoints - 1);
    this.init();
  }

  init() {
    for (let i = 0; i < this.numberOfPoints; i++) {
      // Pass stageWidth to Point constructor
      this.points[i] = new Point(
        i,
        this.pointGap * i,
        this.centerY,
        this.stageWidth
      );
    }
  }

  draw(ctx) {
    ctx.beginPath();
    let prevX = this.points[0].x;
    let prevY = this.points[0].y;
    ctx.moveTo(prevX, prevY);

    for (let i = 0; i < this.numberOfPoints; i++) {
      const cx = (prevX + this.points[i].x) / 2;
      const cy = (prevY + this.points[i].y) / 2;
      ctx.quadraticCurveTo(prevX, prevY, cx, cy);

      prevX = this.points[i].x;
      prevY = this.points[i].y;

      if (i !== 0 && i !== this.numberOfPoints - 1) {
        this.points[i].update();
      }
    }

    ctx.lineTo(prevX, prevY);
    ctx.lineTo(this.stageWidth, this.stageHeight);
    ctx.lineTo(0, this.stageHeight);
    ctx.lineTo(this.points[0].x, this.points[0].y);

    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}
