import { Component } from '@angular/core';

interface SidebarItem {
  id: number;
  name: string;
  expanded: boolean;
  subOptions?: SidebarItem[];
  src: string;
}

@Component({
  selector: 'app-left-side-panel',
  templateUrl: './left-side-panel.component.html',
  styleUrls: ['./left-side-panel.component.scss']
})
export class LeftSidePanelComponent {
toggleSubOptions(_t15: SidebarItem) {
throw new Error('Method not implemented.');
}
  isSidebarOpen = true;

  sidebarItems: SidebarItem[] = [
    { id: 1, name: 'Dashboard', subOptions: [
        { id: 21, name: 'User Management', expanded: false, src: '../../../assets/icons/group.png' },
        { id: 22, name: 'User Activity', expanded: false, src: '../../../assets/icons/activity.png'},
        { id: 23, name: 'Settings', expanded: false, src: '../../../assets/icons/settings.png'},
      ],
      expanded: true,
      src: '../../../assets/icons/dashboard.png'
    },
  ];

  selectedItemId: number | null = 22;

  toggleSidebar(): void {
    // this.isSidebarOpen = !this.isSidebarOpen;
  }

  selectItem(id: any) {
    console.log(id);
  }
}
