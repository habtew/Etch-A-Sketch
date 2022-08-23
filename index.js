const container = document.querySelector('.container')
const buttons = document.querySelectorAll('.button')
const clear = document.querySelector('.clear');
let slider = document.querySelector('#sizeRange');

let color = 'black'
function createGrid(gridNumber){
    let gridArea = gridNumber*gridNumber;
    for(let i=0; i < gridArea; i++){
        let gridItem = document.createElement('div');
        container.style.gridTemplateColumns = `repeat(${gridNumber}, 1fr)`;
        container.style.gridTemplateRows = `repeat ${gridNumber} 1fr`
        //gridItem.classList.add('lo')
        container.insertAdjacentElement('beforeend', gridItem)
    }
    let gridPixels = document.querySelectorAll('.container>div');
    gridPixels.forEach(girdpixel => girdpixel.addEventListener('mouseover', colorGrid))
}

function colorGrid(){
    switch (color){
        case 'rainbow':
            this.style.backgroundColor = `hsl(${Math.random()*360}, 100%, 50%)`
            this.classList.remove('gray');
            break;
        case 'gray':
            if (this.style.backgroundColor.match(/rgba/)) {
                let currentOpacity = Number(this.style.backgroundColor.slice(-4, -1));
                if (currentOpacity <= 0.9) {
                    this.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
                    this.classList.add('gray');
                }
            } else if (this.classList == 'gray' && this.style.backgroundColor == 'rgb(0, 0, 0)') {
                return;
            } else {
                this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';  
            }
            break;
        case 'erase':
            this.style.backgroundColor = '#ffffff'
            this.classList.remove('gray');
            break;
        default:
            this.style.backgroundColor = 'black';
            this.classList.remove('gray');
            break;
    }
}

// Clear Button
function eraseAllColor() {
    var gridPixels = container.querySelectorAll('div');
    gridPixels.forEach(gridPixel => gridPixel.style.backgroundColor = '#ffffff');
}

// Updates color variable when a color button is clicked
function changeColor(event) {
    switch (event.target.dataset.color) { 
        case 'rainbow':
            color = 'rainbow';
            break;  
        case 'gray':
            color = 'gray';
            break;
        case 'erase':
            color = 'erase';
            break;
        default:
            color = 'black';
            break;
    } 
}

function pixelSize() {
    let gridPixels = container.querySelectorAll('div');
    gridPixels.forEach(gridPixel => gridPixel.remove());
    createGrid(slider.value);
    document.getElementById('text').innerHTML = slider.value;


}
//default grid
createGrid(2);

// Event Listeners
clear.addEventListener('click', eraseAllColor);
buttons.forEach(button => button.addEventListener('click', changeColor));
slider.addEventListener('mouseup', pixelSize);