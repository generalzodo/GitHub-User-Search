import gql from 'graphql-tag';
import { Component, OnInit } from '@angular/core';
import { Apollo, } from 'apollo-angular';

import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { SearchResultsComponent } from '../search-results/search-results.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  results: any;
  searchData: any = {};
  searchForm: any;

  constructor(private api: ApiService, private router: Router, private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      query: ["",],

    });
  }

  ngOnInit(): void {
    // this.search();
  }
  search() {
    this.router.navigate(['/search-results/' + this.searchForm.value.query])
  }

}
