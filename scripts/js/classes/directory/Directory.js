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
                DirectoryManager.createDirectory(item.children, ul);
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
        openButton.addEventListener('click', () => DirectoryManager.toggleDirectory(true));
        closeButton.addEventListener('click', () => DirectoryManager.toggleDirectory(false));
        overlay.addEventListener('click', () => DirectoryManager.toggleDirectory(false));
    }
    static initializeDirectory() {
        const directoryList = document.getElementById('directory-list');
        DirectoryManager.createDirectory(DirectoryManager.menuItems, directoryList);
    }
    static main() {
        DirectoryManager.setupEventListeners();
        DirectoryManager.initializeDirectory();
    }
}
DirectoryManager.menuItems = [
    { name: 'Home', action: () => alert('Clicked Home.') },
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
