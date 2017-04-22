class PostEditor extends ReduxModel {
  state = {
    post:     { author: '', title: '', text: '', published: false },
    loading:  false,
  }


  actions = {
    resetPost() {
      return {
        post: { author: '', title: '', text: '', published: false };
      }
    }

    editPost(post) {
      return { post };
    }

    toggleLoader() {
      return
    }
  }


  computedValues = {
    authorAndTitle() {
      return { `${ this.state.post.author }. ${ this.state.post.title }` };
    }
  }
}


const model = new PostEditor({ post: { ... }, loading: true });
const { actions, reducer, values } = model;

values.post.text
values.authorAndTitle
