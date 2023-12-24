import { Injectable, inject } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

const defaultLanguageKey = 'defaultLanguage';
const defaultLanguages = ['tr', 'en'];

@Injectable({ providedIn: 'root' })
export class LanguageService {
    translateService = inject(TranslateService);

    constructor() {
        this.translateService.addLangs(defaultLanguages);
        this.init();
    }

    init() {
        const localStorageDefaultLanguage = this.getDefaultLanguageFromLocaleStorage();
        const browserLang = this.translateService.getBrowserLang();
        this.setDefaultLanguageToLocaleStorage(localStorageDefaultLanguage || browserLang);
        this.translateService.setDefaultLang(this.getDefaultLanguageFromLocaleStorage());
    }

    getDefaultLanguage() {
        return this.translateService.getDefaultLang();
    }

    setDefaultLanguage(lang: string = 'en') {
        return this.translateService.setDefaultLang(lang);
    }

    setDefaultLanguageToLocaleStorage(lang: string = 'en') {
        localStorage.setItem('defaultLanguage', lang);
    }

    getDefaultLanguageFromLocaleStorage(): string {
        return localStorage.getItem(defaultLanguageKey || 'en')!;
    }

    getLanguages() {
        return this.translateService.getLangs();
    }

    useLanguage(lang: string = 'en') {
        this.translateService.use(lang);
    }

    languageChanged(lang: string = 'en') {
        this.useLanguage(lang);
        this.setDefaultLanguageToLocaleStorage(lang);
        this.setDefaultLanguage(this.getDefaultLanguageFromLocaleStorage());
    }
}