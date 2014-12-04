//Array to store the data from the todo list 
       var dataArray = [];        
       //We execute the function to show the data for the first view 
       getTodoList();          
       function getTodoList () { 
       //function to use HTTP to connect to a web server and transfer the data. 
              var sendit = Ti.Network.createHTTPClient({ 
                     onerror: function(e){ 
                           Ti.API.debug(e.error); 
                           alert('There was an error during the connection'); 
                     }, 
                  timeout:1000, 
              });                      
              //Here you have to change it for your local ip 
              sendit.open('GET', 'http://192.168.0.120/read_todo_list.php');  
              sendit.send(); 
              //Function to be called upon a successful response 
              sendit.onload = function(){ 
                     var json = JSON.parse(this.responseText); 
                     var json = json.todo; 
                     //if the database is empty show an alert 
                     if(json.length == 0){ 
                            $.tableView.headerTitle = "The database row is empty"; 
                     }                      
                     //Emptying the data to refresh the view 
                     dataArray = [];                      
                     //Insert the JSON data to the table view 
                     for( var i=0; i<json.length; i++){ 
                           var row = Ti.UI.createTableViewRow({ 
                                  title: json[i].todo, 
                                  hasChild : true, 
                           });        
                         dataArray.push(row);                 
                     };                      
                     $.tableView.setData(dataArray);                            
               }; 
       };   
       function insertData(){ 
              //if there is something in the textbox 
              if($.inserTxtF.value != "" && $.inserTxtF.value != null){ 
                     var request = Ti.Network.createHTTPClient({ 
                  onload:alert("Your chore has been submitted"), 
                  onerror: function(e){ 
                      Ti.API.debug(e.error); 
                      alert('There was an error during the conexion'); 
                  }, 
                  timeout:1000, 
                     });    
//Request the data from the web service, Here you have to change it for your local ip 
                     request.open("POST","http://localhost:3000/api/models"); 
                     var params = ({"id": $.inserTxtF.value});
                     console.log ('lo que tiene params ', params);
                  request.send(params); 
              } 
              else{ 
                     alert("Please write something in the textbox"); 
              }               
              $.inserTxtF.value = "";        
       };   
       $.mainTabGroup.open();