export default class CodeFrame {
    private static codeFrame: HTMLElement;

    static {
        const codeDiv = document.createElement('div');
        codeDiv.id = 'code';

        const topBarDiv = document.createElement('div');
        topBarDiv.id = 'topBar';

        const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svgElement.setAttribute('width', '54');
        svgElement.setAttribute('height', '14');
        svgElement.setAttribute('viewBox', '0 0 54 14');

        const gElement = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        gElement.setAttribute('fill', 'none');
        gElement.setAttribute('fill-rule', 'evenodd');
        gElement.setAttribute('transform', 'translate(1 1)');

        const circles = [
            { cx: '6', fill: '#FF5F56', stroke: '#E0443E' },
            { cx: '26', fill: '#FFBD2E', stroke: '#DEA123' },
            { cx: '46', fill: '#27C93F', stroke: '#1AAB29' },
        ];

        circles.forEach(({ cx, fill, stroke }) => {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', cx);
            circle.setAttribute('cy', '6');
            circle.setAttribute('r', '6');
            circle.setAttribute('fill', fill);
            circle.setAttribute('stroke', stroke);
            circle.setAttribute('stroke-width', '.5');
            gElement.appendChild(circle);
        });

        svgElement.appendChild(gElement);
        topBarDiv.appendChild(svgElement);

        const spanIcon = document.createElement('span');
        spanIcon.id = 'content_copy';
        spanIcon.className = 'material-icons';
        spanIcon.textContent = 'content_copy';
        topBarDiv.appendChild(spanIcon);

        const codeLinesDiv = document.createElement('div');
        codeLinesDiv.id = 'code-lines';

        const codeLineSpan = document.createElement('span');
        codeLineSpan.textContent = 'sssssssssssssssssssssssssssss';
        codeLinesDiv.appendChild(codeLineSpan);

        codeDiv.appendChild(topBarDiv);
        codeDiv.appendChild(codeLinesDiv);

        CodeFrame.codeFrame = codeDiv;

        // let isDragging = false;
        // let startX: number, startY: number, initialLeft: number, initialTop: number;

        // topBarDiv.addEventListener('mousedown', (event) => {
        //     isDragging = true;

        //     startX = event.clientX;
        //     startY = event.clientY;
        //     const rect = codeDiv.getBoundingClientRect();
        //     initialLeft = rect.left;
        //     initialTop = rect.top;

        //     event.preventDefault();
        // });

        // window.addEventListener('mousemove', (event) => {
        //     if (!isDragging) return;

        //     const deltaX = event.clientX - startX;
        //     const deltaY = event.clientY - startY;
        //     codeDiv.style.left = `${initialLeft + deltaX}px`;
        //     codeDiv.style.top = `${initialTop + deltaY}px`;
        // });

        // window.addEventListener('mouseup', () => {
        //     isDragging = false;
        // });
    }

    public static getCodeFrame(): HTMLElement {
        return CodeFrame.codeFrame;
    }
}