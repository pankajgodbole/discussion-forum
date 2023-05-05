//
//
//

export async function handle (state , action) {
    // Destructure the action object
    const { input: data } = action;

    // Handle a request for creating a new discussion
    if (data.type === "createDiscussion") {
        state.discussions[data.discussion.id] = data.discussion;
    }

    // Handle a request for adding a new comment to an existing discussion
    if (data.type === "addComment") {
        state.discussions[data.id].comments.push(data.comment);
    }

    return { state };
}