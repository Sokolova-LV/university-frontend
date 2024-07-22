import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { LecturersComponent } from "./components/lecturers/lecturers.component";
import { SubjectsComponent } from "./components/subjects/subjects.component";
import { WorkloadsComponent } from "./components/workloads/workloads.component";

import { routes } from "./app.routes";

@NgModule({
    declarations: [
        AppComponent,
        LecturersComponent,
        SubjectsComponent,
        WorkloadsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClient,
        RouterModule.forRoot(routes)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
    
export class AppModule { }
