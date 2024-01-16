import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-status-page',
  templateUrl: './status-page.component.html',
  styleUrl: './status-page.component.css'
})
export class StatusPageComponent implements OnInit {
  healthStatus: string = 'unknown';

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.apiService.healthCheck().subscribe({
      next: (v) => {
        this.healthStatus = v.status;
      },
      error: (e) => {
        this.healthStatus = 'Not available';
      }
    });
  }
}
