import { NgModule, ModuleWithProviders } from "@angular/core";
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { GeneralComponent } from '../modals/components/general/general.component';
import { OptFavouriteComponent } from '../modals/components/opt-favourite/opt-favourite.component';
// import { LoadingComponent } from '../modals/components/loading/loading.component';
// import { GeneralComponent } from '../modals/components/general/general.component';
// import { FavouriteListComponent } from '../modals/components/favourite-list/favourite-list.component';

@NgModule({
    declarations: [
        OptFavouriteComponent,
        GeneralComponent,
    ],
    exports: [
        TranslateModule,
        SuperTabsModule,
        GeneralComponent,
        OptFavouriteComponent
    ],
    imports: [
        IonicModule,
        CommonModule,
        TranslateModule,
    ],
    entryComponents: [
        OptFavouriteComponent
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule
        };
    }
}