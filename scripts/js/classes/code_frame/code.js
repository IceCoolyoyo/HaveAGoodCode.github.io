class CodeFrame{static getCodeFrame(){return CodeFrame.codeFrame}}(()=>{var e=document.createElement("div"),t=(e.id="code",document.createElement("button")),t=(t.id="content_copy",t.innerHTML=`<svg id="copy-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
        <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z">
        </path>
        <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z">
        </path>
        </svg>`,t.onclick=()=>{navigator.clipboard.writeText(document.getElementById("code-lines").textContent);let t=new Map,e=document.querySelectorAll("#copy-svg path");e.forEach(e=>t.set(e,e.getAttribute("fill"))),e.forEach(e=>e.setAttribute("fill","#27C93F")),setTimeout(()=>e.forEach(e=>e.setAttribute("fill",t.get(e))),300)},e.appendChild(t),document.createElement("pre")),a=(t.className="java",t.id="code-lines",t.innerHTML=`
        <code>
        public final class Main {
            public static void main(String[] args) {
                System.out.println("Hello World!");
            }
        }
        </code>`,t.innerHTML.split("\n")),i=(null==(n=a[1].match(/^\s*/))?void 0:n[0].length)||0,n=a.slice(1).map(e=>e.slice(i));t.innerHTML=n.join("\n"),hljs.highlightElement(t),e.appendChild(t),CodeFrame.codeFrame=e})();export default CodeFrame;