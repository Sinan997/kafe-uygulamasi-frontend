import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";


@Injectable({ providedIn: 'root' })
export class JwtDecoderService {
  decodeToken(token: string | null){
    if(token){
      return jwt_decode(token)
    }
  }
}
