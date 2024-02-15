import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PlenaryLoadingInterceptor } from '@plenary/services/loading/loading.interceptor';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PlenaryLoadingInterceptor,
      multi: true,
    },
  ],
})
export class PlenaryLoadingModule {}
