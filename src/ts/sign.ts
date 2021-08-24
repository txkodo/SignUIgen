import { Area2d } from "./area"
import { Reactive } from "./reactive"

export class Rect{
  element: HTMLElement
  constructor( rect:HTMLElement ){
    this.element = rect
  }

  show(){
    this.element.hidden = false
  }
  
  hide(){
    this.element.hidden = true
  }

  setPos(area:Area2d){
    console.log('adj')
    this.element.style.left  = `${100*Math.min(area.x.start,area.x.end)/96}%`
    this.element.style.right = `${100-100*Math.max(area.x.start,area.x.end)/96}%`
    this.element.style.top   = `${100*Math.min(area.y.start,area.y.end)/48}%`
    this.element.style.bottom= `${100-100*Math.max(area.y.start,area.y.end)/48}%`
  }
}

export class Sign{
  rect: Rect
  text1: Reactive
  text2: Reactive
  text3: Reactive
  text4: Reactive
  
  constructor(  text1: Reactive, text2: Reactive, text3: Reactive, text4: Reactive, rect: HTMLElement){
    this.text1 = text1
    this.text2 = text2
    this.text3 = text3
    this.text4 = text4
    this.rect  = new Rect(rect)
    console.log(this.rect)
  }
}