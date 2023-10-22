import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";
import { DecodedTokenModel } from 'core';


@Injectable({ providedIn: 'root' })
export class JwtDecoderService {
  decodeToken(token: string | null): DecodedTokenModel | undefined{
    if(token){
      return jwt_decode(token)
    }
  }
}
