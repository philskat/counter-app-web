class Counter {
  private counter: HTMLParagraphElement;
  private incBtn: HTMLButtonElement;
  private decBtn: HTMLButtonElement;
  private rstBtn: HTMLButtonElement;

  private count: number;

  constructor() {
    this.counter = document.getElementById('counter') as HTMLParagraphElement;
    this.incBtn = document.getElementById('incBtn') as HTMLButtonElement;
    this.decBtn = document.getElementById('decBtn') as HTMLButtonElement;
    this.rstBtn = document.getElementById('reset') as HTMLButtonElement;

    this.count = parseInt(localStorage.getItem('count') ?? '0');

    this.counter.addEventListener('click', () => this.increment());
    this.incBtn.addEventListener('click', () => this.increment());
    this.decBtn.addEventListener('click', () => this.decrement());
    this.rstBtn.addEventListener('click', () => this.reset());

    this.update();
  }

  private update() {
    this.counter.textContent = this.count.toString();
    localStorage.setItem('count', this.count.toString());
  }

  increment() {
    this.count++;
    this.update();
  }

  decrement() {
    if (this.count > 0) {
      this.count--;
      this.update();
    }
  }

  reset() {
    this.count = 0;
    this.update();
  }
}

export default new Counter();
