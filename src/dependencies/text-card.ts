export function createTextCard(): HTMLDivElement {
    const card = document.createElement("div");
    card.id = "text-card"

    // Create label and textbox
    const label = document.createElement("h2");
    label.textContent = "Booth Text";

    const textBox = document.createElement("textarea");
    textBox.id = "booth-text";
    textBox.placeholder = "Enter your booth text here...";
    textBox.style.resize = 'none';

    // Add proper contents to the card
    card.appendChild(label);
    card.appendChild(textBox);

    return card;
}