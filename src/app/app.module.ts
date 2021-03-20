import { environment } from './../environments/environment';

// import { HttpLink } from 'apollo-angular-link-http';
import { setContext } from '@apollo/client/link/context';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpLink } from 'apollo-angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { APOLLO_OPTIONS } from 'apollo-angular';

import { InMemoryCache, ApolloLink } from '@apollo/client/core';
import { HttpClientModule } from '@angular/common/http';
const uri = environment.serverUrl + "graphql";
const auth = setContext((operation, context) => {
  const token = '83324c66420897fda016b7a6524920ae43caafe6';

  if (token === null) {
    return {};
  } else {
    return {
      headers: {
        Authorization: `bearer ${token}`
      }
    };
  }
});

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: ApolloLink.from([auth, httpLink.create({ uri })])
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
