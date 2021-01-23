import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText'
})
export class TruncateTextPipe implements PipeTransform {

  transform(text: string, textLength: number = 8): string {
    const ext: string =
      text.substring(text.lastIndexOf('.') + 1, text.length).toLowerCase();
    let newName: string = text.replace('.' + ext, '');
    if (text.length <= textLength) {
      return text;
    }
    newName = newName.substring(0, textLength) + (text.length > textLength ? '...' : '');
    return newName + '.' + ext;
  }

}
