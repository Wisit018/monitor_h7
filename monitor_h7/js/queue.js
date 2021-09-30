function Queue()
{
	
  var first = null;
  var size=0;


var Node = function(data) {
  this.data = data;
  this.next = null;
}

this.enqueue = function(data) {
	
  var node = new Node(data);

  if (!first){
    first = node;
  } else {
    n = first;
    while (n.next) {
      n = n.next;
    }
    n.next = node;
  }

  size++;
  



  return node;
}

this.getLength=function(){
	return size;
}

this.dequeue = function() {
 
	  temp = first;
	  first = first.next;
	  size--;
	
	//if (size>=0)
	return temp;
	
	//return null;

}
}