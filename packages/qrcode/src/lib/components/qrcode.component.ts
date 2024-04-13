import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { QrcodeService } from '../services/qrcode.service';
import { AuthService, FRONT_URL } from 'core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-qrcode',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './qrcode.component.html',
})
export class QrcodeComponent {
  qrcodeService = inject(QrcodeService);
  authService = inject(AuthService);
  sanitizer = inject(DomSanitizer);
  url = inject(FRONT_URL);
  svg: string;

  @ViewChild('qrcodetemplate') qrcodeTemplate: HTMLElement;

  sanitizeSVG(svgString: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svgString);
  }

  @ViewChild('content') content!: ElementRef;

  items: string[] = ['Item 1', 'Item 2', 'Item 3'];

  downloadSVG() {
    const businessName = this.authService.userValue?.businessId.name;
    const qrlink = this.url + '/qrmenu/' + businessName;
    this.qrcodeService.getQrCode(qrlink).subscribe((res) => {
      this.svg = res.svg;

      const blob = new Blob([this.svg], { type: 'image/svg+xml' });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'qrcode.svg';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
