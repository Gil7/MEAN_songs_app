import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { EditComponent } from './components/user/edit/edit.component';
import { routing, appRoutingProviders } from './app.routing';
import { ArtistListComponent } from './components/artist/artist-list/artist-list.component';
import { HomeComponent } from './components/home/home/home.component';
import { CreateArtistComponent } from './components/artist/create-artist/create-artist.component';
import { EditArtistComponent } from './components/artist/edit-artist/edit-artist.component';
@NgModule({
  declarations: [
    AppComponent,
    EditComponent,
    ArtistListComponent,
    HomeComponent,
    CreateArtistComponent,
    EditArtistComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
