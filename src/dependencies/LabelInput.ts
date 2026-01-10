export function createLabeledInput(labelText: string, input: HTMLElement): HTMLDivElement {
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.alignItems = "center";
    row.style.gap = "1rem";

    const label = document.createElement("label");
    label.textContent = labelText;

    if (input.id) {
        label.htmlFor = input.id;
    } else {
        label.htmlFor = input.id = `input-${crypto.randomUUID()}`;
    }

    row.append(label, input);

    return row;
}