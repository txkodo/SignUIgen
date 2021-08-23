
export const reactiveText = (input:HTMLInputElement,output:HTMLElement) => {
  input.addEventListener('keyup',() => {output.textContent = input.value})
}