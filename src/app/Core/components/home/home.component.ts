import { Component, OnInit, ViewChild, ElementRef, Renderer2, HostListener, NgZone } from '@angular/core';
import { FooterComponent } from '../../../Shared/footer/footer.component';
import { HeaderComponent } from '../../../Shared/header/header.component';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { HomeService } from '../../Services/home.service';



interface Tab {
  label: string;
  header: string[];
  details: string[];
}
interface Car {
  type: string;
  price: number;
}

interface Plan {
  title: string;
  cars: Car[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, MatTabsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  @ViewChild('myTabGroup') tabGroup: MatTabGroup | null = null;
  services!: any;
  ngAfterViewInit() {
    if (this.tabGroup) {
      const labels = this.tabGroup._tabs.toArray();
      labels.forEach(label => {
        this.renderer.setStyle(label.textLabel, 'color', 'red'); // Example style change
        this.renderer.setStyle(label.textLabel, 'font-weight', 'bold'); // Example style change
      });
    } else {
      console.warn('tabGroup is not yet initialized');
    }
  }

  tabs: Tab[] = [
    {
      label: 'Auto Detailing Packages', header: ['Quick Package', 'Basic Detailing', 'Premium Detailing'], details: ['Exterior hand wash and chamois dry.', ' Interior vacuum', 'Clean all door jambs', 'Windows clean inside & outside', 'Quick interior wipedown', 'Tire dressing']
    },
    {
      label: 'Autoriz Ceramic Coating', header: ['V1 3D Body Ceramic', 'V4 Wheel Coating'], details: ['Item 1 in Category 1', 'Item 2 in Category 1', 'Item 3 in Category 1']
    },
    {
      label: 'Glass Protection', header: ['Quick Package', 'Basic Detailing', 'Premium Detailing'], details: ['Item 1 in Category 1', 'Item 2 in Category 1', 'Item 3 in Category 1']
    },
  ];

  trackByFn(index: number, item: any): number {
    return item.id; // Or any unique identifier property of your tab object
  }

 

  plans: Plan[] = [
    {
      title: 'Auto Detailing',
      cars: [
        { type: 'Sedan', price: 50 },
        { type: 'SUV', price: 75 },
        { type: 'Van/Truck', price: 100 }
      ]
    },
    {
      title: 'Premium Cleaning',
      cars: [
        { type: 'Sedan', price: 50 },
        { type: 'SUV', price: 75 },
        { type: 'Van/Truck', price: 100 }
      ]
    },
    {
      title: 'Premium Cleaning',
      cars: [
        { type: 'Sedan', price: 50 },
        { type: 'SUV', price: 75 },
        { type: 'Van/Truck', price: 100 }
      ]
    },
    {
      title: 'Premium Cleaning',
      cars: [
        { type: 'Sedan', price: 50 },
        { type: 'SUV', price: 75 },
        { type: 'Van/Truck', price: 100 }
      ]
    },
    {
      title: 'Premium Cleaning',
      cars: [
        { type: 'Sedan', price: 50 },
        { type: 'SUV', price: 75 },
        { type: 'Van/Truck', price: 100 }
      ]
    },
    // Add more plans here
    {
      title: 'Complex Cleaning',
      cars: [
        { type: 'Sedan', price: 100 }
      ]
    }

  ];
  currentSlide = 0;
  clientWidth = window.innerWidth;
  cardWidth = Math.floor(this.clientWidth / 3); // Assuming 3 cards per slide

  constructor(private el: ElementRef, private renderer: Renderer2, private ngZone: NgZone, private _HomeService: HomeService) { }

  ngOnInit() {
    this.onResize();
    this._HomeService.getAllServices().subscribe({
      next: (res) => {
        this.services = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  @HostListener('window:resize')
  onResize() {
    this.clientWidth = window.innerWidth;
    this.cardWidth = Math.floor(this.clientWidth / 3);
    this.updateSlide();
  }

  prevSlide() {
    this.currentSlide--;
    if (this.currentSlide < 0) {
      this.currentSlide = this.plans.length - 1;
    }
    this.updateSlide();
  }

  nextSlide() {
    this.currentSlide++;
    if (this.currentSlide === this.plans.length - 2) {
      this.currentSlide = 0;
    }
    this.updateSlide();
  }

  updateSlide() {
    const sliderTrack = this.el.nativeElement.querySelector('.slider-track');
    this.renderer.setStyle(sliderTrack, 'transform', `translateX(-${this.currentSlide * this.cardWidth}px)`);
  }
}
