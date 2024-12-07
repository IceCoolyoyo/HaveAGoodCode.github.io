interface MenuItem {
    name: string;
    action?: () => void;
    children?: MenuItem[];
}

export default class DirectoryManager {
    private static menuItems: MenuItem[] = [
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