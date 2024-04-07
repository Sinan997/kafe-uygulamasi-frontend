import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { GetQrcodeResponse } from '../models/get-qrcode.response.model';
import { API_URL } from 'core';

@Injectable({
  providedIn: 'root',
})
export class QrcodeService {
  baseUrl: string = inject(API_URL) + 'generate-qrcode';

  http = inject(HttpClient);

  getQrCode(businessUrl: string) {
    return this.http.post<GetQrcodeResponse>(this.baseUrl, { businessUrl });
  }
}
