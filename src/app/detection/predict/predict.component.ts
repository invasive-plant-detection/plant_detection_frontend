import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrl: './predict.component.css'
})
export class PredictComponent implements OnInit {
  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.apiService.healthCheck().subscribe(data => {
      console.log(data);
    });
  }
}
