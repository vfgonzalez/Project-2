$(document).ready(function() {
  // blogContainer holds all of our posts
  var blogContainer = $(".blog-container");
  var postCategorySelect = $("#category");
  // Click events for the edit and delete buttons

  
  $(document).on("click", "button.upBtn", handlePostUpvote);

  $(document).on("click", "button.downVote", handlePostDownVote);
 
  postCategorySelect.on("change", handleCategoryChange);
  var post;

  // This function grabs posts from the database and updates the view
  function getPosts(category) {
    var categoryString = category || "";
    if (categoryString) {
      categoryString = "/category/" + categoryString;
    }
    $.get("/api/posts" + categoryString, function(data) {
      console.log("Posts Rendering:::", data);
      post = data;
      if (!post || !post.length) {
        displayEmpty();
      }
      else {
        initializeRows();
      }
    });
  }

  // This function does an API call to downVote posts
  function downVotePost(id) {
    $.ajax({
      method: "PUT",
      url: "/api/posts/down/" + id
    })
      .then(function() {
        getPosts(postCategorySelect.val());
        console.log(postCategorySelect.val());
        
      });
  }

  // Getting the initial list of posts
  getPosts();

  // InitializeRows handles appending all of our constructed post HTML inside
  // blogContainer
  function initializeRows() {
    blogContainer.empty();
    var postsToAdd = [];
    var reversePoststoAdd
    for (var i = 0; i < post.length; i++) {
      postsToAdd.push(createNewRow(post[i]));
    }
    reversePoststoAdd = postsToAdd.reverse()
    blogContainer.append(reversePoststoAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(post) {
    var newPostCard = $("<div>");
    newPostCard.addClass("card");
    var newPostCardHeading = $("<div>");
    newPostCardHeading.addClass("card-header");
    var downVoteBtn = $("<button>");
    downVoteBtn.text("Down");
    downVoteBtn.addClass("downVote btn btn-danger");
    $('#downVoteBtn').on('click', function () {
      console.log("This click works ok");
      
      Post.newVoteCount--
    })
    downVoteBtn.attr("id", "down");
    
    var newVoteCount = $("<span>")
    newVoteCount.text(post.voteCount)
    newVoteCount.css({
      float: "right",
      "clear": "both"
    })

    // Upvote Button Creation
    var upBtn = $("<button>");
    upBtn.text("Up");
    upBtn.addClass("upBtn btn btn-default btn-outline-success");



    
    // Added attribute id 'voteCounter' to newVoteCount
    newVoteCount.attr('id', 'voteCounter');
    var editBtn = $("<button>");
    editBtn.text("Upvote");
    editBtn.addClass("edit btn btn-default btn-outline-success");


    var newPostTitle = $("<h2>");
    var newPostDate = $("<small>");
    var newPostCategory = $("<h5>");
    var newPostLink = $("<a href="+post.link+" target='_blank'>")
    newPostLink.text(post.link)
    newPostCategory.text(post.category);
    newPostCategory.css({
      float: "left",
      "font-weight": "700",
      "margin-top":
      "-5px",
      "color": "blue"
    });
    var newPostCardBody = $("<div>");
    newPostCardBody.addClass("card-body");
    var newPostBody = $("<p>");
    var newPostAuthor = $("<span>")
    newPostAuthor.text("   - posted by: "+post.author)
    newPostAuthor.css({
      "font-style" : "italic",
      "font-weight": "strong"
    })
    newPostTitle.text(post.title + " ");
    newPostBody.text(post.description);
    var formattedDate = new Date(post.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY");
    newPostDate.text(formattedDate);
    newPostDate.css({
      float: "right",
      "font-weight": "100",
      "margin-top":
      "20px"
    });

    newPostTitle.append(newPostDate);
    newPostCardHeading.append(upBtn);
    newPostCardHeading.append(downVoteBtn);
    newPostCardHeading.append(newVoteCount)
    newPostCardHeading.append(newPostTitle);
    newPostCardHeading.append(newPostCategory);
    newPostCardBody.append(newPostBody);
    newPostCardBody.append(newPostLink);
    newPostCardBody.append(newPostAuthor);
    newPostCard.append(newPostCardHeading);
    newPostCard.append(newPostCardBody);
    newPostCard.data("post", post);
    return newPostCard;
  }


  // This function figures out which post we want to downvote and then calls
  // downvote
  function handlePostDownVote() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    downVotePost(currentPost.id);
  }

  // This function does an API call to delete posts
  function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/posts/" + id
    })
      .then(function() {
        getPosts(postCategorySelect.val());
      });
  }

  // This function finds id of the voted post, and calls the put request function
  function handlePostUpvote() {
    console.log('Upvote Button Pressed')
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    console.log('post id: ' + currentPost.id)
    upVotePost(currentPost.id)
  }

  // This function does an API call to upvote post
  function upVotePost(id) {
    $.ajax({
      method: "PUT",
      url: "/api/posts/up/" + id
    })
      .then(function() {
        getPosts(postCategorySelect.val())
      })
  }

  // This function displays a message when there are no posts
  function displayEmpty() {
    blogContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No posts yet for this category, navigate <a href='/post'>here</a> in order to create a new post.");
    blogContainer.append(messageH2);
  }

  // This function handles reloading new posts when the category changes
  function handleCategoryChange() {
    var newPostCategory = $(this).val();
    getPosts(newPostCategory);
  }
});








