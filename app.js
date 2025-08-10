// Görevler dizisi
let tasks = [];

// HTML elementleri
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const exitBtn = document.getElementById('exit-btn');

// Görevleri listele
function renderTasks() {
    taskList.innerHTML = '';
    if (tasks.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'Hiç görev yok.';
        li.style.color = '#888';
        taskList.appendChild(li);
        return;
    }
    tasks.forEach((task, idx) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        // Tik butonu
        const checkBtn = document.createElement('button');
        checkBtn.className = 'check-btn';
        checkBtn.innerHTML = task.completed ? '✔️' : '☐';
        checkBtn.title = task.completed ? 'Tamamlandı' : 'Tamamla';
        checkBtn.style.color = task.completed ? '#2ecc40' : '#bbb';
        checkBtn.onclick = () => toggleComplete(idx);
        li.appendChild(checkBtn);

        // İçerik kutusu (metin + saatler)
        const content = document.createElement('div');
        content.className = 'task-content';
        const textSpan = document.createElement('span');
        textSpan.className = 'task-text';
        textSpan.textContent = task.text;
        if (task.completed) textSpan.style.textDecoration = 'line-through';
        content.appendChild(textSpan);

        const meta = document.createElement('div');
        meta.className = 'task-meta';
        const timeSpan = document.createElement('span');
        timeSpan.className = 'task-time';
        timeSpan.textContent = `Eklendi: ${task.time}`;
        meta.appendChild(timeSpan);
        if (task.updatedTime) {
            const updatedSpan = document.createElement('span');
            updatedSpan.className = 'task-time';
            updatedSpan.textContent = `Düzenlendi: ${task.updatedTime}`;
            meta.appendChild(updatedSpan);
        }
        content.appendChild(meta);
        li.appendChild(content);

        // Aksiyonlar
        const actions = document.createElement('span');
        actions.className = 'task-actions';
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Düzenle';
        editBtn.onclick = () => editTask(idx);
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Sil';
        deleteBtn.onclick = () => deleteTask(idx);
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);
        li.appendChild(actions);

        taskList.appendChild(li);
    });
}

// Görev tamamlandı toggle
function toggleComplete(idx) {
    tasks[idx].completed = !tasks[idx].completed;
    renderTasks();
}

// Görev ekle
function addTask(e) {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (!text) return;
    const now = new Date();
    const time = now.toLocaleString('tr-TR', { hour12: false });
    tasks.push({ text, time, completed: false, updatedTime: null });
    taskInput.value = '';
    renderTasks();
}

taskForm.addEventListener('submit', addTask);

// Görev düzenle
function editTask(idx) {
    const newText = prompt('Yeni görev metni:', tasks[idx].text);
    if (newText !== null && newText.trim() !== '') {
        tasks[idx].text = newText.trim();
        // Düzenleme yapıldığında tik kaldırılsın ve saat güncellensin
        tasks[idx].completed = false;
        const now = new Date();
        tasks[idx].updatedTime = now.toLocaleString('tr-TR', { hour12: false });
        renderTasks();
    }
}

// Görev sil
function deleteTask(idx) {
    if (confirm('Görev silinsin mi?')) {
        tasks.splice(idx, 1);
        renderTasks();
    }
}

// Çıkış (tüm görevleri sil ve sayfayı sıfırla)
exitBtn.addEventListener('click', () => {
    if (confirm('Tüm görevler silinsin ve uygulama sıfırlansın mı?')) {
        tasks = [];
        renderTasks();
    }
});

// Sayfa yüklendiğinde görevleri göster
renderTasks();