import { Injectable, inject } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { MessageService } from "primeng/api";

@Injectable({
    providedIn: 'root'
}) export class CustomMessageService {
    messageService = inject(MessageService);
    translateService = inject(TranslateService);

    success(code: string) {
        const message = this.translateService.instant('response.' + code);
        const successKey = this.translateService.instant('success');
        this.messageService.add({
            severity: 'success',
            summary: successKey,
            detail: message,
        });
    }
}