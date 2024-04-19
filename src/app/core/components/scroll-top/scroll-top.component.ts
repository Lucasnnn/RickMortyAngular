import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-top',
  templateUrl: './scroll-top.component.html',
  styleUrls: ['./scroll-top.component.scss'],
})
export class ScrollTopComponent {
  showScroll: boolean = false;

  ngOnInit() {
    window.scrollTo(0, 0); // Certifique-se de que a página inicie no topo
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset > 300) {
      // Exibe o botão quando a página for rolada além de 300px
      this.showScroll = true;
    } else {
      this.showScroll = false;
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Rola suavemente para o topo
  }
}
