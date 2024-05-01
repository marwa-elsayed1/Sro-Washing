import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './Authentication/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoaderService } from './Authentication/services/loader.service';
import { HeaderComponent } from './Shared/header/header.component';
import { FooterComponent } from './Shared/footer/footer.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, RouterModule, ProgressSpinnerModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  request!: Boolean
  constructor(private _AuthService: AuthService, private _LoaderService: LoaderService) {

  }

  ngOnInit(): void {
    this._LoaderService.getLoader().subscribe({
      next: (res) => {
        this.request = res;
      }
    })
    this._AuthService.checkCurrentUser();
  }
  title = 'srosh';
}
