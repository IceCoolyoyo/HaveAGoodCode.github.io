var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
import { processMessage } from "../message/Message.js";
import MessageID from "../message/MessageID.js";
class DirectoryManager {
    static createDirectory(items, parentElement) {
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
                _a.createDirectory(item.children, ul);
            }
        });
    }
    static toggleDirectory(show) {
        const overlay = document.getElementById('overlay');
        const directory = document.getElementById('directory');
        if (show) {
            overlay.style.display = 'block';
            directory.style.display = 'flex';
        }
        else {
            overlay.style.display = 'none';
            directory.style.display = 'none';
        }
    }
    static setupEventListeners() {
        const openButton = document.getElementById('open-directory');
        const closeButton = document.getElementById('close-directory');
        const overlay = document.getElementById('overlay');
        openButton.addEventListener('click', () => _a.toggleDirectory(true));
        closeButton.addEventListener('click', () => _a.toggleDirectory(false));
        overlay.addEventListener('click', () => _a.toggleDirectory(false));
    }
    static initializeDirectory() {
        const directoryList = document.getElementById('directory-list');
        _a.createDirectory(_a.menuItems, directoryList);
    }
    static main() {
        _a.setupEventListeners();
        _a.initializeDirectory();
    }
}
_a = DirectoryManager;
DirectoryManager.menuItems = [
    { name: 'Home', action: () => __awaiter(void 0, void 0, void 0, function* () {
            MessageID.id = 5;
            processMessage();
        }) },
    { name: 'About Us', action: () => alert('Clicked About Us') },
    { name: 'Help', action: () => alert('Clicked Help.') },
    {
        name: 'Item',
        children: [
            { name: 'Item1', action: () => alert('Clicked Item1.') },
            { name: 'Item2', action: () => alert('Clicked Item2.') },
        ],
    },
    { name: 'Call Us', action: () => alert('Clicked Call Us.') },
];
export default DirectoryManager;
