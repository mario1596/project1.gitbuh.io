


$(document).ready(function () {

$("#bookform").on("submit", function (e) {
  
        var x = $("#booksearch").val();
    
        var Arrayofbooks;
    
        e.preventDefault();
    
        console.log(x);
    
    bringbooks(x);
    
    console.log(bringbooks);
    
    
});    
    
  function bringbooks(x){
      
      console.log(x);
      
      $.ajax({
          
          method: "GET",
          url: "https://www.googleapis.com/books/v1/volumes?q=search" + x,
          datatype: "json"
          
          
          
      }).done(function(data){
          
          console.log(data);
          
         /*if(data.Response == "False"){
              $('.alert').css('display', 'block');
          } else if(data.Response == "True"){
              $('.alert').css('display', 'none');
          } */
          
          var placeholder = '';
          
          var Arrayofbooks = data.items;
          
          $.each(Arrayofbooks , function(index , book){
              
        var bookid = book.id;
        var bookinfo = book.volumeInfo;
        var bookselflink = book.selfLink;      
              
              console.log("this is the id " + bookid);
              console.log(bookinfo);
              console.log(bookselflink);
          /* data-toggle="modal" data-target=".m1" */    
        placeholder+=`<a onclick="bookdetails('${bookid}')"> <div class="custom-container" data-toggle="modal" data-target=".m1" >
<img class="cover" src="${bookinfo.imageLinks.thumbnail}">
<div class="overlay">
 <div class="text"> Click here to see all the details </div>
</div>
    </div> </a>`;
              
   $("#list").html(placeholder);  
              
          });
          
      });
  };  
    
    
});


function bookdetails(bookid){
  
    console.log(bookid);
    
    $.ajax({
       
      method: "GET",

      url: "https://www.googleapis.com/books/v1/volumes/" + bookid,
      dataType: "json"
        
    }).done(function(result){ //d this is the outcome of the whole request ajax 
             
        var x = JSON.stringify(result);
      var E = JSON.parse(x);
             console.log( "this is" + x);
        
        var details = '';
        
   details =  `
    <div class="row d inline-block">
<button type="button" class="btn btn-danger btn-lg btn-block mb-3" data-dismiss="modal">Close</button>
<div class="col col-lg">
    <img class="poster2 mb-5" src ="${result.volumeInfo.imageLinks.large}">
    </div>
   <div class="col col-lg">
   <h3 class="text-info"> ${result.volumeInfo.title} </h3>
   <ul>
<li class="text-info">Subtitle:  ${result.volumeInfo.subtitle} </li>
  <li class="text-info">Author:  ${result.volumeInfo.authors} </li>
   <li class="text-info"> Publisher:  ${result.volumeInfo.publisher} </li>
   <li class="text-info">Published Date:  ${result.volumeInfo.publishedDate} </li>
   <li class="text-info">Description: ${result.volumeInfo.description} </li>
   <li class="text-info">On sale: ${result.saleInfo.saleability} </li>
   <li class="text-info">Country: ${result.saleInfo.country} </li>
   <li class="text-info">Categories:  ${result.volumeInfo.categories} </li>
   
   
   </ul>
    </div>

    </div>

`; 
       
        
        $("#d1").html(details);  
                
  console.log(details);
    
});
    
}