import { Routes, Route } from '@angular/router';

import { AuthGuard } from '../../auth/index';
import { HorizontalLayoutComponent } from '@app/@layout/horizontal/horizontal.layout.component';

/**
 * Provides helper methods to create routes.
 */
export class Shell {
  /**
   * Creates routes using the shell component and authentication.
   * @param routes The routes to add.
   * @return The new route using shell as the base.
   */
  static childRoutes(routes: Routes): Route {
    return {
      path: '',
      component: HorizontalLayoutComponent,
      children: routes,
      canActivate: [AuthGuard],
      // Reuse ShellComponent instance when navigating between child views
      data: { reuse: true },
    };
  }
}
