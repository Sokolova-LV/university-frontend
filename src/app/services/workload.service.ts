import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Workload } from "../models/workload.model";

@Injectable({
    providedIn: 'root'
})
export class WorkloadService {
    private apiUrl = 'http://localhost:5000/api/workloads';

    constructor(private http: HttpClient) { }

    getWorkloads(): Observable<Workload[]> {
        return this.http.get<Workload[]>(this.apiUrl);
    }

    getWorkloadById(id: string): Observable<Workload> {
        return this.http.get<Workload>(`${this.apiUrl}/${id}`);
    }

    createWorkload(workload: Workload): Observable<Workload> {
        return this.http.post<Workload>(this.apiUrl, workload);
    }

    updateWorkload(id: string, workload: Workload): Observable<Workload> {
        return this.http.put<Workload>(`${this.apiUrl}/${id}`, workload);
    }

    deleteWorkload(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}