import gql from 'graphql-tag';
import { Component, OnInit } from '@angular/core';
import { Apollo, } from 'apollo-angular';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  results: any;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.search();
  }
  search() {

    let searchData = {
      "first": 10,
      "query": "Somto",
      "type": "USER"
    }
    const data = gql`
    query search($after: String,
        $before: String,
        $first: Int,
        $last: Int,
        $query: String!,
        $type: SearchType!) { 
      search(after:$after,
        before: $before,
        first :$first
        last: $last
        query: $query,
        type: $type) { 
          userCount
           pageInfo{
            endCursor,
            hasNextPage,
            hasPreviousPage,
            startCursor
          }
		      edges{
		        node{
            ... on User{
               name
			      } 
	      	}
       }
  }
}
`;
    this.api.pullData(data, searchData)
      .subscribe((result: any) => {
        this.results = result.data['search'];

      });
  }

}
