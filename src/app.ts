import "./scss/style.scss";
import { AreaList } from "./ts/area_list";

const areaList = document.getElementById('areaList')
const areaListAddButton = document.getElementById('areaList-addButton')
if (areaList && areaListAddButton){
  new AreaList(areaList,areaListAddButton)
}