import { createOption, createDropdown } from './Dropdown.ts'
import { createLabeledInput } from './LabelInput.ts'

function setupColorTypeDropdown(dropdown: HTMLSelectElement): void {
    const toggleColorElements = () => {
        const card = dropdown.closest(".card");
        let colorInputDiv;
        let colorInput1Div;
        let colorInput2Div;
        let transparencyInputDiv;

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

                transparencyInputDiv = card?.querySelector("#transparency")?.parentElement;

                // Create color input
                const colorInput = document.createElement("input");
                colorInput.type = "color";
                colorInput.id = "color";
                const labeledColorInput = createLabeledInput("Color", colorInput);

                // Place it in proper spot
                if (transparencyInputDiv) {
                    card?.insertBefore(labeledColorInput, transparencyInputDiv);
                }

                break;
            case "gradient":
                colorInputDiv = card?.querySelector("#color")?.parentElement;

                // Remove color option if it exists
                colorInputDiv?.remove();

                transparencyInputDiv = card?.querySelector("#transparency")?.parentElement;

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
                if (transparencyInputDiv) {
                    card?.insertBefore(labeledColorInput1, transparencyInputDiv);
                    card?.insertBefore(labeledColorInput2, transparencyInputDiv);
                }

                break;
            default:
                // Do nothing
        };
    }
    dropdown.addEventListener('change', () => toggleColorElements())
}

export function createHighlightCard(): HTMLDivElement {
    const card = document.createElement("div");
    card.className = "card"
    card.id = "highlight-card"

    // Create label and textbox
    const label = document.createElement("h2");
    label.textContent = "Highlight Style";

    // Create color type dropdown
    const options: HTMLElement[] = [
        createOption("none", "None"),
        createOption("color", "Solid"),
        createOption("gradient", "Gradient")
    ]
    const colorTypeDropdown = createDropdown("color-type-dropdown", options);
    setupColorTypeDropdown(colorTypeDropdown);
    const labeledColorTypeDropdown = createLabeledInput("Color Type", colorTypeDropdown);

    // Create transparency input
    const transparencyInput = document.createElement("input");
    transparencyInput.type = "number";
    transparencyInput.id = "transparency";
    transparencyInput.style.width = "3rem";
    transparencyInput.min = "0";
    transparencyInput.step = "0.1";
    transparencyInput.max = "0.9";
    transparencyInput.defaultValue = "0";
    const labeledTransparencyInput = createLabeledInput("Transparency", transparencyInput);

    // Add proper contents to the card
    card.appendChild(label);
    card.appendChild(labeledColorTypeDropdown);
    card.appendChild(labeledTransparencyInput);

    return card;
}