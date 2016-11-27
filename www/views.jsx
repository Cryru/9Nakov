startUp();

//Clears the view, prevents data from leaking.
function clearView()
{
	ReactDOM.render(<div></div>, document.getElementById('view'));	
}

//The login view rendered in the view div.
function viewLogin()
{
	let view = (<div>
					<h1>Login</h1>
					<form id="formLogin">
						<input name="Username" type="text" id="loginUsername" placeholder="Username" required />
						<input name="Password" type="password" id="loginPassword" placeholder="Password" required />
						<input type="submit" value="Login"/>
						Not registered? <a>Click here to register.</a>
					</form>
				</div>);

	ReactDOM.render(view, document.getElementById('view'));	
}

//The home view rendered in the view div.
function viewHome()
{
	let view = (<div>
					<div id="posts">
					</div>
				</div>);

	ReactDOM.render(view, document.getElementById('view'));	
}

//The register view rendered in the view div.
function viewRegister()
{
	let view = (<div>
				<h1>Register</h1>
					<form id="formRegister">
						<input name="Username" type="text" id="regUsername" placeholder="Username" required />
						<input name="Password" type="password" id="regPassword" placeholder="Password" required />
						<input name="PasswordConfirm" type="password" id="regPasswordConf" placeholder="Password Confirm" required />
						<input type="submit" value="Register" />
						Already registered? <a>Click here to login.</a>
					</form>
				</div>);

	ReactDOM.render(view, document.getElementById('view'));	
}

//The post creation view rendered in the view div.
function viewCreate()
{
	let view = (<div>
					<h1>Post</h1>
					<form id="formCreate">
						<input name="Title" type="text" id="creTitle" placeholder="Title" required />
						<label>Select an image:</label>
						<input name="File" type="file" id="creFile" accept="image/*" required />
						<label>Maximum: 9MB</label>
						<input type="submit" value="Post!" />
					</form>
					<img id="crePreview" />
				</div>);

	ReactDOM.render(view, document.getElementById('view'));	
}

//Receives the loaded data from kinvey and displays posts within the home view.
function renderPosts(data)
{
	//Create a post class.
	class Post extends React.Component {
		constructor(props) 
		{
			super(props);
		}

		render()
		{
			//The post html.
			return (<div onClick={this.handleClick.bind(this)} ><h1>{this.props.title}</h1><img  src={this.props.image}></img></div>);
		}
        handleClick(){
			showPostView(this.props.id)

        }
	}
	
	//A list to store rendered posts in.
	let postList = [];
	
	//Render all posts as received from Kinvey.
	for(let d of data)
	{
		postList.push(React.createElement(Post, {title: d.title, image: d.file, id: d._id}));
	}
	
	//Render the rendered posts to the posts element, inside a div due to React limitations.
	ReactDOM.render(<div>{postList}</div>, document.getElementById('posts'));	
}
function viewPost(postId){

        let view = (<div id="viewPost">
				<div>
					<h1 id="singlePostTitle"></h1>
					<div id="singlePostButtons"></div>
					<img id="singlePostImg"   /></div>
				<textarea name="comment"></textarea><br></br>
				<button>PostComment</button>
			</div>
        )
        ReactDOM.render(view, document.getElementById('view'));
    }



