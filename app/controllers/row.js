Alloy.Globals.counter || (Alloy.Globals.counter = 0);
var counter = ++Alloy.Globals.counter;



 
$.row.title = 'row ' + counter;


$.row.customObject = {
    some: {
        complex: {
            object: 'value ' + counter
        }   
    }   
};


