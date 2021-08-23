
interface span{
  start :number
  end:number
}

interface Area{
  name:string
  x:span
  y:span
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
  area: Area
  readonly areaList:AreaList
  readonly element: HTMLElement
  
  constructor(areaList:AreaList) {
    this.element  = this.createItem()
    this.areaList = areaList
    this.active   = false
    this.area     = { name:'', x:{start:0,end:0}, y:{start:0,end:0},command:''}
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

  activate(){
    this.areaList.disactivateAll()
    this.active = true
    this.element.classList.add('active')
  }

  disactivate(){
    this.active = false
    this.element.classList.remove('active')
  }

  static delete(self:AreaItem){
    return () => self.areaList.remove(self)
  }
}

export class AreaList{
  readonly element: HTMLElement
  private list: Array<AreaItem>
  
  constructor(ul:HTMLElement,addButton:HTMLElement) {
    this.list = []
    this.element = ul
    addButton.addEventListener('click',() => {
      const li = new AreaItem(this)
      this.append(li)
    })
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
}