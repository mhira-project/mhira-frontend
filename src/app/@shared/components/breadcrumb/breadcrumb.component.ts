import { Component, OnInit, Input, Injector, NgZone, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, Router } from '@angular/router';
import { BreadcrumbOption } from 'ng-zorro-antd/breadcrumb';
import { Subject } from 'rxjs';
import { filter, startWith, takeUntil } from 'rxjs/operators';
import { PREFIX } from 'ng-zorro-antd/core/logger';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  @Input()
  public label: string;
  breadcrumbs: BreadcrumbOption[] = [];
  private destroy$ = new Subject<void>();
  constructor(private injector: Injector, private cdr: ChangeDetectorRef, private ngZone: NgZone) {}

  ngOnInit() {
    this.registerRouterChange();
  }

  public navigate(url: string, e: MouseEvent): void {
    e.preventDefault();

    this.ngZone.run(() => this.injector.get(Router).navigateByUrl(url).then()).then();
  }

  private registerRouterChange(): void {
    try {
      const router = this.injector.get(Router);
      const activatedRoute = this.injector.get(ActivatedRoute);
      router.events
        .pipe(
          filter((e) => e instanceof NavigationEnd),
          takeUntil(this.destroy$),
          startWith(true) // trigger initial render
        )
        .subscribe(() => {
          this.breadcrumbs = this.getBreadcrumbs(activatedRoute.root);
          this.cdr.markForCheck();
        });
    } catch (e) {
      throw new Error(`${PREFIX} You should import RouterModule if you want to use 'NzAutoGenerate'.`);
    }
  }

  private getBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: BreadcrumbOption[] = []
  ): BreadcrumbOption[] {
    const children: ActivatedRoute[] = route.children;

    // If there's no sub root, then stop the recurse and returns the generated breadcrumbs.
    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      if (child.outlet === PRIMARY_OUTLET) {
        // Only parse components in primary router-outlet (in another word, router-outlet without a specific name).
        // Parse this layer and generate a breadcrumb item.
        const routeUrl: string = child.snapshot.url
          .map((segment) => segment.path)
          .filter((path) => path)
          .join('/');

        // Do not change nextUrl if routeUrl is falsy. This happens when it's a route lazy loading other modules.
        const nextUrl = routeUrl ? `${url}/${routeUrl}` : url;
        const breadcrumbLabel = child.snapshot.data[this.label];

        // If have data, go to generate a breadcrumb for it.
        if (routeUrl && breadcrumbLabel) {
          const breadcrumb: BreadcrumbOption = {
            label: breadcrumbLabel,
            params: child.snapshot.params,
            url: nextUrl,
          };
          breadcrumbs.push(breadcrumb);
        }

        return this.getBreadcrumbs(child, nextUrl, breadcrumbs);
      }
    }

    return breadcrumbs;
  }
}
