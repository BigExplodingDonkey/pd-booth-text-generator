import { createTextCard } from './text-card.ts'
import { createDivider } from './divider.ts';
import { createHighlightCard } from './highlight-card.ts'
import { createFontCard } from './font-card.ts'
import { createGenerateCard } from './generate-card.ts'

export function createCardContainer(): HTMLElement {
    const cardContainer = document.createElement("div");
    cardContainer.id = "card-container"

    // Create different cards
    const textCard = createTextCard();
    const divider1 = createDivider();
    const highlightCard = createHighlightCard();
    const divider2 = createDivider();
    const fontCard = createFontCard();
    const genCard = createGenerateCard();

    // Add the cards to the card wrapper
    cardContainer.appendChild(textCard);
    cardContainer.appendChild(divider1);
    cardContainer.appendChild(highlightCard);
    cardContainer.appendChild(divider2);
    cardContainer.appendChild(fontCard);
    cardContainer.appendChild(genCard);

    return cardContainer;
}