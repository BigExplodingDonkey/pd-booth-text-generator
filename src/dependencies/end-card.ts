import { createCollapsible } from './collapsible.ts'

export function createEndCard(): HTMLDivElement {
    const endCard = document.createElement("div");
    endCard.id = "end-card";

    const [collapseButton, collapsibleContent] = createCollapsible("Styles for All Sections");

    const generateButton = document.createElement("button");
    generateButton.textContent = "Generate";
    generateButton.id = "generate";

    endCard.appendChild(collapseButton);
    endCard.appendChild(collapsibleContent);
    endCard.appendChild(generateButton);

    return endCard;
}