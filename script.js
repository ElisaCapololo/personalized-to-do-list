const addBox = document.querySelector('.add-box'),
    popupBox = document.querySelector('.popup-box'),
    popupTitle = document.querySelector('header p'),
    closeIcon = document.querySelector('header i'),
    titleNote = document.querySelector('input'),
    descNote = document.querySelector('textarea'),
    addBtn = document.querySelector('button');

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const notes = JSON.parse(localStorage.getItem('notes') || '[]');
let isUpdate = false, updateId;

function showNotes() {
    document.querySelectorAll('.note').forEach(note => note.remove());
    notes.forEach((note, index) => {
        let liNote = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${note.description}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onClick="updateNote(${index}, '${note.title}', '${note.description}')" class="uil uil-edit"></i>
                                <i onClick="deleteNote(${index})" class="uil uil-trash"></i>
                            </div>
                        </div>
                      </li>`;
        addBox.insertAdjacentHTML('afterend', liNote);
    });
}

showNotes();

function deleteNote(noteId){
    let confirmDelete = confirm("Are you sure you want to delete this note?");
    if(!confirmDelete) return;
    notes.splice(noteId, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();
}

function updateNote(noteId, title, desc){
    isUpdate = true;
    updateId = noteId;
    addBox.click();
    titleNote.value = title;
    descNote.value = desc;
    addBtn.innerText = 'Edit Note';
    popupTitle.innerText = 'Editing a Note';

}

addBox.addEventListener('click', ()=>{
    titleNote.focus();
    popupBox.classList.add('show')
});

closeIcon.addEventListener('click', ()=>{
    isUpdate = false;
    titleNote.value = '';
    descNote.value = '';
    addBtn.innerHTML = 'Add Note';
    popupTitle.innerText = 'Add a new Note';
    popupBox.classList.remove('show');
});

addBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    let noteTitle = titleNote.value,
    noteDesc = descNote.value;
    if(noteTitle || noteDesc){
        let dateNote = new Date(),
        month = months[dateNote.getMonth()],
        day = dateNote.getDate(),
        year = dateNote.getFullYear();

        let noteInfo = {
            title: noteTitle,
            description: noteDesc,
            date: `${month} ${day} ${year}`
        }

        if(!isUpdate){
            notes.push(noteInfo);
        } else{
            isUpdate = false;
            notes[updateId] = noteInfo;
        }

        localStorage.setItem('notes', JSON.stringify(notes));
        closeIcon.click();
        showNotes();
    }
});

