import { createCardContainer } from './card-container.ts'

function addGradient(text: string, highlight: boolean, font: boolean, stroke: boolean): string {
    return text;
}

// Add any font styles selected
function addFontStyle(text: string, color: string, useSize: string, size: string, family: string, weight: string, transparency: string): string {
    let finalText = text;

    let startTag = '<font color=\"' + color + '\"'
    startTag = (useSize !== "no") ? startTag + ' size=\"' + size + '\"' : startTag;
    startTag = (family !== "None") ? startTag + ' family=\"' + family + '\"' : startTag;
    startTag = (weight !== "Regular") ? startTag + ' weight=\"' + weight + '\"' : startTag;
    startTag = (transparency !== "0") ? startTag + ' transparency=\"' + transparency + '\"' : startTag;
    startTag += ">";

    const endTag = "</font>";

    finalText = startTag + finalText + endTag;

    return finalText;
}

// Add highlight style options that are selected
function addHighlightStyle(text: string, color: string, transparency: string): string {
    let finalText = text;

    let startTag = '<mark color=\"' + color + '\"'
    startTag = (transparency !== "0") ? startTag + ' transparency=\"' + transparency + '\"' : startTag;
    startTag += ">";

    const endTag = "</mark>";

    finalText = startTag + finalText + endTag;

    return finalText;
}

// Add stroke style options that are selected
function addStrokeStyle(text: string, color: string, thickness: string, transparency: string, joins: string, sizing: string): string {
    let finalText = text;

    let startTag = '<stroke color=\"' + color + '\"'
    startTag = (transparency !== "0") ? startTag + ' transparency=\"' + transparency + '\"' : startTag;
    startTag = (joins !== "miter") ? startTag + ' joins=\"' + joins + '\"' : startTag;
    startTag = (sizing !== "fixed") ? startTag + ' sizing=\"' + sizing + '\"' : startTag;
    startTag += ">";

    const endTag = "</stroke>";

    finalText = startTag + finalText + endTag;

    return finalText;
}

// Add any miscellaneous styles selected
function addMiscellaneousStyle(text: string, bold: boolean, italic: boolean, underline: boolean, strikethrough: boolean, smallcaps: boolean): string {
    let finalText = text;

    // Add proper tags based on styles indicated
    finalText = bold ? "<b>" + finalText + "</b>" : finalText;
    finalText = italic ? "<i>" + finalText + "</i>" : finalText;
    finalText = underline ? "<u>" + finalText + "</u>" : finalText;
    finalText = strikethrough ? "<s>" + finalText + "</s>" : finalText;
    finalText = smallcaps ? "<sc>" + finalText + "</sc>" : finalText;

    return finalText;
}

// Generate rich text based off style selections
function generateRichText(): string {
    let text = (document.getElementById("booth-text") as HTMLTextAreaElement)?.value;

    // Font style
    const fontCard = document.getElementById("font-card");
    const fontColorType = (fontCard?.querySelector("#color-type-dropdown") as HTMLSelectElement)?.value;
    const fontColor = (fontCard?.querySelector("#color") as HTMLSelectElement)?.value;
    const fontColor1 = (fontCard?.querySelector("#color-1") as HTMLSelectElement)?.value;
    const fontColor2 = (fontCard?.querySelector("#color-2") as HTMLSelectElement)?.value;
    const useFontSize = (fontCard?.querySelector("#size-check-dropdown") as HTMLSelectElement)?.value;
    const fontSize = (fontCard?.querySelector("#size") as HTMLSelectElement)?.value;
    const fontFamily = (fontCard?.querySelector("#family-dropdown") as HTMLSelectElement)?.value;
    const fontWeight = (fontCard?.querySelector("#weight-dropdown") as HTMLSelectElement)?.value;
    const fontTransparency = (fontCard?.querySelector("#transparency") as HTMLSelectElement)?.value;

    // Highlight style
    const highlightCard = document.getElementById("highlight-card");
    const highlightColorType = (highlightCard?.querySelector("#color-type-dropdown") as HTMLSelectElement)?.value;
    const highlightColor = (highlightCard?.querySelector("#color") as HTMLSelectElement)?.value;
    const highlightColor1 = (highlightCard?.querySelector("#color-1") as HTMLSelectElement)?.value;
    const highlightColor2 = (highlightCard?.querySelector("#color-2") as HTMLSelectElement)?.value;
    const highlightTransparency = (highlightCard?.querySelector("#transparency") as HTMLSelectElement)?.value;

    // Stroke style
    const strokeCard = document.getElementById("stroke-card");
    const strokeColorType = (strokeCard?.querySelector("#color-type-dropdown") as HTMLSelectElement)?.value;
    const strokeColor = (strokeCard?.querySelector("#color") as HTMLSelectElement)?.value;
    const strokeColor1 = (strokeCard?.querySelector("#color-1") as HTMLSelectElement)?.value;
    const strokeColor2 = (strokeCard?.querySelector("#color-2") as HTMLSelectElement)?.value;
    const strokeThickness = (strokeCard?.querySelector("#thickness") as HTMLSelectElement)?.value;
    const strokeTransparency = (strokeCard?.querySelector("#transparency") as HTMLSelectElement)?.value;
    const strokeJoins = (strokeCard?.querySelector("#joins-dropdown") as HTMLSelectElement)?.value;
    const strokeSizing = (strokeCard?.querySelector("#sizing-dropdown") as HTMLSelectElement)?.value;

    // Miscellaneous styles
    const miscellaneousCard = document.getElementById("miscellaneous-card");
    const bold = (miscellaneousCard?.querySelector("#bold-dropdown") as HTMLSelectElement)?.value;
    const italic = (miscellaneousCard?.querySelector("#italic-dropdown") as HTMLSelectElement)?.value;
    const underline = (miscellaneousCard?.querySelector("#underline-dropdown") as HTMLSelectElement)?.value;
    const strikethrough = (miscellaneousCard?.querySelector("#strikethrough-dropdown") as HTMLSelectElement)?.value;
    const smallcaps = (miscellaneousCard?.querySelector("#smallcaps-dropdown") as HTMLSelectElement)?.value;

    // If gradient color types exist, add them first
    const colorTypeValues = [highlightColorType, fontColorType, strokeColorType];

    if (colorTypeValues.includes("gradient")) {
        const [val1, val2, val3] = colorTypeValues.map(val => val === "gradient");
        text = addGradient(text, val1, val2, val3);
    }

    // If normal (non-gradient) font style options are being used, add them
    const fontValues = [fontColor, useFontSize, fontSize, fontFamily, fontWeight, fontTransparency];

    if (fontColorType === "color" || useFontSize === "yes" || fontFamily !== "None" || fontWeight !== "Regular" || fontTransparency !== "0") {
        const [val1, val2, val3, val4, val5, val6] = fontValues;
        text = addFontStyle(text, val1, val2, val3, val4, val5, val6);
    }

    // If normal (non-gradient) highlight style options are being used, add them
    const highlightValues = [highlightColor, highlightTransparency];

    if (highlightColorType === "color") {
        const [val1, val2] = highlightValues;
        text = addHighlightStyle(text, val1, val2);
    }

    // If normal (non-gradient) stroke style options are being used, add them
    const strokeValues = [strokeColor, strokeThickness, strokeTransparency, strokeJoins, strokeSizing];

    if (strokeColorType === "color") {
        const [val1, val2, val3, val4, val5] = strokeValues;
        text = addStrokeStyle(text, val1, val2, val3, val4, val5);
    }

    // If any miscellaneous styles are being used, add them
    const miscellaneousValues = [bold, italic, underline, strikethrough, smallcaps];

    if (miscellaneousValues.includes("yes")) {
        const [val1, val2, val3, val4, val5] = miscellaneousValues.map(val => val === "yes");
        text = addMiscellaneousStyle(text, val1, val2, val3, val4, val5);
    }

    return text;
}

// Create generated text popup
function createRichTextModal(richText: string) {
    // Create overlay (outside of card container)
    const overlay = document.createElement("div");
    overlay.id = "modal-overlay";

    // Create modal
    const modal = document.createElement("div");
    modal.id = "modal";

    // Create header
    const header = document.createElement("h2");
    header.textContent = "Here's Your Text:";

    // Create textbox (read only)
    const textarea = document.createElement("textarea");
    textarea.value = richText;
    textarea.readOnly = true;
    textarea.id = "modal-textarea";

    // Create container for buttons
    const buttons = document.createElement("div");
    buttons.id = "modal-buttons";

    // Create copy text button
    const copyBtn = document.createElement("button");
    copyBtn.textContent = "Copy Text";
    copyBtn.className = "modal-btn copy";
    copyBtn.id = "modal-btn-copy";
    copyBtn.onclick = () => {
        textarea.select();
        if (!navigator.clipboard){
            document.execCommand("copy");
        } else{
            navigator.clipboard.writeText(richText).then(
                function(){
                    alert("Text successfully copied to clipboard.");
                })
            .catch(
                function() {
                    alert("Text could not be copied to clipboard."); // error
            });
        }
    };

    // Create close button
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Close";
    closeBtn.className = "modal-btn";
    closeBtn.id = "modal-btn-close";
    closeBtn.onclick = () => document.body.removeChild(overlay);

    // Assemble buttons
    buttons.append(copyBtn, closeBtn);

    // Add contents to page
    modal.append(header, textarea, buttons);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
}

// Setup reset button functionality
function setupResetButton(button: HTMLButtonElement): void {
    // Reload card container (resetting styles) but keep booth text
    const resetStyles = () => {
        // Save text
        const text = (document.getElementById("booth-text") as HTMLTextAreaElement)?.value;

        // Get app and container elements
        const app = document.getElementById('app');
        let cardContainer = document.getElementById("card-container");

        // Remove and recreate container
        cardContainer?.remove();
        cardContainer = createCardContainer();
        app?.appendChild(cardContainer);

        // Put booth text back
        const boothText = document.getElementById("booth-text") as HTMLTextAreaElement;
        boothText!.value = text;
    }
    button.addEventListener('click', () => resetStyles());
}

// Setup generate button functionality
function setupGenerateButton(button: HTMLButtonElement): void {
    const showPopup = () => {
        const richText = generateRichText();
        createRichTextModal(richText);
    }
    button.addEventListener('click', () => showPopup());
}

export function createLastCard(): HTMLDivElement {
    const endCard = document.createElement("div");
    endCard.id = "last-card";

    // Create reset styles button
    const resetButton = document.createElement("button");
    resetButton.textContent = "Reset Styles";
    resetButton.id = "reset";

    // Create generate button
    const generateButton = document.createElement("button");
    generateButton.textContent = "Generate";
    generateButton.id = "generate";

    // Create container for buttons
    const endButtons = document.createElement("div");
    endButtons.id = "end-buttons";

    // Add buttons to container
     endButtons.appendChild(resetButton);
    endButtons.appendChild(generateButton);
    
    // Add container to end card
    endCard.appendChild(endButtons);

    // Setup buttons functionality
    setupResetButton(resetButton);
    setupGenerateButton(generateButton);

    return endCard;
}