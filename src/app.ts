import "./scss/style.scss";
import { AreaInput, AreaManager } from "./ts/area_list";
import { reactiveText } from "./ts/sign";


for (let i = 1; i <=4; i++){
  const input  = <HTMLInputElement>document.getElementById(`text${i}_input`)
  const output = <HTMLElement>document.getElementById(`text${i}_output`)
  reactiveText(input,output)
}

const areaList = document.getElementById('areaList')
const areaListAddButton = document.getElementById('areaList-addButton')
if (areaList && areaListAddButton){
  const areaInput = new AreaInput(
    <HTMLInputElement>document.getElementById('area-name'),
    <HTMLInputElement>document.getElementById('area-x0'),
    <HTMLInputElement>document.getElementById('area-x1'),
    <HTMLInputElement>document.getElementById('area-y0'),
    <HTMLInputElement>document.getElementById('area-y1'),
    <HTMLInputElement>document.getElementById('area-command')
  )
  new AreaManager(areaList,areaListAddButton,areaInput)
}