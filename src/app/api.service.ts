import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';


import gql from 'graphql-tag'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private apollo: Apollo) { }


  pullData(query, data) {
    return this.apollo
      .query({
        query: query,
        variables: data,
        fetchPolicy: "network-only",
        errorPolicy: 'all'
      })

  }
  postData(query, postData) {
    return this.apollo
      .mutate({
        mutation: query,
        variables: postData,
        errorPolicy: 'all'
      })
  }
}
