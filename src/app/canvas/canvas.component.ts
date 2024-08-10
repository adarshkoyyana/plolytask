import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  public points: number[][] = [];
  public flattenedPoints: number[] = [];
  public position: number[] = [0, 0];
  public isPolyComplete = false;
  public imageConfig: any;
  public stageConfig: any;
  
  private videoElement: HTMLImageElement = new Image();

  ngOnInit(): void {
    this.videoElement.width = 650;
    this.videoElement.height = 302;
    this.videoElement.src = './assets/space_landscape.jpg';

    this.videoElement.onload = () => {
      this.imageConfig = {
        image: this.videoElement,
        x: 0,
        y: 0,
        width: this.videoElement.width,
        height: this.videoElement.height
      };

      this.stageConfig = {
        width: this.videoElement.width,
        height: this.videoElement.height
      };
    };
  }

  getMousePos(stage: any): number[] {
    const pointerPosition = stage.getPointerPosition();
    return pointerPosition ? [pointerPosition.x, pointerPosition.y] : [0, 0];
  }

  handleMouseDown(event: any): void {
    if (this.isPolyComplete) return;

    const stage = event.target.getStage();
    const mousePos = this.getMousePos(stage);

    if (this.points.length >= 3 && this.isMouseOverPoint(mousePos)) {
      this.isPolyComplete = true;
    } else {
      this.points.push(mousePos);
    }

    this.updateFlattenedPoints();
  }
  handleMouseMove(event: any): void {
    const stage = event.target.getStage();
    this.position = this.getMousePos(stage);

    if (!this.isPolyComplete) {
      this.updateFlattenedPoints();
    }
  }

  handlePointDragMove(event: any): void {
    const index = event.target.index - 1;
    const pos = [event.target._lastPos.x, event.target._lastPos.y];
    const stage = event.target.getStage();

    pos[0] = Math.max(0, Math.min(pos[0], stage.width()));
    pos[1] = Math.max(0, Math.min(pos[1], stage.height()));

    this.points = [...this.points.slice(0, index), pos, ...this.points.slice(index + 1)];
    this.updateFlattenedPoints();
  }

  undo(): void {
    this.points.pop();
    this.isPolyComplete = false;
    this.updateFlattenedPoints();
  }

  reset(): void {
    this.points = [];
    this.isPolyComplete = false;
    this.updateFlattenedPoints();
  }

  updateFlattenedPoints(): void {
    this.flattenedPoints = this.points.concat(this.isPolyComplete ? [] : this.position)
      .reduce((acc, val) => acc.concat(val), []);
  }
  isMouseOverPoint(mousePos: number[]): boolean {
    const [mouseX, mouseY] = mousePos;
    return this.points.some(([x, y]) => Math.abs(mouseX - x) < 10 && Math.abs(mouseY - y) < 10);
  }
}
