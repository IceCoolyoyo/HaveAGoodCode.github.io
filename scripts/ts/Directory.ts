import MessageID from "../message/MessageID.js";
import {processMessage} from "../message/Message.js";
import Question from "../textbook/Question.js";

interface MenuItem {
    name: string;
    action?: () => void;
    children?: MenuItem[];
}

export default class DirectoryManager {
    private static menuItems: MenuItem[] = [
        { name: 'boolean', action: () => {
            MessageID.id = 0;
            processMessage();
        } },
        { name: '運算符', children: [
                { name: '關係運算符', action: () => {
                    MessageID.id = 10;
                    Question.q5();
                    processMessage();
                },},
                { name: '算術運算符', action: () => {
                    MessageID.id = 81;
                    Question.q5();
                    processMessage()
                }},
                { name: 'boolean運算符', action: () => {

                }},
                { name: '位元運算符', action: () => alert('Clicked 位元運算符.')}
            ],
        },
        { name: '其他類型', action: () => alert('Clicked 其他類型.') },
        
        { name: 'class', action: () => alert('Clicked class.'), children: [{ name: 'extends', action: () => alert('Clicked extends.') },
        { name: 'static', action: () => alert('Clicked static.') },{ name: 'this', action: () => alert('Clicked this.') },{ name: 'super', action: () => alert('Clicked super.') },{ name: '構造函數', action: () => alert('Clicked 構造函數.') },]},
        { name: 'method', action: () => alert('Clicked method.'), children: [{name: 'return', action: () => alert('Clicked return.')},{ name: 'abstract', action: () => alert('Clicked abstract.')},] },
        { name: '權限', action: () => alert('Clicked 權限.') }
    ];

    private static createDirectory(items: MenuItem[], parentElement: HTMLElement): void {
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.name;

            li.addEventListener('click', event => {
                event.stopPropagation();
                if (item.action) {
                    item.action();
                }
            });

            parentElement.appendChild(li);

            if (item.children) {
                const ul = document.createElement('ul');
                ul.style.marginLeft = '1%';
                parentElement.appendChild(ul);
                DirectoryManager.createDirectory(item.children, ul);
            }
        });
    }

    private static toggleDirectory(show: boolean): void {
        const overlay = document.getElementById('overlay') as HTMLElement;
        const directory = document.getElementById('directory') as HTMLElement;

        if (show) {
            overlay.style.display = 'block';
            directory.style.display = 'flex';
        } else {
            overlay.style.display = 'none';
            directory.style.display = 'none';
        }
    }

    private static setupEventListeners(): void {
        const openButton = document.getElementById('open-directory') as HTMLElement;
        const closeButton = document.getElementById('close-directory') as HTMLElement;
        const overlay = document.getElementById('overlay') as HTMLElement;

        openButton.addEventListener('click', () => DirectoryManager.toggleDirectory(true));
        closeButton.addEventListener('click', () => DirectoryManager.toggleDirectory(false));
        overlay.addEventListener('click', () => DirectoryManager.toggleDirectory(false));
    }

    public static initializeDirectory(): void {
        const directoryList = document.getElementById('directory-list') as HTMLElement;
        DirectoryManager.createDirectory(DirectoryManager.menuItems, directoryList);
    }

    public static main(): void {
        DirectoryManager.setupEventListeners();
        DirectoryManager.initializeDirectory();
    }
}