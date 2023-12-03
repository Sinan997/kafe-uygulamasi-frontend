import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { QrcodeService } from '../services/qrcode.service';
import { AuthService } from 'core';
import html2canvas from 'html2canvas';

@Component({
  selector: 'lib-qrcode',
  standalone: true,
  imports: [],
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
    });
  }

  sanitizeSVG(svgString: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svgString);
  }

  @ViewChild('content') content!: ElementRef;

  items: string[] = ['Item 1', 'Item 2', 'Item 3'];

  downloadAsImage() {
    // Get the native element of the content
    const contentElement = this.content.nativeElement;

    // Use html2canvas to capture the content as a canvas
    html2canvas(contentElement).then((canvas) => {
      // Convert the canvas to a data URL
      const dataUrl = canvas.toDataURL('image/jpeg');

      // Create a link element to trigger the download
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'downloaded-image.jpg';

      // Trigger a click on the link to start the download
      link.click();
    });
  }


}
