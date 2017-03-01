var Content = {
	currentNoteBook:null,
	currentNote:null,
	state:'view',
	currentEditNoteID:null,
	currentViewNoteID:null,
	noteType :'text'
};


var NoteBook = {};

function Note(title,content,category,type,id){
	this.title = title;	
	this.type = type;
	this.content = content;
	this.category = category || '未分类';
	this.createTime = (new Date()).toString();
	this.id = id;
}

NoteBook.addNoteBook = function(){
	var bookName = document.getElementById('input-notebook-name').value;
	Storage.addNoteBook(bookName);
};

NoteBook.moveNote = function(noteBookName,noteName){
	var noteList = Storage.getNoteList(noteBookName);
	if(noteList){
		var ls = noteList.split('&&&');
		if(ls.indexOf(noteName)==-1){
			noteList = noteName + '&&&' + noteList;
			localStorage.setItem('notebook_'+noteBookName,noteList);
		}
	}else{
		localStorage.setItem('notebook_'+noteBookName,noteName);
	}
};

var NoteList = {};

NoteList.viewNoteList =function(NoteBookName){
	NoteList.updateList(NoteBookName);
	var notebookElem = document.getElementById('notebook-list');
	var noteListElem = document.getElementById('note-list');
	UI.enterViewNoteListMode();
};

NoteList.createAList = function(note){
	var li_ = document.getElementById('note-list-templete').firstElementChild;
	var li = li_.cloneNode(true);
	var p = li.querySelector('p');
	p.innerHTML = note.title;
	p.dataset.id = note.id;
	p.dataset.type = note.type;
	return li;
};

NoteList.updateList = function(noteBookName){
	var	list = Storage.getNoteList(noteBookName);
	var noteCount = document.getElementById('note-count');
	noteCount.innerHTML = ''+list.length;
	var ul = document.getElementById('note-list-target-ul');
	ul.innerHTML = '';
	list.forEach(function(note, index){

		if(noteBookName){
			var id = note;
			note = Storage.getNote(id);
		}
		ul.appendChild(NoteList.createAList(note));
	});
	var noteListTitle = document.getElementById('note-list-title');
	if(noteBookName){
		noteListTitle.innerHTML = noteBookName;
	}else{
		noteListTitle.innerHTML = '笔记';
	}
};


var CategorySelectList = {};

CategorySelectList.updateList = function(){
	var list = Storage.getNoteBookList();
	var ul = document.getElementById('category-select-list');
	var li = document.getElementById('category-list-templete').firstElementChild;
	ul.innerHTML = '';
	list.forEach(function(category, index){
		var li_ = li.cloneNode(true);
		li_.firstElementChild.innerHTML = category;
		var noteList = Storage.getNoteList(category);
		if(noteList.indexOf(Content.currentEditNoteID)!=-1){
			li_.classList.add('category-select');
			document.getElementById('category').innerHTML = category;
		}
		ul.appendChild(li_);
	});
};

