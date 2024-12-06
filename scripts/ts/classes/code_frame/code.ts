import hljs from "highlight.js";

export default class CodeFrame {
    private static codeFrame: HTMLElement;

    static {
        const codeDiv = document.createElement('div');
        codeDiv.id = 'code';

        const spanIcon = document.createElement('button');
        spanIcon.id = 'content_copy';
        spanIcon.innerHTML = `<svg id="copy-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
        <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z">
        </path>
        <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z">
        </path>
        </svg>`;
        spanIcon.onclick = () => {
            navigator.clipboard.writeText((document.getElementById('code-lines') as HTMLElement).textContent as string);

            const pathColors = new Map();
            const paths = document.querySelectorAll('#copy-svg path');
            paths.forEach(path => pathColors.set(path, path.getAttribute('fill')));
            paths.forEach(path => path.setAttribute('fill', '#27C93F'));
            setTimeout(() => paths.forEach(path => path.setAttribute('fill', pathColors.get(path))), 300);
        };
        codeDiv.appendChild(spanIcon);

        const codeLines = document.createElement('pre');
        codeLines.className = 'java';
        codeLines.id = 'code-lines';
        codeLines.innerHTML = `
        <code>
        public final class Main {
            public static void main(String[] args) {
                System.out.println("Hello World!");
            }
        }
        </code>`;
        const lines = codeLines.innerHTML.split("\n");
        var leadingSpacesCount = lines[1].match(/^\s*/)?.[0].length || 0;
        const trimmedLines = lines.slice(1).map(line => line.slice(leadingSpacesCount));
        codeLines.innerHTML = trimmedLines.join("\n");
        hljs.highlightElement(codeLines);

        codeDiv.appendChild(codeLines);

        CodeFrame.codeFrame = codeDiv;
    }

    public static getCodeFrame(): HTMLElement {
        return CodeFrame.codeFrame;
    }
}