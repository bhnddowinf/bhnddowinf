var Storage = {};

Storage.storeNote = function(note){
	var noteId = '';
	var NoteList = Storage.getNoteList();
	if(note.id){  // 旧笔记
		//修改分类
		noteId = note.id;
		var noteInfo = Storage.getNote(note.id);
		var oldCategory = noteInfo.category;
		if(oldCategory != note.category){
			Storage.removeNoteFromCategory(note.id,oldCategory);
			Storage.addNoteToCategory(note.id,note.category);
		}
		//修改笔记列表中原来的信息，更新标题和分类
		for(var i = 0;i<NoteList.length;i++){
			if( NoteList[i].id == note.id ){
				NoteList[i].category = note.category;
				NoteList[i].title = note.title;
				break;
			}
		}
		localStorage.setItem('note_'+note.id,JSON.stringify(note));
	}else{  //新笔记
		note.id = (new Date()).valueOf();
		noteId = note.id;
		localStorage.setItem('note_'+note.id,JSON.stringify(note));

		NoteList.push({
			title:note.title,
			category:note.category,
			type:note.type,
			id:note.id,
			createTime:note.createTime
		});
		Storage.addNoteToCategory(note.id,note.category);
	}
	Storage.storeNoteList(NoteList);
	return noteId;
};

Storage.storeNoteList = function(list){
	localStorage.setItem('notelist',JSON.stringify(list));
};

Storage.getNoteList = function(category){
	var list = [],
		notes;

	if( !! category ){
		notes = localStorage.getItem('notebook_'+category);
		if(notes){
			list = JSON.parse(notes);
		}
	}else{
		notes = localStorage.getItem('notelist');
		if(notes){
			list = JSON.parse(notes);
		}
	}
	return list;
};

Storage.getNote = function(id){
	var json =  localStorage.getItem('note_'+id);
	var note;
	if(json){
		note = JSON.parse(json);
	}else{
		note = null;
	}
	return  note;
};

Storage.getNoteContent = function(id){
	var note = Storage.getNote(id);
	return note.content;
};

Storage.getNoteCategory = function(id){
	var note = Storage.getNote(id);
	return note.category;
};

Storage.deleteNote = function(id){
	var note = Storage.getNote(id),
		notelist = Storage.getNoteList();

	if(notelist && notelist != []){
		//delete note from notelist
		for(var i=0;i<notelist.length;i++){
			if(notelist[i].id==id){
				break;
			}
		}
		notelist.splice(i,1);
		Storage.storeNoteList(notelist);
		//delete note from it's category list
		var categorylist = Storage.getNoteList(note.category);
		for(i=0;i<categorylist.length;i++){
			if(categorylist[i]==id){
				break;
			}
		}
		categorylist.splice(i,1);
		Storage.storeCategory(note.category,categorylist);
		localStorage.removeItem('note_'+id);
	}
};


Storage.addNoteBook = function(category){
	var notebooks = Storage.getNoteBookList();
	if(notebooks.indexOf(category) == -1){
		notebooks.push(category);
		localStorage.setItem('notebook',JSON.stringify(notebooks));
	}
};

Storage.getNoteBookList = function(){
	var notebookList = localStorage.getItem('notebook');
	if(notebookList){
		return JSON.parse(notebookList);
	}else{
		return [];
	}
};

Storage.addNoteToCategory = function(id,category){
	var list = Storage.getNoteList(category);
	list.push(id);
	localStorage.setItem('notebook_'+category,JSON.stringify(list));
	var categorys =  Storage.getCategoryList();
	if(!categorys){
		categorys = [];
		categorys.push(category);
	}else{
		var index = categorys.indexOf(category);
		if(index == -1){
			categorys.push(category);
		}
	}
	localStorage.setItem('notebook',JSON.stringify(categorys));
};

Storage.removeNoteFromCategory = function(id,category){
	var list = Storage.getNoteList(category);
	if(list){
		for(var i=0;i<list.length;i++){
			if(list[i] == id){
				break;
			}
		}
		if(i!=list.length){
			list.splice(i,1);
		}
		localStorage.setItem('notebook_'+category,JSON.stringify(list));
	}
};

Storage.getCategoryList = function(){
	var list = localStorage.getItem('notebook');
	if(list){
		return JSON.parse(list);
	}else{
		return [];
	}
};

Storage.storeCategoryList = function(list){
	localStorage.setItem('notebook',JSON.stringify(list));
};

Storage.storeCategory = function(category,list){
	localStorage.setItem('notebook_'+category,JSON.stringify(list));
};

Storage.deleteNoteBook = function(category){
	var noteList = Storage.getNoteList(category);
	var categorys = Storage.getCategoryList(category);

	var index = categorys.indexOf(category);

	//delete category from category list
	if(index != -1){
		categorys.splice(index,1);
		Storage.storeCategoryList(categorys);
	}

	//move those note into default note category
	var defaultCategoryList = Storage.getNoteList('notebook_未分类')||[];
	noteList.forEach(function(id, index){
		var note = Storage.getNote(id);
		note.category = '未分类';
		Storage.storeNote(note);
		defaultCategoryList.push(id);
	});
	Storage.storeCategory('未分类',defaultCategoryList);
};


Storage.renameNoteBook = function(oldCategory,newCategory){
	var categorys = Storage.getCategoryList();
	var index = categorys.indexOf(oldCategory);
	if(index != -1){
		categorys.splice(index,1,newCategory);
	}else{
		categorys.push(newCategory);
	}
	Storage.storeCategoryList(categorys);
	var notes = Storage.getNoteList();
	if(notes){
		for(var i=0;i<notes.length;i++){
			if(notes[i].category == oldCategory){
				notes[i].category = newCategory;
			}
		}
	}
	Storage.storeNoteList(notes);

	notes = Storage.getNoteList(oldCategory);
	localStorage.removeItem('notebook_'+oldCategory);
	var newCategoryNotes  = localStorage.getItem(newCategory);
	notes.forEach(function(id){
		var note = Storage.getNote(id);
		note.category = newCategory;
		Storage.storeNote(note);
	});
	if(newCategoryNotes){
		var list = JSON.parse(newCategoryNotes);
		notes.forEach(function(item){
			list.push(item);
		});
		Storage.storeCategory(newCategory,list);
	}else{
		Storage.storeCategory(newCategory,notes);
	}
};


Storage.init = function(){
	if(Storage.getNoteList().length === 0){  // 没有笔记
		var content = "```javascript\n"+UI.editNote.toString()+"\n```";
		var title = "代码高亮";
		var category = "js";
		var note = new Note(title,content,category,'text');
		Storage.storeNote(note);

		title = "多谢查看demo";
		content = "希望大家多多指教";
		category = '未分类';
		note = new Note(title,content,category,'text');
		Storage.storeNote(note);
	}
};