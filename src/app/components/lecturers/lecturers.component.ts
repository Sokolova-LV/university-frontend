import { Component, OnInit } from "@angular/core";
import { LecturerService } from "../../services/lecturer.service";
import { Lecturer } from "../../models/lecturer.model";

@Component({
    selector: 'app-lectures',
    templateUrl: './lecturers.component.html',
    styleUrls: ['./lecturers.component.css']
})

export class LecturersComponent implements OnInit {
    lecturers: Lecturer[] = [];
    selectedLecturer: Lecturer | null = null;
    newLecturer: Lecturer = {
        _id: '',
        name: '',
        degree: '',
        position: '',
        experience: 0
    };

    searchQuery: string = '';

    constructor(private lecturerService: LecturerService) { }
    
    ngOnInit(): void {
        this.getLecturers();
    }

    getLecturers(): void {
        this.lecturerService.getLecturers().subscribe(
            (data: Lecturer[]) => {
                this.lecturers = data;
            },
            error => {
                console.error('Error fetching all lectures', error);
            }
        );
    }

    getLecturerById(id: string): void {
        this.lecturerService.getLecturerById(id).subscribe(
            (data: Lecturer) => {
                this.selectedLecturer = data;
            },
            error => {
                console.error('Error fetching lecturer by id', error);
            }
        );
    }

    createLecturer(): void {
        this.lecturerService.createLecturer(this.newLecturer).subscribe(
            (lecturer: Lecturer) => {
                this.lecturers.push(lecturer);
                this.newLecturer = {
                    _id: '',
                    name: '',
                    degree: '',
                    position: '',
                    experience: 0
                };
            },
            error => {
                console.error('Error creating a new lecturer', error);
            }
        );
    }

    updateLecturer(): void {
        if (this.selectedLecturer) {
            this.lecturerService.updateLecturer(this.selectedLecturer._id, this.selectedLecturer).subscribe(
                () => {
                    this.getLecturers();
                    this.clearSelection();
                    // this.selectedLecturer = null;
                },
                error => {
                    console.error('Error updating lecturer', error);
                }
            );
        }
    }

    deleteLecturer(id: string): void {
        this.lecturerService.deleteLecturer(id).subscribe(
            () => {
                this.lecturers = this.lecturers.filter(lecturer => lecturer._id !== id);
            },
            error => {
                console.error('Error deleting this lecturer', error);
            }
        );
    }

    searchLecturers(): void {
        if (this.searchQuery.trim()) {
            this.lecturers = this.lecturers.filter(lecturer =>
                lecturer.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        } else {
            this.getLecturers();
        }
    }

    resetNewLecturer(): void {
        this.newLecturer = {
            _id: '',
            name: '',
            degree: '',
            position: '',
            experience: 0
        };
    }

    selectLecturerForEdit(lecturer: Lecturer): void {
        this.selectedLecturer = { ...lecturer };
    }

    clearSelection(): void {
        this.selectedLecturer = null;
    }
}