document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.querySelector('ul.nav-links');
    const copyButton = document.getElementById('copy-button');
    const navItems = document.querySelectorAll('ul.nav-links li a');

    function setActiveLink() {
        let activeSet = false;

        navItems.forEach(item => {
            item.classList.remove('active');

            if (item.getAttribute('href') === window.location.pathname) {
                item.classList.add('active');
                activeSet = true;
            }
        });

        if (!activeSet) {
            navItems[0].classList.add('active');
        }
    }

    function handleLinkClick(event) {
        const link = event.target.closest('a');

        if (link && link !== copyButton) {
            navItems.forEach(item => {
                if (item !== copyButton) {
                    item.classList.remove('active', 'clicked');
                }
            });

            link.classList.add('active', 'clicked');

            setTimeout(() => {
                link.classList.remove('clicked');
            }, 400);
        }
    }

    function handleMouseMove(event) {
        const link = event.currentTarget;
        const rect = link.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        link.style.setProperty('--x', `${x}%`);
        link.style.setProperty('--y', `${y}%`);
    }

    function toggleMenu() {
        navLinks.classList.toggle('show-menu');
        const isMenuVisible = navLinks.classList.contains('show-menu');

        const iconImage = menuIcon.querySelector('img');
        iconImage.src = isMenuVisible ? 'images/close.png' : 'images/menu.png';
    }

    menuIcon.addEventListener('click', toggleMenu);

    navLinks.addEventListener('click', handleLinkClick);

    navItems.forEach(item => {
        item.addEventListener('mousemove', handleMouseMove);
    });

    if (copyButton) {
        copyButton.addEventListener('click', function(e) {
            e.stopPropagation();
            copyToClipboard();
        });
    }

    setActiveLink();
});

function copyToClipboard() {
    const text = "LifestealValley.aternos.me";
    const copyButton = document.getElementById('copy-button');
    
    const heartIcon = copyButton.querySelector('img[src="images/heart.png"]');
    navigator.clipboard.writeText(text).then(function() {
        copyButton.innerHTML = '';
        const checkIcon = document.createElement('img');
        checkIcon.src = 'images/check.png';
        checkIcon.alt = 'Check Icon';
        checkIcon.style.height = '16px';
        checkIcon.style.width = '16px';
        copyButton.appendChild(checkIcon);
        copyButton.appendChild(document.createTextNode(' Copied!'));
        copyButton.classList.add('copied');
        setTimeout(() => {
            copyButton.innerHTML = '';
            if (heartIcon) {
                copyButton.appendChild(heartIcon);
            }
            copyButton.appendChild(document.createTextNode('LifestealValley.aternos.me'));
            copyButton.classList.remove('copied');
        }, 3000);
    });
}
