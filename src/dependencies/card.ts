import { createCollapsible } from './collapsible.ts'

// Create a remove button (if it doesn't already exist) inside card button container
function createRemoveButton(container: HTMLDivElement) {
    if (!container.querySelector(".remove-btn")) {
        const removeButton = document.createElement("button");
        removeButton.textContent = "- Remove Section";
        removeButton.className = "remove-btn";

        container.appendChild(removeButton);

        // Set up button functionality
        setupRemoveButton(removeButton);
    }
}

// Delete a remove button inside card button container
function deleteRemoveButton(container: HTMLDivElement) {
    const removeButton = container.querySelector(".remove-btn");
    if (removeButton) {
       removeButton.remove();
    }
}

// Setup add section button functionality
function setupAddButton(button: HTMLButtonElement) {
  const addNewCard = () => {
    const cardContainer = document.getElementById("card-container");
    const currentCard = button.closest(".card");
    const newCard = createCard();

    const nextCard = currentCard?.nextElementSibling;
    const endCard = document.getElementById("end-card");

    // Add new card at the proper spot inside container
    if (cardContainer && nextCard) {
        cardContainer.insertBefore(newCard, nextCard ?? endCard);

        // Fix indexing if it got messed up
        reindexCards();
    }

    const cards = document.querySelectorAll<HTMLDivElement>(".card");

    // If multiple cards, number them and give them remove buttons
    if (cardCount > 1) {
        cards.forEach(card => {
            const sectionNum = Number(card.id.split('-').pop());
            const header = card.querySelector("h2");
            if (header && sectionNum) {
                header.textContent = `Booth Text ${sectionNum}`
            }

            const buttonContainer = card.querySelector<HTMLDivElement>(".card-btns");
            if (buttonContainer) {
                createRemoveButton(buttonContainer);
            }
        });
    }
  }

  button.addEventListener('click', () => addNewCard())
}

// Setup remove section button functionality
function setupRemoveButton(button: HTMLButtonElement) {
  const removeCard = () => {
    // Get parent card
    const currentCard = button.closest(".card");

    // Delete card
    if (currentCard) {
        cardCount--;
        currentCard.remove();
    }

    // If only one card left, delete number and remove button from it
    if (cardCount === 1) {
        const header = document.querySelector<HTMLDivElement>(".card")?.querySelector("h2");
        if (header) {
            header.textContent = "Booth Text";
        }
        const container = document.querySelector<HTMLDivElement>(".card-btns");
        if (container) {
            deleteRemoveButton(container);
        }
    }

    // Fix any messed up indexing
    reindexCards()
  }

  button.addEventListener('click', () => removeCard())
}

// Reorder cards when index is deleted
function reindexCards(): void {
    const cards = document.querySelectorAll<HTMLDivElement>(".card");

    cards.forEach((card, index) => {
        const newIndex = index + 1;
        card.id = `card-${newIndex}`;

        const header = card.querySelector("h2");
        if (header) {
            header.textContent = cards.length === 1 ? "Booth Text" : `Booth Text ${newIndex}`;
        }
    });

  cardCount = cards.length;
}

let cardCount = 0;

export function createCard(): HTMLDivElement {
    cardCount++;

    const card = document.createElement("div");
    card.className = "card";
    card.id = `card-${cardCount}`;

    // Create direct card elements
    const label = document.createElement("h2");
    label.textContent = "Booth Text";

    const textBox = document.createElement("textarea");
    textBox.placeholder = "Enter your booth text here...";
    textBox.style.resize = 'none';

    const [collapseButton, collapsibleContent] = createCollapsible();

    // Create container for add and remove buttons
    const cardButtons = document.createElement("div");
    cardButtons.className = "card-btns"

    const addButton = document.createElement("button");
    addButton.textContent = "+ Add Section";
    addButton.className = "add-btn";

    // Put add button inside container
    cardButtons.appendChild(addButton);

    // Add proper contents to the card
    card.appendChild(label);
    card.appendChild(textBox);
    card.appendChild(collapseButton);
    card.appendChild(collapsibleContent);
    card.appendChild(cardButtons);

    // Ensure card's buttons work properly
    setupAddButton(addButton);

    return card;
}