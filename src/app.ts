import "./scss/style.scss";
import './img/sign/oak.png';

import { AreaInput, AreaManager } from "./ts/area_list";
import { Sign } from "./ts/sign";
import { Reactive } from "./ts/reactive";


const texts: Reactive[] = []

for (let i = 1; i <=4; i++){
  const input  = <HTMLInputElement>document.getElementById(`text${i}_input`)
  const output = <HTMLElement>document.getElementById(`text${i}_output`)
  texts.push(new Reactive(input,output,'keyup'))
}
const rect = <HTMLElement>document.getElementById('ui_area')
const sign = new Sign(texts[0],texts[1],texts[2],texts[3],rect)


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
  new AreaManager(areaList,areaListAddButton,areaInput,sign)
}