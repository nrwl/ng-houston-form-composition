import { Component } from '@angular/core';
import {
  createFamilyTreeControl,
  simpsonsFamilyTree
} from './family-tree/family-tree.utils';

@Component({
  selector: 'ng-houston-form-composition-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  control = createFamilyTreeControl(simpsonsFamilyTree);
}
