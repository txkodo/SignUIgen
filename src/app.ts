import "./scss/style.scss";

import { AreaInput, AreaManager } from "./ts/area_list";
import { Sign } from "./ts/sign";
import { Reactive } from "./ts/reactive";
import { Datapack } from "./ts/datapack";
import { Utility } from "./ts/util";


const texts: Reactive[] = []

for (let i = 1; i <=4; i++){
  const input  = <HTMLInputElement>document.getElementById(`text${i}_input`)
  const output = <HTMLElement>document.getElementById(`text${i}_output`)
  texts.push(new Reactive(input,output,'keyup'))
}
const rect = <HTMLElement>document.getElementById('ui_area')
const sign_image = <SVGImageElement><HTMLOrSVGImageElement>document.getElementById('sign_image')
const woodType = <HTMLInputElement>document.getElementById('woodType')
const sign = new Sign(texts[0],texts[1],texts[2],texts[3],rect,sign_image,woodType)


const areaList = <HTMLInputElement>document.getElementById('areaList')
const areaListAddButton = <HTMLInputElement>document.getElementById('areaList-addButton')

const areaInput = new AreaInput(
    <HTMLInputElement>document.getElementById('area-name'),
    <HTMLInputElement>document.getElementById('area-x0'),
    <HTMLInputElement>document.getElementById('area-x1'),
    <HTMLInputElement>document.getElementById('area-y0'),
    <HTMLInputElement>document.getElementById('area-y1'),
    <HTMLInputElement>document.getElementById('area-command')
    )
const areaManager = new AreaManager(areaList,areaListAddButton,areaInput,sign)


const datapackDL = <HTMLInputElement>document.getElementById('downloadDatapack')
const namespaceInput = <HTMLInputElement>document.getElementById('namespaceInput')
const pathInput = <HTMLInputElement>document.getElementById('pathInput')
new Utility(sign,areaManager,datapackDL,namespaceInput,pathInput);

