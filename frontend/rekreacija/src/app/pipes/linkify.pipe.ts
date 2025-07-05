import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'linkify'
})
export class LinkifyPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;

    // Regex koji traži /reservation/ i brojeve (možeš ga proširiti)
    const regex = /\/rezervacija\/\d+/g;

    // Menjaj pronađene delove sa linkom <a href="...">...</a>
    return value.replace(regex, (match) => `<a href="${match}"">Zakazite termin</a>`);
    
  }
}
