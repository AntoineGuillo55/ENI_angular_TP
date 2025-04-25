import { Routes } from '@angular/router';
import { SummaryComponent } from './summary/summary.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { userGuard } from './user.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'summary', component: SummaryComponent, canActivate: [userGuard] },
    { path: 'profil/:nom', component: ProfileComponent, canActivate: [userGuard] }
];
