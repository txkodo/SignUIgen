import { Area2d } from "./area"
import { Direction } from "./direction"
import { Sign } from "./sign"

interface UiArea{
  name:string
  area:Area2d
  command:string
}


class Button {
  element:HTMLElement
  constructor(content:HTMLElement,onClick:()=>void) {
    this.element = document.createElement('button')
    this.element.appendChild(content)
    this.element.addEventListener('click',onClick)
  }
}

export class AreaItem {
  active: Boolean
  private area: UiArea
  readonly areaManager:AreaManager
  readonly element: HTMLElement
  
  constructor(areaManager:AreaManager) {
    this.element  = this.createItem()
    this.areaManager = areaManager
    this.active   = false
    this.area     = { name:'area', area:{x:{start:0,end:0}, y:{start:0,end:0}}, command:''}
  }

  createItem():HTMLElement{
    const li = document.createElement('li')
    li.classList.add('dp2')
    const span = document.createElement('span')
    span.textContent = 'area'
    li.appendChild(span)
    li.appendChild(this.createDelButton().element)
    li.onclick = () => this.activate()
    return li
  }

  createDelButton():Button{
    const icon = document.createElement('span')
    icon.classList.add('far','fa-trash-alt','icon')
    const button = new Button(icon,AreaItem.delete(this))
    return button
  }

  setValue(area:UiArea){
    this.area = area
    if(this.element.firstChild){this.element.firstChild.textContent = area.name}
  }

  getValue(){
    return this.area
  }

  activate(){
    this.areaManager.areaList.disactivateAll()
    this.areaManager.areaSetting.apply(this)
    this.active = true
    this.element.classList.add('active')
  }

  disactivate(){
    this.active = false
    this.element.classList.remove('active')
  }
  
  static delete(self:AreaItem){
    return () => {
      self.element.onclick = () => {}
      if (self.active){self.areaManager.areaSetting.disapply()}
      self.areaManager.areaList.remove(self)
    }
  }

  genConnamd(direction:Direction){
    if (
      this.area.area.x.end == this.area.area.x.start ||
      this.area.area.x.end == this.area.area.x.start ||
      !this.area.command
      ){
        return null
    }
    const u_ratio_max = Math.max(this.area.area.x.end,this.area.area.x.start)/96
    const u_ratio_min = Math.min(this.area.area.x.end,this.area.area.x.start)/96
    const v_ratio_max = Math.max(this.area.area.y.end,this.area.area.y.start)/96+(3.625/16)
    const v_ratio_min = Math.min(this.area.area.y.end,this.area.area.y.start)/96+(3.625/16)
    let vector_min:string
    let vector_max:string
    switch (direction){
      case 'x+':
        vector_min = `~ ~${v_ratio_min} ~${u_ratio_min}`
        vector_max = `~ ~${v_ratio_max-1} ~${u_ratio_max-1}`
        break
      case 'x-':
        vector_max = `~ ~${v_ratio_min} ~${-u_ratio_min}`
        vector_min = `~ ~${v_ratio_max-1} ~${1-u_ratio_max}`
        break
      case 'z+':
        vector_max = `~${-u_ratio_min} ~${v_ratio_min} ~`
        vector_min = `~${1-u_ratio_max} ~${v_ratio_max-1} ~`
        break
      case 'z-':
        vector_min = `~${u_ratio_min} ~${v_ratio_min} ~`
        vector_max = `~${u_ratio_max-1} ~${v_ratio_max-1} ~`
        break
    }
    return `execute if block ~ ~ ~ oak_wall_sign if blocks ${vector_min} ${vector_min} ~ ~ ~ all if blocks ${vector_max} ${vector_max} ~ ~ ~ all run ${this.area.command}`
  }
}

export class AreaInput{
  name:HTMLInputElement
  x0:HTMLInputElement
  x1:HTMLInputElement
  y0:HTMLInputElement
  y1:HTMLInputElement
  command:HTMLInputElement

  constructor(
    name:HTMLInputElement,
    x0:HTMLInputElement,
    x1:HTMLInputElement,
    y0:HTMLInputElement,
    y1:HTMLInputElement,
    command:HTMLInputElement){
      this.name = name
      this.x0 = x0
      this.x1 = x1
      this.y0 = y0
      this.y1 = y1
      this.command = command
  }

  setValue(area:UiArea){
    this.name.value = area.name
    this.x0.value = `${area.area.x.start}`
    this.x1.value = `${area.area.x.end}`
    this.y0.value = `${area.area.y.start}`
    this.y1.value = `${area.area.y.end}`
    this.command.value = area.command
  }
    
  writable(){
    this.name.readOnly = false
    this.x0.readOnly = false
    this.x1.readOnly = false
    this.y0.readOnly = false
    this.y1.readOnly = false
    this.command.readOnly = false
  }

  readonly(){
    this.name.readOnly = true
    this.x0.readOnly = true
    this.x1.readOnly = true
    this.y0.readOnly = true
    this.y1.readOnly = true
    this.command.readOnly = true
  }
}

export class AreaSetting{
  areaManager:AreaManager
  area:UiArea
  areaItem:AreaItem | null
  areaInput:AreaInput

  constructor(areaManager:AreaManager,areaInput:AreaInput) {
    this.areaManager = areaManager
    this.area = {
      name:'',
      area:{
        x:{start:0,end:0},
        y:{start:0,end:0}
      },
      command:''
    }

    this.areaInput = areaInput

    this.areaInput.name.addEventListener(   'change',() => {this.area.name    = this.areaInput.name.value;           this.onChange()})
    this.areaInput.command.addEventListener('change',() => {this.area.command    = this.areaInput.command.value;        this.onChange()})
    this.areaInput.x0.addEventListener(     'change',() => {this.area.area.x.start = parseFloat(this.areaInput.x0.value); this.onChange()})
    this.areaInput.x1.addEventListener(     'change',() => {this.area.area.x.end   = parseFloat(this.areaInput.x1.value); this.onChange()})
    this.areaInput.y0.addEventListener(     'change',() => {this.area.area.y.start = parseFloat(this.areaInput.y0.value); this.onChange()})
    this.areaInput.y1.addEventListener(     'change',() => {this.area.area.y.end   = parseFloat(this.areaInput.y1.value); this.onChange()})

    this.areaItem = null
    this.disapply()
  }
  
  apply(areaItem:AreaItem){
    this.areaItem = areaItem
    this.area = areaItem.getValue()
    this.reflesh()
    this.areaInput.writable()
    this.areaManager.sign.rect.show()
    this.areaManager.sign.rect.setPos(this.area.area)
  }
  
  disapply(){
    this.areaItem = null
    this.area = {
      name:'',
      area:{
        x:{start:0,end:0},
        y:{start:0,end:0},
      },
      command:''
    }
    this.reflesh()
    this.areaManager.sign.rect.hide()
    this.areaInput.readonly()
  }
  
  reflesh(){
    this.areaInput.setValue(this.area)
  }

  onChange(){
    if (this.areaItem){
      this.areaManager.sign.rect.setPos(this.area.area)
      this.areaItem.setValue(this.area)
    }
  }
}


export class AreaList{
  readonly element: HTMLElement
  private list: Array<AreaItem>
  
  constructor(ul:HTMLElement) {
    this.list = []
    this.element = ul
  }

  disactivateAll() {
    for (const item of this.list){
      item.disactivate()
    }
  }

  append(li:AreaItem){
    this.list.push(li)
    this.element.appendChild(li.element)
  }

  remove(li:AreaItem){
    this.list = this.list.filter( item => item !== li)
    this.element.removeChild(li.element)
  }

  genAllCommands(dir:Direction){
    const commands= []
    for (let area of this.list){
      const command = area.genConnamd(dir)
      if (command){
        commands.push(command)
      }
    }
    return commands.join('\n')
  }
}


export class AreaManager{
  areaList:AreaList
  areaSetting:AreaSetting
  sign: Sign
  
  constructor(listElement:HTMLElement,addButton:HTMLElement,areaInput:AreaInput,sign:Sign){
    this.sign = sign
    this.areaList    = new AreaList(listElement)
    this.areaSetting = new AreaSetting(this,areaInput)
    addButton.addEventListener('click',() => {
      const li = new AreaItem(this)
      this.areaList.append(li)
    })
  }
}