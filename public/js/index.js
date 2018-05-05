$(document).ready(function () {


  var categoryArr = [

    {
      category: "General Tools",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg",
      description: "Enter text here",
    },
    {
      category: "Teaching Tools",
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
      category: "Random",
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
    }
    // {
    //   category: "Job Resources",
    //   image: "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg",
    //   description: "Enter text here",
    // }

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
  var postCategorySelect = $("#category");
  var postCategorySel = $(".category");
  console.log(postCategorySelect)
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handlePostDelete);
  $(document).on("click", "button.edit", handlePostEdit);
  postCategorySelect.on("change", handleCategoryChange);
  postCategorySel.on("click", handleCategoryChange2);

  var post;

  // This function grabs posts from the database and updates the view
  function getPosts(category) {
    // console.log("the getpost category is " + category)
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

  // This function does an API call to delete posts
  // function deletePost(id) {
  //   $.ajax({
  //     method: "DELETE",
  //     url: "/api/posts/" + id
  //   })
  //     .then(function() {
  //       getPosts(postCategorySelect.val());
  //     });
  // }

  // Getting the initial list of posts
  getPosts();
  // InitializeRows handles appending all of our constructed post HTML inside
  // blogContainer
  function initializeRows() {
    blogContainer.empty();
    var postsToAdd = [];
    for (var i = 0; i < post.length; i++) {
      postsToAdd.push(createNewRow(post[i]));
    }
    blogContainer.append(postsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(post) {
    var newPostCard = $("<div>");
    newPostCard.addClass("card");
    var newPostCardHeading = $("<div>");
    newPostCardHeading.addClass("card-header");
    var deleteBtn = $("<button>");
    deleteBtn.text("Down");
    deleteBtn.addClass("delete btn btn-danger");
    var newVoteCount = $("<span>")
    newVoteCount.text(post.voteCount)
    newVoteCount.css({
      float: "right",
      "clear": "both"
    })
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
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm a");
    newPostDate.text(formattedDate);
    newPostDate.css({
      float: "right",
      "font-weight": "100",
      "margin-top":
        "20px"
    });

    newPostTitle.append(newPostDate);
    newPostCardHeading.append(deleteBtn);
    newPostCardHeading.append(editBtn);
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

  // This function figures out which post we want to delete and then calls
  // deletePost
  function handlePostDelete() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    deletePost(currentPost.id);
  }

  // This function figures out which post we want to edit and takes it to the
  // Appropriate url
  function handlePostEdit() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    window.location.href = "/cms?post_id=" + currentPost.id;
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
    console.log(newPostCategory)
  }


  function handleCategoryChange2() {
    var newPostCategory = $(this).val();
    getPosts(newPostCategory);
    console.log(newPostCategory)
  
  }

  // Scroll to function. When card button is clicked, go to div associated with the .blog-container class. 
  $(".category").click(function () {
    $('html,body').animate({
      scrollTop: $(".blog-container").offset().top
    },
      'slow');
  });


});



