var bookmarks=document.getElementById('myForm').addEventListener('submit',savebookmarks);

function savebookmarks(e){
    e.preventDefault();
    var sitename=document.getElementById('siteName').value;
    var siteurl=document.getElementById('siteUrl').value;

    if(!sitename || !siteurl){
        alert('please fullfill form')
        return false;
    }
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
    var regex = new RegExp(expression);
    if(!siteurl.match(regex)){
        alert('please enter valid url')
        return false;
    }



    var bookmark={
        name:sitename,
        url:siteurl
    }
    
    if(localStorage.getItem('bookmarks')===null){
        var bookmarks=[];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }
    else{
    var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
}
fetchBookmarks();
document.getElementById('myForm').reset();
}
function deletebookmarks(url){
    var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
    for(var i=0;i<bookmarks.length;i++){
        if(bookmarks[i].url==url){
            bookmarks.splice(i,1);
        }
    }
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    fetchBookmarks()

}
function fetchBookmarks(){
    var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
    var bookmarksresult=document.getElementById('bookmarksResults');

    bookmarksresult.innerHTML='';
    for(var i=0; i<bookmarks.length;i++){
        var name=bookmarks[i].name;
        var url=bookmarks[i].url;

        bookmarksresult.innerHTML += '<div class="well">'+
                                    '<h3>'+name+
                                    '<a class="btn btn-success m-1" target="_blank" href="'+url+'">visite</a>'+
                                    '<a onclick="deletebookmarks(\''+url+'\')" class="btn btn-danger"  href="#">delete</a>'+
                                    '</h3>'+
                                    '</div>'
    }
}

