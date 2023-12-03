import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { GetQrcodeResponse } from '../models/get-qrcode.response.model';

@Injectable({
  providedIn: 'root',
})
export class QrcodeService {
  baseUrl: string = 'http://localhost:8080/api/generate-qrcode';

  http = inject(HttpClient);

  getQrCode(businessUrl: string) {
    return this.http.post<GetQrcodeResponse>(this.baseUrl, {businessUrl});
  }
}
