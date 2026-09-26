// 1. تحديد عناصر الـ DOM
const terminal = document.getElementById('terminal');
const input = document.getElementById('command');

// 2. إدارة حالة التطبيق (State Management)
let commandHistory = [];
let historyIndex = -1;

const commands = {
    help: () => "Available commands:<br>help<br>clear<br>about<br>date<br>whoami",
    whoami: () => "Mohamed El Haddad<br>Frontend Developer<br>Al Sharqia, Egypt",
    about: () => "Fake Terminal v1.0<br>Built with HTML, CSS, and JavaScript.",
    date: () => new Date().toString(),
};

// 4. دوال الطباعة على الشاشة (Render Functions)
function printPrompt(cmdText) {
    const line = document.createElement('div');
    line.innerHTML = `<span class="prompt1">user@example.com<span class="prompt2">:</span><span class="prompt3">~$</span></span> <span style="color: #cecece;">${cmdText}</span>`;
    terminal.appendChild(line);
}

function printOutput(htmlContent) {
    if (!htmlContent) return;
    const output = document.createElement('div');
    output.style.color = "#00ff00";
    output.style.marginBottom = "10px";
    output.style.whiteSpace = "pre-wrap"; 
    output.innerHTML = htmlContent;
    terminal.appendChild(output);
}

// 5. الاستماع لأحداث لوحة المفاتيح
input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const fullCommand = input.value.trim();
        
        if (fullCommand !== "") {
            // حفظ الأمر في التاريخ (History)
            commandHistory.push(fullCommand);
            historyIndex = commandHistory.length;

            printPrompt(fullCommand);

            // فصل اسم الأمر عن المتغيرات (مثال: echo hello world)
            const parts = fullCommand.split(" ");
            const cmd = parts[0].toLowerCase();
            const args = parts.slice(1);

            // تنفيذ الأمر
            if (cmd === 'clear') {
                terminal.innerHTML = '';
            } else if (commands[cmd]) {
                printOutput(commands[cmd](args));
            } else {
                printOutput(`bash: ${cmd}: command not found`);
            }
        } else {
            // لو ضغط Enter بدون كتابة حاجة، يطبع سطر جديد فاضي
            printPrompt("");
        }

        // تفريغ الشاشة والنزول لأسفل
        input.value = '';
        window.scrollTo(0, document.body.scrollHeight);
    } 
    
    // التعامل مع سهم لأعلى (ArrowUp)
    else if (event.key === 'ArrowUp') {
        event.preventDefault(); // منع المؤشر من التحرك لأول السطر
        if (historyIndex > 0) {
            historyIndex--;
            input.value = commandHistory[historyIndex];
        }
    } 
    
    // التعامل مع سهم لأسفل 
    else if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            input.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            input.value = '';
        }
    }
});

// الحفاظ على التركيز (Focus) دائمًا على الإدخال
document.addEventListener('click', () => input.focus());