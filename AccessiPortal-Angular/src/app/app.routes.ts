import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ApplyComponent } from './pages/apply/apply.component';
import { TrackingComponent } from './pages/tracking/tracking.component';
import { FaqsComponent } from './pages/faqs/faqs.component';
import { TestSuiteComponent } from './pages/test-suite/test-suite.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'AccessiPortal — Home' },
  { path: 'apply', component: ApplyComponent, title: 'AccessiPortal — Application Form' },
  { path: 'tracking', component: TrackingComponent, title: 'AccessiPortal — Application Tracking' },
  { path: 'faqs', component: FaqsComponent, title: 'AccessiPortal — FAQs & Help' },
  { path: 'test-suite', component: TestSuiteComponent, title: 'AccessiPortal — AccessiMate Test Suite' },
  { path: '**', redirectTo: '' }
];
