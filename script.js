const inputs = document.getElementsByTagName('input');

window.onload = () => {
  inputs[0].value = getRandomInteger(10000, 99999);
  inputs[1].value = getRandomString(5);
  inputs[2].addEventListener('click', saveGame);
  inputs[3].addEventListener('click', () => inputs[4].click());
  inputs[4].addEventListener('change', loadGame);
};

const saveGame = () => {
  const myState = {
    myNumber: inputs[0].value,
    myString: inputs[1].value,
  };

  let element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' +
    encodeURIComponent(JSON.stringify(myState)));
  element.setAttribute('download', 'save-' + new Date().getTime() + '.json');
  element.style.display = 'none';

  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

const loadGame = (event) => {
  if(event.target.files.length == 0) {
    return;
  };

  let reader = new FileReader();
  reader.onload = (event) => {
    const myState = JSON.parse(event.target.result);

    if(myState.myNumber == undefined || myState.myString == undefined) {
      alert('The file you selected is not valid.');
      return;
    }

    inputs[0].value = myState.myNumber;
    inputs[1].value = myState.myString;
  };

  reader.readAsText(event.target.files[0]);
};

const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomString = (length) => {
  return Math.random().toString(36).substr(2, length);
};
