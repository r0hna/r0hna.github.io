// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

themeToggle.addEventListener('click', () => {
    // Simple visual feedback for now
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotate(0deg)';
    }, 300);
});

// Terminal Input & Execute
const targetInput = document.getElementById('targetInput');
const executeBtn = document.getElementById('executeBtn');

executeBtn.addEventListener('click', () => {
    const target = targetInput.value.trim();
    if (target) {
        // Glitch effect
        executeBtn.style.animation = 'glitchBtn 0.3s';
        setTimeout(() => {
            executeBtn.style.animation = '';
        }, 300);
        
        console.log('Target locked:', target);
        // Store target for tool execution
        localStorage.setItem('currentTarget', target);
        
        // Visual feedback
        showNotification('Target locked: ' + target);
    } else {
        showNotification('⚠️ Enter a target domain', 'error');
    }
});

targetInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        executeBtn.click();
    }
});

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'error' ? '#ff0040' : 'linear-gradient(135deg, #ff00ff, #00ffff)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-family: 'Share Tech Mono', monospace;
        font-weight: bold;
        box-shadow: 0 0 30px rgba(255, 0, 255, 0.5);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Category Filtering
const categoryTabs = document.querySelectorAll('.tab-btn');
const toolCards = document.querySelectorAll('.tool-card');

categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const category = tab.dataset.category;
        
        // Update active tab
        categoryTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Filter tools
        toolCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.3s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Tool Card Click Handler
const toolUrlMap = {
    'whois': 'https://whois.domaintools.com/{target}',
    'reverse-ip': 'https://viewdns.info/reverseip/?host={target}',
    'port-scan': 'https://www.yougetsignal.com/tools/open-ports/',
    'traceroute': 'https://www.traceroute-online.com/{target}',
    'dns-report': 'https://dnschecker.org/#A/{target}',
    'subdomains': 'https://dnsdumpster.com/',
    'dns-history': 'https://securitytrails.com/domain/{target}/history/a',
    'ssl-cert': 'https://www.ssllabs.com/ssltest/analyze.html?d={target}',
    'urlscan': 'https://urlscan.io/search/#{target}',
    'shodan': 'https://www.shodan.io/search?query={target}',
    'censys': 'https://search.censys.io/search?resource=hosts&q={target}',
    'hunter': 'https://hunter.io/search/{target}',
    'wayback': 'https://web.archive.org/web/*/{target}',
    'archive-today': 'https://archive.ph/{target}',
    'builtwith': 'https://builtwith.com/{target}',
    'wappalyzer': 'https://www.wappalyzer.com/lookup/{target}',
    'securitytrails': 'https://securitytrails.com/domain/{target}/dns',
    'spyse': 'https://spyse.com/target/domain/{target}',
    'virustotal': 'https://www.virustotal.com/gui/domain/{target}',
    'threatcrowd': 'https://www.threatcrowd.org/domain.php?domain={target}',
    'crtsh': 'https://crt.sh/?q={target}',
    'haveibeenpwned': 'https://haveibeenpwned.com/DomainSearch',
    'dehashed': 'https://dehashed.com/search?query={target}',
    'asn-lookup': 'https://ipinfo.io/AS{target}'
};

toolCards.forEach(card => {
    card.addEventListener('click', () => {
        const tool = card.dataset.tool;
        const target = localStorage.getItem('currentTarget') || targetInput.value.trim();
        
        if (!target) {
            showNotification('⚠️ Set a target first!', 'error');
            targetInput.focus();
            return;
        }
        
        const url = toolUrlMap[tool];
        if (url) {
            const finalUrl = url.replace('{target}', target);
            window.open(finalUrl, '_blank');
            showNotification(`🎯 Launching ${card.querySelector('.tool-name').textContent}`);
        } else {
            showNotification('⚠️ Tool not configured', 'error');
        }
    });
    
    // Keyboard accessibility
    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            card.click();
        }
    });
    
    card.setAttribute('tabindex', '0');
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes glitchBtn {
        0%, 100% { transform: translate(0); }
        25% { transform: translate(-2px, 2px); }
        50% { transform: translate(2px, -2px); }
        75% { transform: translate(-2px, -2px); }
    }
`;
document.head.appendChild(style);

// Scan line animation randomization
const scanLine = document.querySelector('.scan-line');
setInterval(() => {
    scanLine.style.animationDuration = (3 + Math.random() * 2) + 's';
}, 5000);

// Matrix rain effect (optional enhancement)
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        opacity: 0.1;
        pointer-events: none;
    `;
    document.querySelector('.cyber-bg').appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = '01アイウエオカキクケコサシスセソタチツテト';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function draw() {
        ctx.fillStyle = 'rgba(10, 0, 21, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#ff00ff';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 50);
}

// Initialize matrix rain
createMatrixRain();

// Window resize handler
window.addEventListener('resize', () => {
    const canvas = document.querySelector('.cyber-bg canvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});

// Glitch effect on tool count
const toolsCount = document.getElementById('toolsCount');
if (toolsCount) {
    setInterval(() => {
        const original = toolsCount.textContent;
        toolsCount.textContent = Math.floor(Math.random() * 99) + '+';
        setTimeout(() => {
            toolsCount.textContent = original;
        }, 50);
    }, 5000);
}

// Console Easter Egg
console.log('%c⚡ LOPSEQ RECON TERMINAL v3.0 ⚡', 'color: #ff00ff; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #ff00ff;');
console.log('%c💀 System Status: ONLINE', 'color: #00ffff; font-size: 14px;');
console.log('%c🎯 All systems operational', 'color: #00ffff; font-size: 14px;');
console.log('%c⚠️  For authorized security testing only', 'color: #ff0040; font-size: 12px;');

// Prevent context menu on tool cards for hacker feel
toolCards.forEach(card => {
    card.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        showNotification('🚫 Right-click disabled', 'error');
    });
});
