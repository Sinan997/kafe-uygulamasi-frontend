import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { QrcodeService } from '../services/qrcode.service';
import { AuthService } from 'core';
import html2canvas from 'html2canvas';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'lib-qrcode',
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
    console.log();
    const businessName = this.authService.userValue?.businessId.name;
    const url = 'http://www.localhost:4200/menu/';
    this.qrcodeService.getQrCode(url + businessName).subscribe((res) => {
      this.svg = res.svg;
      console.log(res.svg);
    });
  }

  sanitizeSVG(svgString: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svgString);
  }

  @ViewChild('content') content!: ElementRef;

  items: string[] = ['Item 1', 'Item 2', 'Item 3'];

  downloadAsImage() {
    const contentElement = this.content.nativeElement;

    html2canvas(contentElement).then((canvas) => {
      const dataUrl = canvas.toDataURL('image/jpeg');

      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'downloaded-image.jpg';

      link.click();
    });
  }

  downloadSVG() {
    const svgContent = this.svg; // SVG içeriğini buraya yapıştırın veya dinamik olarak oluşturun

    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = window.URL.createObjectURL(blob);

    // SVG dosyasını indirme
    const a = document.createElement('a');
    a.href = url;
    a.download = 'downloaded_svg_file.svg'; // İndirilen dosyanın adını buradan belirleyin
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }

}
