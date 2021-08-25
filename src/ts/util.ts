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

  genFunctions(){
    return {
      'east.mcfunction' : this.areaManager.areaList.genAllCommands('x+'),
      'west.mcfunction' : this.areaManager.areaList.genAllCommands('x-'),
      'south.mcfunction': this.areaManager.areaList.genAllCommands('z+'),
      'north.mcfunction': this.areaManager.areaList.genAllCommands('z-')
    }
  }

  genGiveFunction(funcpath:string,text1:string,text2:string,text3:string,text4:string){
    const constructInnerCommand = (startPos:string,middle:(i:number)=>string,facing:string) => {
      let middlestr = ''
      for (let i = 0; i < 30; i++){
        middlestr += middle(0.9)
      }
      for (let i = 0.9; i > 0.1; i-=0.1){
        middlestr += middle(i)
      }
      return `execute if block ~ ~ ~ oak_wall_sign[facing=${facing}] positioned ${startPos} ${middlestr}run function ${funcpath}/${facing}`
    }

    const textPart = (text:string,command:string) => `'{"text":"${text}","clickEvent":{"action":"run_command","value":"${command}"}}'`
    const textPartTranslate = (text:string,command:string) => `'{"translate":"${text}","with":[{"nbt":"x","block":"~ ~ ~"},{"nbt":"y","block":"~ ~ ~"},{"nbt":"z","block":"~ ~ ~"}],"clickEvent":{"action":"run_command","value":"${command}"}}'`
    
    const cmd1 = constructInnerCommand('~-0.395 ~ ~',i => `facing entity @s eyes positioned ^ ^ ^${i} rotated as @s positioned ^ ^ ^${i} positioned ~0.5 ~ ~ align x positioned ~0.105 ~ ~ `,'east')
    const cmd2 = constructInnerCommand('~0.395 ~ ~', i => `facing entity @s eyes positioned ^ ^ ^${i} rotated as @s positioned ^ ^ ^${i} positioned ~-0.5 ~ ~ align x positioned ~0.895 ~ ~ `,'west')
    const cmd3 = constructInnerCommand('~ ~ ~-0.395',i => `facing entity @s eyes positioned ^ ^ ^${i} rotated as @s positioned ^ ^ ^${i} positioned ~ ~ ~0.5 align z positioned ~ ~ ~0.105 `,'south')
    const cmd4 = constructInnerCommand('~ ~ ~0.395',i => `facing entity @s eyes positioned ^ ^ ^${i} rotated as @s positioned ^ ^ ^${i} positioned ~ ~ ~-0.5 align z positioned ~ ~ ~0.895 `,'north')

    const command = `give @s oak_sign{BlockEntityTag:{Text1:${textPart(text1,cmd1)},Text2:${textPart(text2,cmd2)},Text3:${textPart(text3,cmd3)},Text4:${textPartTranslate(text4,cmd4)}}}`
    return command
  }

  static async DownloadDatapack(self:Utility){
    if (self.namespace.validity.valid && self.path.validity.valid){
      const datapack = new Datapack(self.namespace.value,self.path.value,{...self.genFunctions(),'give.mcfunction':self.genGiveFunction(`${self.namespace.value}:${self.path.value}`,self.sign.text1.input.value,self.sign.text2.input.value,self.sign.text3.input.value,self.sign.text4.input.value)})
      await datapack.download()
    }
  }
}