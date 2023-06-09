const _ = require('lodash'); 

export const addDropdownEvent = (div) => {
	let header = div.children[0]
	let options = div.children[1]
	header.addEventListener('click', () => toggleList(options));
}

export const addOptionEvent = (div, handleSelect, args) => {
   const options = div.children[1].children;
   const header = div.children[0];
   for (let i = 0; i < options.length; i++) {
      if (!Array.from(options[i].classList).includes('event')) {
         options[i].addEventListener('click', () => {
            let val = options[i].innerHTML;
            header.childNodes[0].nodeValue = val;
            toggleList(div.children[1]);
            handleSelect(val, ...args);
         });
         options[i].classList.add('event');
      }
   }
}

export const addOptionEventIndex = (div, handleSelect) => {
   const options = div.children[1].children;
   const header = div.children[0];
   for (let i = 0; i < options.length; i++) {
      if (!Array.from(options[i].classList).includes('event')) {
         options[i].addEventListener('click', () => {
            let val = options[i].innerHTML;
            header.childNodes[0].nodeValue = val;
            toggleList(div.children[1]);
            handleSelect(val, i);
         });
         options[i].classList.add('event');
      }
   }
}

export const addOptionEventSpecial = (div, handleSelect, countIndex) => {
   const options = div.children[1].children;
   const header = div.children[0];
   for (let i = 0; i < options.length; i++) {
      if (!Array.from(options[i].classList).includes('event')) {
         options[i].addEventListener('click', () => {
            let val = options[i].innerHTML;
            header.childNodes[0].nodeValue = val;
            toggleList(div.children[1]);
            handleSelect(countIndex, i);
         });
         options[i].classList.add('event');
      }
   }
}

const toggleList = (div) => {
   let arrow = div.previousElementSibling.children[0];
   div.classList.toggle('open');
   div.classList.toggle('closed');
   arrow.classList.toggle('arrow-down');
   arrow.classList.toggle('arrow-up');
   if (Array.from(div.classList).includes('open')) {
      let containerHeight = document.getElementById('player-select').offsetHeight
      if (div.scrollHeight > 280) {
         if (div.offsetParent.offsetTop + 325 > containerHeight) {
            div.classList.add('reverse')
         } else div.classList.remove('reverse')
      } else {
         if (div.offsetParent.offsetTop + div.scrollHeight + 45 > containerHeight) {
            div.classList.add('reverse')
         } else div.classList.remove('reverse')
      }
      // console.dir(div.offsetParent.offsetTop)
      // console.dir(div.scrollHeight)
   }
};

export const clearSelection = (setCat) => setCat(null);

export const resetSub = (div, arr, init, ref, i) => {
   div.querySelectorAll('.value-header')[i].childNodes[0].nodeValue = init;
   arr = [];
   if (typeof ref === 'boolean') ref = false;
   if (typeof ref === 'function') ref(false);
}

export const limitSelections = (nodes, bool, cat) => {
   if (bool) {
      for (let el of nodes) {
         let name = el.id.split('-')[1];
         if (name !== cat && name !== 'sub' + cat) {
            let text = document.createTextNode('Complete additional selections before continuing');
            let div = document.createElement('div');
            div.classList.add('tooltip-alert');
            div.appendChild(text);
            el.classList.add('tooltip-select')
            el.append(div)
         }
      }
   }
   else {
      for (let el of nodes) {
         let div = el.getElementsByClassName('tooltip-alert');
         if (div.length) div[0].remove()
         el.classList.remove('tooltip-select')
      }
   }
}

export const toggleSection = (div ) => {
   div.classList.toggle('open')
   div.nextElementSibling.classList.toggle('hidden')
   let parent = div.closest('.container-box');
   let arr = parent.querySelectorAll('.section-heading');
   arr.forEach((el,i) => {
     if (el !== div) {
     // if (i !== index) {
       el.classList.remove('open')
       el.nextElementSibling.classList.add('hidden')
     }
   })}

 export const toggleHeading = (div) => {
   div.classList.toggle('open')
   div.nextElementSibling.classList.toggle('hidden')
 }
