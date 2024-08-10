import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-polygon-annotation',
  templateUrl: './polygon-annotation.component.html',
  styleUrls: ['./polygon-annotation.component.css']
})
export class PolygonAnnotationComponent implements OnChanges {
  @Input() points: number[][] = [];
  @Input() flattenedPoints: number[] = [];
  @Output() pointDragMove = new EventEmitter<any>();
  
  public lineConfig: any;
  public groupConfig: any;

  ngOnChanges(): void {
    this.lineConfig = {
      points: this.flattenedPoints,
      stroke: '#00F1FF',
      strokeWidth: 3,
      closed: true,
      fill: 'rgba(140,30,255,0.5)'
    };

    this.groupConfig = {
      draggable: true
    };
  }

  getPointConfig(point: number[], index: number): any {
    return {
      x: point[0],
      y: point[1],
      radius: 6,
      fill: '#FF019A',
      stroke: '#00F1FF',
      strokeWidth: 2,
      draggable: true
    };
  }

  handleGroupDragEnd(event: any): void {
    this.pointDragMove.emit(event);
  }
}
