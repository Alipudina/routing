import '../styles/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, NavLink, Route } from 'react-router-dom';

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
          <NavLink className="nav-link" to="/show">Show Current Posts</NavLink>
        </li>
      </ul>
    )
  }
}

class BlogForm extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.createPost}>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Username:</span>
          </div>
          <input onChange={this.props.updateAuthor} type="text" className="form-control" value={this.props.author}/>
        </div>

        <div className="input-group mb-3">
          <div className="input-group-append">
            <span className="input-group-text">Title:</span>
          </div>
          <input onChange={this.props.updateTitle} type="text" className="form-control" value={this.props.title}/>
        </div>

        <div className="input-group mb-3">
          <div className="input-group-append">
            <span className="input-group-text">Content:</span>
          </div>
          <textarea onChange={this.props.updateContent} className="form-control" value={this.props.content}></textarea>
        </div>

        <button type="submit" className="btn btn-success">Create a post</button>
      </form>
    )
  }
}

class Home extends React.Component {
  render() {
    return <h2 className="title">Welcome to our blog site</h2>;
  }
}

class ShowAllPosts extends React.Component {
  render() {
    return (
      <>
      {this.props.allPosts.map((post, index) => {
        return (
          <div className="card my-2" key={index}>
            <div className="card-header">
            <h3 className="title text-center">{post.blogTitle}</h3>
            </div>
            <div className="card-body">
            <p className="lead">{post.blogContent}</p>
            </div>
            <div className="card-footer">
            <p className="lead"><strong>{post.blogAuthor} </strong>
         wrote at: {post.blogDate.getDate()}/{post.blogDate.getMonth() + 1}/{post.blogDate.getFullYear()}
            </p>
          </div>
      </div>
        )
      })}
      </>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    // initialize state
    this.state = {authorValue: '', blogTitle: '', blogContent: '', allPosts: [], date: undefined};
    this.changeAuthor = this.changeAuthor.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.changeContent = this.changeContent.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  changeAuthor(event) {
    this.setState({authorValue: event.target.value});
  }

  changeTitle(event) {
    this.setState({blogTitle: event.target.value});
  }

  changeContent(event) {
    this.setState({blogContent: event.target.value});
  }

  createPost(event) {
    const currentDate = new Date();
    event.preventDefault();
    const tempPosts = [...this.state.allPosts];
    tempPosts.push({blogAuthor: this.state.authorValue,
                    blogTitle: this.state.blogTitle,
                    blogContent: this.state.blogContent,
                    blogDate: currentDate
                  })
    this.setState({allPosts: tempPosts, authorValue: '', blogTitle: '', blogContent: '', date: currentDate});
  }

  render() {
    return (
      <BrowserRouter>
        <>
        <NavList />
        <div className="container">
          <div className="jumbotron">
          <Route path="/dist" component={Home} />
          <Route path="/create" render={ () => {
            return <BlogForm author={this.state.authorValue}
                             title={this.state.blogTitle}
                             content={this.state.blogContent}
                             updateAuthor={this.changeAuthor}
                             updateTitle={this.changeTitle}
                             updateContent={this.changeContent}
                             createPost={this.createPost}
                    />
          } } />
          <Route path="/show" render={ () => <ShowAllPosts allPosts={this.state.allPosts}/>} />
          </div>
        </div>
        </>
      </BrowserRouter>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('app'));
