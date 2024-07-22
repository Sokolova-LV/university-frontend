import { Routes } from '@angular/router';

import { LecturersComponent } from './components/lecturers/lecturers.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { WorkloadsComponent } from './components/workloads/workloads.component';

export const routes: Routes = [
    { path: 'lecturers', component: LecturersComponent },
    { path: 'subjects', component: SubjectsComponent },
    { path: 'workloads', component: WorkloadsComponent },
    { path: '', redirectTo: '/lecturers', pathMatch: 'full' },
    { path: '**', redirectTo: '/lecturers' } 
];
