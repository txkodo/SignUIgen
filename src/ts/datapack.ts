import JSZip from "jszip";
import { saveAs } from 'file-saver';

export class Datapack{
  private obj:object
  // 名前空間:string
  // 作業フォルダパス:string
  // {ファンクション名:ファンクション内容}:object{string:string}
  constructor(namespace:string,path:string,contents:object){
    const [dictHierarchy, contentsHolder] = Datapack.createDictHierarchy(path)

    Object.assign(contentsHolder, contents);

    this.obj = {
      "pack.mcmeta": this.createMcmeta(),
      "data":{
        [namespace]:{
          "functions":dictHierarchy
        }
      }
    }
    console.log(this.obj)
  }

  private createMcmeta(){
    const mcmeta = {
      "pack":{
         "pack_format":7,
         "description":"signUIgen by txkodo"
      }
    }
    return JSON.stringify(mcmeta)
  }

  private static createDictHierarchy(path:string){
    const obj = {}
    const contentsHolder = {}
    const pathElement = path.split('/')
    const unfold = (paths:string[]) :object => {
      if (paths.length > 0){
        return { [paths[0]] : unfold(paths.slice(1))}
      }else{
        return contentsHolder
      }
    }
    return [unfold(pathElement), contentsHolder]
  }


  private async createZip(){
    const zip = new JSZip()
    const addFileToZip = (folder:JSZip,dict:any) => {
      for (const k in dict){
        const a = dict[k]
        if (typeof(dict[k]) === 'string'){
          folder.file(k,dict[k])
        }else{
          addFileToZip(<JSZip>(folder.folder(k)),dict[k])
        }
      }
    }
    addFileToZip(zip,this.obj)
    return await zip.generateAsync({type:"blob"})
  }

  async download(){
    saveAs(await this.createZip(), "signUI.zip")
  }
}