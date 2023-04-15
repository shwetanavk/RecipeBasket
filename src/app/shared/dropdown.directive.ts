import {
  Directive,
  HostBinding,
  HostListener,
  ElementRef,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @HostBinding('class.show') isOpen = false;

  constructor(private elRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  toggleOpen(event: Event) {
    const dropdownMenu =
      this.elRef.nativeElement.querySelector('.dropdown-menu');
    const isClickedInside = this.elRef.nativeElement.contains(event.target);
    if (dropdownMenu && dropdownMenu.classList.contains('show')) {
      dropdownMenu.classList.remove('show');
    } else if (isClickedInside) {
      dropdownMenu.classList.add('show');
    }
  }
  // @HostListener('document:click', ['$event'])
  // toggleOpen(event: Event) {
  //   this.isOpen = this.elRef.nativeElement.contains(event.target);
  //   if (this.isOpen) {
  //     const dropdownMenu =
  //       this.elRef.nativeElement.querySelector('.dropdown-menu');
  //     if (dropdownMenu) {
  //       dropdownMenu.classList.add('show');
  //     }
  //   } else {
  //     const dropdownMenu =
  //       this.elRef.nativeElement.querySelector('.dropdown-menu');
  //     if (dropdownMenu) {
  //       dropdownMenu.classList.remove('show');
  //     }
  //   }
  // }
  // @HostListener('document:click', ['$event'])
  // toggleOpen(event: Event) {
  //   if (this.elRef.nativeElement.contains(event.target)) {
  //     this.isOpen = !this.isOpen;
  //   } else {
  //     this.isOpen = false;
  //   }
}
