export function createHeader(): HTMLElement {
    const header = document.createElement("header");
    const nav = document.createElement("nav");
    const ul = document.createElement("ul");
    ul.innerHTML = `
    <li><b>PD Booth Text Generator</b></li>
    <li><a href="https://www.discord.gg/CdP3KcRN8P">Discord Server</a></li>
    `;

    // Build nav header
    nav.appendChild(ul);
    header.appendChild(nav);
    
    return header;
}