window.addEventListener('load', function(){

	Storage.init();
	UI.init();

	//new Note
	(function(){
		var create = document.getElementById('sidebar-create');
		var notetype = document.getElementById('note-type');
		//创建笔记
		notetype.addEventListener('click',function(event){
			document.getElementById('input-title').value ='';
			document.getElementById('text-area').value = '';
			var category = document.getElementById('category');
			category.innerHTML = '未分类';
			Content.currentEditNoteID = null;
			Content.state = 'edit';
			if(event.target.getAttribute('id')=='text-note'){
				UI.enterWriteMode();
				Content.noteType = 'text';
			}else{
				UI.enterDrawMode();
				Content.noteType = 'draw';
				Draw.init();
			}
		});
	})();



	// 在编辑模式下如果标题向上滚动出了屏幕，那就把标题放在over-title
	(function(){
		var  view = document.getElementById('view');
		view.addEventListener('scroll',function(){
			var title = document.getElementById('title');
			var overTitle = document.getElementById('over-title');
			if(view.scrollTop > title.parentNode.clientHeight){
				overTitle.innerHTML = title.innerHTML;
			}else{
				overTitle.innerHTML = '';
			}
		});
	})();

	//view notebook
	(function(){
		var notebook = document.getElementById('note-book');
		notebook.addEventListener('click',function(){
			UI.updateNoteBookList();
			Content.currentNoteBook = null;
		});
	})();

	// new notebook 点击创建新笔记本后的事件
	(function(){
		var newnotebook = document.getElementById('new-notebook');
		newnotebook.addEventListener('click',function(){
			UI.enterAddNoteBookPage();
		});

		//cancel
		var newNotebookCancal = document.getElementById('newnotebook-cancel');
		newNotebookCancal.addEventListener('click',function(){
			UI.quitAddNoteBookPage();
		});


		//创建笔记本时候，点击确定后的事件
		var newNotebookConfirm = document.getElementById('newnotebook-confirm');
		newNotebookConfirm.addEventListener('click',function(){
			if(this.classList.contains('enable')){
				NoteBook.addNoteBook();
				UI.quitAddNoteBookPage();
				UI.updateNoteBookList();
			}
		});

		//创建笔记本页面输入框的事件
		var noteBookNameInputer = document.getElementById('input-notebook-name');
		noteBookNameInputer.addEventListener('input',function(){
			var newNotebookConfirm = document.getElementById('newnotebook-confirm');
			if(this.value){
				newNotebookConfirm.classList.remove('disable');
				newNotebookConfirm.classList.add('enable');
			}else{
				newNotebookConfirm.classList.remove('enable');
				newNotebookConfirm.classList.add('disable');
			}
		});

		// 点击笔记本列表的事件，这个时候应该切换到笔记列表，并且显示本笔记本下的笔记
		//以及点击列表中的删除和编辑按钮时的事件

		var ul = document.getElementById('notebook-list-target-ul');
		ul.addEventListener('click',function(event){

			//view the note under this notebook
			if(event.target.tagName.toLowerCase() == 'p'){
				var noteBookName = event.target.innerHTML;
				Content.currentNoteBook = noteBookName;
				NoteList.viewNoteList(noteBookName);
			}
			//other operator
			else if(event.target.tagName.toLowerCase() == 'i'){
				if(event.target.classList.contains('del')){ //delete nootbook
					Content.readyToDeleteNoteBookName = event.target.parentNode.parentNode.parentNode.parentNode.firstElementChild.innerHTML;
					UI.enterDeleteNoteBookPage();
					var deleteNotebookName = document.getElementById('delete-notebook-name');
					deleteNotebookName.innerHTML = Content.readyToDeleteNoteBookName;
				}else{ 
					Content.readyToRenameNoteBookName = event.target.parentNode.parentNode.parentNode.parentNode.firstElementChild.innerHTML;
					UI.enterRenameNoteBookPage();
				}
				event.stopPropagation();
			}
		});


		var deleteNotebookDelete = document.getElementById('delete-notebook-delete');
		deleteNotebookDelete.addEventListener('click',function(){
			Storage.deleteNoteBook(Content.readyToDeleteNoteBookName);
			UI.quitDeleteNoteBookPage();
			UI.updateNoteBookList();
		});

		var  deleteNotebookCancel = document.getElementById('delete-notebook-cancel');
		deleteNotebookCancel.addEventListener('click',function(){
			UI.quitDeleteNoteBookPage();				
		});

		var renamenotebookCancal = document.getElementById('renamenotebook-cancal');
		renamenotebookCancal.addEventListener('click',function(){
			UI.quitRenameNoteBookPage();
		});

		var renamenotebookConfirm = document.getElementById('renamenotebook-confirm');
		renamenotebookConfirm.addEventListener('click',function(event){
			var newName = document.getElementById('input-rename-notebook-name').value;
			if(newName){
				Storage.renameNoteBook(Content.readyToRenameNoteBookName,newName);
				UI.quitRenameNoteBookPage();
				UI.updateNoteBookList();
			}
		});
	})();

	//note
	(function(){
		// 点击侧边栏的笔记图标显示笔记列表
		var sidebarNote = document.getElementById('sidebar-note');
		sidebarNote.addEventListener('click',function(){
			NoteList.viewNoteList();
		});
	})();


	(function(){
		//save note
		var save = document.getElementById('save');
		save.addEventListener('click',function(){
			var inputer = document.getElementById('input-title');
			var noteTitle = inputer.value;
			if(noteTitle){
				var noteContent = '';
				if(Content.noteType == 'text'){
					noteContent = document.getElementById('text-area').value;
				}else{
					noteContent = document.getElementById('palette').toDataURL("image/png");
				}
				var noteCategory = document.getElementById('category').innerHTML;

				var note = new Note(noteTitle,noteContent,noteCategory,Content.noteType,Content.currentEditNoteID);
				var id = Storage.storeNote(note);
				Content.currentViewNoteID = id;
				NoteList.updateList();
				UI.enterViewMode();
				UI.updateContent(note);
			}else{
				inputer.setAttribute('class','shake animated');
				setTimeout(function(){
					inputer.setAttribute('class','');
				},1000);
			}
		});

		//edit
		var edit = document.getElementById('edit');
		edit.addEventListener('click',function(){
			UI.enterWriteMode();
			UI.editNote(Content.currentViewNoteID);
			Content.currentEditNoteID = Content.currentViewNoteID;
		});


		//full screen
		var fullScreen = document.getElementById('full-screen');
		fullScreen.addEventListener('click',function(){
			UI.enterFullSrceenMode();
		});
		//exit full screen
		var exit = document.getElementById('exit');
		exit.addEventListener('click',function(){
			UI.exitFullScreenMode();
		});

	})();


	//list click event	和 删除笔记事件，点击列表中删除笔记后的动作
	(function(){
		var ul = document.getElementById('note-list-target-ul');
		ul.addEventListener('click',function(event){
			var clickTag = event.target.tagName.toLowerCase();
			//view note content
			if(clickTag == 'p'){
				var selected = document.getElementsByClassName('list-selected');
				if(selected.length>0){
					selected[0].classList.remove('list-selected');
				}
				event.target.classList.add('list-selected');
				UI.enterViewMode();
				UI.updateContent(event.target.dataset.id);
				Content.currentViewNoteID = event.target.dataset.id;
				Content.noteType = event.target.dataset.type;
				//CategorySelectList.updateList();//Content.currentProcNoteName
			}else if(clickTag == 'i'){
				var getDeleteNoteNameElem = function(i){
					var p = i.parentNode.parentNode.parentNode.parentNode.firstElementChild;
					return p;
				};
				var p = getDeleteNoteNameElem(event.target);
				var noteName = p.innerHTML;
				UI.enterDeleteNotePage(noteName);
				Content.readyToDeleteNoteID = p.dataset.id;
			}
		});

		var deleteNoteOp = document.getElementById('delete-note-op');
		deleteNoteOp.addEventListener('click',function(event){
			var opType = event.target.getAttribute('id') ; 
			if(opType == 'delete-note-delete'){
				//delete
				Storage.deleteNote(Content.readyToDeleteNoteID);
				UI.quitDeleteNotePage();
				NoteList.updateList();
				UI.updateContent();
			}else if(opType == 'delete-note-cancel'){
				//cacel
				UI.quitDeleteNotePage();
			}
		});
	})();

	// 选择分类
	(function(){
		var selectCategory = document.getElementById('select-category');
		var dropDown = document.getElementById('drop-down');
		
		selectCategory.addEventListener('click',function(){
			CategorySelectList.updateList();
			dropDown.style.display = 'block';
		});

		var categorySelectList = document.getElementById('category-select-list');
		categorySelectList.addEventListener('click',function(event){
			var categoryName = event.target.innerHTML;
			var selected = document.getElementsByClassName('category-select');
			if(selected.length>0){
				selected[0].classList.remove('category-select');
			}
			event.target.parentNode.classList.add('category-select');
			document.getElementById('category').innerHTML = categoryName;
			event.stopPropagation();
		}) ;

		dropDown.addEventListener('mouseleave',function(){
			dropDown.style.display = 'none';
		});
	})();







	//canvas 绘图
	(function(){
		var palette = document.getElementById('palette');
		palette.addEventListener('mousemove',function(event){
			if(Draw.mouseDown === true ){
				if (Draw.mode == 'draw'){
					Draw.draw({x:event.pageX,y:event.pageY});
					Draw.oldPoint.x = event.pageX;
					Draw.oldPoint.y = event.pageY;
				}else{
					Draw.eraser({x:event.pageX,y:event.pageY});
				}
			}
		},false);

		palette.addEventListener('mousedown',function(event){
			Draw.mouseDown = true;
			Draw.oldPoint.x = event.pageX;
			Draw.oldPoint.y = event.pageY;
		},false);
		palette.addEventListener('mouseup',function(){
			Draw.mouseDown = false;
		},false);

		palette.addEventListener('mouseenter',function(){
			if(Draw.mode == 'eraser'){
				event.currentTarget.classList.add('eraser');
			}else{
				event.currentTarget.classList.remove('eraser');
			}
		});

		palette.addEventListener('dblclick',function(event){
			console.log(event.currentTarget);
			var imgURI = event.currentTarget.toDataURL("image/png");
			console.log(imgURI);
		});

		var selectEraser = document.getElementById('select-eraser');
		selectEraser.addEventListener('click',function(event){
			Draw.mode = 'eraser';
			Draw.eraserSize = event.target.dataset.size;
		},false);

		var selecePanWidth = document.getElementById('selece-panWidth');
		selecePanWidth.addEventListener('click',function(event){
			Draw.mode = 'draw';
			console.log( event.target.dataset.size);
			Draw.cxt.lineWidth = event.target.dataset.size  * 2;
		},false);
	})();
});

var Content = {
	currentNoteBook:null,
	currentNote:null,
	state:'view',
	currentEditNoteID:null,
	currentViewNoteID:null,
	noteType :'text'
};
