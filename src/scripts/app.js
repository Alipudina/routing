import '../styles/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, NavLink, Route} from 'react-router-dom';

const MyCreatePost = props => {
  return (
    <CreatePost createPost={this.createPost.bind(this)}
                postInfo={this.state.postInfo}
                changeAuthor={this.changeAuthor.bind(this)}
                changeTitle={this.changeTitle.bind(this)}
                changeContent={this.changeContent.bind(this)}
                />
              );
}

const MyShowPostsConstructor = props => {
  return <ShowPosts country="Vietnam" />;
}

class NavList extends React.Component {
  render() {
    return (
      <ul className="nav">
        <li className="nav-item">
          <NavLink className="nav-link" to="/dist">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/create">Create A Post</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/show">Show Posts</NavLink>
        </li>
      </ul>
    )
  }
}

class Welcomer extends React.Component {
  render() {
    return <h2 className="display-2">Welcome to the simplest blog spot in the world</h2>;
  }
}

class ShowPosts extends React.Component {
  render() {
    return <h4 className="display-3">Hello, {this.props.country}</h4>;
  }
}

class CreatePost extends React.Component {

  render() {
    console.log(this.props);
    return (
      <form>
        <div className="input-group mb-3 input-group-lg">
          <div className="input-group-prepend">
            <span className="input-group-text">Your name:</span>
          </div>
          <input type="text" className="form-control" onChange={this.props.changeAuthor} value={this.props.postInfo.author} />
        </div>
        <div className="input-group mb-3 input-group-lg">
          <div className="input-group-prepend">
            <span className="input-group-text">Your title:</span>
          </div>
          <input type="text" className="form-control" onChange={this.props.changeTitle} value={this.props.postInfo.title} />
        </div>
        <div className="input-group mb-3 input-group-lg">
          <div className="input-group-prepend">
            <span className="input-group-text">Your title:</span>
          </div>
          <textarea className="form-control" onChange={this.props.changeContent} value={this.props.postInfo.content}></textarea>
        </div>
        <button type="submit" className="btn btn-lg btn-success">Create a post</button>
      </form>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {posts: [], postAuthor: '', postTitle: '', postContent: ''}}
  }

  createPost(event) {
    const postsCopy = [...this.state.posts];
    postsCopy.push({author: this.state.postAuthor, title: this.state.postTitle, content: this.state.postContent});
    this.setState({posts: postsCopy});
  }

  changeAuthor(event) {
    let authorCopy = this.state.postAuthor;
    authorCopy = event.target.value;
    this.setState({postAuthor: authorCopy});
  }

  changeTitle(event) {
    let titleCopy = this.state.postTitle;
    titleCopy = event.target.value;
    this.setState({postTitle: titleCopy});
  }

  changeContent(event) {
    let contentCopy = this.state.postInfo.content;
    contentCopy = event.target.value;
    this.setState({postContent: contentCopy});
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
            <NavList />
            <div className="jumbotron">
              <Route path="/dist" component={Welcomer} />
              <Route path="/create" render={MyCreatePost} />
              <Route path="/show" exact render={MyShowPostsConstructor}/>
            </div>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
