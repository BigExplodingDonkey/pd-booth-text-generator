export function createOption(value: string, textContent: string): HTMLElement {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = textContent;

    return option;
}

export function createDropdown(dropdownId: string, options: HTMLElement[]): HTMLSelectElement {
    const dropdown = document.createElement("select");
    dropdown.id = dropdownId;

    options.forEach(option => {
        dropdown.appendChild(option);
    });

    return dropdown;
}