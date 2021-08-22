
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

class AreaItem {
  active: Boolean
  area: Area

  constructor() {
    this.active = false
    this.area = { name:'', x:{start:0,end:0}, y:{start:0,end:0},command:''}
  }
}