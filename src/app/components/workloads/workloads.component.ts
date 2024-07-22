import { Component, OnInit } from "@angular/core";
import { WorkloadService } from "../../services/workload.service";
import { Workload } from "../../models/workload.model";

@Component({
    selector: 'app-workloads',
    templateUrl: './workloads.component.html',
    styleUrls: ['./workloads.component.css'],
})
    
export class WorkloadsComponent implements OnInit {
    workloads: Workload[] = [];
    selectedWorkload: Workload | null = null;
    newWorkload: Workload = {
        _id: '',
        lecturer_id: '',
        subject_id: '',
        group_number: '',
        type: '',
        year: new Date().getFullYear()
    };

    searchQuery: string = '';

    constructor(
        private workloadService: WorkloadService) { }

    ngOnInit(): void {
        this.getWorkloads();
    }

    getWorkloads(): void {
        this.workloadService.getWorkloads().subscribe(
            (data: Workload[]) => {
                this.workloads = data;
            },
            error => {
                console.error('Error fetching workloads', error);
            }
        );
    }

    getWorkloadById(id: string): void {
        this.workloadService.getWorkloadById(id).subscribe(
            (data: Workload) => {
                this.selectedWorkload = data;
            },
            error => {
                console.error('Error fetching workload by id', error);
            }
        );
    }

    createWorkload(): void {
        this.workloadService.createWorkload(this.newWorkload).subscribe(
            (workload: Workload) => {
                this.workloads.push(workload);
                this.newWorkload = {
                    _id: '',
                    lecturer_id: '',
                    subject_id: '',
                    group_number: '',
                    type: '',
                    year: new Date().getFullYear()
                }
                this.resetNewWorkload();
            },
            error => {
                console.error('Error creating workload', error);
            }
        );
    }

    updateWorkload(): void {
        if (this.selectedWorkload) {
            this.workloadService.updateWorkload(this.selectedWorkload._id, this.selectedWorkload).subscribe(
                () => {
                    this.getWorkloads();
                    this.clearSelection();
                    // this.selectedWorkload = null;
                },
                error => {
                    console.error('Error updating workload', error);
                }
            );
        }
    }

    deleteWorkload(id: string): void {
        this.workloadService.deleteWorkload(id).subscribe(
            () => {
                this.workloads = this.workloads.filter(workload => workload._id !== id);
            },
            error => {
                console.error('Error deleting workload', error);
            }
        );
    }

    searchWorkloads(): void {
        if (this.searchQuery.trim()) {
            this.workloads = this.workloads.filter(workload =>
                workload.group_number.includes(this.searchQuery) ||
                workload.type.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                workload.year.toString().includes(this.searchQuery)
            );
        } else {
            this.getWorkloads();
        }
    }

    resetNewWorkload(): void {
        this.newWorkload = {
            _id: '',
            lecturer_id: '',
            subject_id: '',
            group_number: '',
            type: '',
            year: 0
        }
    }

    selectWorkloadForEdit(workload: Workload): void {
        this.selectedWorkload = { ...workload };
    }

    clearSelection(): void {
        this.selectedWorkload = null;
    }
}