const { observable, decorate } = mobx
const { observer } = mobxReact

function graphql(query) {
  const body = JSON.stringify({
    query
  })
  return fetch("/api", {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body
  })
  .then(r => {
    return r.json()
  })
  .then(r => {
    if (r.errors) {
      throw new Error(r.errors[0].message)
    }
    return r
  })
  .catch((err) => {
    alert(err.message)
    throw err
  })
}

class Store {
  // name = "asd"
  name = null
  timelines = []
  users = []
  login = async (name) => {
    const result = await graphql(`mutation {
      loginAs(name: "${name}") {
        name
      }
    }`)
    this.name = result.data.loginAs.name
    this.loadTimeline()
    this.loadUsers()
    setInterval(this.loadTimeline, 2000)
  }

  tweet = async (message) => {
    const result = await graphql(`mutation{
      tweet(message: "${message}") {
        message
      }
    }`)
    this.loadTimeline()
  }

  loadUsers = async () => {
    const result = await graphql(`{
      users {
        name
        isFollowing
      }
    }`)
    this.users = result.data.users
  }

  loadTimeline = async () => {
    const result = await graphql(`{
      me {
        timelines {
          message
          since
          user {
            name
          }
        }
      }
    }`)
    this.timelines = result.data.me.timelines
  }

  follow = async (name) => {
    const result = await graphql(`mutation {
      follow(name: "${name}")
    }`)
    this.users = this.users.map((u) => {
      if (u.name === name) {
        return {
          ...u,
          isFollowing: true,
        }
      }
      return u
    })
    this.loadTimeline()
  }

  unfollow = async (name) => {
    const result = await graphql(`mutation {
      unfollow(name: "${name}")
    }`)
    this.users = this.users.map((u) => {
      if (u.name === name) {
        return {
          ...u,
          isFollowing: false,
        }
      }
      return u
    })
    this.loadTimeline()
  }
}

decorate(Store,{
  name: observable,
  timelines: observable,
  users: observable,
})

const s = new Store()

const Login = observer(class Login extends React.Component {
  render() {
    return (
      <div className="card mt-5 mx-auto" style={{ width: 400 }}>
        <div className="card-body">
          <form
            className="form mb-0"
            onSubmit={(e) => {
              e.preventDefault()
              s.login(document.getElementById("as-name").value)
            }}
          >
            <input
              id="as-name"
              type="text"
              className="form-control" placeholder="As name" />
            <button
              type="submit"
              className="btn ml-auto d-block mt-2 btn-primary"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    )
  }
})

const Dashboard = observer(
  class Dashboard extends React.Component {
    render() {
      return (
        <div className="row mt-5">
          <div className="col-4">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <h3>[ {s.name} ]</h3>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <form
                      className="m-0"
                      onSubmit={(e) => {
                        e.preventDefault()
                        s.tweet(document.getElementById("tweet-message").value)
                        document.getElementById("tweet-message").value = ""
                      }}
                    >
                      <textarea
                        id="tweet-message"
                        className="form-control"
                        placeholder="Tweet"
                        style={{ backgroundColor: "#fcfcfc" }}
                      />
                      <button className="btn btn-primary mt-3 d-block ml-auto">Tweet!</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="card my-2">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <h3>[ Users ]</h3>
                  </div>
                </div>
                {
                  s.users.map((user) => {
                    return (
                      <div className="card mb-2" key={user.name}>
                        <div
                          className="card-body p-2"
                        >
                          <div className="col">
                            {user.name}
                          </div>
                          <button
                            className={`btn btn-${user.isFollowing ? "danger" : "primary" } d-block ml-auto`}
                            onClick={() => {
                              if (user.isFollowing) {
                                s.unfollow(user.name)
                              } else {
                                s.follow(user.name)
                              }
                            }}
                          >
                            {user.isFollowing ? "Unfollow" : "Follow"}
                          </button>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
          <div className="col-8">
            {
              s.timelines.length > 0
              ? s.timelines.map((timeline, idx) => {
                return (
                  <div key={idx} className="card mb-4">
                    <div className="card-body">
                      <div className="row">
                        <p className="col-2">[{timeline.user.name}]</p>
                        <p className="col">{timeline.message}</p>
                      </div>
                      <div className="row">
                        <div className="col text-right">
                          {timeline.since}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
              : <h3 className="d-block text-center">No tweets</h3>
            }
          </div>
        </div>
      )
    }
  }
)

const App = observer(
  class App extends React.Component {
    render() {
      return (
        <div className="container">
          {
            s.name === null
              ? <Login />
              : <Dashboard/>
          }
        </div>
      )
    }
  }
)

ReactDOM.render(<App />, document.getElementById("app"));