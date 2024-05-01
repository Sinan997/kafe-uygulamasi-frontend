import { Injectable } from '@angular/core';
import { DecodedUserTokenModel } from 'core';

@Injectable({ providedIn: 'root' })
export class JwtDecoderService {
  decodeToken(token: string | null): DecodedUserTokenModel | undefined {
    if (token) {
      const decodedString = decodeURIComponent(escape(atob(token.split('.')[1])));
      return JSON.parse(decodedString);
    }
  }
}
