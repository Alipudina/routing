import '../styles/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, NavLink, Route} from 'react-router-dom';

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

class SinglePost extends React.Component {
  render() {
    console.log(this.props.logger);
    return (
      <div className="card my-2">
        <div className="card-header">
        <h3 className="title text-center">{this.props.postInfo.title}</h3>
        </div>
        <div className="card-body">
        <p className="lead">{this.props.postInfo.content}</p>
        </div>
        <div className="card-footer">
        <p className="lead"><strong>{this.props.postInfo.author}</strong> wrote at: Yesterday</p>
        </div>
      </div>
    )
  }
}

class ShowPosts extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <h2 className="title">Select a blog post to examine</h2>
          <div className="container">
          {this.props.allPosts.map((postInfo, index) => {
            return (
              <NavLink to={"/single/" + index} key={index}>
                <SinglePost postInfo={postInfo} />
              </NavLink>
            )
          })}
          </div>
        </React.Fragment>
      </BrowserRouter>
    )
  }
}

class CreatePost extends React.Component {

  render() {
    return (
      <form onSubmit={this.props.createPost}>
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
    this.state = {posts: [], postAuthor: '', postTitle: '', postContent: '', date: undefined};
  }

  createPost(event) {
    event.preventDefault();
    const postsCopy = [...this.state.posts];
    const currentDate = new Date();
    postsCopy.push({author: this.state.postAuthor, title: this.state.postTitle, content: this.state.postContent, date: currentDate});
    this.setState({posts: postsCopy, postAuthor: '', postTitle: '', postContent: ''});
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
    let contentCopy = this.state.content;
    contentCopy = event.target.value;
    this.setState({postContent: contentCopy});
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
            <NavList />
            <div className="jumbotron">
              <Route path="/dist" exact component={Welcomer} />
              <Route path="/create" exact render={() => {
                return (<CreatePost createPost={this.createPost.bind(this)}
                          changeAuthor={this.changeAuthor.bind(this)}
                          changeTitle={this.changeTitle.bind(this)}
                          changeContent={this.changeContent.bind(this)}
                          postInfo={{author: this.state.postAuthor, title: this.state.postTitle, content: this.state.postContent}}
                          />) }} />
              <Route path="/show" exact render={() => <ShowPosts allPosts={this.state.posts} />} />
              <Route path="/single/:postid" exact render={() => <SinglePost postInfo={{author: 'Jake', title: 'My DCI days', content: 'Whatever i like!'}}/>} />
            </div>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
