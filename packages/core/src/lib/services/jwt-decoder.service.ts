import { Injectable } from '@angular/core';
import { DecodedUserTokenModel } from 'core';

@Injectable({ providedIn: 'root' })
export class JwtDecoderService {
  decodeToken(token: string | null): DecodedUserTokenModel | undefined {
    if (token) {
      return JSON.parse(atob(token.split('.')[1]));
    }
  }
}
