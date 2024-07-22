import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lecturer } from '../models/lecturer.model';

@Injectable({
    providedIn: 'root'
})
export class LecturerService{
    private apiUrl = 'http://localhost:5000/api/lecturers';

    constructor(private http: HttpClient) { }
    
    getLecturers(): Observable<Lecturer[]>{
        return this.http.get<Lecturer[]>(this.apiUrl);
    }

    getLecturerById(id: string): Observable<Lecturer> {
        return this.http.get<Lecturer>(`${this.apiUrl}/${id}`);
    }

    createLecturer(lecturer: Lecturer): Observable<Lecturer>{
        return this.http.post<Lecturer>(this.apiUrl, lecturer);
    }

    updateLecturer(id: string, lecturer: Lecturer): Observable<Lecturer> {
        return this.http.put<Lecturer>(`${this.apiUrl}/${id}`, lecturer);
    }

    deleteLecturer(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}