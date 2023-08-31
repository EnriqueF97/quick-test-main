// Enrique Favila Martinez - 31/08/23

// added this to execute after document finished loading
// otherwise all elements will not exist at this point of execution
// and the code will fail
document.addEventListener("DOMContentLoaded", () => {
  const removeChildAfterDelay = (child) => {
    timer = window.setTimeout(() => {
      mainContainer.removeChild(child);
    }, 2000);
  };

  // just get a random number to use as hex color
  const getRandomColor = () => {
    let randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor}`;
  };

  let mainContainer = document.getElementById("mainSquare");
  // will use it to create a timeout function in window and delete it if needed before it finishes execution
  let timer = null;
  const drawContainer = (containerSize, childSize, numberOfChildren) => {
    // getting max children possible for container size and child size - quantity
    const maxChildren = Math.floor(containerSize / childSize) ** 2;
    const actualChildrenNum = Math.min(maxChildren, numberOfChildren);

    // building main square
    mainContainer.style.width = `${containerSize}px`;
    mainContainer.style.height = `${containerSize}px`;
    mainContainer.style.border = "1px solid black";
    mainContainer.style.maxWidth = `${containerSize}px`;
    mainContainer.style.maxHeight = `${containerSize}px`;

    for (let i = 0; i < actualChildrenNum; i++) {
      // creating every child, assigning corresponding values
      const child = document.createElement("div");
      child.classList.add("childSquare");
      child.style.width = `${childSize}px`;
      child.style.height = `${childSize}px`;
      child.style.backgroundColor = getRandomColor();

      mainContainer.appendChild(child);

      // only labels each child with its number in case all children do not fit inside main square
      if (actualChildrenNum < numberOfChildren) {
        const message = document.createElement("div");
        message.textContent = i;
        child.appendChild(message);
      }
    }

    // only labels how many children could fit inside the main square
    if (actualChildrenNum < numberOfChildren) {
      let overflowSquareText = document.createElement("p");
      let overflowContainer = document.getElementById(
        "overflowSquareContainer"
      );
      overflowSquareText.textContent = `Only rendered ${actualChildrenNum} squares`;
      overflowContainer.appendChild(overflowSquareText);
    }
  };

  // adds an hover functionality to change background color
  // also executes removeChildAfterDelay which after 2 seconds will delete
  // the element from the dom
  mainContainer.addEventListener("mouseover", (event) => {
    console.log(event.target);
    let target = event.target;
    if (target.classList.contains("childSquare")) {
      target.style.background = getRandomColor();
      removeChildAfterDelay(target);
    }
  });
  // after triggered, will find for the timeout already started, and clear it
  // from the window variable, therefore cancelling it
  mainContainer.addEventListener("mouseout", (event) => {
    console.log(event.target);
    window.clearTimeout(timer);
  });
  drawContainer(500, 50, 100); // containerSize, childSize, numberOfChildren
  // drawContainer(413, 42, 30); // containerSize, childSize, numberOfChildren
  // drawContainer(200, 300, 2); // containerSize, childSize, numberOfChildren
});
