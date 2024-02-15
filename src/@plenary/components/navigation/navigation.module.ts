import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PlenaryScrollbarModule } from '@plenary/directives/scrollbar/public-api';
import { PlenaryHorizontalNavigationBasicItemComponent } from '@plenary/components/navigation/horizontal/components/basic/basic.component';
import { PlenaryHorizontalNavigationBranchItemComponent } from '@plenary/components/navigation/horizontal/components/branch/branch.component';
import { PlenaryHorizontalNavigationDividerItemComponent } from '@plenary/components/navigation/horizontal/components/divider/divider.component';
import { PlenaryHorizontalNavigationSpacerItemComponent } from '@plenary/components/navigation/horizontal/components/spacer/spacer.component';
import { PlenaryHorizontalNavigationComponent } from '@plenary/components/navigation/horizontal/horizontal.component';
import { PlenaryVerticalNavigationAsideItemComponent } from '@plenary/components/navigation/vertical/components/aside/aside.component';
import { PlenaryVerticalNavigationBasicItemComponent } from '@plenary/components/navigation/vertical/components/basic/basic.component';
import { PlenaryVerticalNavigationCollapsableItemComponent } from '@plenary/components/navigation/vertical/components/collapsable/collapsable.component';
import { PlenaryVerticalNavigationDividerItemComponent } from '@plenary/components/navigation/vertical/components/divider/divider.component';
import { PlenaryVerticalNavigationGroupItemComponent } from '@plenary/components/navigation/vertical/components/group/group.component';
import { PlenaryVerticalNavigationSpacerItemComponent } from '@plenary/components/navigation/vertical/components/spacer/spacer.component';
import { PlenaryVerticalNavigationComponent } from '@plenary/components/navigation/vertical/vertical.component';

@NgModule({
  declarations: [
    PlenaryHorizontalNavigationBasicItemComponent,
    PlenaryHorizontalNavigationBranchItemComponent,
    PlenaryHorizontalNavigationDividerItemComponent,
    PlenaryHorizontalNavigationSpacerItemComponent,
    PlenaryHorizontalNavigationComponent,
    PlenaryVerticalNavigationAsideItemComponent,
    PlenaryVerticalNavigationBasicItemComponent,
    PlenaryVerticalNavigationCollapsableItemComponent,
    PlenaryVerticalNavigationDividerItemComponent,
    PlenaryVerticalNavigationGroupItemComponent,
    PlenaryVerticalNavigationSpacerItemComponent,
    PlenaryVerticalNavigationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    PlenaryScrollbarModule,
  ],
  exports: [
    PlenaryHorizontalNavigationComponent,
    PlenaryVerticalNavigationComponent,
  ],
})
export class PlenaryNavigationModule {}
