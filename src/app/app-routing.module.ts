import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroeComponent } from './components/pages/heroe/heroe.component';
import { HeroesComponent } from './components/pages/heroes/heroes.component';

const routes: Routes = [
  { path:'heroes', component: HeroesComponent },
  { path:'heroe/:id', component: HeroeComponent },
  { path:'heroe/editar/:id', component: HeroeComponent },
  { path: '**', pathMatch:'full', redirectTo: 'heroes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
