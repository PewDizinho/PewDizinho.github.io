// Window Management System
class WindowManager {
    constructor() {
        this.windows = new Map();
        this.zIndexCounter = 1000;
        this.isDragging = false;
        this.isResizing = false;
        this.currentWindow = null;
        this.dragOffset = { x: 0, y: 0 };
        this.resizeData = { direction: '', startX: 0, startY: 0, startWidth: 0, startHeight: 0, startLeft: 0, startTop: 0 };
        this.snapPreview = null;
        
        this.initializeEventListeners();
        this.registerExistingWindows();
    }

    registerExistingWindows() {
        const windowElements = document.querySelectorAll('.window');
        windowElements.forEach((window, index) => {
            // Set initial styles
            if (!window.classList.contains('fullscreen') && window.id !== 'iexplorer-wiki') {
                window.style.width = '500px';
                window.style.height = '400px';
                window.style.top = (100 + index * 30) + 'px';
                window.style.left = (100 + index * 30) + 'px';
            }
            
            // Ensure windows start closed
            window.style.display = 'none';
            window.style.opacity = '0';
            window.style.transform = 'scale(0.8)';
            
            this.windows.set(window.id, {
                element: window,
                isMaximized: false,
                isMinimized: false,
                restorePosition: { 
                    width: window.style.width || '500px', 
                    height: window.style.height || '400px', 
                    top: window.style.top || '100px', 
                    left: window.style.left || '100px' 
                }
            });
        });
    }

    initializeEventListeners() {
        document.addEventListener('mousedown', this.handleMouseDown.bind(this));
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        document.addEventListener('mouseup', this.handleMouseUp.bind(this));
        document.addEventListener('dblclick', this.handleDoubleClick.bind(this));
    }

    handleMouseDown(e) {
        const window = e.target.closest('.window');
        if (!window) return;

        this.focusWindow(window.id);

        // Check if clicking on resizer
        if (e.target.classList.contains('window-resizer')) {
            this.startResize(e, window);
            return;
        }

        // Check if clicking on title bar
        if (e.target.closest('.title-bar') && !e.target.closest('.title-bar-controls')) {
            this.startDrag(e, window);
        }
    }

    handleMouseMove(e) {
        if (this.isDragging && this.currentWindow) {
            this.drag(e);
        } else if (this.isResizing && this.currentWindow) {
            this.resize(e);
        }
        
        this.handleAeroSnap(e);
    }

    handleMouseUp(e) {
        if (this.isDragging) {
            // Apply aero snap if applicable
            this.applyAeroSnap();
            
            this.isDragging = false;
            this.currentWindow = null;
        }
        if (this.isResizing) {
            this.isResizing = false;
            this.currentWindow = null;
        }
    }

    handleDoubleClick(e) {
        if (e.target.closest('.title-bar') && !e.target.closest('.title-bar-controls')) {
            const window = e.target.closest('.window');
            if (window) {
                this.toggleMaximize(window.id);
            }
        }
    }

    startDrag(e, window) {
        if (this.windows.get(window.id).isMaximized) return;
        
        this.isDragging = true;
        this.currentWindow = window;
        
        const rect = window.getBoundingClientRect();
        this.dragOffset.x = e.clientX - rect.left;
        this.dragOffset.y = e.clientY - rect.top;
        
        e.preventDefault();
    }

    drag(e) {
        if (!this.currentWindow) return;
        
        const taskbarHeight = 40;
        const newLeft = e.clientX - this.dragOffset.x;
        const newTop = e.clientY - this.dragOffset.y;
        
        // Constrain to viewport (leaving space for taskbar)
        const maxLeft = window.innerWidth - this.currentWindow.offsetWidth;
        const maxTop = window.innerHeight - this.currentWindow.offsetHeight - taskbarHeight;
        
        this.currentWindow.style.left = Math.max(0, Math.min(newLeft, maxLeft)) + 'px';
        this.currentWindow.style.top = Math.max(0, Math.min(newTop, maxTop)) + 'px';
        
        // Handle aero snap
        this.handleAeroSnap(e);
    }

    startResize(e, window) {
        if (this.windows.get(window.id).isMaximized) return;
        
        this.isResizing = true;
        this.currentWindow = window;
        
        const rect = window.getBoundingClientRect();
        this.resizeData.direction = Array.from(e.target.classList).find(cls => cls !== 'window-resizer');
        this.resizeData.startX = e.clientX;
        this.resizeData.startY = e.clientY;
        this.resizeData.startWidth = rect.width;
        this.resizeData.startHeight = rect.height;
        this.resizeData.startLeft = rect.left;
        this.resizeData.startTop = rect.top;
        
        e.preventDefault();
    }

    resize(e) {
        if (!this.currentWindow) return;
        
        const deltaX = e.clientX - this.resizeData.startX;
        const deltaY = e.clientY - this.resizeData.startY;
        const direction = this.resizeData.direction;
        
        let newWidth = this.resizeData.startWidth;
        let newHeight = this.resizeData.startHeight;
        let newLeft = this.resizeData.startLeft;
        let newTop = this.resizeData.startTop;
        
        // Handle different resize directions
        if (direction.includes('right')) {
            newWidth = Math.max(400, this.resizeData.startWidth + deltaX);
        }
        if (direction.includes('left')) {
            const maxDelta = this.resizeData.startWidth - 400;
            const constrainedDelta = Math.min(deltaX, maxDelta);
            newWidth = this.resizeData.startWidth - constrainedDelta;
            newLeft = this.resizeData.startLeft + constrainedDelta;
        }
        if (direction.includes('bottom')) {
            newHeight = Math.max(300, this.resizeData.startHeight + deltaY);
        }
        if (direction.includes('top')) {
            const maxDelta = this.resizeData.startHeight - 300;
            const constrainedDelta = Math.min(deltaY, maxDelta);
            newHeight = this.resizeData.startHeight - constrainedDelta;
            newTop = this.resizeData.startTop + constrainedDelta;
        }
        
        // Apply constraints
        newWidth = Math.min(newWidth, window.innerWidth - 20);
        newHeight = Math.min(newHeight, window.innerHeight - 20);
        newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - newWidth));
        newTop = Math.max(0, Math.min(newTop, window.innerHeight - newHeight));
        
        this.currentWindow.style.width = newWidth + 'px';
        this.currentWindow.style.height = newHeight + 'px';
        this.currentWindow.style.left = newLeft + 'px';
        this.currentWindow.style.top = newTop + 'px';
    }

    handleAeroSnap(e) {
        if (!this.isDragging || !this.currentWindow) return;
        
        const windowData = this.windows.get(this.currentWindow.id);
        if (!windowData || windowData.isMaximized) return;
        
        const threshold = 10;
        const screenWidth = window.innerWidth;
        const taskbarHeight = 40;
        
        // Top edge - maximize
        if (e.clientY <= threshold) {
            this.currentWindow.style.background = 'rgba(0, 120, 212, 0.1)';
            this.snapPreview = 'maximize';
        }
        // Left edge - snap left half
        else if (e.clientX <= threshold) {
            this.currentWindow.style.background = 'rgba(0, 120, 212, 0.1)';
            this.snapPreview = 'left';
        }
        // Right edge - snap right half
        else if (e.clientX >= screenWidth - threshold) {
            this.currentWindow.style.background = 'rgba(0, 120, 212, 0.1)';
            this.snapPreview = 'right';
        }
        else {
            this.currentWindow.style.background = '';
            this.snapPreview = null;
        }
    }

    applyAeroSnap() {
        if (!this.snapPreview || !this.currentWindow) return;
        
        const windowData = this.windows.get(this.currentWindow.id);
        if (!windowData) return;
        
        const taskbarHeight = 40; // Height of the taskbar
        
        // Save current position before snapping
        if (!windowData.isMaximized) {
            const style = this.currentWindow.style;
            windowData.restorePosition = {
                width: style.width || '500px',
                height: style.height || '400px',
                top: style.top || '100px',
                left: style.left || '100px'
            };
        }
        
        switch (this.snapPreview) {
            case 'maximize':
                this.toggleMaximize(this.currentWindow.id);
                break;
            case 'left':
                this.currentWindow.style.left = '0px';
                this.currentWindow.style.top = '0px';
                this.currentWindow.style.width = (window.innerWidth / 2) + 'px';
                this.currentWindow.style.height = (window.innerHeight - taskbarHeight) + 'px';
                break;
            case 'right':
                this.currentWindow.style.left = (window.innerWidth / 2) + 'px';
                this.currentWindow.style.top = '0px';
                this.currentWindow.style.width = (window.innerWidth / 2) + 'px';
                this.currentWindow.style.height = (window.innerHeight - taskbarHeight) + 'px';
                break;
        }
        
        this.currentWindow.style.background = '';
        this.snapPreview = null;
    }

    focusWindow(windowId) {
        const windowData = this.windows.get(windowId);
        if (!windowData || windowData.isMinimized) return;
        
        // Remove focus from all windows
        this.windows.forEach((data, id) => {
            data.element.classList.remove('focused');
        });
        
        // Focus current window
        windowData.element.classList.add('focused');
        windowData.element.style.zIndex = ++this.zIndexCounter;
        
        // Update taskbar
        this.updateTaskbar(windowId, 'active');
    }

    minimizeWindow(windowId) {
        const windowData = this.windows.get(windowId);
        if (!windowData) return;
        
        windowData.isMinimized = true;
        windowData.element.classList.add('minimized');
        windowData.element.classList.remove('focused');
        
        // Animate minimization
        windowData.element.style.opacity = '0';
        windowData.element.style.transform = 'scale(0.1)';
        windowData.element.style.pointerEvents = 'none';
        
        setTimeout(() => {
            if (windowData.isMinimized) {
                windowData.element.style.display = 'none';
            }
        }, 200);
        
        this.updateTaskbar(windowId, 'minimized');
        this.playSound('mouseclick');
    }

    toggleMaximize(windowId) {
        const windowData = this.windows.get(windowId);
        if (!windowData) return;
        
        if (windowData.isMaximized) {
            // Restore
            windowData.isMaximized = false;
            windowData.element.classList.remove('maximized');
            
            const restore = windowData.restorePosition;
            windowData.element.style.width = restore.width;
            windowData.element.style.height = restore.height;
            windowData.element.style.top = restore.top;
            windowData.element.style.left = restore.left;
        } else {
            // Save current position
            const style = windowData.element.style;
            windowData.restorePosition = {
                width: style.width || '900px',
                height: style.height || '600px',
                top: style.top || '50px',
                left: style.left || '50px'
            };
            
            // Maximize
            windowData.isMaximized = true;
            windowData.element.classList.add('maximized');
        }
        
        this.playSound('mouseclick');
    }

    closeWindow(windowId) {
        const windowData = this.windows.get(windowId);
        if (!windowData) return;
        
        // Properly hide the window
        windowData.element.style.display = 'none';
        windowData.element.style.opacity = '0';
        windowData.element.style.transform = 'scale(0.8)';
        
        // Reset window state
        windowData.isMinimized = false;
        windowData.isMaximized = false;
        windowData.element.classList.remove('minimized', 'maximized', 'focused');
        
        this.updateTaskbar(windowId, 'inactive');
        this.playSound('mouseclick');
    }

    openWindow(windowId) {
        const windowData = this.windows.get(windowId);
        if (!windowData) return;
        
        // Reset window state
        windowData.element.style.display = 'block';
        windowData.element.style.opacity = '1';
        windowData.element.style.transform = 'scale(1)';
        windowData.element.style.pointerEvents = 'auto';
        
        windowData.isMinimized = false;
        windowData.element.classList.remove('minimized');
        
        this.focusWindow(windowId);
        this.playSound('mouseclick');
    }

    toggleWindow(windowId) {
        const windowData = this.windows.get(windowId);
        if (!windowData) return;
        
        const isHidden = windowData.element.style.display === 'none' || 
                        windowData.element.style.display === '';
        
        if (isHidden) {
            this.openWindow(windowId);
        } else if (windowData.isMinimized) {
            // Se estiver minimizada, restaurar
            windowData.isMinimized = false;
            windowData.element.classList.remove('minimized');
            windowData.element.style.display = 'block';
            windowData.element.style.opacity = '1';
            windowData.element.style.transform = 'scale(1)';
            windowData.element.style.pointerEvents = 'auto';
            this.focusWindow(windowId);
        } else if (windowData.element.classList.contains('focused')) {
            // Se estiver focada, minimizar
            this.minimizeWindow(windowId);
        } else {
            // Se estiver aberta mas não focada, focar
            this.focusWindow(windowId);
        }
    }

    updateTaskbar(windowId, state) {
        let taskbarItem;
        if (windowId === 'iexplorer-wiki') {
            taskbarItem = document.getElementById('ieTaskBar');
        } else if (windowId === 'msn' || windowId === 'msnOpen') {
            taskbarItem = document.getElementById('msnTaskBar');
        }
        
        if (!taskbarItem) return;
        
        taskbarItem.classList.remove('active', 'minimized');
        taskbarItem.style.backgroundColor = '';
        taskbarItem.style.borderBottom = '';
        
        if (state === 'active') {
            taskbarItem.classList.add('active');
            taskbarItem.style.backgroundColor = 'rgba(255, 255, 255, .3)';
            taskbarItem.style.borderBottom = '1px solid rgba(255, 255, 255, .3)';
        } else if (state === 'minimized') {
            taskbarItem.classList.add('minimized');
            taskbarItem.style.backgroundColor = 'rgba(255, 255, 255, .1)';
            taskbarItem.style.borderBottom = '1px solid rgba(255, 255, 255, .1)';
        } else if (state === 'inactive') {
            taskbarItem.style.backgroundColor = 'rgba(0, 0, 0, 0)';
            taskbarItem.style.borderBottom = '1px solid rgba(0, 0, 0, 0)';
        }
    }

    playSound(soundName) {
        const audio = new Audio(`./assets/${soundName}.mp3`);
        audio.play().catch(() => {}); // Ignore errors if audio can't play
    }
}

// Initialize window manager
let windowManager;
document.addEventListener('DOMContentLoaded', () => {
    windowManager = new WindowManager();
});

// Window control functions (called by HTML buttons)
function minimizeWindow(windowId) {
    windowManager?.minimizeWindow(windowId);
}

function toggleMaximize(windowId) {
    windowManager?.toggleMaximize(windowId);
}

function closeWindow(windowId) {
    windowManager?.closeWindow(windowId);
}

// Taskbar integration functions
function toggleWindowFromTaskbar(windowId) {
    windowManager?.toggleWindow(windowId);
}

// Keep legacy functions for icon clicks
function openIe() {
    windowManager?.openWindow('iexplorer-wiki');
}

function clickMsn() {
    windowManager?.openWindow('msn');
    shouldKeepGoing = true;
    setTimeout(() => {
        init();
    }, 100);
}

// Legacy code - keeping existing functionality
let shouldKeepGoing = false;
var typing = new Audio('./assets/typing.mp3');
let init = async () => {
    let details = {
        email: "pewdizinho@hotmail.com",
        password: "************"
    };
    // target the specific msn inputs (readonly in HTML)
    let emailInput = document.getElementById('msn-email');
    let passwordInput = document.getElementById('msn-password');
    emailInput.value = "";
    passwordInput.value = "";
    if (!shouldKeepGoing) return;
    await delay(3000);
    if (!shouldKeepGoing) return;
    typing.play();
    for (var letter of details.email.split("")) {
        await delay(100);
        if (!shouldKeepGoing) return;
        emailInput.value += letter;
    }
    for (var letter of details.password.split("")) {
        await delay(100);
        if (!shouldKeepGoing) return;
        passwordInput.value += letter;
    }
    if (!shouldKeepGoing) return;
    typing.pause();
    typing.currentTime = 0;
    await delay(5000);
    if (!shouldKeepGoing) return;
    sendEmail();
};
const delay = ms => new Promise(res => setTimeout(res, ms));
const changeIt = () => {
    document.getElementById("lockScreen").style.display = "none";
    document.getElementById("mainPage").style.display = "";
    var audio = new Audio('./assets/startup.mp3');
    audio.play();
    mouseAnimation();

}
const sendEmail = () => {
    var newAudio = (new Audio('./assets/mouseclick.mp3'));
    newAudio.play();
    setTimeout(() => {
        clickMyMsn()
    }, 1000)
};

const clickMyMsn = () => {
    windowManager?.closeWindow('msn');
    setTimeout(() => {
        windowManager?.openWindow('msnOpen');
        // ensure msnOpen shows the profile info — nothing else required
    }, 100);
};
// Keep legacy functions for icon clicks
function openIe() {
    windowManager?.openWindow('iexplorer-wiki');
}

function clickMsn() {
    windowManager?.openWindow('msn');
    shouldKeepGoing = true;
    setTimeout(() => {
        init();
    }, 100);
}

const clickText = () => {
    windowManager?.openWindow('text-block');
}

const mouseAnimation = () => {
    const mouse = document.getElementById("cursor");
    mouse.style.display = "";

    document.getElementsByTagName("body")[0].style.cursor = 'url(".//assets//cursor-inv.png"), auto';


    setTimeout(() => {
        mouse.style.animation = 'goToEdge 2.5s infinite linear';
        setTimeout(() => {
            document.getElementById('edgeIcon').classList.add('iconHover');

            document.getElementById("cursor-img").setAttribute("src", "./assets/cursors/link.cur");
            mouse.style.animation = 'none';
            mouse.style.left = "45px";
            mouse.style.top = "165px";

            setTimeout(() => {
                document.getElementById('edgeIcon').classList.remove('iconHover');

                openIe();
                mouse.style.display = "none";
                document.getElementsByTagName("body")[0].style.cursor = 'url("./assets//cursors//arrow.cur"), auto';
            }, 2000);

        }, 2500);
    }, 1000);



};

const changeWiki = (title) => {
    const validTitles = ['Sobre', 'Carreira', 'Projetos'];
    if (validTitles.indexOf(title) == -1) return;
    for (let titles of validTitles) {
        document.getElementById(titles).style.display = "none";
    }
    document.getElementById(title).style.display = "";
    var newAudio = (new Audio('./assets/mouseclick.mp3'));
    newAudio.play();
}


let slideIndex = 1;
showSlides(slideIndex);


function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}
