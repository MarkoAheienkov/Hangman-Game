class Modal {
  constructor(content, root) {
    this.content = content;
    this.modal = document.createElement('div');
    this.modal.classList.add('modal');
    this.backdrop = document.createElement('div');
    this.backdrop.classList.add('backdrop');
    this.root = root;
    this.root.append(this.modal);
    this.root.append(this.backdrop);
    this.backdrop.addEventListener('click', this.close.bind(this));
    if (typeof content === 'string') {
      this.modal.innerHTML = content;
    }
    else {
      this.modal.append(content);
    }
    window.addEventListener('resize', this.setMiddle.bind(this));
  }
  setMiddle() {
    const {width, height} = this.modal.getBoundingClientRect();
    const {clientHeight, clientWidth} = document.documentElement;
    const percentY = (clientHeight/2 - height/2)/clientHeight;
    const percentX = (clientWidth/2 - width/2)/clientWidth;
    this.modal.style.top = percentY*100 + '%';
    this.modal.style.left = percentX*100 + '%';
  }
  open() {
    this.modal.classList.add('open');
    this.setMiddle()
    this.backdrop.classList.add('open');
  }
  close() {
    this.modal.classList.remove('open');
    this.backdrop.classList.remove('open');
  }
}
