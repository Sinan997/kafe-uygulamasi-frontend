import { UpperCasePipe } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup } from "@angular/forms";
import { LanguageService } from "core";

@Component({
    selector: 'app-language-dropdown',
    templateUrl: './language-dropdown.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, UpperCasePipe]
}) export class LanguageDropdownComponent implements OnInit {
    fb = inject(FormBuilder);
    languageService = inject(LanguageService);
    langs: string[];
    form: UntypedFormGroup;

    ngOnInit(): void {
        this.langs = this.languageService.getLanguages();
        this.buildForm();
    }

    buildForm() {
        this.form = this.fb.group({
            language: [this.languageService.getDefaultLanguage()]
        })
    }

    langChange() {
        const language = this.form.get('language')?.value
        if (!language) return
        this.languageService.languageChanged(language);
    }
}