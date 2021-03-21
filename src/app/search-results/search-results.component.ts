import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../api.service';
import gql from 'graphql-tag';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  results: any;
  query: any;
  page: any;
  startCount: any = 1
  endCount: any = 10
  pageInfo: any;
  loaded: boolean = false
  constructor(private api: ApiService, private route: ActivatedRoute) { }


  ngOnInit(): void {

    this.route.paramMap.subscribe((param: any) => {
      this.query = param.params.query
      this.prepareSearch(true);
    })
  }

  prepareSearch(load) {
    let searchData = {
      "first": 10,
      "query": this.query,
      "type": "USER"
    }
    this.search(searchData)
  }

  search(searchData) {

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
              bio
              company
              location
              isGitHubStar
              isDeveloperProgramMember
              avatarUrl
              twitterUsername
              url
              followers{
                totalCount
              }
              following{
                totalCount
              }
			      } 
	      	}
       }
  }
}
`;
    this.api.pullData(data, searchData)
      .subscribe((result: any) => {
        this.results = result.data['search'];
        this.pageInfo = result.data['search'].pageInfo;
        this.loaded = true;
      });
  }
  previousPage() {
    this.startCount -= 10;
    this.endCount -= 10;
    let searchData = {
      "last": 10,
      "query": this.query,
      "type": "USER",
      "before": this.pageInfo.startCursor
    }
    this.search(searchData)
  }

  nextPage() {
    this.startCount += 10;
    this.endCount += 10;
    let searchData = {
      "first": 10,
      "query": this.query,
      "type": "USER",
      "after": this.pageInfo.endCursor

    }
    this.search(searchData)
  }


}
