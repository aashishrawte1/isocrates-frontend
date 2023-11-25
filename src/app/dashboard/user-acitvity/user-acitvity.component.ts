import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { AnalyticsService } from 'src/app/core/services/analytics.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { getCurrentDate } from 'src/app/shared/constants/getNdays';

@Component({
  selector: 'app-user-acitvity',
  templateUrl: './user-acitvity.component.html',
  styleUrls: ['./user-acitvity.component.scss']
})
export class UserAcitvityComponent {
  @ViewChild('leftSidePanel', { static: false })
  leftSidePanel!: ElementRef;
  currentTime: any = getCurrentDate();
  selectedOption: number = 7;
  dayWiseData: any;
  dates: any;
  usersLogged: any;
  usersNotLogged: any;
  formattedDates: any;

  button1Color = true;
  button2Color = true;
  button3Color = true;

  public chart : any;
  public chart2: any;

  constructor(private authService: AuthService, private analyticsService: AnalyticsService) {}

  async ngOnInit() {
    const user = localStorage.getItem('userData');
    if (user) {
      const userData = JSON.parse(user);
      if (userData['userType'].toLowerCase() === 'admin') {
        // this.dates = this.getLastSevenDays();
      }
      await this.prepareAnalytics();
    } else {
      // Handle the case when 'userData' is not present in localStorage
    }
  }

  changeButtonColor(buttonNumber: number): void {
    // Reset all buttons to gray
    this.button1Color = true;
    this.button2Color = true;
    this.button3Color = true;

    // Toggle the color of the clicked button
    if (buttonNumber === 1) {
      this.button1Color = !this.button1Color;
    } else if (buttonNumber === 2) {
      this.button2Color = !this.button2Color;
    } else if (buttonNumber === 3) {
      this.button3Color = !this.button3Color;
    }
  }

  prepareAnalytics() {
    this.authService.getLoginAnalytics(this.selectedOption).subscribe((response: any)=> {
      console.log('response', (response));
      this.dayWiseData = response.dayWiseData;

      // this.dates = Object.keys(this.dayWiseData);
      this.dates  = this.getLastSevenDays();
      console.log(this.dayWiseData);
      this.usersLogged = this.dates.map((date: any) => this.dayWiseData[date] ? this.dayWiseData[date].usersLogged : 0);
      this.usersNotLogged = this.dates.map((date: any) => this.dayWiseData[date] ? this.dayWiseData[date].usersNotLogged : 0);
      console.log('usersLogged', this.usersLogged, this.usersNotLogged);
      
      this.formattedDates = this.dates.map((date: any) => new Date(date).toLocaleDateString());
      // let users: any = response?.userData;
      // const mergedTimestampsSet: number[] = [];
      // const convertedMergedTimestampsSet: number[] = [];

      // users.forEach((user: { email: string, lastLogin: number; loginHistory: any[]; }) => {
      //   mergedTimestampsSet.push(convertTimestampToDdmmyy(user.lastLogin)); // Add lastLogin timestamp
      //   user.loginHistory.forEach(timestamp => mergedTimestampsSet.push(convertTimestampToDdmmyy(timestamp))); // Add loginHistory timestamps
      // });
      // console.log('mergedTimestampsSet', mergedTimestampsSet);
      // this.dates = this.getLastSevenDays();
      // console.log(this.dates);
      if (this.chart) {
        this.chart.destroy();
      } else if (this.chart2) {
        this.chart2.destroy();
      }
      this.createChart();
    });
  }

  onDropdownChange() {
    console.log('Selected option:', this.selectedOption);
    // Perform actions based on the selected option
    if(this.selectedOption == 7) {      
      
      this.dates = this.getLastSevenDays();
      this.prepareAnalytics();
      // this.createChart();
    } else if(this.selectedOption == 15) {      
           
      this.dates = this.getLastSevenDays();
      this.prepareAnalytics(); 
      // this.createChart();
    } else if(this.selectedOption == 30) {      
           
      this.dates = this.getLastSevenDays();
      this.prepareAnalytics(); 
      // this.createChart();
    }
  }

  getLastSevenDays(): string[] {
    const today = new Date();
    const lastSevenDays = [];
    const days = this.selectedOption
    console.log(days);
  
    for (let i = days - 1; i >= 0; i--) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() - i);
  
      // Format the date as 'YYYY-MM-DD'
      const formattedDate = currentDate.toISOString().split('T')[0];
  
      lastSevenDays.push(formattedDate);
    }
  
    return lastSevenDays;
  }

  // prepareChartForSeverDays(days: number) {
  //   let lastSevenDays = getLastSevenDays()
  //   this.analyticsService.getAnalytics(days).subscribe((response)=> {
  //     // this.dayWiseData = response.dayWiseData;
  //   })
    
  // }

  // prepareChartForFifteenDays() {
  //   let lastFifteenDays = getLastFifteenDays()
  // }

  // prepareChartForThirtyDays() {
  //   let lastThirtyDays = getLastThirtyDays()
  // }

  

  createChart(){

    console.log('user data', this.usersLogged, this.usersNotLogged);
  
    this.chart = new Chart("MyChart", {
      type: 'line', 

      data: {
        labels: this.dates, 
        datasets: [
          {
            label: 'Active Users',
            data: this.usersLogged,
            // borderColor: 'blue',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: false,
          },
          {
            label: 'Inactive Users',
            data: this.usersNotLogged,
            // borderColor: 'limegreen',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: false,
          },
        ],
      },
      options: {
        aspectRatio: 5,
        // maintainAspectRatio: false, 
        responsive: true,
        scales: {
          x: {
            beginAtZero: true,
            labels: this.dates,
            title: {
              display: true,
              text: 'Number of days',
              color: 'black',
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of users',
              color: 'black',
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              boxWidth: 11,
              borderRadius: 20,
             
            },
            
          },
        },
      }
      
    });

    this.chart2 = new Chart("MyChart2", {
      type: 'bar', // Change to 'bar' for a bar chart
    
      data: {
        labels: this.dates,
        datasets: [
          {
            label: 'Downloads',
            data: this.usersLogged,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'blue',
            borderWidth: 1,
          },
          {
            label: 'Created',
            data: this.usersNotLogged,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'red',
            borderWidth: 1,
          },
        ],
      },
      options: {
        aspectRatio: 5,
        responsive: true,
        scales: {
          x: {
            type: 'category',
            labels: this.dates,
            title: {
              display: true,
              text: 'Number of days',
              color: 'black',
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of users',
              color: 'black',
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              boxWidth: 11,
              borderRadius: 20,
            },
          },
        },
      }
    });
    

    // this.chart = new Chart("MyChart", {
    //   type: 'line',

    //   data: {
    //     labels: labe,
	  //      datasets: [
    //       {
    //         label: "Sales",
    //         data: ['467','576', '572', '79', '92',
		// 						 '574', '573', '576'],
    //         backgroundColor: 'blue'
    //       },
    //       {
    //         label: "Profit",
    //         data: ['542', '542', '536', '327', '17',
		// 							 '0.00', '538', '541'],
    //         backgroundColor: 'limegreen'
    //       }  
    //     ]
    //   },
    //   options: {
    //     aspectRatio: 5,
    //     // maintainAspectRatio: false, 
    //     responsive: true,
    //     scales: {
    //       x: {
    //         beginAtZero: true,
    //         title: {
    //           display: true,
    //           text: 'Number of days',
    //           color: 'black',
    //         },
    //       },
    //       y: {
    //         ticks: {
    //           callback: function(t, i) {
    //              if (!(i % 2)) return t;
    //              else {return 0}

    //           }
    //        },
    //         beginAtZero: true,
    //         title: {
    //           display: true,
    //           text: 'Number of users',
    //           color: 'black',
    //         },
    //       },
    //     },
    //     plugins: {
    //       legend: {
    //         display: true,
    //         position: 'bottom',
    //         labels: {
    //           boxWidth: 11,
    //           borderRadius: 20,
             
    //         },
            
    //       },
    //     },
    //     // Set the desired width and height here
    //     // width: 600,
    //     // height: 400,
    //   }
      
    // });
  
  
  }

  

}


