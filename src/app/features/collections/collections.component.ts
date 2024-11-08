import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.scss',
})
export class CollectionsComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  onCreateCollection() {
    this.router.navigate(['./create-collection'], { relativeTo: this.route });
  }
}
