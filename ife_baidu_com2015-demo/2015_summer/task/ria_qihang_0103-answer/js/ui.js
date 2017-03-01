var UI = {};

UI.init = function(){
	NoteList.updateList();
	var	list = Storage.getNoteList();
	if(list.length > 0){
		Content.currentViewNoteID = list[0].id;
	}else{
		Content.currentViewNoteID = null;
	}
	UI.updateContent();
	CategorySelectList.updateList();
	Storage.addNoteBook('未分类');
};

UI.enterWriteMode = function(){
	document.body.classList.remove('view-mode');
	document.body.classList.remove('draw-mode');
	document.body.classList.add('write-mode');
};

UI.enterDrawMode = function(){
	document.body.classList.remove('view-mode');
	document.body.classList.add('draw-mode');
	document.body.classList.remove('write-mode');
	Draw.init();	
};

UI.enterViewMode = function(){
	document.body.classList.add('view-mode');
	document.body.classList.remove('draw-mode');
	document.body.classList.remove('write-mode');
	if(Content.viewNoteType == 'draw'){
		document.body.classList.add('view-draw-mode');
	}else{
		document.body.classList.remove('view-draw-mode');
	}
};

UI.enterAddNoteBookPage = function(){
	document.body.classList.add('add-note-book-page');
};

UI.quitAddNoteBookPage = function(){
	var noteBookNameInputer = document.getElementById('input-notebook-name');
	noteBookNameInputer.value = "";
	document.body.classList.remove('add-note-book-page');	
};

UI.enterDeleteNotePage = function(title){
	document.body.classList.add('delete-note-page');		
	var deleteNoteName = document.getElementById('delete-note-name');
	deleteNoteName.innerHTML = title;
};
UI.quitDeleteNotePage = function(){
	document.body.classList.remove('delete-note-page');
};

UI.enterDeleteNoteBookPage = function(){
	document.body.classList.add('delete-notebook-page');
};

UI.quitDeleteNoteBookPage = function(){
	document.body.classList.remove('delete-notebook-page');
};

UI.enterRenameNoteBookPage = function(){
	document.body.classList.add('rename-notebook-page');
};

UI.quitRenameNoteBookPage = function(){
	document.body.classList.remove('rename-notebook-page');
};
UI.enterFullSrceenMode = function(){
	document.body.classList.add('full-screen-mode');
};
UI.exitFullScreenMode = function(){
	document.body.classList.remove('full-screen-mode');
};

UI.enterViewNoteListMode = function(){
	document.body.classList.add('view-noteList');
	document.body.classList.remove('view-notebookList');
};


UI.enterViewNoteBookListMode = function(){
	document.body.classList.remove('view-noteList');
	document.body.classList.add('view-notebookList');
};

UI.editNote = function(id){
	var note = Storage.getNote(id);
	if(note){
		document.getElementById('input-title').value = note.title;
		if(note.type == 'text'){
			UI.enterWriteMode();
			document.getElementById('text-area').value = note.content;
		}else{
			UI.enterDrawMode();
			var img = document.createElement('img');
			img.src = note.content;
			Draw.drawImage(img);
		}
	}
};




/**/

UI.updateContent =function(noteOrID){
	var note = {};
	if(!noteOrID){
		//如果没有参数给出那么就显示第一篇笔记
		var noteList = Storage.getNoteList();
		if(noteList.length === 0){
			note.type = 'none';
		}else{
			note = Storage.getNote(noteList[0].id);
		}
	}else{
		if(typeof noteOrID == 'object'){
			note = noteOrID;
		}else{
			var id = noteOrID;
			note = Storage.getNote(id);
		}
	}
	var ct = document.getElementById('content');
	var ti = document.getElementById('title');
	if(note.type == 'text'){ //text
		ti.innerHTML = note.title;
		ct.innerHTML = marked(note.content);
		if(document.querySelector('pre code')){
			WY.highLightCode();
		}
		document.body.classList.remove('view-draw-mode');
	}else if(note.type == 'draw'){ //draw
		ti.innerHTML = note.title;
		var img = document.createElement('img');
		img.src=note.content;
		ct.innerHTML = '';
		ct.appendChild(img);
		document.body.classList.add('view-draw-mode');
	}else{
		ti.innerHTML = '';
		ct.innerHTML = '';
	}
};

UI.updateNoteBookList = function(){
	var notebooklist = Storage.getNoteBookList();
	var listTemplete = document.querySelector('#notebook-list-templete>li');
	var ul = document.getElementById('notebook-list-target-ul');
	ul.innerHTML = '';
	notebooklist.forEach(function(notebook, index){
		var li = listTemplete.cloneNode(true);
		var p = li.querySelector('p');
		p.innerHTML = notebook;

		//can't delete default notebook
		if(notebook == '未分类'){
			var div = li.querySelector('div');
			div.style.display = 'none';
		}
		ul.appendChild(li);		
	});
	UI.enterViewNoteBookListMode();
};