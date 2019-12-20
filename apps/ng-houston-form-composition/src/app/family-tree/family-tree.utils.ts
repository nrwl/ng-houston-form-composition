import { FormControl, FormGroup, FormArray } from '@angular/forms';

export interface FamilyTree {
  name: string;
  age: number;
  children: FamilyTree[];
}

export const simpsonsFamilyTree: FamilyTree = {
  name: 'Abe Simpson',
  age: 60,
  children: [
    {
      name: 'Homer',
      age: 35,
      children: [
        {
          name: 'Bart',
          age: 9,
          children: []
        },
        {
          name: 'Lisa',
          age: 7,
          children: []
        },
        {
          name: 'Maggie',
          age: 1,
          children: []
        }
      ]
    }
  ]
};

export const createFamilyTreeControl = (ft: FamilyTree): FormControl =>
  new FormControl(ft);

export const createFamilyTreeFormGroup = (ft: FamilyTree): FormGroup =>
  new FormGroup({
    name: new FormControl(ft.name),
    age: new FormControl(ft.age),
    children: new FormArray(
      ft.children.map(child => createFamilyTreeControl(child))
    )
  });

export const updateFamilyTreeFormGroup = (group: FormGroup, ft: FamilyTree) => {
  group.get('name').setValue(ft.name);
  group.get('age').setValue(ft.age);
  const childrenArray = group.get('children') as FormArray;
  childrenArray.clear();
  ft.children.forEach(child =>
    childrenArray.push(createFamilyTreeControl(child))
  );
};
