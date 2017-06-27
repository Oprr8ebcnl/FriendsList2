//References to HTML items in our DOM (Document Object Model)
var friends=$("#friends");
var nameIn=$("#name");
var ageIn=$("#age");

//Mustache functionality
var friendTemplate="" + 
	"<li>" +
	"<p><strong>Name:</strong> {{name}}</p>" + 
	"<p><strong>Age:</strong> {{age}}</p>" +
	"<button id='{{id}}' class='remove'>X</button>" +
	"</li>";
	//Take data from DOM and fills it into the string
	//Add the friend to the DOM
	function addFriend(friend){
		//Appends the friend to the end of the list using the template above
		friends.append(Mustache.render(friendTemplate, friend));
	}

$(document).ready(function(){
	//Populate page with friends laready in API (Application Programming Interface)
	$.ajax({
		type:"GET",
		url:"http://rest.learncode.academy/api/learncode/friends",
		success: function(friends){
			//$.each is really just a built in jquery iterator
			$.each(friends,function(i,friend){
				addFriend(friend);
			});
		},
		error:function(){
			alert("Error loading friends");
		}
	});
	//Add friend functionality
	$("#add-friend").on("click", function(){
		//Base friend object
		//Reference DOM object to fill out our friend object
		var friend={
			name:nameIn.val(),
			age:ageIn.val()
		}
		//Post the new friend to the API
		$.ajax({
			type:"POST",
			url:"http://rest.learncode.academy/api/learncode/friends",
			data:friend,
			success: function(newFriend){
				addFriend(newFriend);
			},
			error:function(){
				alert("Error adding friends");
			}
		});
	});
	//Deleting a friend functionality
	//Going to use delegate <-- super smart tool for finding events that happen
	friends.delegate(".remove","click", function(){
		var $li=$(this).closest('li');
		//AJAX delete
		$.ajax({
			type:'DELETE',
			url:'http://rest.learncode.academy/api/learncode/friends/'+$(this).attr('id'),
			success: function(){
				$li.fadeOut(300, function(){
					$(this).remove();
				});
			}
		});
	});
});