class ThemeHandler {
  private darkTheme: boolean | null;
  private htmlTag: HTMLHtmlElement;
  private themeChanger: HTMLButtonElement;

  constructor() {
    this.htmlTag = document.getElementsByTagName('html')[0] as HTMLHtmlElement;
    this.themeChanger = document.getElementById(
      'themeChanger'
    ) as HTMLButtonElement;
    const themeSetting = localStorage.getItem('theme');

    console.log(themeSetting);

    if (themeSetting === null) {
      this.darkTheme = matchMedia('(prefers-color-scheme: dark)').matches;
    } else {
      this.darkTheme = themeSetting === 'dark';
    }

    this.update();

    this.themeChanger.addEventListener('click', () => this.toggleTheme());
  }

  private update() {
    if (this.darkTheme) {
      this.htmlTag.classList.add('dark');
    } else {
      this.htmlTag.classList.remove('dark');
    }
  }

  toggleTheme() {
    this.darkTheme = !this.darkTheme;

    localStorage.setItem('theme', this.darkTheme ? 'dark' : 'light');

    this.update();
  }
}

export default new ThemeHandler();
