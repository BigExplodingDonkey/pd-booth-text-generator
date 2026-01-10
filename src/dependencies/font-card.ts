import { createOption, createDropdown } from './Dropdown.ts'
import { createLabeledInput } from './LabelInput.ts'

function setupColorTypeDropdown(dropdown: HTMLSelectElement): void {
    const toggleColorElements = () => {
        const card = dropdown.closest(".card");
        let colorInputDiv;
        let colorInput1Div;
        let colorInput2Div;
        let sizeCheckboxDiv;

        switch(dropdown.value) {
            case "none":
                colorInputDiv = card?.querySelector("#color")?.parentElement;
                colorInput1Div = card?.querySelector("#color-1")?.parentElement;
                colorInput2Div = card?.querySelector("#color-2")?.parentElement;

                // Remove all color options if they exist
                colorInputDiv?.remove();
                colorInput1Div?.remove();
                colorInput2Div?.remove();

                break;
            case "color":
                colorInput1Div = card?.querySelector("#color-1")?.parentElement;
                colorInput2Div = card?.querySelector("#color-2")?.parentElement;

                // Remove gradient options if they exist
                colorInput1Div?.remove();
                colorInput2Div?.remove();

                sizeCheckboxDiv = card?.querySelector("#size-checkbox")?.parentElement;

                // Create color input
                const colorInput = document.createElement("input");
                colorInput.type = "color";
                colorInput.id = "color";
                const labeledColorInput = createLabeledInput("Color", colorInput);

                // Place it in proper spot
                if (sizeCheckboxDiv) {
                    card?.insertBefore(labeledColorInput, sizeCheckboxDiv);
                }

                break;
            case "gradient":
                colorInputDiv = card?.querySelector("#color")?.parentElement;

                // Remove color option if it exists
                colorInputDiv?.remove();

                sizeCheckboxDiv = card?.querySelector("#size-checkbox")?.parentElement;

                // Create color input 1
                const colorInput1 = document.createElement("input");
                colorInput1.type = "color";
                colorInput1.id = "color-1";
                const labeledColorInput1 = createLabeledInput("Color 1", colorInput1);

                // Create color input 2
                const colorInput2 = document.createElement("input");
                colorInput2.type = "color";
                colorInput2.id = "color-2";
                const labeledColorInput2 = createLabeledInput("Color 2", colorInput2);

                // Place them in proper spots
                if (sizeCheckboxDiv) {
                    card?.insertBefore(labeledColorInput1, sizeCheckboxDiv);
                    card?.insertBefore(labeledColorInput2, sizeCheckboxDiv);
                }

                break;
            default:
                // Do nothing
        };
    }
    dropdown.addEventListener('change', () => toggleColorElements())
}

export function createFontCard(): HTMLDivElement {
    const card = document.createElement("div");
    card.className = "card"
    card.id = "font-card"

    // Create label and textbox
    const label = document.createElement("h2");
    label.textContent = "Font Style";

    // Create color type dropdown
    const options: HTMLElement[] = [
        createOption("none", "None"),
        createOption("color", "Solid"),
        createOption("gradient", "Gradient")
    ]
    const colorTypeDropdown = createDropdown("color-type-dropdown", options);
    setupColorTypeDropdown(colorTypeDropdown);
    const labeledColorTypeDropdown = createLabeledInput("Color Type", colorTypeDropdown);

    // Create size checkbox
    const sizeCheckbox = document.createElement("input");
    sizeCheckbox.type = "checkbox";
    sizeCheckbox.id = "size-checkbox";
    sizeCheckbox.checked = false;
    const labeledSizeCheckbox = createLabeledInput("Size?", sizeCheckbox);

    // Create size input
    // const sizeInput = document.createElement("input");
    // sizeInput.type = "number";
    // sizeInput.id = "transparency";
    // sizeInput.style.width = "3rem";
    // sizeInput.min = "0";
    // sizeInput.step = "0.1";
    // sizeInput.max = "0.9";
    // sizeInput.defaultValue = "0";
    // const labeledSizeInput = createLabeledInput("Size", sizeInput);

    // Add proper contents to the card
    card.appendChild(label);
    card.appendChild(labeledColorTypeDropdown);
    card.appendChild(labeledSizeCheckbox);

    return card;
}