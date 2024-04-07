import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { QrcodeService } from '../services/qrcode.service';
import { AuthService } from 'core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-qrcode',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './qrcode.component.html',
})
export class QrcodeComponent implements OnInit {
  qrcodeService = inject(QrcodeService);
  authService = inject(AuthService);
  sanitizer = inject(DomSanitizer);
  svg: string;

  @ViewChild('qrcodetemplate') qrcodeTemplate: HTMLElement;

  ngOnInit(): void {
    const businessName = this.authService.userValue?.businessId.name;
    const url = 'http://www.localhost:4200/menu/';
    this.qrcodeService.getQrCode(url + businessName).subscribe((res) => {
      this.svg = res.svg;
    });
  }

  sanitizeSVG(svgString: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svgString);
  }

  @ViewChild('content') content!: ElementRef;

  items: string[] = ['Item 1', 'Item 2', 'Item 3'];

  downloadSVG() {
    const svgContent = this.svg;

    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'qrcode.svg';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
