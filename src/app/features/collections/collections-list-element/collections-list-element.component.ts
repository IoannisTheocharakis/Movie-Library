import { Component, input } from '@angular/core';
import { ICollection } from '../../../core/models/collections.model';
import { CardModule } from 'primeng/card';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-collections-list-element',
  standalone: true,
  imports: [CardModule],
  templateUrl: './collections-list-element.component.html',
  styleUrl: './collections-list-element.component.scss',
})
export class CollectionsListElementComponent {
  collection = input.required<ICollection>();
  imagePath = environment.imagePath;
}
