import { AreaManager } from "./area_list";
import { Datapack } from "./datapack";
import { Sign } from "./sign";

export class Utility{
  sign:Sign
  areaManager:AreaManager
  datapackDL:HTMLElement
  namespace:HTMLInputElement
  path:HTMLInputElement
  
  constructor(sign:Sign,areaManager:AreaManager,datapackDL:HTMLElement,namespace:HTMLInputElement,path:HTMLInputElement){
    this.sign = sign
    this.areaManager = areaManager
    this.namespace = namespace
    this.path = path
    this.datapackDL = datapackDL
    datapackDL.onclick = () => Utility.DownloadDatapack(this)
  }

  static async DownloadDatapack(self:Utility){
    if (self.namespace.validity.valid && self.path.validity.valid){
      const datapack = new Datapack(self.namespace.value,self.path.value,{'test.txt':'kill @s'})
      await datapack.download()
    }
  }
}