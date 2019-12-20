import { Component, OnDestroy } from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
  FormArray
} from '@angular/forms';
import { Subject } from 'rxjs';
import { startWith, takeUntil, tap } from 'rxjs/operators';
import {
  createFamilyTreeFormGroup,
  FamilyTree,
  updateFamilyTreeFormGroup,
  createFamilyTreeControl
} from './family-tree.utils';

@Component({
  selector: 'ng-houston-form-composition-family-tree',
  templateUrl: './family-tree.component.html',
  styleUrls: ['./family-tree.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FamilyTreeComponent,
      multi: true
    }
  ]
})
export class FamilyTreeComponent implements ControlValueAccessor, OnDestroy {
  form: FormGroup;
  private _destroying = new Subject();

  writeValue(ft: FamilyTree) {
    if (this.form) {
      updateFamilyTreeFormGroup(this.form, ft);
    } else {
      this.form = createFamilyTreeFormGroup(ft);
    }
  }
  registerOnChange(fn) {
    this.form.valueChanges
      .pipe(
        startWith(this.form.value),
        takeUntil(this._destroying),
        tap(fn)
      )
      .subscribe();
  }
  registerOnTouched(fn) {}

  addChild() {
    (this.form.get('children') as FormArray).push(
      createFamilyTreeControl({ name: '', age: 0, children: [] })
    );
  }

  ngOnDestroy() {
    this._destroying.next();
  }
}
