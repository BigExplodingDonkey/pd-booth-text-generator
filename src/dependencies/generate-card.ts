export function createGenerateCard(): HTMLDivElement {
    const endCard = document.createElement("div");
    endCard.id = "generate-card";

    const generateButton = document.createElement("button");
    generateButton.textContent = "Generate";
    generateButton.id = "generate";
    
    endCard.appendChild(generateButton);

    return endCard;
}