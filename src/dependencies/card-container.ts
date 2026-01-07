import { createCard } from './card.ts'
import { createEndCard } from './end-card.ts'

export function createCardContainer(): HTMLElement {
    const cardContainer = document.createElement("div");
    cardContainer.id = "card-container"

    const card = createCard();
    const endCard = createEndCard();

    cardContainer.appendChild(card);
    cardContainer.appendChild(endCard);

    return cardContainer;
}