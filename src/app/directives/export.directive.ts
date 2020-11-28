import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { ExportService } from '../services/export.service';

@Directive({
  selector: '[appExport]'
})
export class ExportDirective {

  constructor(private exportService: ExportService) { }

  @Input('appExport') pokemons: any[];
  @Input() fileName: string;

  @HostListener('click', ['$event']) onClick($event) {
    console.log('clicked: ' + $event);
    this.exportService.exportExcel(this.pokemons, this.fileName);
  }

}