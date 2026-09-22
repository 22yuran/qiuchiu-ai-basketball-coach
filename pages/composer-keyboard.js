window.buildDemoKeyboard = function (host, editor, submit) {
  host.classList.add('ios-demo-keyboard');
  host.replaceChildren();
  let numbers = false, uppercase = false;
  const icon = path => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + path + '</svg>';
  const shift = icon('<path d="m4 11 8-8 8 8h-5v9H9v-9Z"/>');
  const remove = icon('<path d="M9 5h12v14H9l-7-7Z"/><path d="m12 9 6 6m0-6-6 6"/>');
  function insert(value) {
    editor.focus({preventScroll:true});
    const selection = window.getSelection();
    if (selection.rangeCount && editor.contains(selection.anchorNode)) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      const node = document.createTextNode(value);
      range.insertNode(node); range.setStartAfter(node); range.collapse(true);
      selection.removeAllRanges(); selection.addRange(range);
    } else editor.append(document.createTextNode(value));
    editor.dispatchEvent(new Event('input',{bubbles:true}));
  }
  function key(label, action, kind, markup) {
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'ios-key ' + (kind || '');
    button.setAttribute('aria-label',label);
    if(markup) button.innerHTML=markup; else button.textContent=label;
    button.addEventListener('pointerdown',event=>event.preventDefault());
    button.addEventListener('click',action);
    return button;
  }
  function render() {
    host.replaceChildren();
    const suggestions = document.createElement('div');
    suggestions.className='ios-predictions';
    ['投篮','动作','练习'].forEach(word=>suggestions.append(key(word,()=>insert(word))));
    host.append(suggestions);
    const rows = numbers ? ['1234567890','-/:;()$&@"',".,?!'"] : ['qwertyuiop','asdfghjkl','zxcvbnm'];
    rows.forEach((letters,index)=>{
      const row=document.createElement('div'); row.className='ios-key-row row-'+index;
      if(index===2) row.append(key(numbers?'ABC':'大写',()=>{
        if(numbers) numbers=false; else uppercase=!uppercase; render();
      },'utility',numbers?null:shift));
      for(const letter of letters) {
        const value=uppercase&&!numbers?letter.toUpperCase():letter;
        row.append(key(value,()=>insert(value)));
      }
      if(index===2) row.append(key('删除',()=>{
        editor.focus({preventScroll:true});
        const selection=window.getSelection();
        if(selection.rangeCount && editor.contains(selection.anchorNode)) document.execCommand('delete');
        else editor.textContent=Array.from(editor.textContent).slice(0,-1).join('');
        editor.dispatchEvent(new Event('input',{bubbles:true}));
      },'utility',remove));
      host.append(row);
    });
    const bottom=document.createElement('div');bottom.className='ios-key-row';
    bottom.append(key(numbers?'ABC':'123',()=>{numbers=!numbers;render();},'mode'),
      key('空格',()=>insert(' '),'space'),key('发送',submit,'send'));
    host.append(bottom);
    const footer=document.createElement('div');footer.className='ios-key-footer';
    footer.innerHTML=icon('<circle cx="12" cy="12" r="9"/><path d="M8 14s1 3 4 3 4-3 4-3M8 8h.01M16 8h.01"/>')+
      icon('<rect x="9" y="2" width="6" height="13" rx="3"/><path d="M6 10v2a6 6 0 0 0 12 0v-2M12 18v4m-4 0h8"/>')+
      '<i class="ios-home-indicator"></i>';
    host.append(footer);
  }
  render();
};
