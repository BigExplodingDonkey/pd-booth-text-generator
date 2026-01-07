// Setup collapse button functionality
function setupCollapsibleSection(button: HTMLButtonElement) {
  const toggleCollapsible = () => {
    const collapsibleContent = button.nextElementSibling;
    if (collapsibleContent) {
        collapsibleContent.classList.toggle("active");
    }
  }
  button.addEventListener('click', () => toggleCollapsible())
}

function setupStyleButton(button: HTMLButtonElement) {
  const styleOptions = button.closest("style-options");
  const text = button.textContent;

  switch (text) {
    case "Color": 
      // Todo
    case "Font Style":
      // Todo
    case "Stroke":
      // Todo
    default: 
      // Todo
  }
}

export function createCollapsible(name: string = "Section Styles"): [HTMLButtonElement, HTMLDivElement] {
    const collapseButton = document.createElement("button");
    collapseButton.textContent = name
    collapseButton.className = "collapsible"

    const collapsibleContent = document.createElement("div");
    collapsibleContent.className = "collapsible-content"

    // Create a div for the style buttons
    const styles = document.createElement("div");
    styles.className = "styles";

    // Create style buttons
    const colorButton = document.createElement("button");
    colorButton.textContent = "Color";
    colorButton.className = "color";

    const fontButton = document.createElement("button");
    fontButton.textContent = "Font Style";
    fontButton.className = "font";

    const strokeButton = document.createElement("button");
    strokeButton.textContent = "Stroke";
    strokeButton.className = "stroke";

    // Add style buttons to style container
    styles.appendChild(colorButton);
    styles.appendChild(fontButton);
    styles.appendChild(strokeButton);

    const styleOptions = document.createElement("div");
    styleOptions.className = "style-options"

    // Add contents to the collapsable container
    collapsibleContent.appendChild(styles);
    collapsibleContent.appendChild(styleOptions);
    
    setupCollapsibleSection(collapseButton);
    setupStyleButton(colorButton);
    setupStyleButton(fontButton);
    setupStyleButton(strokeButton);

    return [collapseButton, collapsibleContent];
}