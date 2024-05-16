import { Component, DestroyRef, ElementRef, inject } from '@angular/core';
import { UserFormService } from '../../services/user-form.service';
import { Sector, UserDataDTO } from './user-form.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'feat-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.feature.html'
})
export class UserFormFeature {
  destroyRef = inject(DestroyRef)

  fetchedSectors: Sector[] = [];
  userForm!: FormGroup;
  uuid: string | null = null;

  constructor(private userFormService: UserFormService, private formBuilder: FormBuilder, private elementRef: ElementRef) {}

  ngOnInit() {
    this.initializeForm();
    this.getSectors();
  }
  
  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }

    const requestBody: UserDataDTO = {
      uuid: this.uuid,
      name: this.name.value,
      sectorIds: this.sectors.value,
      terms: this.terms.value
    }

    this.userFormService.postUserResponse(requestBody)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (res: UserDataDTO) => {
        this.uuid = res.uuid;
        this.updateUserFormWithResponse(res);
        alert("DEBUG for architect (successful postUserResponse):\nUUID="+res.uuid+"; name="+res.name+"; sectorIds="+res.sectorIds+"; terms="+res.terms);
      },
      error: (err: any) => {
        alert("DEBUG for architect (ERR postUserResponse):\n" + err.message);
      },
      complete: () => {}
    });
  }

  private updateUserFormWithResponse(res: UserDataDTO) {
    this.userForm.patchValue({
      name: res.name,
      sectors: res.sectorIds,
      terms: res.terms
    });

    this.updateSelectboxVisually(res.sectorIds);
  }

  private getSectors() {
    this.userFormService.getSectors()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (res: Sector[]) => {
        this.fetchedSectors = res;
      },
      error: (err: any) => {
        alert("DEBUG for architect (ERR getSectors): " + err.message);
      },
      complete: () => {}
    });
  }

  private initializeForm() {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      sectors: [[], [Validators.required, this.maxArrayLengthValidator(100)]],
      terms: [false, this.requiredTrueValidator()] 
    });
  }

  private requiredTrueValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value !== true) {
        return { 'requiredTrue': true };
      }
      return null;
    };
  }

  private maxArrayLengthValidator(maxLength: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value.length > maxLength) {
        return { 'maxArrayLength': { max: maxLength } };
      }
      return null;
    };
  }

  private updateSelectboxVisually(selectedValues: number[]) {
    const options = this.elementRef.nativeElement.querySelectorAll('#sectorOption');
    options.forEach((option: HTMLOptionElement) => {
      option.selected = selectedValues.includes(parseInt(option.value));
    });
  }

  get name() {
    return this.userForm.get('name')!;
  }

  get sectors() {
    return this.userForm.get('sectors')!;
  }

  get terms() {
    return this.userForm.get('terms')!;
  }

}
