
export class Reactive{
  input :HTMLInputElement
  output:HTMLElement
  trigger :string

  constructor(input :HTMLInputElement,output:HTMLElement, trigger:string = 'change' ){
    this.trigger = trigger
    this.input = input
    this.output = output
    this.link()
  }

  link(){
    this.input.addEventListener(this.trigger,() => this.output.textContent = this.input.value)
  }
}
