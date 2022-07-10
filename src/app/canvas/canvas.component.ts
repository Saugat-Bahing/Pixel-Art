import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ToastrService } from "ngx-toastr";


@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  // grid = new Array(50).fill(new Array(100).fill(""));
  grid: { pos: [i: number, j: number]; color: string; }[][] = [];
  pixelView = false;
  colors = ["#800000","#FF0000", "#808000", "#FFFF00", "#008000", "#00FF00", "#008080", "#00FFFF", "#000000", "#808080", "#C0C0C0", "#FFFFFF",   "#000080", "#0000FF", "#800080", "#FF00FF"]
  colorPallet = false;
  enableSelect = true;
  selectedPixel = [0, 0];
  color = "";
  previousColor = "";
  pixelCount!: number;
  email: any = sessionStorage.getItem('user');
  sendingData = false;

  constructor(private dataService: DataService, private toastr:ToastrService) {

  }

  ngOnInit(): void {

    this.grid = this.createGrid();
    this.dataService.getPixels().subscribe(
      (grid: any) => {

        this.grid = JSON.parse(grid[0].grid);
        console.log(JSON.parse(grid[0].grid));
      }
    )

    this.dataService.getUserPixel().subscribe(

      (users: any) => {

        let user = users.filter((user: any) => user.id == this.email);
        this.pixelCount = user[0].pixels;
        console.log(this.pixelCount)
      }
    )
  }

  selectPixel(i: number, j: number) {

    if (this.enableSelect) {

      if (this.pixelCount > 0) {

        this.enableSelect = false;
        console.log(i, j);
        this.selectedPixel = [i, j];
        this.previousColor = this.grid[this.selectedPixel[0]][this.selectedPixel[1]].color;
        this.colorPallet = true;
      }

      else {

        this.toastr.info("No More Pixels Left")
      }
    }
  }

  selectColor(color: string) {

    this.color = color;
    this.grid[this.selectedPixel[0]][this.selectedPixel[1]].color = this.color;
  }

  cancle() {

    this.enableSelect = true;
    this.colorPallet = false;
    this.grid[this.selectedPixel[0]][this.selectedPixel[1]].color = this.previousColor;
  }

  confirm() {

    if (this.color != "" && !this.sendingData) {

      this.sendingData = true;
      this.grid[this.selectedPixel[0]][this.selectedPixel[1]].color = this.color;
      this.pixelCount -= 1;
      this.dataService.setPixels("grid", { "grid": JSON.stringify(this.grid) })
        .then(
          () => {

            this.dataService.setUserPixel(this.email, { 'pixels': this.pixelCount })
          }
        )
        .then(
          () => {

            this.color = "";
            this.colorPallet = false;
            this.enableSelect = true;
            this.sendingData = false;
          }
        );
    }

    else if (this.sendingData) {

      this.toastr.info("Wait few seconds!")
    }

    else {

      this.toastr.info("Select Color!")
    }
  }

  createGrid() {

    let grid: { pos: [i: number, j: number], color: string }[][] = [];
    for (let i = 0; i < 100; i++) {

      grid.push([]);
      for (let j = 0; j < 50; j++) {

        grid[i].push({ pos: [i, j], color: "" })
      }
    }

    return grid;
  }

}
