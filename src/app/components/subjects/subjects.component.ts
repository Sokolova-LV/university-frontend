import { Component, OnInit } from "@angular/core";
import { SubjectService } from "../../services/subject.service";
import { Subject } from "../../models/subject.model";

@Component({
    selector: 'app-subjects',
    templateUrl: './subjects.component.html',
    styleUrls: ['./subjects.component.css']
})

export class SubjectsComponent implements OnInit {
    subjects: Subject[] = [];
    selectedSubject: Subject | null = null;
    newSubject: Subject = {
        _id: '',
        name: '',
        lecture_hours: 0,
        practical_hours: 0
    };

    searchQuery: string = '';

    constructor(private subjectService: SubjectService) { }   
    
    ngOnInit(): void {
        this.getSubjects();
    }

    getSubjects(): void {
        this.subjectService.getSubjects().subscribe(
            (data: Subject[]) => {
                this.subjects = data;
            },
            error => {
                console.error('Error fetching subjects', error);
            }
        );
    }

    getSubjectById(id: string): void {
        this.subjectService.getSubjectById(id).subscribe(
            (data: Subject) => {
                this.selectedSubject = data;
            },
            error => {
                console.error('Error fetching subject by id', error);
            }
        );
    }

    createSubject(): void {
        this.subjectService.createSubject(this.newSubject).subscribe(
            (subject: Subject) => {
                this.subjects.push(subject);
                this.newSubject = {
                    _id: '',
                    name: '',
                    lecture_hours: 0,
                    practical_hours: 0
                }
                this.resetNewSubject();
            },
            error => {
                console.error('Error creating subject', error);
            }
        );
    }

    updateSubject(): void {
        if (this.selectedSubject) {
            this.subjectService.updateSubject(this.selectedSubject._id, this.selectedSubject).subscribe(
                () => {
                    this.getSubjects();
                    this.clearSelection();
                    // this.selectedSubject = null;
                },
                error => {
                    console.error('Error updating subject', error);
                }
            );
        }
    }

    deleteSubject(id: string): void {
        this.subjectService.deleteSubject(id).subscribe(
            () => {
                this.subjects = this.subjects.filter(subject => subject._id !== id);
            },
            error => {
                console.error('Error deleting subject', error);
            }
        );
    }

    searchSubjects(): void {
        if (this.searchQuery.trim()) {
            this.subjects = this.subjects.filter(subject =>
                subject.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        } else {
            this.getSubjects();
        }
    }

    resetNewSubject(): void {
        this.newSubject = {
            _id: '',
            name: '',
            lecture_hours: 0,
            practical_hours: 0
        };
    }

    selectSubjectForEdit(subject: Subject): void {
        this.selectedSubject = { ...subject };
    }

    clearSelection(): void {
        this.selectedSubject = null;
    }
}