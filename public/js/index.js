$(document).ready(function () {
  // Jeremy code:::


  // 




  // Thomas work area




  // 


  // christian work area

  // 



  /*when making changes, COMMENT EACH SECTION CHANG

  */


  var categoryArr = [

    {
      category: "General Tools",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg",
      description: "Enter text here",
    },
    {
      category: "Training Material",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg",
      description: "Enter text here",
    },
    {
      category: "CSS",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg",
      description: "Enter text here",
    },
    {
      category: "Testing",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg",
      description: "Enter text here",
    },
    {
      category: "JavaScript",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg",
      description: "Enter text here",
    },
    {
      category: "Articles",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg",
      description: "Enter text here",
    },
    {
      category: "APIs",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg",
      description: "Enter text here",
    },
    {
      category: "Databases",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg",
      description: "Enter text here",
    },
    {
      category: "Node",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg",
      description: "Enter text here",
    },
    {
      category: "Templates",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg",
      description: "Enter text here",
    },
    {
      category: "Common Issues",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg",
      description: "Enter text here",
    },
    {
      category: "Job Resources",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg",
      description: "Enter text here",
    },
    {
      category: "HTML",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg",
      description: "Enter text here",
    },
    {
      category: "Other",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg",
      description: "Enter text here",
    },
    {
      category: "Slack",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg",
      description: "Enter text here",
    },
    {
      category: "Twilio",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg",
      description: "Enter text here",
    }

  ]


  for (i = 0; i < categoryArr.length; i++) {
    var category = categoryArr[i].category;
    var image = categoryArr[i].image;
    var description = categoryArr[i].description;

    $('#catCard').append(`
          <div class="col-md-3">
          <div class="card mb-4 box-shadow">
            <img class="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" alt="Thumbnail [100%x225]"
              style="height: 75px; width: 100%; display: block;" src="${image}" data-holder-rendered="true">
            <div class="card-body">
              <h4 class = "text-center">${category}</h4>
              <p class="card-text"></p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary category center-block" value="${category}">View</button>
                </div>
              </div>
            </div>
          </div>
        </div>`)

  }


  // blogContainer holds all of our posts
  var blogContainer = $(".blog-container");
  // var postCategorySelect = $("#category"); -- old code related to dropdown
  var postCategorySel = $(".category");


  // Click events for the edit and delete buttons

  $(document).on("click", "button.upBtn", handlePostUpvote);
  $(document).on("click", "button.downVote", handlePostDownVote);


  // postCategorySelect.on("change", handleCategoryChange); -- old code related to dropdown
  postCategorySel.on("click", handleCategoryChange2);


  var post;

  // This function grabs posts from the database and updates the view
  function getPosts(category) {
    var categoryString = category || "";
    console.log("the getpost category is " + category)
    if (categoryString) {
      categoryString = "/category/" + categoryString;
    }
    console.log("category string = " + categoryString)
    $.get("/api/posts" + categoryString, function (data) {
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
      .then(function () {
        getPosts(postCategorySel.val());
        console.log(postCategorySel.val());

      });
  }

  // Getting the initial list of posts
  getPosts();

  // InitializeRows handles appending all of our constructed post HTML inside blogContainer
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
    var newPostLink = $("<a href=" + post.link + " target='_blank'>")
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
    newPostAuthor.text("   - posted by: " + post.author)
    newPostAuthor.css({
      "font-style": "italic",
      "font-weight": "strong"
    })
    newPostTitle.text(post.title + " ");
    newPostBody.text(post.description);
    var formattedDate = new Date(post.createdAt);
    // Changes in time/date .utcOffset(-8)
    formattedDate = moment(post.createdAt).format("ddd, MMM Do YYYY");
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


  // This function figures out which post we want to downvote and then calls downvote
  function handlePostDownVote() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    downVotePost(currentPost.id);
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
      .then(function () {
        getPosts(postCategorySel.val())
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


  function handleCategoryChange2() {
    var newPostCategory = $(this).val();
    getPosts(newPostCategory);
    console.log("new post category = " + newPostCategory)
  }


  // Scroll to function. When card button is clicked, go to div associated with the .blog-container class. 
  $(".category").click(function () {
    $('html,body').animate({
      scrollTop: $(".blog-container").offset().top
    },
      'slow');
  });
  // temporary sms alert function, not working yet
  // $(".sms-alert").click(function(){
  //   $(".alert").alert('close')
  // })  

})