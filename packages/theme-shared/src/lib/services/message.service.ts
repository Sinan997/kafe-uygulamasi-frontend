import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { isCodeTranslated } from 'core';
import { BasicResponseModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CustomMessageService {
  messageService = inject(MessageService);
  translateService = inject(TranslateService);
  successPrefix = 'response.';

  success(res: BasicResponseModel) {
    const message = this.translateService.instant(this.successPrefix + res.code, res.data);
    const isTranslated = isCodeTranslated(this.successPrefix, message);
    const successKey = this.translateService.instant('successKey');
    this.messageService.add({
      severity: 'success',
      summary: successKey,
      detail: isTranslated ? message : res.message,
    });
  }
}
