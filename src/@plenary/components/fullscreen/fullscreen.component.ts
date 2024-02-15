import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  FSDocument,
  FSDocumentElement,
} from '@plenary/components/fullscreen/fullscreen.types';

@Component({
  selector: 'plenary-fullscreen',
  templateUrl: './fullscreen.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'plenaryFullscreen',
})
export class PlenaryFullscreenComponent implements OnInit {
  @Input() iconTpl: TemplateRef<any>;
  private readonly fsDoc: FSDocument;
  private fsDocEl: FSDocumentElement;
  public isFullscreen = false;

  constructor(@Inject(DOCUMENT) private readonly document: Document) {
    this.fsDoc = document as FSDocument;
  }

  ngOnInit(): void {
    this.fsDocEl = document.documentElement as FSDocumentElement;
  }

  toggleFullscreen(): void {
    this.isFullscreen = this.getBrowserFullscreenElement() !== null;

    if (this.isFullscreen) {
      this.closeFullscreen();
    } else {
      this.openFullscreen();
    }
  }

  private getBrowserFullscreenElement(): Element {
    if (typeof this.fsDoc.fullscreenElement !== 'undefined') {
      return this.fsDoc.fullscreenElement;
    }

    if (typeof this.fsDoc.mozFullScreenElement !== 'undefined') {
      return this.fsDoc.mozFullScreenElement;
    }

    if (typeof this.fsDoc.msFullscreenElement !== 'undefined') {
      return this.fsDoc.msFullscreenElement;
    }

    if (typeof this.fsDoc.webkitFullscreenElement !== 'undefined') {
      return this.fsDoc.webkitFullscreenElement;
    }

    throw new Error('Fullscreen mode is not supported by this browser');
  }

  private openFullscreen(): void {
    if (this.fsDocEl.requestFullscreen) {
      this.fsDocEl.requestFullscreen();
      return;
    }

    if (this.fsDocEl.mozRequestFullScreen) {
      this.fsDocEl.mozRequestFullScreen();
      return;
    }

    if (this.fsDocEl.webkitRequestFullscreen) {
      this.fsDocEl.webkitRequestFullscreen();
      return;
    }

    if (this.fsDocEl.msRequestFullscreen) {
      this.fsDocEl.msRequestFullscreen();
    }
  }

  private closeFullscreen(): void {
    if (this.fsDoc.exitFullscreen) {
      this.fsDoc.exitFullscreen();
      return;
    }

    if (this.fsDoc.mozCancelFullScreen) {
      this.fsDoc.mozCancelFullScreen();
      return;
    }

    if (this.fsDoc.webkitExitFullscreen) {
      this.fsDoc.webkitExitFullscreen();
    } else if (this.fsDoc.msExitFullscreen) {
      this.fsDoc.msExitFullscreen();
    }
  }
}
