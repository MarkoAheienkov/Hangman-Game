class Shape {
  constructor({name, shape, totalSteps = 25}) {
    this.name = name;
    this.shape = shape;
    this.requestId = null;
    this.totalSteps = totalSteps;
    this.currentStep = 0;
  }
  draw() {}
  getElement() {}
  stopDrawing() {
    cancelAnimationFrame(this.requestId);
    this.currentStep = 0;
  }
}

class Circle extends Shape {
  constructor({name, cx, cy, radius, totalSteps}) {
    super({name, shape: 'circle', totalSteps});
    this.circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    this.circle.classList.add('svg-circle');
    this.circle.setAttribute('transform', `rotate(-90 ${cx} ${cy})`);
    this.cx = cx;
    this.cy = cy;
    this.radius = radius;
    this.perimeter = Math.PI*2*this.radius;
    this.step = this.perimeter/this.totalSteps;
    this.circle.setAttribute('cx', this.cx);
    this.circle.setAttribute('cy', this.cy);
    this.circle.setAttribute('r', this.radius);
    this.circle.setAttribute('stroke-dasharray', this.perimeter);
    this.circle.setAttribute('stroke-dashoffset', this.perimeter);
  }
  getElement() {
    return this.circle;
  }
  draw() {
    this.requestId = requestAnimationFrame(this.drawingAnimation.bind(this));
  }
  drawingAnimation() {
    const currentStrDashOff = this.circle.getAttribute('stroke-dashoffset') - this.step;
    this.circle.setAttribute('stroke-dashoffset', currentStrDashOff);
    this.currentStep++;
    if (this.currentStep!==this.totalSteps) {
      requestAnimationFrame(this.draw.bind(this))
    } else {
      this.stopDrawing();
    }
  }
}

class Line extends Shape {
  constructor({name, x1, x2, y1, y2, totalSteps}) {
    super({name, shape: 'line', totalSteps});
    this.line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    this.line.classList.add('svg-line');
    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;
    this.stepX = (x2-x1)/this.totalSteps;
    this.stepY = (y2-y1)/this.totalSteps;
    this.line.setAttribute('y1', this.y1);
    this.line.setAttribute('x1', this.x1);
    this.line.setAttribute('x2', this.x1);
    this.line.setAttribute('y2', this.y1);
  }
  getElement() {
    return this.line;
  }
  draw() {
    this.requestId = requestAnimationFrame(this.drawingAnimation.bind(this));
  }
  drawingAnimation() {
    const currentX2 = Number(this.line.getAttribute('x2')) + this.stepX;
    const currentY2 = Number(this.line.getAttribute('y2')) + this.stepY;
    this.line.setAttribute('x2', currentX2);
    this.line.setAttribute('y2', currentY2);
    this.currentStep++;
    if (this.currentStep !== this.totalSteps) {
      requestAnimationFrame(this.draw.bind(this));
    } else {
      this.stopDrawing();
    }
  }
}
