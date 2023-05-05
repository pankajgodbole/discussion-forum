<script>
  import { v4 as uuid } from "uuid";
  import axios from "axios";
  import { onMount } from "svelte";

  import { function_id } from "./utils/function_id.js";

  $: state = {
    data : {
      discussions : {} ,
    },
  };

  onMount(async () => {
    state = await axios({
      method : "get" ,
      url : `https://${function_id}.exm.run` ,
    });
  });

async function handleSubmit(e) {
  console.log(":App.svelte :handleSubmit :e " + JSON.stringify(e));

  const res = await axios({
    method : "post" ,
    url : `https://${function_id}.exm.run` ,
    data : {
      type : "createDiscussion" ,
      discussion : {
        id : uuid() ,
        author : e.target.author.value ,
        topic : e.target.topic.value ,
        comments : [] ,
      } ,
    } ,
  });

  // Update the UI state DS according to the res data received after processing by the contract
  console.log(":App.svelte :handleSubmit :res " + JSON.stringify(res));
  state.data.discussions = res.data.data.execution.state.discussions;

  // Reset the form
  e.target.reset();
}

async function handleCommentSubmit(e) {
  console.log(":App.svelte :handleCommentSubmit :e.target " + JSON.stringify(e.target));

  const res = await axios({
    method : "post" ,
    url : `https://${function_id}.exm.run` ,
    data : {
      type : "addComment" ,
      id : e.target.commentText.id ,
      comment : {
        author : e.target.author.value ,
        text : e.target.commentText.value ,
      } ,
    } ,
  });

  console.log(":App.svelte :handleCommentSubmit :e.target (AFTER) " + JSON.stringify(e.target));

  // Update the UI state DS with the result data received after processing by the contract
  state.data.discussions = res.data.data.execution.state.discussions;
  e.target.reset();
}
</script>

<header>
  <h1>Discussion Forum</h1>
</header>
<main>
  <form class="discussionForm" on:submit|preventDefault={handleSubmit}>
    <input type="text" name="author" placeholder="Your Alias" />
    <input
            type="text"
            name="topic"
            class="discussionInput"
            placeholder="Topic of Discussion"
    />
    <button type="submit">Create Discussion</button>
  </form>
  {#each Object.values(state.data.discussions) as discussion}
    <div class="discussion">
      <h4>{discussion.topic}</h4>
      <p>Posted by <strong>{discussion.author}</strong></p>
      {#each Object.values(discussion.comments) as comment}
        <div class="comment">
          <strong>{comment.author}</strong>: {comment.text}
        </div>
      {/each}
      <form class="commentForm" on:submit|preventDefault={handleCommentSubmit}>
        <input
                type="text"
                name="author"
                class="commentName"
                placeholder="Your Alias"
        />
        <input
                type="text"
                name="commentText"
                class="commentInput"
                id={discussion.id}
                placeholder="Add Comment"
        />
        <button type="submit" class="commentButton">Add Comment</button>
      </form>
    </div>
  {/each}
</main>