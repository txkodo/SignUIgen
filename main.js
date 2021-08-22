'use strict';

var signTexts = ['','','','']

// text1~4でinputの変更を反映させるイベントリスナーの登録
for(let i = 1;i <= 4 ;i++){
  // input要素を取得
  const input = document.getElementById(`text${i}`);
  // イベントリスナーでイベント「input」を登録
  input.addEventListener("input",function(){
    const text1Value = document.getElementById(`text${i}_value`)
    signTexts[i-1] = this.value
    text1Value.textContent = this.value;
  })
}

class AreaItem{
  constructor(areaList){
    this.areaList = areaList
    this.active =false
    const item = document.createElement('li')
    item.onclick = this.genOnClick(this)
    item.classList.add('dp2')
    const span = document.createElement('span')
    span.textContent = 'area'
    item.appendChild(span)
    item.appendChild(this.genDelButton())
    this.item = item
  }
  
  genOnClick(self){
    return () => {
      self.activate()
    }
  }

  activate(){
    this.areaList.disactivate()
    this.item.classList.add('active')
    this.areaList.onUpdate()
  }
  
  isActive(){
    return this.item.classList.contains('active')
  }

  genDelButton(){
    const delButton = document.createElement('button')
    const delButtonIcon = document.createElement('span')
    delButtonIcon.classList.add('far','fa-trash-alt','icon')
    delButton.appendChild(delButtonIcon)
    delButton.addEventListener('click',() => this.remove())
    return delButton
  }

  remove(){
    this.areaList.remove(this.item)
  }
}

class AreaList{
  constructor(ulElement,addButton){
    this.list = ulElement
    addButton.addEventListener('click', () => {
      const areaItem = new AreaItem(this)
      this.list.append(areaItem.item)
    })
  }

  append(li) {
    const delButtoon = this.genDelButton()
    li.appendChild(delButtoon)
    this.list.appendChild(li)
    this.onUpdate()
  }

  remove(delRecord){
    this.list.removeChild(delRecord)
    this.onUpdate()
  }

  disactivate(){
    console.log(this.list.children)
    for (const item of this.list.children){
      item.classList.remove('active')
    }
  }

  onUpdate(){
    
  }
}

const areaList = new AreaList(
  document.getElementById('js-areaList'),
  document.getElementById('js-areaList-AddButton')
  )
