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

class AreaList{
  constructor(ulElement,addButton){
    this.list = ulElement
    addButton.addEventListener('click', () => {
      const li = document.createElement('li')
      li.classList.add('dp2')
      const span = document.createElement('span')
      span.textContent = 'area'
      li.appendChild(span)
      this.append(li)
    })
  }

  append(li) {
    const delButtoon = this.genDelButton()
    li.appendChild(delButtoon)
    this.list.appendChild(li)
  }

  genDelButton(){
    const delButton = document.createElement('button')
    const delButtonIcon = document.createElement('span')
    delButtonIcon.classList.add('far','fa-trash-alt','icon')
    delButton.appendChild(delButtonIcon)
    delButton.addEventListener('click',() => this.remove(delButton))
    return delButton
  }

  remove(delButton){
    const delRecord = delButton.closest('li')
    this.list.removeChild(delRecord)
  }
}

const areaList = new AreaList(
  document.getElementById('js-areaList'),
  document.getElementById('js-areaList-AddButton')
  )
